import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, PhoneCall } from 'lucide-react'

export interface CallToActionBlockProps {
  heading?: string
  subheading?: string
  buttonLabel?: string
  buttonUrl?: string
  onOpenEnquiry?: () => void
}

export function CallToActionBlock({
  heading = 'Ready to Shape Your Future at AKGU?',
  subheading = 'Admissions for 2026–27 are now active across B.Tech, BCA, MBA, M.Tech, and Ph.D. programs. Take the first step toward an extraordinary career in tech and innovation.',
  buttonLabel = 'Start Admission Application',
  buttonUrl = '#enquiry',
  onOpenEnquiry,
}: CallToActionBlockProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-navy via-navy-light to-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber/20 text-amber-pale border border-amber/30">
          <Sparkles className="w-3.5 h-3.5 text-amber" />
          <span>Limited Seats Available</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
          {heading}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber to-amber-light text-navy-dark font-extrabold text-sm shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-navy-dark" />
            <span>{buttonLabel}</span>
          </button>

          <a
            href="tel:1800-254-8264"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-amber" />
            <span>Speak to Counselor: 1800-AKGU-UNI</span>
          </a>
        </div>
      </div>
    </section>
  )
}
