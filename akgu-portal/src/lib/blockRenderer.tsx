import React from 'react'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { StatsBlock } from '@/components/blocks/StatsBlock'
import { ProgramExplorer } from '@/components/blocks/ProgramExplorer'
import { CentresOfExcellenceBlock } from '@/components/blocks/CentresOfExcellenceBlock'
import { PlacementTicker } from '@/components/blocks/PlacementTicker'
import { CallToActionBlock } from '@/components/blocks/CallToActionBlock'

export interface BlockData {
  blockType: string
  [key: string]: any
}

interface BlockRendererProps {
  blocks: BlockData[]
  onOpenEnquiry?: () => void
}

const BLOCK_MAP: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  stats: StatsBlock,
  'program-explorer': ProgramExplorer,
  'centres-of-excellence': CentresOfExcellenceBlock,
  'placement-ticker': PlacementTicker,
  'call-to-action': CallToActionBlock,
}

export function BlockRenderer({ blocks, onOpenEnquiry }: BlockRendererProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        const Component = BLOCK_MAP[block.blockType]
        if (!Component) {
          return null
        }
        return <Component key={index} {...block} onOpenEnquiry={onOpenEnquiry} />
      })}
    </>
  )
}
