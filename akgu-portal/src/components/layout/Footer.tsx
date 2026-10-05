import React from 'react'
import Link from 'next/link'
import { GraduationCap, Phone, Mail, MapPin, ShieldAlert, Award } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300 pt-16 pb-8 border-t border-navy-light/40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-light/30">
          {/* Column 1: Brand & Accreditation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber flex items-center justify-center text-navy-dark font-extrabold shadow">
                <GraduationCap className="w-6 h-6 text-navy-dark" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">AKGU</span>
                <span className="block text-[11px] font-semibold text-amber tracking-wider uppercase">
                  Ajay Kumar Garg University
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering Innovation & Education 4.0 in Delhi-NCR, Ghaziabad. Approved by UGC | AICTE Approved | NAAC A++ Accredited. A premier destination for engineering, technology, and management leadership.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-light/50 border border-slate-700/50 text-[11px] text-amber">
                <Award className="w-4 h-4 text-amber" />
                <span>NAAC A++ Grade Institution</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-amber/30 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="#programs" className="hover:text-amber transition-colors">
                  Academic Programs (UG, PG, Ph.D.)
                </Link>
              </li>
              <li>
                <Link href="#coe" className="hover:text-amber transition-colors">
                  Centres of Excellence & Robotics Lab
                </Link>
              </li>
              <li>
                <Link href="#placements" className="hover:text-amber transition-colors">
                  Placement Statistics & Recruiters
                </Link>
              </li>
              <li>
                <Link href="#research" className="hover:text-amber transition-colors">
                  AICTE IDEA Lab & Research Centre
                </Link>
              </li>
              <li>
                <a href="https://erp.akgu.ac.in" target="_blank" rel="noreferrer" className="hover:text-amber transition-colors">
                  Student ERP Login Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Academics & Governance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-amber/30 pb-2 inline-block">
              Academics & Schools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="#programs" className="hover:text-amber transition-colors">
                  School of Computer Science & AI
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-amber transition-colors">
                  School of Engineering & Technology
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-amber transition-colors">
                  School of Management & Business
                </Link>
              </li>
              <li>
                <Link href="#research" className="hover:text-amber transition-colors">
                  Doctoral Research Cell (Ph.D.)
                </Link>
              </li>
              <li>
                <Link href="#mandatory-disclosures" className="hover:text-amber transition-colors">
                  Mandatory AICTE & UGC Disclosures
                </Link>
              </li>
              <li>
                <Link href="#iqac" className="hover:text-amber transition-colors">
                  Internal Quality Assurance Cell (IQAC)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Emergency Compliance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-amber/30 pb-2 inline-block">
              Campus & Emergency
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
              <span>27 KM Milestone, Delhi-Meerut Expressway, Ghaziabad, UP – 201009</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-amber flex-shrink-0" />
              <span>1800-AKGU-UNI (1800-254-8264)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-amber flex-shrink-0" />
              <span>info@akgu.ac.in | admissions@akgu.ac.in</span>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] text-amber">
                <ShieldAlert className="w-3.5 h-3.5 text-amber flex-shrink-0" />
                <span className="font-semibold">Anti-Ragging Helpline (24x7):</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-5">1800-180-5522 (Toll Free)</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ajay Kumar Garg University (AKGU). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-slate-400 transition-colors">
              Terms of Use
            </Link>
            <Link href="#sitemap" className="hover:text-slate-400 transition-colors">
              Sitemap
            </Link>
            <Link href="/admin" className="text-amber/80 hover:text-amber transition-colors font-medium">
              CMS Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
