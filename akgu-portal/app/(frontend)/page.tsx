import React from 'react'
import { BlockRenderer } from '@/lib/blockRenderer'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 60

const DEFAULT_HOME_BLOCKS = [
  { blockType: 'hero' },
  { blockType: 'stats' },
  { blockType: 'program-explorer' },
  { blockType: 'centres-of-excellence' },
  { blockType: 'placement-ticker' },
  { blockType: 'scholarship-calculator' },
  { blockType: 'call-to-action' },
]

export default async function HomePage() {
  let blocks = DEFAULT_HOME_BLOCKS

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: 'home' },
        published: { equals: true },
      },
      limit: 1,
    })

    if (result.docs?.[0]?.layout && result.docs[0].layout.length > 0) {
      blocks = result.docs[0].layout
    }
  } catch {
    // Graceful fallback to default homepage blocks if database is not yet seeded
  }

  return <BlockRenderer blocks={blocks} />
}
