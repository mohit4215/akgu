# AKGU University Portal — Technical Design Document
**Version:** 1.0  
**Date:** October 2026  
**Stack:** Next.js 15 (App Router) · TypeScript · Payload CMS 3.0 · Tailwind CSS · PostgreSQL

---

## 1. SYSTEM ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                         Vercel Edge / Node                       │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │           Next.js 15 Application (App Router)              │  │
│  │                                                            │  │
│  │  ┌──────────────────┐   ┌──────────────────────────────┐  │  │
│  │  │  Frontend Routes │   │  Payload CMS API Routes      │  │  │
│  │  │  (RSC + Client)  │   │  /api/[...payload]           │  │  │
│  │  │  /               │   │  /admin  (Next.js App)       │  │  │
│  │  │  /[...slug]      │   │                              │  │  │
│  │  └──────┬───────────┘   └──────────────┬───────────────┘  │  │
│  │         │  Local API (no HTTP)          │                  │  │
│  │         └───────────────┬──────────────┘                  │  │
│  │                         ▼                                  │  │
│  │              Payload CMS 3.0 Core                          │  │
│  │         (Collections, Globals, Hooks)                      │  │
│  └─────────────────────────┬──────────────────────────────────┘  │
│                             │                                     │
│                             ▼                                     │
│                  PostgreSQL (Neon / Supabase)                     │
│                  — or MongoDB Atlas (adapter)                     │
└─────────────────────────────────────────────────────────────────┘
```

**Key architectural decisions:**
1. **Payload embedded in Next.js** — Payload 3.0 runs as part of the same Next.js process using `@payloadcms/next`. No separate CMS server required.
2. **Local API for SSR** — Server Components call `getPayload({ config })` and use `payload.find(...)` directly — zero HTTP overhead on SSR.
3. **ISR with 60s revalidation** — Content pages use `export const revalidate = 60` so CMS updates propagate without full redeploys.
4. **Client Components are isolated** — Only interactive islands (Header mobile, Calculator, ProgramExplorer, Modals) are marked `"use client"`. All layout, data fetching, and static sections are RSC.

---

## 2. FOLDER STRUCTURE

```
akgu-portal/
├── .env.local                        # DB_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL
├── next.config.ts                    # withPayload() wrapper
├── tailwind.config.ts
├── tsconfig.json                     # strict: true
│
├── src/
│   ├── app/
│   │   ├── (frontend)/               # Public-facing routes group
│   │   │   ├── layout.tsx            # Root HTML shell + Header + Footer + Providers
│   │   │   ├── page.tsx              # Homepage → redirects to /home slug handler
│   │   │   ├── [slug]/               # Top-level slug pages (about, admissions, etc.)
│   │   │   │   └── page.tsx
│   │   │   └── [...slug]/            # Nested slug catch-all
│   │   │       ├── page.tsx          # SlugPage: fetch + block renderer
│   │   │       └── not-found.tsx
│   │   │
│   │   ├── (payload)/                # Payload admin + API group
│   │   │   ├── admin/
│   │   │   │   └── [[...segments]]/
│   │   │   │       └── page.tsx      # Payload Admin UI
│   │   │   └── api/
│   │   │       └── [...payload]/
│   │   │           └── route.ts      # Payload REST & GraphQL endpoints
│   │   │
│   │   ├── globals.css               # Tailwind base + custom tokens
│   │   └── layout.tsx                # Root layout (fonts, metadata)
│   │
│   ├── payload/
│   │   ├── payload.config.ts         # Main Payload config
│   │   │
│   │   ├── collections/
│   │   │   ├── Users.ts
│   │   │   ├── Media.ts
│   │   │   ├── Pages.ts
│   │   │   ├── Programs.ts
│   │   │   ├── Schools.ts
│   │   │   ├── CentresOfExcellence.ts
│   │   │   └── Placements.ts
│   │   │
│   │   ├── globals/
│   │   │   ├── Header.ts
│   │   │   ├── Footer.ts
│   │   │   └── SiteSettings.ts
│   │   │
│   │   └── blocks/
│   │       ├── HeroBlock.ts
│   │       ├── StatsBlock.ts
│   │       ├── ProgramExplorerBlock.ts
│   │       ├── CentresOfExcellenceBlock.ts
│   │       ├── PlacementTickerBlock.ts
│   │       ├── ScholarshipCalculatorBlock.ts
│   │       └── CallToActionBlock.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # "use client" — sticky nav, mega-menu, mobile drawer
│   │   │   ├── Footer.tsx            # RSC — static footer from Global
│   │   │   └── AnnouncementBanner.tsx
│   │   │
│   │   ├── blocks/                   # One component per Page Builder block
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── StatsBlock.tsx
│   │   │   ├── ProgramExplorer.tsx   # "use client" — filter + search
│   │   │   ├── CentresOfExcellenceBlock.tsx
│   │   │   ├── PlacementTicker.tsx
│   │   │   ├── ScholarshipCalculator.tsx  # "use client"
│   │   │   └── CallToActionBlock.tsx
│   │   │
│   │   ├── ui/                       # Reusable primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx             # Focus-trapped modal primitive
│   │   │   ├── Card.tsx
│   │   │   └── RichText.tsx          # Payload lexical → React renderer
│   │   │
│   │   └── modals/
│   │       ├── EnquiryModal.tsx      # "use client"
│   │       └── SearchModal.tsx       # "use client"
│   │
│   ├── lib/
│   │   ├── payload.ts                # getPayloadClient() singleton helper
│   │   ├── blockRenderer.tsx         # blockType → component map
│   │   ├── formatters.ts             # inrFormat, formatDate, slugify
│   │   └── scholarshipTiers.ts       # Pure scholarship calculation logic
│   │
│   └── types/
│       └── payload-types.ts          # Auto-generated by `payload generate:types`
```

---

## 3. PAYLOAD CMS SCHEMA

### 3.1 Collections

#### `Programs.ts`
```typescript
import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'level', 'school', 'published'] },
  access: { read: () => true },
  fields: [
    { name: 'title',             type: 'text',         required: true },
    { name: 'slug',              type: 'text',         required: true, unique: true },
    { name: 'level',             type: 'select',       required: true,
      options: [
        { label: 'Undergraduate (UG)', value: 'UG' },
        { label: 'Postgraduate (PG)',  value: 'PG' },
        { label: 'Doctoral (Ph.D.)',   value: 'PhD' },
      ],
    },
    { name: 'school',            type: 'relationship', relationTo: 'schools' },
    { name: 'durationYears',     type: 'number' },
    { name: 'intakeCapacity',    type: 'number' },
    { name: 'tuitionFeePerYear', type: 'number' },
    { name: 'specializations',   type: 'array',
      fields: [{ name: 'specialization', type: 'text' }],
    },
    { name: 'eligibilityCriteria', type: 'richText' },
    { name: 'published',         type: 'checkbox',     defaultValue: false },
  ],
}
```

#### `Schools.ts`
```typescript
export const Schools: CollectionConfig = {
  slug: 'schools',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name',        type: 'text',   required: true },
    { name: 'code',        type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'icon',        type: 'upload', relationTo: 'media' },
  ],
}
```

#### `CentresOfExcellence.ts`
```typescript
export const CentresOfExcellence: CollectionConfig = {
  slug: 'centres-of-excellence',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name',            type: 'text',     required: true },
    { name: 'industryPartner', type: 'text' },
    { name: 'description',     type: 'textarea' },
    { name: 'image',           type: 'upload',   relationTo: 'media' },
    { name: 'keyHighlights',   type: 'array',
      fields: [{ name: 'highlight', type: 'text' }],
    },
  ],
}
```

#### `Placements.ts`
```typescript
export const Placements: CollectionConfig = {
  slug: 'placements',
  admin: { useAsTitle: 'year' },
  access: { read: () => true },
  fields: [
    { name: 'year',             type: 'number',   required: true },
    { name: 'highestPackage',   type: 'text' },
    { name: 'averagePackage',   type: 'text' },
    { name: 'totalOffers',      type: 'number' },
    { name: 'topRecruiters',    type: 'array',
      fields: [
        { name: 'name',  type: 'text' },
        { name: 'logo',  type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'alumniTestimonials', type: 'array',
      fields: [
        { name: 'name',      type: 'text' },
        { name: 'program',   type: 'text' },
        { name: 'company',   type: 'text' },
        { name: 'quote',     type: 'textarea' },
        { name: 'photo',     type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
```

#### `Pages.ts` (Page Builder)
```typescript
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title',    type: 'text', required: true },
    { name: 'slug',     type: 'text', required: true, unique: true },
    { name: 'meta',     type: 'group',
      fields: [
        { name: 'title',       type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'layout',   type: 'blocks',
      blocks: [
        HeroBlock, StatsBlock, ProgramExplorerBlock,
        CentresOfExcellenceBlock, PlacementTickerBlock,
        ScholarshipCalculatorBlock, CallToActionBlock,
      ],
    },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
}
```

---

### 3.2 Globals

#### `Header.ts`
```typescript
export const HeaderGlobal: GlobalConfig = {
  slug: 'header',
  fields: [
    { name: 'topBarText',    type: 'text' },
    { name: 'helplineNumber',type: 'text' },
    { name: 'email',         type: 'email' },
    { name: 'phdBadgeText',  type: 'text' },
    { name: 'primaryCta',    type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url',   type: 'text' },
      ],
    },
    { name: 'navigationMenu', type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url',   type: 'text' },
        { name: 'subLinks', type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url',   type: 'text' },
          ],
        },
      ],
    },
  ],
}
```

#### `SiteSettings.ts`
```typescript
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'universityName', type: 'text' },
    { name: 'logo',           type: 'upload', relationTo: 'media' },
    { name: 'announcementBanner', type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'text',    type: 'text' },
        { name: 'link',    type: 'text' },
      ],
    },
  ],
}
```

---

### 3.3 Page Builder Blocks

```typescript
// HeroBlock.ts
export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'badge',          type: 'text' },
    { name: 'headline',       type: 'text', required: true },
    { name: 'subheadline',    type: 'textarea' },
    { name: 'backgroundMedia',type: 'upload', relationTo: 'media' },
    { name: 'primaryCta',     type: 'group',
      fields: [{ name: 'label', type: 'text' }, { name: 'url', type: 'text' }] },
    { name: 'secondaryCta',   type: 'group',
      fields: [{ name: 'label', type: 'text' }, { name: 'url', type: 'text' }] },
    { name: 'quickActions',   type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url',   type: 'text' },
        { name: 'icon',  type: 'text' },
      ],
    },
  ],
}

// StatsBlock.ts
export const StatsBlock: Block = {
  slug: 'stats',
  fields: [
    { name: 'stats', type: 'array',
      fields: [
        { name: 'value',  type: 'text' },   // e.g. "6000+"
        { name: 'label',  type: 'text' },
        { name: 'target', type: 'number' }, // raw number for counter animation
        { name: 'suffix', type: 'text' },   // e.g. "+"
      ],
    },
  ],
}

// ScholarshipCalculatorBlock.ts — no extra fields needed (uses Programs collection)
export const ScholarshipCalculatorBlock: Block = {
  slug: 'scholarship-calculator',
  fields: [
    { name: 'heading',    type: 'text' },
    { name: 'subheading', type: 'text' },
  ],
}
```

---

## 4. TYPESCRIPT INTERFACES

```typescript
// Auto-generated from Payload — key types shown for reference

export interface Program {
  id: string
  title: string
  slug: string
  level: 'UG' | 'PG' | 'PhD'
  school?: School | string
  durationYears?: number
  intakeCapacity?: number
  tuitionFeePerYear?: number
  specializations?: Array<{ specialization: string }>
  eligibilityCriteria?: SerializedEditorState  // Payload Lexical
  published: boolean
}

export interface School {
  id: string
  name: string
  code?: string
  description?: string
}

export interface CentreOfExcellence {
  id: string
  name: string
  industryPartner?: string
  description?: string
  image?: Media
  keyHighlights?: Array<{ highlight: string }>
}

export interface Page {
  id: string
  title: string
  slug: string
  meta?: { title?: string; description?: string }
  layout: Block[]
  published: boolean
}

export type Block =
  | HeroBlockType
  | StatsBlockType
  | ProgramExplorerBlockType
  | CentresOfExcellenceBlockType
  | PlacementTickerBlockType
  | ScholarshipCalculatorBlockType
  | CallToActionBlockType

export interface HeroBlockType {
  blockType: 'hero'
  badge?: string
  headline: string
  subheadline?: string
  primaryCta?: { label: string; url: string }
  secondaryCta?: { label: string; url: string }
  quickActions?: Array<{ label: string; url: string; icon: string }>
}

export interface ScholarshipTier {
  minPct: number
  discountPct: number
  label: string
  emoji: string
}
```

---

## 5. KEY COMPONENT DESIGNS

### 5.1 Block Renderer (`src/lib/blockRenderer.tsx`)

```typescript
import { HeroBlock }                from '@/components/blocks/HeroBlock'
import { StatsBlock }               from '@/components/blocks/StatsBlock'
import { ProgramExplorer }          from '@/components/blocks/ProgramExplorer'
import { CentresOfExcellenceBlock } from '@/components/blocks/CentresOfExcellenceBlock'
import { PlacementTicker }          from '@/components/blocks/PlacementTicker'
import { ScholarshipCalculator }    from '@/components/blocks/ScholarshipCalculator'
import { CallToActionBlock }        from '@/components/blocks/CallToActionBlock'

const blockMap: Record<string, React.ComponentType<any>> = {
  'hero':                    HeroBlock,
  'stats':                   StatsBlock,
  'program-explorer':        ProgramExplorer,
  'centres-of-excellence':   CentresOfExcellenceBlock,
  'placement-ticker':        PlacementTicker,
  'scholarship-calculator':  ScholarshipCalculator,
  'call-to-action':          CallToActionBlock,
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockMap[block.blockType]
        if (!Component) return null
        return <Component key={i} {...block} />
      })}
    </>
  )
}
```

### 5.2 Scholarship Calculation Logic (`src/lib/scholarshipTiers.ts`)

```typescript
export interface ScholarshipResult {
  tier: ScholarshipTier | null
  discountAmount: number
  netPayable: number
  monthlyEmi: number
  baseFee: number
}

const TIERS: ScholarshipTier[] = [
  { minPct: 95, discountPct: 100, label: 'Super-30 Full Scholarship', emoji: '🏆' },
  { minPct: 90, discountPct: 75,  label: 'Gold Merit Scholarship',    emoji: '🥇' },
  { minPct: 85, discountPct: 50,  label: 'Silver Merit Scholarship',  emoji: '🥈' },
  { minPct: 80, discountPct: 30,  label: 'Bronze Merit Scholarship',  emoji: '🥉' },
  { minPct: 75, discountPct: 15,  label: 'Academic Excellence Award', emoji: '⭐' },
  { minPct: 0,  discountPct: 0,   label: 'No scholarship applicable', emoji: ''   },
]

export function calculateScholarship(baseFee: number, percentage: number): ScholarshipResult {
  const tier = TIERS.find(t => percentage >= t.minPct) ?? TIERS[TIERS.length - 1]
  const discountAmount = Math.round(baseFee * tier.discountPct / 100)
  const netPayable     = baseFee - discountAmount
  const monthlyEmi     = Math.ceil(netPayable / 12)
  return { tier, discountAmount, netPayable, monthlyEmi, baseFee }
}
```

### 5.3 Slug Page (`src/app/(frontend)/[...slug]/page.tsx`)

```typescript
import { notFound }       from 'next/navigation'
import { getPayload }     from 'payload'
import config             from '@payload-config'
import { BlockRenderer }  from '@/lib/blockRenderer'
import type { Metadata }  from 'next'

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pages = await payload.find({ collection: 'pages', where: { published: { equals: true } }, limit: 1000 })
  return pages.docs.map(page => ({ slug: page.slug.split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug.join('/')
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })
  const page = result.docs[0]
  if (!page) return {}
  return {
    title: page.meta?.title ?? page.title,
    description: page.meta?.description,
  }
}

export default async function SlugPage({ params }: Props) {
  const slug = (await params).slug.join('/')
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'pages', where: { slug: { equals: slug }, published: { equals: true } } })
  const page = result.docs[0]
  if (!page) notFound()
  return <BlockRenderer blocks={page.layout ?? []} />
}
```

---

## 6. DESIGN TOKENS (Tailwind Config)

```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: '#0B2545', dark: '#0F172A', light: '#1E3A5F' },
        amber:   { DEFAULT: '#D97706', light: '#F59E0B', pale: '#FEF3C7' },
        slate:   { DEFAULT: '#64748B' },
        offwhite:{ DEFAULT: '#F8FAFC' },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['var(--font-playfair)', 'Cormorant Garamond', 'serif'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
}
```

---

## 7. ENVIRONMENT VARIABLES

```bash
# .env.local
DATABASE_URI=postgresql://user:pass@host:5432/akgu   # or mongodb+srv://...
PAYLOAD_SECRET=your-32-char-random-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

---

## 8. DEPLOYMENT ARCHITECTURE

```
GitHub (main branch)
       │
       ▼
  Vercel CI/CD
  ├── Build: next build (includes Payload migrations)
  ├── Runtime: Node.js 20 (Vercel Fluid / Serverless Functions)
  ├── Static: ISR pages cached at Edge (60s revalidate)
  └── Environment: PAYLOAD_SECRET, DATABASE_URI, NEXT_PUBLIC_SERVER_URL
       │
       ▼
  Neon PostgreSQL (or MongoDB Atlas)
  └── Payload manages schema migrations automatically
```

---

## 9. DATA FLOW DIAGRAMS

### Homepage SSR Flow
```
Browser GET /
    │
    ▼
Next.js Server (RSC)
    │── getPayload({ config })
    │── payload.findGlobal('site-settings')  → AnnouncementBanner
    │── payload.findGlobal('header')         → Header data
    │── payload.find('pages', slug='home')   → Page + blocks
    │── For ProgramExplorerBlock:
    │       payload.find('programs', published=true)  → programs[]
    │── For PlacementTickerBlock:
    │       payload.find('placements', limit=1, sort=-year) → placement
    │
    ▼
React HTML rendered server-side → streamed to browser
    │
    ▼
Client hydration of interactive islands:
    ├── Header.tsx    (mobile drawer, mega-menu hover)
    ├── ProgramExplorer.tsx   (filter tabs, search)
    ├── ScholarshipCalculator.tsx  (slider, select, calc)
    ├── EnquiryModal.tsx  (auto-prompt timer, form)
    └── SearchModal.tsx   (Cmd+K, fuzzy search)
```
