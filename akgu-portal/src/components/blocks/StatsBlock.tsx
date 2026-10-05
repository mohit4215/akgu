'use client'

import React, { useState, useEffect, useRef } from 'react'

interface StatItem {
  value?: string
  label?: string
  target?: number
  prefix?: string
  suffix?: string
}

export interface StatsBlockProps {
  stats?: StatItem[]
}

const DEFAULT_STATS: StatItem[] = [
  { target: 10000, prefix: '', suffix: '+', label: 'Students' },
  { target: 12, prefix: '', suffix: '+', label: 'R&D Centres' },
  { value: '₹ 1.13 Cr', label: 'Highest Package' },
  { target: 28, prefix: '', suffix: '+ Years', label: 'Legacy' },
  { target: 40, prefix: '', suffix: '+ Acres', label: 'Campus Area' },
]

export function StatsBlock({ stats = DEFAULT_STATS }: StatsBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    const duration = 1800 // ms
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)

      setCounts(
        stats.map((s) => {
          const target = s.target ?? 0
          return Math.floor(eased * target)
        })
      )

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [hasAnimated, stats])

  return (
    <section ref={containerRef} className="bg-navy py-12 px-4 border-y border-navy-light/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {stats.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber font-display tracking-tight">
                {item.value ? item.value : `${item.prefix || ''}${hasAnimated ? counts[idx] : item.target}${item.suffix || ''}`}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1.5 leading-snug">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
