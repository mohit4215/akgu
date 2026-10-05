import type { Block } from 'payload'

export const PlacementTickerBlock: Block = {
  slug: 'placement-ticker',
  labels: { singular: 'Placement Ticker', plural: 'Placement Ticker Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Placements & Recruiters',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Section Subheading',
      defaultValue: 'AKGU graduates are shaping the future at India\'s and the world\'s most respected organizations.',
    },
  ],
}
