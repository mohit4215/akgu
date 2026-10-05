'use client'

import React, { useState, useEffect } from 'react'
import { Bell, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'

export interface AnnouncementBannerProps {
  enabled?: boolean
  text?: string
  link?: string
  badge?: string
}

export function AnnouncementBanner({
  enabled = true,
  text = 'Admissions Open for Academic Year 2026–27 | Scholarships up to 100% available under Super-30 program',
  link = '#admissions',
  badge = 'ADMISSIONS 2026–27',
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user dismissed it in this session or local storage
    const dismissed = sessionStorage.getItem('akgu_announcement_dismissed')
    if (!dismissed && enabled) {
      setIsVisible(true)
    }
  }, [enabled])

  const handleDismiss = () => {
    sessionStorage.setItem('akgu_announcement_dismissed', 'true')
    setIsVisible(false)
  }

  if (!isVisible || !enabled) return null

  return (
    <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-white text-xs md:text-sm py-2 px-4 border-b border-navy-light/40 relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber text-white tracking-wider uppercase flex-shrink-0 animate-pulse-slow">
            <Bell className="w-3 h-3" />
            {badge}
          </span>
          <p className="truncate text-slate-200">
            {text}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {link && (
            <Link
              href={link}
              className="inline-flex items-center gap-1 text-amber-pale hover:text-white font-semibold underline underline-offset-2 transition-colors text-xs"
            >
              Apply Online
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
          <button
            onClick={handleDismiss}
            className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
