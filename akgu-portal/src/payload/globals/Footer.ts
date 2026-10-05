import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    description: 'Controls footer content: quick links, accreditation, social media, and emergency contacts.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'aboutText',
      type: 'textarea',
      label: 'About Text (brand column)',
      defaultValue:
        'Empowering Innovation & Education 4.0 in Ghaziabad, Delhi-NCR. Approved by UGC | AICTE Approved.',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      defaultValue:
        '27 KM Milestone, Delhi-Meerut Expressway, Ghaziabad, UP – 201009',
    },
    {
      name: 'helplineNumber',
      type: 'text',
      label: 'Helpline Number',
      defaultValue: '1800-AKGU-UNI',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'info@akgu.ac.in',
    },
    {
      name: 'antiRaggingNumber',
      type: 'text',
      label: 'Anti-Ragging Helpline',
      defaultValue: '1800-180-5522',
    },
    {
      name: 'emergencyNumber',
      type: 'text',
      label: 'Emergency Contact',
      defaultValue: '+91-120-456-7890',
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links Column',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url',   type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'About AKGU',          url: '/about'       },
        { label: 'Academic Programs',    url: '/#programs'   },
        { label: 'Admissions 2026–27',   url: '/admissions'  },
        { label: 'Research & Innovation',url: '/research'    },
        { label: 'Centres of Excellence',url: '/centres-of-excellence' },
        { label: 'Placements',           url: '/placements'  },
        { label: 'Campus Life',          url: '/campus-life' },
        { label: 'Scholarship Calculator', url: '/#calculator' },
      ],
    },
    {
      name: 'academicLinks',
      type: 'array',
      label: 'Academics & Governance Column',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url',   type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'UGC / AICTE Approvals', url: '#' },
        { label: 'NAAC Accreditation',    url: '#' },
        { label: 'NBA Accreditation',     url: '#' },
        { label: 'Ph.D. Ordinances',      url: '#' },
        { label: 'Academic Calendar',     url: '#' },
        { label: 'IQAC Reports',          url: '#' },
        { label: 'RTI Disclosures',       url: '#' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook',   value: 'facebook'   },
            { label: 'Twitter/X',  value: 'twitter'    },
            { label: 'LinkedIn',   value: 'linkedin'   },
            { label: 'YouTube',    value: 'youtube'    },
            { label: 'Instagram',  value: 'instagram'  },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
      defaultValue: [
        { platform: 'facebook',  url: '#' },
        { platform: 'twitter',   url: '#' },
        { platform: 'linkedin',  url: '#' },
        { platform: 'youtube',   url: '#' },
        { platform: 'instagram', url: '#' },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue:
        '© 2026 Ajay Kumar Garg University (AKGU). All rights reserved. | Approved by UGC | AICTE Approved',
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'Bottom Bar Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url',   type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Privacy Policy', url: '#' },
        { label: 'Terms of Use',   url: '#' },
        { label: 'Sitemap',        url: '#' },
        { label: 'Grievance Cell', url: '#' },
      ],
    },
  ],
}
