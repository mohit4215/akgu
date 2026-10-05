import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'school', 'tuitionFeePerYear', 'published'],
    description: 'All academic programs offered by AKGU.',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Core info ────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Program Title (e.g., B.Tech – Computer Science & AI)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL slug, e.g., btech-cse-ai' },
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Undergraduate (UG)', value: 'UG'  },
        { label: 'Postgraduate (PG)',  value: 'PG'  },
        { label: 'Doctoral (Ph.D.)',   value: 'PhD' },
      ],
    },
    {
      name: 'school',
      type: 'relationship',
      relationTo: 'schools',
      hasMany: false,
      label: 'School / Department',
    },

    // ── Admissions details ────────────────────────────────
    {
      name: 'durationYears',
      type: 'number',
      label: 'Duration (Years)',
      min: 1,
      max: 7,
    },
    {
      name: 'intakeCapacity',
      type: 'number',
      label: 'Intake Capacity (seats)',
    },
    {
      name: 'tuitionFeePerYear',
      type: 'number',
      label: 'Annual Tuition Fee (₹)',
      admin: { description: 'Annual approved tuition fee per academic year' },
    },

    // ── Curriculum ────────────────────────────────────────
    {
      name: 'specializations',
      type: 'array',
      label: 'Specializations',
      fields: [
        {
          name: 'specialization',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'eligibilityCriteria',
      type: 'richText',
      editor: lexicalEditor(),
      label: 'Eligibility Criteria',
    },

    // ── Status ────────────────────────────────────────────
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      label: 'Published (show on website)',
    },
  ],
}
