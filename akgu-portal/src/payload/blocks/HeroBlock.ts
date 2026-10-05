import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero Block', plural: 'Hero Blocks' },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Floating Alert Badge Text',
      defaultValue: 'Ph.D. & UG/PG Admissions Open for 2026–27 | Super-30 Scholarship Applications Active',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Main Headline',
      defaultValue: 'Pioneering Education 4.0 & Next-Gen Innovation',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Sub-headline / Description',
      defaultValue: 'A multidisciplinary autonomous university in Ghaziabad, Delhi-NCR — where industry-led learning, advanced research, and transformative values converge.',
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (optional)',
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Explore Academic Programs' },
        { name: 'url',   type: 'text', defaultValue: '#programs' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Apply Online Now' },
        { name: 'url',   type: 'text', defaultValue: '#apply' },
      ],
    },
    {
      name: 'quickActions',
      type: 'array',
      label: 'Quick Access Cards (bottom row)',
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url',   type: 'text', defaultValue: '#' },
        { name: 'icon',  type: 'text', label: 'Icon name (lucide)', defaultValue: 'video' },
      ],
    },
  ],
}
