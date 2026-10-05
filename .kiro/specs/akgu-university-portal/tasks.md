# AKGU University Portal — Implementation Tasks
**Spec:** akgu-university-portal  
**Version:** 1.0  
**Total Tasks:** 32  
**Execution Order:** Sequential within phases; tasks within a phase may be parallelised where noted.

---

## PHASE 1 — Project Scaffold & Tooling

- [ ] **Task 1.1 — Bootstrap Next.js 15 + Payload CMS 3.0**
  - Run `npx create-payload-app@latest akgu-portal` choosing Next.js App Router template.
  - Verify `next.config.ts` includes `withPayload()` wrapper.
  - Confirm dev server starts at `http://localhost:3000` and admin panel loads at `/admin`.
  - _Acceptance:_ `npm run dev` starts without errors; `/admin` renders Payload login.

- [ ] **Task 1.2 — Configure TypeScript (strict mode)**
  - Set `"strict": true` in `tsconfig.json`.
  - Add path aliases: `@/` → `./src/`.
  - _Acceptance:_ `npx tsc --noEmit` passes with zero errors on the fresh scaffold.

- [ ] **Task 1.3 — Configure Tailwind CSS with AKGU design tokens**
  - Install Tailwind CSS v3 (or v4 if bundled by Payload template).
  - Add AKGU brand tokens to `tailwind.config.ts`: navy (`#0B2545`, `#0F172A`, `#1E3A5F`), amber (`#D97706`, `#F59E0B`), slate (`#64748B`), offwhite (`#F8FAFC`).
  - Configure `fontFamily.sans` and `fontFamily.display` with CSS variable references.
  - Add Google Fonts (Inter + Playfair Display) via `next/font/google` in root layout.
  - _Acceptance:_ A test div with `className="bg-navy text-amber font-display"` renders correctly.

- [ ] **Task 1.4 — Configure environment variables**
  - Create `.env.local` with `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`.
  - Add `.env.local` to `.gitignore`.
  - Create `.env.example` with placeholder values and commit it.
  - _Acceptance:_ `process.env.PAYLOAD_SECRET` resolves correctly in `payload.config.ts`.

- [ ] **Task 1.5 — Install additional dependencies**
  - `npm install framer-motion lucide-react`
  - `npm install -D @types/node`
  - _Acceptance:_ `import { motion } from 'framer-motion'` and `import { ChevronDown } from 'lucide-react'` resolve without TypeScript errors.

---

## PHASE 2 — Payload CMS Schema

- [ ] **Task 2.1 — Create `Media` collection**
  - File: `src/payload/collections/Media.ts`
  - Standard Payload media collection with `upload.imageSizes` (thumbnail 400×300, card 800×600, hero 1920×1080).
  - _Acceptance:_ Can upload a PNG via `/admin`; three resized variants appear in the upload folder.

- [ ] **Task 2.2 — Create `Users` collection with role-based access**
  - File: `src/payload/collections/Users.ts`
  - Fields: `email`, `password` (auth), `role` (select: admin | editor).
  - Access control: `admin` role has full CRUD; `editor` role has read/write on content collections, read-only on `SiteSettings`.
  - _Acceptance:_ An editor-role user cannot access `SiteSettings` in the admin panel.

- [ ] **Task 2.3 — Create `Schools` collection**
  - File: `src/payload/collections/Schools.ts`
  - Fields per design doc §3.1.
  - Seed three schools: "School of Computer Science & AI", "School of Engineering", "School of Management".
  - _Acceptance:_ Schools appear in `/admin/collections/schools`; relationship field works in Programs.

- [ ] **Task 2.4 — Create `Programs` collection**
  - File: `src/payload/collections/Programs.ts`
  - Fields per design doc §3.1 (title, slug, level, school relationship, durationYears, intakeCapacity, tuitionFeePerYear, specializations array, eligibilityCriteria richText, published).
  - Seed 6 programs (2 UG B.Tech, 1 UG BCA, 1 PG MBA, 1 PG M.Tech, 1 Ph.D.) with published=true.
  - _Acceptance:_ `payload.find({ collection: 'programs', where: { published: { equals: true } } })` returns 6 docs.

- [ ] **Task 2.5 — Create `CentresOfExcellence` collection**
  - File: `src/payload/collections/CentresOfExcellence.ts`
  - Fields per design doc §3.1.
  - Seed 4 centres (KUKA Robotics, Siemens/Bosch, 3D Printing, Virtual Instrumentation).
  - _Acceptance:_ All 4 CoE documents appear in the admin panel with correct `industryPartner` values.

- [ ] **Task 2.6 — Create `Placements` collection**
  - File: `src/payload/collections/Placements.ts`
  - Fields per design doc §3.1.
  - Seed one placement record for year 2025 (highestPackage: "₹42 LPA", averagePackage: "₹8.5 LPA", totalOffers: 1200, topRecruiters array with 5 names).
  - _Acceptance:_ Placement record fetched via Local API returns correct data.

- [ ] **Task 2.7 — Create Page Builder blocks schema**
  - Files: `src/payload/blocks/HeroBlock.ts`, `StatsBlock.ts`, `ProgramExplorerBlock.ts`, `CentresOfExcellenceBlock.ts`, `PlacementTickerBlock.ts`, `ScholarshipCalculatorBlock.ts`, `CallToActionBlock.ts`.
  - Each block defined per design doc §3.3.
  - _Acceptance:_ All 7 blocks appear in the `Pages` layout builder field's block picker in the admin panel.

- [ ] **Task 2.8 — Create `Pages` collection**
  - File: `src/payload/collections/Pages.ts`
  - Fields: title, slug, meta (group), layout (blocks array referencing all 7 blocks), published.
  - Create the homepage document with slug `"home"` containing all 7 blocks in sequence.
  - _Acceptance:_ Homepage page document saved successfully; all 7 blocks render in admin block list.

- [ ] **Task 2.9 — Create Globals: Header, Footer, SiteSettings**
  - Files: `src/payload/globals/Header.ts`, `Footer.ts`, `SiteSettings.ts`.
  - Fields per design doc §3.2.
  - Populate default values in the admin panel (university name, nav links, footer quick links, helpline number).
  - _Acceptance:_ `payload.findGlobal('header')` returns the configured nav menu data.

- [ ] **Task 2.10 — Run `payload generate:types` and commit**
  - Run `npx payload generate:types` to auto-generate `src/types/payload-types.ts`.
  - Fix any TypeScript errors surfaced by the generated types.
  - _Acceptance:_ `npx tsc --noEmit` passes with zero errors; `payload-types.ts` exports `Program`, `School`, `Page`, `Media` etc.

---

## PHASE 3 — Core Frontend Infrastructure

- [ ] **Task 3.1 — Implement root layout and font configuration**
  - File: `src/app/layout.tsx`
  - Load Inter and Playfair Display via `next/font/google` with CSS variables `--font-inter`, `--font-playfair`.
  - Add `<html lang="en">` and `<body>` with Tailwind base classes.
  - Import `globals.css` with Tailwind directives + custom token variables.
  - _Acceptance:_ Body text renders in Inter; display headings render in Playfair Display in browser DevTools.

- [ ] **Task 3.2 — Implement `getPayload` singleton helper**
  - File: `src/lib/payload.ts`
  - Export `async function getPayloadClient()` that initialises Payload once and caches the instance.
  - _Acceptance:_ Calling `getPayloadClient()` twice in the same request returns the same instance without re-initialising.

- [ ] **Task 3.3 — Implement the Block Renderer**
  - File: `src/lib/blockRenderer.tsx`
  - Define `blockMap` Record mapping `blockType` strings to React components (stubs initially).
  - Export `<BlockRenderer blocks={blocks} />` component.
  - _Acceptance:_ Unknown `blockType` values render nothing (no crash); known types render their component.

- [ ] **Task 3.4 — Implement the Slug Page catch-all route**
  - File: `src/app/(frontend)/[...slug]/page.tsx`
  - Fetch page by slug using Payload Local API (per design doc §5.3).
  - Implement `generateStaticParams`, `generateMetadata`, and default export.
  - Return `notFound()` for missing slugs.
  - Export `revalidate = 60`.
  - _Acceptance:_ Visiting `/home` renders the page title; visiting `/nonexistent` returns a 404.

- [ ] **Task 3.5 — Implement Announcement Banner**
  - File: `src/components/layout/AnnouncementBanner.tsx`
  - Server Component; reads from `SiteSettings.announcementBanner`.
  - Renders dismissible banner (client-side dismiss via `localStorage`) only when `enabled === true`.
  - _Acceptance:_ Toggle `enabled` in admin → banner appears/disappears on next page load; dismiss persists across navigation within session.

---

## PHASE 4 — Header & Navigation

- [ ] **Task 4.1 — Implement Header component**
  - File: `src/components/layout/Header.tsx` (`"use client"`)
  - Utility top bar (dark navy) with helpline, email, and portal links from Header Global.
  - Main nav bar: sticky, `backdrop-blur-md`, shrinks on scroll.
  - Desktop mega-menu: renders `navigationMenu` from CMS; items with `subLinks` show multi-column dropdown on hover.
  - Logo: displays `universityName` from SiteSettings with navy rounded-xl avatar.
  - Right CTAs: pulsing Ph.D. badge (from `phdBadgeText`) + Amber "Apply Now" button (from `primaryCta`).
  - Search icon button (triggers SearchModal).
  - _Acceptance:_ All nav links render from CMS data; mega-menu opens on hover; sticky behaviour visible on scroll.

- [ ] **Task 4.2 — Implement Mobile Navigation Drawer**
  - Extend `Header.tsx` with hamburger toggle state.
  - Right-side drawer with accordion-style expansion for subLinks.
  - Focus trap, Escape key dismiss, backdrop click dismiss.
  - _Acceptance:_ On <1280px viewport: desktop nav hidden; hamburger opens drawer; accordion toggles; Escape closes drawer.

---

## PHASE 5 — Page Builder Block Components

- [ ] **Task 5.1 — HeroBlock component**
  - File: `src/components/blocks/HeroBlock.tsx` (RSC)
  - Full-width dark navy hero with animated gradient backdrop.
  - Headline from CMS `headline` field; badge from `badge` field (pulsing amber).
  - Primary + secondary CTA buttons.
  - Quick Access Cards bar (4 cards from `quickActions` array).
  - _Acceptance:_ All fields editable in admin and reflected on page without code change.

- [ ] **Task 5.2 — StatsBlock component with animated counters**
  - File: `src/components/blocks/StatsBlock.tsx`
  - Client component using `IntersectionObserver` + `requestAnimationFrame` for counter animation.
  - Renders navy background strip with 5 stat items from CMS.
  - _Acceptance:_ Counters animate from 0 to target when scrolled into view; data fully CMS-driven.

- [ ] **Task 5.3 — ProgramExplorer component**
  - File: `src/components/blocks/ProgramExplorer.tsx` (`"use client"`)
  - Parent (RSC) fetches all published programs from Payload Local API and passes as props.
  - Client component renders: filter tabs (All / UG / PG / Ph.D.), real-time search input (debounced 300ms), responsive program card grid.
  - Program card: level badge, school name, duration, intake, fee, top 2 specializations, "Apply" link.
  - _Acceptance:_ Filter tabs show correct subset; typing "AI" filters to matching programs; adding a new program in admin appears after ISR revalidation.

- [ ] **Task 5.4 — CentresOfExcellenceBlock component**
  - File: `src/components/blocks/CentresOfExcellenceBlock.tsx` (RSC)
  - Dark navy section with 4-column card grid.
  - Each card: gradient image placeholder, industry partner badge, title, description, highlights, "Explore Lab" link.
  - Data fetched server-side from `CentresOfExcellence` collection.
  - _Acceptance:_ All 4 CoE cards render with correct data; adding a 5th CoE in admin shows on site after revalidation.

- [ ] **Task 5.5 — PlacementTicker component**
  - File: `src/components/blocks/PlacementTicker.tsx` (RSC + minor client animation)
  - Metrics grid (highestPackage, averagePackage, totalOffers, recruiterCount).
  - CSS infinite-scroll marquee of recruiter logos (duplicated for seamless loop).
  - Alumni testimonials grid (3 cards with avatar, quote, name, program, company).
  - _Acceptance:_ Marquee scrolls continuously; pauses on hover; data driven by 2025 Placements document.

- [ ] **Task 5.6 — ScholarshipCalculator component**
  - File: `src/components/blocks/ScholarshipCalculator.tsx` (`"use client"`)
  - Parent (RSC) fetches published programs and passes to client component.
  - Inputs: program select (populated from programs) + percentage slider (50–100).
  - Output panel: baseFee, discountAmount, netPayable, monthlyEmi, scholarship tier name.
  - Uses pure `calculateScholarship()` from `src/lib/scholarshipTiers.ts`.
  - EMI toggle switch.
  - All monetary values formatted with `toLocaleString('en-IN')`.
  - _Acceptance:_ Selecting B.Tech CSE at 92% shows Gold Merit 75% discount with correct ₹ amounts; selecting a different program updates the baseFee and recalculates.

- [ ] **Task 5.7 — CallToActionBlock component**
  - File: `src/components/blocks/CallToActionBlock.tsx` (RSC)
  - Full-width amber or navy CTA band with heading, subheading, and button from CMS.
  - _Acceptance:_ CTA button label and URL editable in admin and reflected on site.

---

## PHASE 6 — Modal Components

- [ ] **Task 6.1 — Implement Modal primitive**
  - File: `src/components/ui/Modal.tsx` (`"use client"`)
  - Props: `isOpen`, `onClose`, `children`, `aria-labelledby`.
  - Features: backdrop blur overlay, focus trap, Escape key dismiss, `aria-modal="true"`, `role="dialog"`.
  - _Acceptance:_ Screen reader announces dialog title on open; Tab cycles only within modal; Escape closes.

- [ ] **Task 6.2 — Implement Enquiry Modal**
  - File: `src/components/modals/EnquiryModal.tsx` (`"use client"`)
  - Uses Modal primitive.
  - Form fields: name, phone (validated), email (optional), program select.
  - Auto-open after 10s (checked via `sessionStorage`).
  - Manual trigger: exposed via `openEnquiryModal()` function exported from a context or called via global event.
  - Success state replaces form with confirmation message.
  - _Acceptance:_ Modal auto-opens after 10s on first visit; does not re-open in same session; form validation prevents submit with empty required fields; success state shows on valid submit.

- [ ] **Task 6.3 — Implement Search Modal**
  - File: `src/components/modals/SearchModal.tsx` (`"use client"`)
  - `Cmd/Ctrl+K` keyboard shortcut triggers open.
  - Client-side fuzzy search over a static index of 25 items (programs, CoEs, menu items).
  - Results show category badge + title with amber highlighted match.
  - Up to 8 results; empty state message.
  - _Acceptance:_ `Cmd+K` opens modal; typing "robot" shows KUKA CoE and Robotics program results; clicking a result navigates and closes modal.

---

## PHASE 7 — Footer & Supporting Pages

- [ ] **Task 7.1 — Implement Footer component**
  - File: `src/components/layout/Footer.tsx` (RSC)
  - 4-column layout: brand + social links, quick links, academics & governance links, contact & compliance.
  - Anti-ragging helpline and emergency contact from Footer Global.
  - Data fully from `Footer` Payload Global.
  - _Acceptance:_ All footer link labels and URLs editable via admin panel.

- [ ] **Task 7.2 — Implement custom 404 page**
  - File: `src/app/(frontend)/not-found.tsx`
  - AKGU-branded 404 page with navy background, "Page Not Found" heading, and link back to home.
  - _Acceptance:_ Visiting `/nonexistent-page` renders the custom 404, not Next.js default.

---

## PHASE 8 — Performance, SEO & Polish

- [ ] **Task 8.1 — Implement JSON-LD Organization schema**
  - File: `src/app/(frontend)/layout.tsx`
  - Add `<script type="application/ld+json">` with Organization schema (name, url, logo, contactPoint, address).
  - _Acceptance:_ Google Rich Results Test validates Organization schema for the homepage.

- [ ] **Task 8.2 — Implement scroll reveal animations**
  - Add Framer Motion `motion.div` with `initial={{ opacity: 0, y: 24 }}` and `whileInView={{ opacity: 1, y: 0 }}` to program cards, CoE cards, testimonials, and stat items.
  - Use `viewport={{ once: true }}` to animate only on first view.
  - _Acceptance:_ Cards animate in as they scroll into view; no layout shift (CLS) introduced.

- [ ] **Task 8.3 — Implement back-to-top button**
  - File: `src/components/ui/BackToTop.tsx` (`"use client"`)
  - Fixed-position button visible after scrolling 400px.
  - Smooth scroll to top on click.
  - _Acceptance:_ Button appears after scrolling down; clicking scrolls to top smoothly.

- [ ] **Task 8.4 — Accessibility audit and fixes**
  - Verify all images have `alt` text.
  - Verify all form inputs have `<label>` associations.
  - Verify colour contrast ≥4.5:1 for all body text against backgrounds.
  - Verify keyboard navigation works end-to-end (Tab through header, main content, footer without mouse).
  - Run axe DevTools scan and resolve all Critical and Serious issues.
  - _Acceptance:_ Zero Critical/Serious axe findings on homepage and calculator.

---

## PHASE 9 — Build, Deploy & Git

- [ ] **Task 9.1 — Add README and .env.example**
  - `README.md`: project description, tech stack, local dev setup, CMS seeding steps, deployment notes.
  - `.env.example`: placeholder values for all required environment variables.
  - _Acceptance:_ A new developer can follow README to run the project from scratch.

- [ ] **Task 9.2 — Push full Next.js project to GitHub**
  - `git add` all source files (excluding `.env.local`, `node_modules`, `.next`).
  - Commit with message: `feat: AKGU full-stack portal — Next.js 15 + Payload CMS 3.0`.
  - Push to `origin/main`.
  - _Acceptance:_ GitHub repo at `github.com/mohit4215/akgu` contains the full source tree; CI/CD pipeline (if configured) passes.

---

## TASK DEPENDENCY GRAPH

```
Phase 1 (1.1–1.5) ──► Phase 2 (2.1–2.10) ──► Phase 3 (3.1–3.5)
                                                      │
                              ┌───────────────────────┤
                              ▼                       ▼
                        Phase 4 (Nav)           Phase 5 (Blocks)
                              │                       │
                              └───────────┬───────────┘
                                          ▼
                                    Phase 6 (Modals)
                                          │
                                          ▼
                                    Phase 7 (Footer / 404)
                                          │
                                          ▼
                                    Phase 8 (Perf / A11y)
                                          │
                                          ▼
                                    Phase 9 (Deploy)
```

---

## ESTIMATED EFFORT

| Phase | Tasks | Estimated Time |
|-------|-------|---------------|
| 1 — Scaffold | 5 | 1–2 hours |
| 2 — CMS Schema | 10 | 3–4 hours |
| 3 — Core Infrastructure | 5 | 2–3 hours |
| 4 — Header & Nav | 2 | 2–3 hours |
| 5 — Block Components | 7 | 5–7 hours |
| 6 — Modals | 3 | 2–3 hours |
| 7 — Footer & 404 | 2 | 1 hour |
| 8 — Performance & A11y | 4 | 2–3 hours |
| 9 — Deploy | 2 | 1 hour |
| **Total** | **40** | **~20–25 hours** |
