import type { GlobalConfig } from 'payload'

export const HeaderGlobal: GlobalConfig = {
  slug: 'header',
  label: 'Header & Navigation',
  admin: {
    description: 'Controls the top utility bar, main navigation menu, Ph.D. badge, and primary CTA button.',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Utility top bar ───────────────────────────────────
    {
      name: 'topBarText',
      type: 'text',
      label: 'Top Bar Left Text',
      defaultValue: 'Admissions Open 2026–27',
    },
    {
      name: 'helplineNumber',
      type: 'text',
      label: 'Helpline Number',
      defaultValue: '1800-AKGU-UNI',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Contact Email',
      defaultValue: 'info@akgu.ac.in',
    },
    {
      name: 'portalLinks',
      type: 'array',
      label: 'Top-bar Portal Links (right side)',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url',   type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Student ERP', url: '#' },
        { label: 'Staff ERP',   url: '#' },
        { label: 'Research Portal', url: '#' },
        { label: 'IQAC',        url: '#' },
        { label: 'Alumni Network', url: '#' },
        { label: 'Careers',     url: '#' },
      ],
    },

    // ── Main nav ──────────────────────────────────────────
    {
      name: 'phdBadgeText',
      type: 'text',
      label: 'Ph.D. Badge Text (leave empty to hide)',
      defaultValue: 'Ph.D. Admissions Open',
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA Button (header)',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Apply Now' },
        { name: 'url',   type: 'text', defaultValue: '#apply'    },
      ],
    },
    {
      name: 'navigationMenu',
      type: 'array',
      label: 'Navigation Menu Items',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url',   type: 'text', defaultValue: '#' },
        {
          name: 'subLinks',
          type: 'array',
          label: 'Dropdown Sub-links',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url',   type: 'text', required: true },
          ],
        },
      ],
      defaultValue: [
        {
          label: 'About AKGU',
          url: '/about',
          subLinks: [
            { label: 'Vision & Mission',         url: '/about#vision'         },
            { label: 'Governing Bodies',          url: '/about#governing'      },
            { label: 'Approvals & Recognition',   url: '/about#approvals'      },
            { label: 'Campus Infrastructure',     url: '/about#infrastructure' },
          ],
        },
        {
          label: 'Schools & Academics',
          url: '/academics',
          subLinks: [
            { label: 'School of Computer Science & AI', url: '/academics/cs-ai'   },
            { label: 'School of Engineering',           url: '/academics/engineering' },
            { label: 'School of Management',            url: '/academics/management' },
            { label: 'School of Computer Applications', url: '/academics/mca'      },
            { label: 'School of Applied Sciences',      url: '/academics/sciences' },
            { label: 'Value Education Cell',            url: '/academics/uhv'      },
          ],
        },
        {
          label: 'Admissions',
          url: '/admissions',
          subLinks: [
            { label: 'UG Programs',                   url: '/admissions/ug'          },
            { label: 'PG Programs',                   url: '/admissions/pg'          },
            { label: 'Ph.D. Doctoral Admissions',     url: '/admissions/phd'         },
            { label: 'Fee Structure & Loans',         url: '/admissions/fee'         },
            { label: 'Super-30 & Merit Scholarships', url: '/admissions/scholarships'},
          ],
        },
        {
          label: 'Research',
          url: '/research',
          subLinks: [
            { label: 'Research Council',            url: '/research/council'    },
            { label: 'Ph.D. Ordinances',            url: '/research/ordinances' },
            { label: 'Patents',                     url: '/research/patents'    },
            { label: 'University Journals',         url: '/research/journals'   },
            { label: 'IDEA Lab & Startup Incubation', url: '/research/idea-lab' },
          ],
        },
        {
          label: 'Centres of Excellence',
          url: '/centres-of-excellence',
          subLinks: [
            { label: 'Industrial Robotics – KUKA',         url: '/centres-of-excellence#kuka'    },
            { label: 'Automation – Siemens/Bosch Rexroth', url: '/centres-of-excellence#siemens' },
            { label: 'Additive Manufacturing (3D)',        url: '/centres-of-excellence#3d'      },
            { label: 'Virtual Instrumentation',            url: '/centres-of-excellence#virtual' },
          ],
        },
        {
          label: 'Placements',
          url: '/placements',
          subLinks: [
            { label: 'Placement Records',        url: '/placements#records'    },
            { label: 'Recruiters',               url: '/placements#recruiters' },
            { label: 'Student Readiness Program',url: '/placements#readiness'  },
            { label: 'Corporate Alliances',      url: '/placements#alliances'  },
          ],
        },
        {
          label: 'Campus Life',
          url: '/campus-life',
          subLinks: [
            { label: 'Student Clubs & Societies', url: '/campus-life#clubs'  },
            { label: 'Hostels & Dining',          url: '/campus-life#hostel' },
            { label: 'Universal Human Values',    url: '/campus-life#uhv'    },
            { label: 'Sports & Faith Centre',     url: '/campus-life#sports' },
          ],
        },
      ],
    },
  ],
}
