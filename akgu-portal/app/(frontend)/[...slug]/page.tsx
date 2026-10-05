import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { BlockRenderer } from '@/lib/blockRenderer'

export const dynamic = 'force-dynamic'
export const revalidate = 60

type Props = {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fullSlug = slug.join('/')

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: fullSlug },
      },
      limit: 1,
    })

    const page = result.docs[0]
    if (!page) return {}

    return {
      title: page.meta?.title ?? `${page.title} | AKGU`,
      description: page.meta?.description,
    }
  } catch {
    return {}
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const fullSlug = slug.join('/')

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: fullSlug },
        published: { equals: true },
      },
      limit: 1,
    })

    const page = result.docs[0]
    if (!page) {
      notFound()
    }

    return <BlockRenderer blocks={page.layout ?? []} />
  } catch {
    notFound()
  }
}
