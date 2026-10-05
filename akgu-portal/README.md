# AKGU Portal — Full-Stack University Web Platform & Headless CMS

Enterprise headless CMS and dynamic web application for **Ajay Kumar Garg University (AKGU)**, built with **Next.js 15 (App Router)**, **TypeScript**, **Payload CMS 3.0**, and **Tailwind CSS**.

---

## 🏛️ System Architecture

This subsystem provides the administrative content management backend and dynamic server-rendered presentation layer for the university portal:

- **Next.js 15 App Router**: Server Components, dynamic catch-all route handler (`/[...slug]`), and optimized asset delivery.
- **Embedded Payload CMS 3.0**: Native admin panel hosted at `/admin` within Next.js App Router without requiring separate server processes.
- **Dynamic Page Builder**: Block-based layout composition with schema validation.
- **Type-Safe Schema**: Generated TypeScript interfaces synchronized with Payload collections and globals.

---

## 🧩 Page Builder Blocks

The portal features 6 modular, draggable CMS blocks configured in `src/payload/blocks/`:

1. **`HeroBlock`**: Dynamic headline rotation, announcement badge, CTA buttons, and quick-access navigation cards.
2. **`StatsBlock`**: Key institutional metrics (Fortune 500 recruiters, international package records, patent counts) with count-up animations.
3. **`ProgramExplorerBlock`**: Degree filtering grid supporting Undergraduate (B.Tech, BCA), Postgraduate (M.Tech, MCA, MBA), and Ph.D. degrees.
4. **`CentresOfExcellenceBlock`**: Industrial automation laboratory showcase (KUKA Robotics, Siemens PLM, Bosch Rexroth, 3D Printing, NI).
5. **`PlacementTickerBlock`**: Continuous recruiter marquee with student placement cards and salary packages.
6. **`CallToActionBlock`**: Admissions enrollment banner and inquiry trigger.

---

## 🗄️ Collections & Globals

### Collections
- **`Pages`**: Custom URL slugs, SEO title/description meta, and dynamic block builder layouts.
- **`Programs`**: Degree duration, intake capacity, annual tuition fees, and curriculum specializations.
- **`Departments`**: Academic departments, department heads, and affiliated research labs.
- **`Faculty`**: Academic profiles, designations, research specializations, and publications.
- **`Placements`**: Placement statistics, top recruiters, alumni achievements, and package records.
- **`Media`**: Asset management for campus photography, banners, and institutional publications.
- **`Users`**: Role-based access control (`admin`, `editor`).

### Globals
- **`SiteSettings`**: University contact details, toll-free helpline numbers, and social links.
- **`Header`**: Mega-menu navigation hierarchy and quick-action links.
- **`Footer`**: Statutory disclaimers, accreditation links, and anti-ragging contact info.

---

## 🚀 Setup & Local Development

### Prerequisites
- Node.js >= 20.0.0
- MongoDB 6.0+ (Local daemon or MongoDB Atlas cluster)

### Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the required environment variables:
```env
DATABASE_URI=mongodb://127.0.0.1:27017/akgu
PAYLOAD_SECRET=replace-with-a-secure-32-byte-secret-key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

- Portal: [http://localhost:3000](http://localhost:3000)
- Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### Seeding Initial Data
To populate the database with default academic programs, faculty profiles, and site settings:
```bash
npm run seed
```

---

## 🛠️ Production Build

```bash
npm run build
npm run start
```
