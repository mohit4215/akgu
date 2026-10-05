# Ajay Kumar Garg University (AKGU) — Full-Stack University Portal

Production-ready, full-stack university web application built with **Next.js 15 (App Router)**, **TypeScript**, **Payload CMS 3.0**, and **Tailwind CSS**.

---

## 🌟 Key Features

- **Payload CMS 3.0 Embedded Architecture**: Native admin panel at `/admin` built directly inside Next.js App Router with role-based access control (Admin & Editor).
- **Page Builder System**: 7 configurable CMS blocks:
  - `HeroBlock`: Animated gradients, dynamic headlines, action badges, and quick-access cards.
  - `StatsBlock`: Animated count-up metrics using `IntersectionObserver`.
  - `ProgramExplorerBlock`: Instant client-side degree filtering (UG, PG, Ph.D.) and live search.
  - `CentresOfExcellenceBlock`: Industrial labs showcase (KUKA Robotics, Siemens/Bosch, 3D Printing, NI).
  - `PlacementTickerBlock`: Continuous marquee ticker of global recruiters with alumni stories.
  - `ScholarshipCalculatorBlock`: Real-time tuition discount calculation with Super-30 tiers and EMI toggle.
  - `CallToActionBlock`: High-conversion lead generation band.
- **Global Navigation & Modals**:
  - Sticky glassmorphic header with multi-column mega-menus and responsive mobile accordion drawer.
  - Global Search Modal with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> instant search.
  - Lead Enquiry Modal with automatic 10-second prompt and validation.
- **SEO & Compliance**:
  - Incremental Static Regeneration (ISR) with 60-second revalidation.
  - Schema.org JSON-LD `EducationalOrganization` structured data.
  - Custom 404 error page.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js >= 20.0.0
- MongoDB instance (local or MongoDB Atlas)

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure:
```env
DATABASE_URI=mongodb://127.0.0.1:27017/akgu
PAYLOAD_SECRET=your-random-32-character-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Development Server
```bash
npm run dev
```

Open:
- Website: [http://localhost:3000](http://localhost:3000)
- CMS Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Build for Production
```bash
npm run build
npm start
```
