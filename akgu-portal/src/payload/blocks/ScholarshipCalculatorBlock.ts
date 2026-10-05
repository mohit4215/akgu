import type { Block } from 'payload'

export const ScholarshipCalculatorBlock: Block = {
  slug: 'scholarship-calculator',
  labels: { singular: 'Scholarship & Fee Calculator', plural: 'Scholarship Calculator Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Fee & Scholarship Calculator',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Section Subheading',
      defaultValue: 'Select your program and academic score to instantly see tuition fees, scholarship discounts, and EMI options.',
    },
  ],
}
