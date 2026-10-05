import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats / Impact Ticker', plural: 'Stats Blocks' },
  fields: [
    {
      name: 'stats',
      type: 'array',
      label: 'University Impact Stats',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'value',  type: 'text',   required: true, label: 'Display Value (e.g., 6,000+)' },
        { name: 'label',  type: 'text',   required: true, label: 'Label (e.g., Students & Doctoral Scholars)' },
        { name: 'target', type: 'number', label: 'Counter Target (numeric, e.g., 6000)' },
        { name: 'suffix', type: 'text',   label: 'Suffix (e.g., +)', defaultValue: '+' },
      ],
    },
  ],
}
