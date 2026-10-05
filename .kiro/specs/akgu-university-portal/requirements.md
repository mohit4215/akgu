# AKGU University Portal — Requirements Specification
**Format:** EARS (Easy Approach to Requirements Syntax)  
**Version:** 1.0  
**Date:** October 2026  
**Project:** Ajay Kumar Garg University (AKGU) — Full-Stack Portal  
**Stack:** Next.js 15 (App Router, TypeScript) + Payload CMS 3.0 + Tailwind CSS

---

## 1. PROJECT OVERVIEW

AKGU requires a production-ready, CMS-driven university portal that transitions the institution from a traditional technical college website into an autonomous, multidisciplinary university platform. All content must be fully manageable by non-technical university staff through a Payload CMS admin panel at `/admin`. The frontend must be server-side rendered for SEO and performance, with interactive widgets as isolated Client Components.

---

## 2. FUNCTIONAL REQUIREMENTS

### 2.1 CMS & Admin Panel

**REQ-CMS-01 (Ubiquitous):**  
The system shall provide a Payload CMS 3.0 admin panel at the `/admin` route, embedded within the Next.js App Router application, through which authorised university staff can create, read, update, and delete all site content without developer intervention.

**REQ-CMS-02 (Event-driven):**  
When an admin publishes or updates any Collection document (Programs, Schools, CentresOfExcellence, Placements) or Global (Header, Footer, SiteSettings), the frontend shall reflect the updated content on the next page request without requiring a code deployment.

**REQ-CMS-03 (State-driven):**  
While the `SiteSettings.announcementBanner.enabled` field is set to `true`, the system shall display a dismissible banner at the top of every public-facing page containing the configured `text` and `link`.

**REQ-CMS-04 (Ubiquitous):**  
The system shall implement role-based access control within Payload CMS with at minimum two roles: `admin` (full CRUD access to all collections and globals) and `editor` (read/write access to content collections, read-only for settings).

**REQ-CMS-05 (Ubiquitous):**  
The system shall use Payload's Local API (`payload.find`, `payload.findOne`, `payload.findGlobal`) for all server-side data fetching within Next.js Server Components to avoid unnecessary HTTP round-trips.

---

### 2.2 Programs Collection & Explorer

**REQ-PROG-01 (Ubiquitous):**  
The system shall maintain a `Programs` Payload collection with the following fields: `title` (text, required), `slug` (text, unique, required), `level` (select: UG | PG | Ph.D., required), `school` (relationship to `Schools` collection), `durationYears` (number), `intakeCapacity` (number), `tuitionFeePerYear` (number, used by the calculator), `specializations` (array of text), `eligibilityCriteria` (richText), and `published` (boolean, default false).

**REQ-PROG-02 (Event-driven):**  
When a visitor selects a filter tab (All / UG / PG / Ph.D.) in the Program Explorer block, the system shall immediately display only the program cards matching the selected level without a full-page navigation or server round-trip.

**REQ-PROG-03 (Event-driven):**  
When a visitor types in the Program Explorer search input, the system shall filter the visible program cards in real time (debounced ≤ 300 ms) by matching against the program `title` and `specializations` fields.

**REQ-PROG-04 (Ubiquitous):**  
Each program card shall display: program title, level badge (UG / PG / Ph.D.), school name, duration, intake capacity, annual tuition fee, top two specializations, and an "Apply Now" call-to-action link.

**REQ-PROG-05 (Ubiquitous):**  
The Program Explorer component shall be a Next.js Client Component (`"use client"`) that receives pre-fetched program data as props from a Server Component parent, ensuring no client-side API calls are made for initial data load.

---

### 2.3 Scholarship & Fee Calculator

**REQ-CALC-01 (Ubiquitous):**  
The system shall provide an interactive Scholarship & Fee Calculator component that accepts two inputs: (1) a program selection dropdown populated from the `Programs` collection, and (2) a numeric percentage slider (range: 50–100).

**REQ-CALC-02 (Event-driven):**  
When the user changes either input, the system shall instantly re-calculate and display, without any network request: (a) the base annual tuition fee, (b) the applicable AKGU Super-30 scholarship discount percentage and amount, (c) the net annual payable fee after discount, and (d) the estimated monthly Education Loan EMI (net fee / 12 months).

**REQ-CALC-03 (Ubiquitous):**  
The scholarship tier logic shall implement the following thresholds: ≥95% → 100% discount (Super-30 Full Scholarship); ≥90% → 75% (Gold Merit); ≥85% → 50% (Silver Merit); ≥80% → 30% (Bronze Merit); ≥75% → 15% (Academic Excellence Award); <75% → 0%.

**REQ-CALC-04 (Ubiquitous):**  
The calculator shall display all monetary values in Indian Rupee format (e.g., ₹1,55,000) using `toLocaleString('en-IN')`.

**REQ-CALC-05 (State-driven):**  
While no program is selected, the results panel shall display a placeholder state prompting the user to make a selection, with no partial or erroneous monetary values visible.

---

### 2.4 Admissions Enquiry Modal

**REQ-ENQ-01 (Event-driven):**  
When a visitor has been on any public-facing page for 10 seconds without previously dismissing the modal (tracked via `sessionStorage`), the system shall automatically display the Quick Admissions Enquiry modal.

**REQ-ENQ-02 (Event-driven):**  
When a visitor clicks any designated "Apply Now" or "Contact Admissions" CTA button, the system shall immediately open the Admissions Enquiry modal regardless of the 10-second timer state.

**REQ-ENQ-03 (Ubiquitous):**  
The Admissions Enquiry form shall collect: Full Name (required), Phone Number (required, validated as 10–13 digit Indian format), Email Address (optional, validated as email format), and Program of Interest (required, select).

**REQ-ENQ-04 (Event-driven):**  
When the user submits a valid enquiry form, the system shall display an inline success confirmation message within the modal (not a redirect), log the submission to the browser console (development), and optionally `POST` to a configurable API endpoint (production).

**REQ-ENQ-05 (Ubiquitous):**  
The modal shall be dismissible via: (a) the close button, (b) clicking the backdrop overlay, and (c) pressing the `Escape` key. Focus shall be trapped within the modal while open, and restored to the trigger element on close.

---

### 2.5 Search Modal

**REQ-SRCH-01 (Event-driven):**  
When a user presses `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux), or clicks the header search icon, the system shall open a full-screen search overlay modal.

**REQ-SRCH-02 (Event-driven):**  
When the user types a query in the search input, the system shall filter a pre-built client-side index of page titles, program names, CoE names, and menu items, displaying up to 8 results with category labels and matched text highlighted in amber.

**REQ-SRCH-03 (Event-driven):**  
When the user presses `Escape` or clicks outside the search modal, the system shall close the modal and restore focus to the previously focused element.

---

### 2.6 Navigation & Header

**REQ-NAV-01 (Ubiquitous):**  
The Header component shall render a utility top bar (dark navy, containing helpline and portal links) and a main navigation bar (sticky, glassmorphic backdrop blur) whose content is entirely driven by the `Header` Payload Global.

**REQ-NAV-02 (Ubiquitous):**  
On desktop (≥1280px viewport), the navigation shall display multi-column mega-menu dropdowns for each top-level menu item that has sub-links.

**REQ-NAV-03 (Ubiquitous):**  
On mobile and tablet (<1280px viewport), the navigation shall hide the desktop menu and display a hamburger icon that, when activated, opens a full-height right-side drawer containing accordion-style expandable menu sections.

**REQ-NAV-04 (State-driven):**  
While the `Header` Payload Global contains a non-empty `phdBadgeText`, the system shall display a pulsing red indicator badge on the header "Ph.D. Admissions Open" link.

---

### 2.7 CMS Page Builder & Dynamic Routing

**REQ-PAGE-01 (Ubiquitous):**  
The system shall implement a catch-all Next.js App Router route at `src/app/(frontend)/[...slug]/page.tsx` that fetches a `Pages` document by slug from Payload and renders its `layout` blocks array by mapping each `blockType` string to a corresponding React component.

**REQ-PAGE-02 (Ubiquitous):**  
The homepage shall be served from the slug `"home"` at the `/` route, with Next.js rewriting `/` to the `home` page slug.

**REQ-PAGE-03 (Ubiquitous):**  
The system shall implement `generateStaticParams` for the `[...slug]` route to statically generate all published `Pages` at build time, with `revalidate = 60` for ISR.

**REQ-PAGE-04 (Ubiquitous):**  
If no page document is found for a given slug, the system shall return a Next.js `notFound()` response, which renders the application's custom 404 page.

---

### 2.8 Performance & Accessibility

**REQ-PERF-01 (Ubiquitous):**  
All public-facing page routes shall use Next.js Server Components for initial data fetching and HTML rendering. Client Components (`"use client"`) shall be used exclusively for interactive widgets: Header (mobile drawer), ProgramExplorer (filter/search), ScholarshipCalculator, EnquiryModal, and SearchModal.

**REQ-PERF-02 (Ubiquitous):**  
The system shall implement Next.js Image component (`next/image`) for all images, with defined `width`, `height`, and `priority` on above-the-fold images (hero and logo).

**REQ-PERF-03 (Ubiquitous):**  
All interactive components shall meet WCAG 2.1 AA accessibility standards: keyboard navigability, ARIA roles and labels on modals and menus, focus management on modal open/close, and sufficient colour contrast ratios (≥4.5:1 for normal text).

**REQ-PERF-04 (Ubiquitous):**  
The application shall implement Next.js `generateMetadata` for every page route, deriving `title`, `description`, and Open Graph metadata from the corresponding `Pages` Payload document.

---

## 3. NON-FUNCTIONAL REQUIREMENTS

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Performance | Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile (3G) |
| NFR-02 | SEO | Server-side rendered HTML for all content pages; structured JSON-LD for Organization schema |
| NFR-03 | Security | Payload admin protected by JWT auth; no secrets in client bundle; environment variables for DB URI and Payload secret |
| NFR-04 | Scalability | Database queries paginated; ISR with 60s revalidation for content pages |
| NFR-05 | Maintainability | TypeScript strict mode; ESLint + Prettier enforced; all Payload types auto-generated via `payload generate:types` |
| NFR-06 | Browser Support | Latest 2 versions of Chrome, Firefox, Safari, Edge |
| NFR-07 | Deployment | Compatible with Vercel (Next.js) + managed PostgreSQL (Neon/Supabase) or MongoDB Atlas |
