import type { Block } from 'payload'

export const CentresOfExcellenceBlock: Block = {
  slug: 'centres-of-excellence',
  labels: { singular: 'Centres of Excellence', plural: 'Centres of Excellence Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Centres of Excellence',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Section Subheading',
      defaultValue: 'Bridging Academia & Industry 4.0 Workforce Demand — powered by world-class partners.',
    },
  ],
}
