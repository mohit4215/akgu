import React from 'react'
import Link from 'next/link'
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Cpu,
  TrendingUp,
  Award,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
} from 'lucide-react'

export interface HeroBlockProps {
  badge?: string
  headline?: string
  subheadline?: string
  primaryCta?: { label?: string; url?: string }
  secondaryCta?: { label?: string; url?: string }
  quickActions?: Array<{ label: string; url: string; icon?: string }>
  onOpenEnquiry?: () => void
}

export function HeroBlock({
  badge = 'ADMISSIONS 2026–27 NOW OPEN',
  headline = 'Empowering Innovation & Education 4.0',
  subheadline = 'Ajay Kumar Garg University delivers world-class technical education, hands-on industrial robotics training, and research-driven innovation to prepare visionary leaders for tomorrow.',
  primaryCta = { label: 'Apply for 2026 Admissions', url: '#enquiry' },
  secondaryCta = { label: 'Explore Academic Programs', url: '#programs' },
  onOpenEnquiry,
}: HeroBlockProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-dark via-navy to-navy-dark text-white pt-16 pb-20 px-4">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[30rem] h-[30rem] bg-navy-light/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-6 text-center sm:text-left">
          {/* Pulsing Pill Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber/20 text-amber-pale border border-amber/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
              <span>{badge}</span>
            </div>
          )}

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
            {subheadline}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber to-amber-light text-navy-dark font-extrabold text-sm shadow-xl hover:shadow-amber/20 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-navy-dark" />
              <span>{primaryCta.label || 'Apply Online Now'}</span>
            </button>

            <Link
              href={secondaryCta.url || '#programs'}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{secondaryCta.label || 'Explore Programs'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Live Video Captions & Controls (Roadmap Box 2) */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="font-bold text-white">CC:</span>
              <span>[00:15] Hands-on robotics research at KUKA Industrial Center</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-xs text-slate-300">
              <span className="font-semibold text-white">Campus 4K Tour</span>
              <span className="text-amber">• Live Stream</span>
            </div>
          </div>
        </div>

        {/* Quick Action Feature Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="#programs"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber/50 hover:bg-white/10 transition-all group backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-amber/20 text-amber flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-white group-hover:text-amber transition-colors">
              Academic Programs
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              UG, PG & Ph.D. degrees across 6 specialized schools
            </p>
          </Link>

          <Link
            href="#coe"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber/50 hover:bg-white/10 transition-all group backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-white group-hover:text-amber transition-colors">
              Robotics & CoE
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              KUKA, Siemens, Bosch & NI industrial research labs
            </p>
          </Link>

          <Link
            href="#placements"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber/50 hover:bg-white/10 transition-all group backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-white group-hover:text-amber transition-colors">
              Placements 2025
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              ₹42 LPA highest package with 1,200+ offers
            </p>
          </Link>

          <Link
            href="#about"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber/50 hover:bg-white/10 transition-all group backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-white group-hover:text-amber transition-colors">
              NAAC A++ Campus
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              40-acre lush green smart campus in NCR
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}
