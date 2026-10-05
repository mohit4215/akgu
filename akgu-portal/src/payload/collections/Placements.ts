import type { CollectionConfig } from 'payload'

export const Placements: CollectionConfig = {
  slug: 'placements',
  admin: {
    useAsTitle: 'year',
    defaultColumns: ['year', 'highestPackage', 'averagePackage', 'totalOffers'],
    description: 'Annual placement statistics and recruiter information.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      label: 'Placement Year',
    },
    {
      name: 'highestPackage',
      type: 'text',
      label: 'Highest Package Offered (e.g., ₹42 LPA)',
    },
    {
      name: 'averagePackage',
      type: 'text',
      label: 'Average Package (e.g., ₹8.5 LPA)',
    },
    {
      name: 'totalOffers',
      type: 'number',
      label: 'Total Job Offers',
    },
    {
      name: 'topRecruiters',
      type: 'array',
      label: 'Top Recruiters',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Company Name',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Company Logo',
        },
      ],
    },
    {
      name: 'alumniTestimonials',
      type: 'array',
      label: 'Alumni Testimonials',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Student Name',
        },
        {
          name: 'program',
          type: 'text',
          label: 'Program & Batch (e.g., B.Tech CSE 2024)',
        },
        {
          name: 'company',
          type: 'text',
          label: 'Company / Role',
        },
        {
          name: 'quote',
          type: 'textarea',
          label: 'Testimonial Quote',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Student Photo',
        },
        {
          name: 'initials',
          type: 'text',
          label: 'Initials (fallback avatar, e.g., RS)',
        },
        {
          name: 'avatarColor',
          type: 'text',
          label: 'Avatar Background Color (Tailwind, e.g., bg-blue-500)',
          defaultValue: 'bg-blue-500',
        },
      ],
    },
  ],
}
