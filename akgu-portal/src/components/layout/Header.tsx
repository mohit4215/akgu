'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Phone,
  Mail,
  Search,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from 'lucide-react'

export interface HeaderProps {
  onOpenSearch?: () => void
  onOpenEnquiry?: () => void
}

const NAV_ITEMS = [
  {
    label: 'Academics',
    url: '#programs',
    subLinks: [
      { label: 'School of Computer Science & AI', url: '#programs', desc: 'B.Tech CSE, AI & ML, Data Science, BCA' },
      { label: 'School of Engineering', url: '#programs', desc: 'B.Tech ECE, ME, Civil & Advanced Robotics' },
      { label: 'School of Management', url: '#programs', desc: 'MBA in Tech Management, Business Analytics' },
      { label: 'Doctoral Studies (Ph.D.)', url: '#research', desc: 'Full-time & Part-time research programs' },
    ],
  },
  {
    label: 'Admissions',
    url: '#admissions',
    subLinks: [
      { label: 'Program Explorer', url: '#programs', desc: 'Find UG, PG and Research degrees' },
      { label: 'Fee & Scholarship Calculator', url: '#calculator', desc: 'Calculate tuition discount up to 100%' },
      { label: 'Eligibility & Criteria', url: '#admissions', desc: 'Cut-offs, entrance exams & direct entry' },
      { label: 'Apply Online', url: '#enquiry', desc: 'Submit application for 2026–27 intake' },
    ],
  },
  {
    label: 'Centres of Excellence',
    url: '#coe',
    subLinks: [
      { label: 'KUKA Industrial Robotics Lab', url: '#coe', desc: 'Advanced articulated robotic arms training' },
      { label: 'Siemens PLM & Bosch Rexroth', url: '#coe', desc: 'Industry 4.0 automation & hydraulics' },
      { label: '3D Printing & Additive Lab', url: '#coe', desc: 'Rapid prototyping & digital manufacturing' },
      { label: 'NI Virtual Instrumentation Lab', url: '#coe', desc: 'LabVIEW systems & sensor design' },
    ],
  },
  {
    label: 'Placements',
    url: '#placements',
    subLinks: [
      { label: 'Placement Records 2025', url: '#placements', desc: 'Highest ₹42 LPA | Avg ₹8.5 LPA' },
      { label: 'Top Recruiters', url: '#placements', desc: 'Google, Amazon, TCS, Microsoft, Infosys' },
      { label: 'Alumni Testimonials', url: '#placements', desc: 'Stories of impact across top global tech firms' },
    ],
  },
  {
    label: 'Research & Innovation',
    url: '#research',
    subLinks: [
      { label: 'AICTE IDEA Lab', url: '#research', desc: 'Multi-disciplinary prototyping maker space' },
      { label: 'Sponsored Projects', url: '#research', desc: 'DST, DRDO & SERB funded initiatives' },
      { label: 'Patents & Publications', url: '#research', desc: 'Over 450+ indexed research papers' },
    ],
  },
  {
    label: 'About AKGU',
    url: '#about',
    subLinks: [
      { label: 'Vision & Leadership', url: '#about', desc: 'Legacy of academic excellence since 1998' },
      { label: 'Accreditations & Ranking', url: '#about', desc: 'NAAC A++, NBA Accredited, AICTE Approved' },
      { label: 'Campus Tour', url: '#campus', desc: '40-acre green campus on Delhi-Meerut Expressway' },
    ],
  },
]

export function Header({ onOpenSearch, onOpenEnquiry }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* ── Top utility bar ────────────────────────────────────────── */}
      <div className="bg-navy-dark text-slate-300 text-xs py-1.5 px-4 border-b border-navy-light/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:1800-254-8264"
              className="inline-flex items-center gap-1.5 hover:text-amber-light transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber" />
              <span>Toll-Free: 1800-AKGU-UNI (1800-254-8264)</span>
            </a>
            <a
              href="mailto:admissions@akgu.ac.in"
              className="hidden md:inline-flex items-center gap-1.5 hover:text-amber-light transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber" />
              <span>admissions@akgu.ac.in</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-slate-400">Delhi-NCR, Ghaziabad (UP)</span>
            <div className="h-3 w-px bg-slate-700 hidden sm:block" />
            <a
              href="https://erp.akgu.ac.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-200 hover:text-white font-medium transition-colors"
            >
              <span>Student / Faculty ERP</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ────────────────────────────────────── */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-slate-200/80 py-2.5'
            : 'bg-white border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy via-navy to-navy-light flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-amber" />
            </div>
            <div>
              <div className="font-display font-extrabold text-navy tracking-tight text-lg leading-tight group-hover:text-amber transition-colors">
                AKGU
              </div>
              <div className="text-[10px] tracking-wider text-slate-500 font-semibold uppercase leading-tight">
                Ajay Kumar Garg University
              </div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                    activeDropdown === item.label
                      ? 'text-navy bg-slate-100'
                      : 'text-slate-700 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === item.label ? 'rotate-180 text-amber' : ''
                    }`}
                  />
                </button>

                {/* Mega-menu / Dropdown */}
                {activeDropdown === item.label && item.subLinks && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 grid gap-1 z-50 animate-fade-in">
                    {item.subLinks.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.url}
                        onClick={() => setActiveDropdown(null)}
                        className="p-2.5 rounded-xl hover:bg-slate-50 group/link transition-colors block text-left"
                      >
                        <div className="text-xs font-bold text-navy group-hover/link:text-amber transition-colors">
                          {sub.label}
                        </div>
                        {sub.desc && (
                          <div className="text-[11px] text-slate-500 leading-snug mt-0.5">
                            {sub.desc}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions & CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-navy hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2 text-xs font-medium"
              title="Quick search (Ctrl+K)"
              aria-label="Search site"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-mono">
                ⌘K
              </span>
            </button>

            {/* Ph.D. Badge */}
            <Link
              href="#research"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-pale text-amber-800 border border-amber/30 hover:bg-amber-100 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
              <span>Ph.D. 2026 Open</span>
            </Link>

            {/* Primary Apply CTA */}
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber to-amber-light text-navy-dark font-bold text-xs md:text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-navy-dark" />
              <span>Apply Now</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-navy hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Navigation Drawer ───────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-navy-dark/70 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center text-amber font-display font-bold">
                    AK
                  </div>
                  <span className="font-display font-bold text-navy text-base">AKGU Portal</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Nav links */}
              <div className="py-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isExpanded = mobileExpandedSection === item.label
                  return (
                    <div key={item.label} className="border-b border-slate-50 last:border-0">
                      <button
                        onClick={() =>
                          setMobileExpandedSection(isExpanded ? null : item.label)
                        }
                        className="w-full flex items-center justify-between py-3 text-sm font-bold text-navy text-left"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isExpanded ? 'rotate-180 text-amber' : ''
                          }`}
                        />
                      </button>

                      {isExpanded && item.subLinks && (
                        <div className="pl-3 pb-3 space-y-2">
                          {item.subLinks.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.url}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 text-xs text-slate-600 hover:text-amber font-medium"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (onOpenEnquiry) onOpenEnquiry()
                }}
                className="w-full py-3 rounded-xl bg-amber text-navy-dark font-bold text-sm shadow text-center block"
              >
                Apply for Admissions 2026–27
              </button>

              <div className="text-center text-xs text-slate-500 pt-2">
                Helpline: 1800-AKGU-UNI | admissions@akgu.ac.in
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
