import type { Block } from 'payload'

export const CallToActionBlock: Block = {
  slug: 'call-to-action',
  labels: { singular: 'Call To Action', plural: 'Call To Action Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Ready to Begin Your Journey at AKGU?',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      defaultValue: 'Join 6,000+ students and scholars building the future.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button Label',
      defaultValue: 'Apply Now',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'Button URL',
      defaultValue: '#apply',
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Colour Variant',
      defaultValue: 'amber',
      options: [
        { label: 'Amber Gold', value: 'amber' },
        { label: 'Navy Blue',  value: 'navy'  },
      ],
    },
  ],
}
