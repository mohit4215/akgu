import type { CollectionConfig } from 'payload'

export const CentresOfExcellence: CollectionConfig = {
  slug: 'centres-of-excellence',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'industryPartner', 'updatedAt'],
    description: 'Industry-led Centres of Excellence (CoEs) on campus.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Centre Name',
    },
    {
      name: 'industryPartner',
      type: 'text',
      label: 'Industry Partner (e.g., KUKA, Siemens, Bosch Rexroth)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Lab / Centre Image',
    },
    {
      name: 'keyHighlights',
      type: 'array',
      label: 'Key Highlights',
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'gradientFrom',
      type: 'text',
      label: 'Card Gradient From (Tailwind class, e.g., from-orange-900)',
      defaultValue: 'from-orange-900',
    },
    {
      name: 'gradientTo',
      type: 'text',
      label: 'Card Gradient To (Tailwind class, e.g., to-orange-600)',
      defaultValue: 'to-orange-600',
    },
  ],
}
