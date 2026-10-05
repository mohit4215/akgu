import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description:
      'Global site settings: university name, logo, and the announcement banner that appears at the top of every page.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'universityName',
      type: 'text',
      label: 'University Full Name',
      defaultValue: 'Ajay Kumar Garg University',
    },
    {
      name: 'universityShortName',
      type: 'text',
      label: 'Short Name / Acronym',
      defaultValue: 'AKGU',
    },
    {
      name: 'establishedYear',
      type: 'text',
      label: 'Established Year',
      defaultValue: '1998',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'University Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },

    // ── Announcement banner ───────────────────────────────
    {
      name: 'announcementBanner',
      type: 'group',
      label: 'Announcement Banner',
      admin: {
        description:
          'When enabled, a dismissible banner appears at the very top of every public page.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show Banner',
          defaultValue: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Banner Text',
          defaultValue:
            '🎓 UG/PG & Ph.D. Admissions Open for 2026–27 | Super-30 Scholarship Available',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Banner Link URL',
          defaultValue: '/admissions',
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Banner Colour',
          defaultValue: 'amber',
          options: [
            { label: 'Amber',  value: 'amber' },
            { label: 'Navy',   value: 'navy'  },
            { label: 'Green',  value: 'green' },
            { label: 'Red',    value: 'red'   },
          ],
        },
      ],
    },
  ],
}
