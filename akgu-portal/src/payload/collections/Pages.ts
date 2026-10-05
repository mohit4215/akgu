import type { CollectionConfig } from 'payload'
import { HeroBlock }                  from '../blocks/HeroBlock'
import { StatsBlock }                 from '../blocks/StatsBlock'
import { ProgramExplorerBlock }       from '../blocks/ProgramExplorerBlock'
import { CentresOfExcellenceBlock }   from '../blocks/CentresOfExcellenceBlock'
import { PlacementTickerBlock }       from '../blocks/PlacementTickerBlock'
import { ScholarshipCalculatorBlock } from '../blocks/ScholarshipCalculatorBlock'
import { CallToActionBlock }          from '../blocks/CallToActionBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'published', 'updatedAt'],
    description: 'Build and manage all public-facing pages using the Page Builder.',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Identity ─────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug (e.g., home, about, admissions)',
      admin: { description: 'Use "home" for the homepage.' },
    },

    // ── SEO meta ──────────────────────────────────────────
    {
      name: 'meta',
      type: 'group',
      label: 'SEO Metadata',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
          admin: { description: 'Overrides page title in browser tab and search results.' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          admin: { description: 'Keep under 160 characters for best SEO.' },
        },
      ],
    },

    // ── Page Builder ──────────────────────────────────────
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout (Blocks)',
      blocks: [
        HeroBlock,
        StatsBlock,
        ProgramExplorerBlock,
        CentresOfExcellenceBlock,
        PlacementTickerBlock,
        ScholarshipCalculatorBlock,
        CallToActionBlock,
      ],
    },

    // ── Publishing ────────────────────────────────────────
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      label: 'Published (visible on website)',
    },
  ],
}
