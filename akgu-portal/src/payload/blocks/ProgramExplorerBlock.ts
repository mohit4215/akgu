import type { Block } from 'payload'

export const ProgramExplorerBlock: Block = {
  slug: 'program-explorer',
  labels: { singular: 'Program Explorer', plural: 'Program Explorer Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Education 4.0 Programs',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Section Subheading',
      defaultValue: 'Discover industry-aligned programs designed for the future of technology, business, and science.',
    },
  ],
}
