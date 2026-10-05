import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig }   from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor }   from '@payloadcms/richtext-lexical'
import { en }              from 'payload/i18n/en'

// Collections
import { Users }               from './collections/Users'
import { Media }               from './collections/Media'
import { Schools }             from './collections/Schools'
import { Programs }            from './collections/Programs'
import { CentresOfExcellence } from './collections/CentresOfExcellence'
import { Placements }          from './collections/Placements'
import { Pages }               from './collections/Pages'

// Globals
import { HeaderGlobal }  from './globals/Header'
import { FooterGlobal }  from './globals/Footer'
import { SiteSettings }  from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname  = path.dirname(filename)

export default buildConfig({
  // ── Admin UI ─────────────────────────────────────────────
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— AKGU CMS',
      icons: [{ rel: 'icon', type: 'image/x-icon', url: '/favicon.ico' }],
    },
  },

  // ── Auth ─────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET ?? 'fallback-secret-change-me',

  // ── Internationalisation ─────────────────────────────────
  i18n: { supportedLanguages: { en } },

  // ── Default editor ───────────────────────────────────────
  editor: lexicalEditor(),

  // ── Collections ──────────────────────────────────────────
  collections: [
    Users,
    Media,
    Schools,
    Programs,
    CentresOfExcellence,
    Placements,
    Pages,
  ],

  // ── Globals ──────────────────────────────────────────────
  globals: [
    HeaderGlobal,
    FooterGlobal,
    SiteSettings,
  ],

  // ── Database ─────────────────────────────────────────────
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? 'mongodb://127.0.0.1:27017/akgu',
  }),

  // ── TypeScript output ────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ── Upload directory ─────────────────────────────────────
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },

  // ── GraphQL ──────────────────────────────────────────────
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
})
