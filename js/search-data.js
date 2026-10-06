/**
 * AKGU University Portal — Search Engine
 */
const SEARCH_DATA = [
  {
    "title": "About AKGU Overview",
    "category": "About",
    "desc": "A premier technological university rooted in 28 years of academic excellence.",
    "page": "about-overview.html",
    "hub": "about.html"
  },
  {
    "title": "History & 28-Year Legacy",
    "category": "About",
    "desc": "Milestones from college inception in 1998 to university charter.",
    "page": "about-legacy.html",
    "hub": "about.html"
  },
  {
    "title": "Vision & Mission",
    "category": "About",
    "desc": "Foundational creed, ethical leadership, and transformative research.",
    "page": "about-vision.html",
    "hub": "about.html"
  },
  {
    "title": "Leadership & Governance",
    "category": "About",
    "desc": "Director General Dr. R. K. Agarwal, Vice-Chancellor, and governing councils.",
    "page": "about-leadership.html",
    "hub": "about.html"
  },
  {
    "title": "Institutional Objectives",
    "category": "About",
    "desc": "Strategic roadmap for outcome-based engineering education.",
    "page": "about-objectives.html",
    "hub": "about.html"
  },
  {
    "title": "Awards & National Rankings",
    "category": "About",
    "desc": "NAAC A++ grade (3.42), NIRF Rank 101–150 band, NBA tier-1.",
    "page": "about-rankings.html",
    "hub": "about.html"
  },
  {
    "title": "Recognitions & Approvals",
    "category": "About",
    "desc": "UGC Section 2(f), AICTE EOA, and Uttar Pradesh State Charter.",
    "page": "about-approvals.html",
    "hub": "about.html"
  },
  {
    "title": "Institutional Social Responsibility",
    "category": "About",
    "desc": "Unnat Bharat Abhiyan (UBA) and rural village empowerment initiatives.",
    "page": "about-isr.html",
    "hub": "about.html"
  },
  {
    "title": "University Academic Calendar",
    "category": "About",
    "desc": "Session 2026–27 milestone dates for exams, fests, and registrations.",
    "page": "about-calendar.html",
    "hub": "about.html"
  },
  {
    "title": "School of Engineering & Technology",
    "category": "Academics",
    "desc": "B.Tech & M.Tech programs in CSE, AI/ML, ECE, Mechanical, Civil.",
    "page": "programs-engineering.html",
    "hub": "academics.html"
  },
  {
    "title": "School of Management Studies",
    "category": "Academics",
    "desc": "BBA and MBA dual specializations in Marketing, Finance, HR, Analytics.",
    "page": "programs-management.html",
    "hub": "academics.html"
  },
  {
    "title": "School of Computer Applications",
    "category": "Academics",
    "desc": "BCA and MCA industry full-stack tracks and software engineering.",
    "page": "programs-computing.html",
    "hub": "academics.html"
  },
  {
    "title": "School of Humanities & Applied Sciences",
    "category": "Academics",
    "desc": "Applied mathematics, quantum physics, materials, and communication.",
    "page": "programs-humanities.html",
    "hub": "academics.html"
  },
  {
    "title": "Admissions Overview 2026–27",
    "category": "Admissions",
    "desc": "JEE Main, CUET, and merit-based entrance application process.",
    "page": "admissions-overview.html",
    "hub": "admissions.html"
  },
  {
    "title": "Programs & Fee Structure",
    "category": "Admissions",
    "desc": "Transparent annual tuition fee schedule with zero hidden charges.",
    "page": "admissions-fees.html",
    "hub": "admissions.html"
  },
  {
    "title": "How to Apply (Step-by-Step)",
    "category": "Admissions",
    "desc": "4-stage walkthrough: registration, credential upload, counseling, seat confirmation.",
    "page": "admissions-apply.html",
    "hub": "admissions.html"
  },
  {
    "title": "Eligibility & Selection Criteria",
    "category": "Admissions",
    "desc": "Minimum qualifying percentage and mandatory subjects for B.Tech, MCA, MBA.",
    "page": "admissions-eligibility.html",
    "hub": "admissions.html"
  },
  {
    "title": "Tuition Payment Process",
    "category": "Admissions",
    "desc": "Authorized Net Banking, UPI ERP gateway, RTGS/NEFT accounts.",
    "page": "admissions-payment.html",
    "hub": "admissions.html"
  },
  {
    "title": "University Refund Policy",
    "category": "Admissions",
    "desc": "100% compliant with UGC percentage fee refund timelines and guidelines.",
    "page": "admissions-refund.html",
    "hub": "admissions.html"
  },
  {
    "title": "Admissions FAQs",
    "category": "Admissions",
    "desc": "Frequently asked questions regarding scholarships, entrance exams, and hostels.",
    "page": "admissions-faqs.html",
    "hub": "admissions.html"
  },
  {
    "title": "Corporate Relations Centre (CRC)",
    "category": "Placements",
    "desc": "Dedicated placement wing connecting scholars to 240+ tier-1 recruiters.",
    "page": "placements-overview.html",
    "hub": "placements.html"
  },
  {
    "title": "Placement Highlights & Top Recruiters",
    "category": "Placements",
    "desc": "Highest CTC ₹1.15 Cr, average ₹7.4 LPA, Goldman Sachs, Amazon, Microsoft.",
    "page": "placements-highlights.html",
    "hub": "placements.html"
  },
  {
    "title": "University Placement Policy",
    "category": "Placements",
    "desc": "Code of conduct, dream offer eligibility criteria, and compliance norms.",
    "page": "placements-policy.html",
    "hub": "placements.html"
  },
  {
    "title": "Industrial Internship Policy",
    "category": "Placements",
    "desc": "Pre-final and final year paid corporate internship credits and semester leaves.",
    "page": "placements-internship.html",
    "hub": "placements.html"
  },
  {
    "title": "Student Testimonials & Reflections",
    "category": "Placements",
    "desc": "Verified placement journey narratives from placed alumni at top tech firms.",
    "page": "placements-testimonials.html",
    "hub": "placements.html"
  },
  {
    "title": "Research & Innovation Cell",
    "category": "Research",
    "desc": "Over ₹4.5 Crore funded research grants, patents, and seed funds.",
    "page": "research-overview.html",
    "hub": "research.html"
  },
  {
    "title": "Patents & Scientific Publications",
    "category": "Research",
    "desc": "32+ granted patents and 1,200+ Scopus/SCI peer-reviewed publications.",
    "page": "research-patents.html",
    "hub": "research.html"
  },
  {
    "title": "Centres of Research (COR)",
    "category": "Research",
    "desc": "Advanced labs in AI, IoT, High-Performance Computing, and Green Energy.",
    "page": "research-centres.html",
    "hub": "research.html"
  },
  {
    "title": "Industrial Centres of Excellence (CoE)",
    "category": "Research",
    "desc": "Industrial technology workcells with KUKA Robotics, Siemens, Bosch, and NI.",
    "page": "research-coe.html",
    "hub": "research.html"
  },
  {
    "title": "Global Alumni Network & Registration",
    "category": "Alumni",
    "desc": "Distinguished alumni network across 35 countries worldwide.",
    "page": "alumni-network.html",
    "hub": "alumni.html"
  }
];

function filterSearchResults(isPageSubdir = false) {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const list = document.getElementById('searchResultsList');
  if (!list) return;

  if (!q) {
    // Show top featured items when empty
    renderResults(SEARCH_DATA.slice(0, 8), isPageSubdir);
    return;
  }

  const results = SEARCH_DATA.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q)
  );

  renderResults(results, isPageSubdir, q);
}

function renderResults(items, isPageSubdir, query = '') {
  const list = document.getElementById('searchResultsList');
  if (!list) return;

  if (items.length === 0) {
    list.innerHTML = `<div class="p-4 text-center text-xs text-charcoal-muted">No matching pages found for "<strong>${query}</strong>"</div>`;
    return;
  }

  const base = isPageSubdir ? '' : 'pages/';

  list.innerHTML = items.map(item => `
    <a href="${base}${item.page}" class="search-item block p-3 rounded-xl hover:bg-sandstone transition-colors group">
      <div class="flex items-center justify-between">
        <span class="font-bold text-charcoal-dark group-hover:text-cardinal text-xs">${item.title}</span>
        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cardinal-subtle text-cardinal border border-cardinal/20">${item.category}</span>
      </div>
      <p class="text-charcoal-muted text-[11px] mt-0.5 line-clamp-1">${item.desc}</p>
    </a>
  `).join('');
}
