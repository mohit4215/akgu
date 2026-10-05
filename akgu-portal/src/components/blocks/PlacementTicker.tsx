import React from 'react'
import { TrendingUp, Building2, Quote, Award } from 'lucide-react'

const RECRUITERS = [
  'Google',
  'Microsoft',
  'Amazon AWS',
  'Adobe',
  'Samsung R&D',
  'Bosch Rexroth',
  'TCS Ninja & Digital',
  'Infosys',
  'Capgemini',
  'Cognizant',
  'KUKA Robotics',
  'L&T Technology Services',
  'Wipro Turbo',
  'HCL Technologies',
  'Deloitte',
]

const ALUMNI_TESTIMONIALS = [
  {
    name: 'Aayush Verma',
    program: 'B.Tech CSE (Batch 2024)',
    company: 'Amazon AWS',
    role: 'Software Development Engineer',
    package: '₹42 LPA',
    quote:
      'The experiential learning at AKGU and constant mentorship in algorithm design and cloud computing enabled me to crack top-tier technical interviews.',
  },
  {
    name: 'Priyanka Mittal',
    program: 'B.Tech ECE (Batch 2023)',
    company: 'Bosch Engineering',
    role: 'Embedded Robotics Specialist',
    package: '₹18 LPA',
    quote:
      'Working inside the KUKA and Bosch Rexroth Centres of Excellence gave me real industrial automation experience that placed me leagues ahead.',
  },
  {
    name: 'Rohan Mehra',
    program: 'MBA Tech (Batch 2024)',
    company: 'Deloitte USI',
    role: 'Technology Consultant',
    package: '₹14.5 LPA',
    quote:
      'The synergy between technical fundamentals and strategic management at AKGU prepared me for dynamic client-facing leadership roles.',
  },
]

export function PlacementTicker() {
  return (
    <section id="placements" className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-green-600" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight">
            Placements & Corporate Partners
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Consistently leading campus placements in North India through robust industry connections and rigorous training.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-3xl sm:text-4xl font-black text-navy font-display">₹42 LPA</span>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Highest Package
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-3xl sm:text-4xl font-black text-amber font-display">₹8.5 LPA</span>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Average Package
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-3xl sm:text-4xl font-black text-navy font-display">1,200+</span>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Job Offers Made
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-3xl sm:text-4xl font-black text-navy font-display">300+</span>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Recruiting Companies
            </span>
          </div>
        </div>

        {/* Recruiter Marquee */}
        <div className="mb-16">
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
            Leading Global Recruiters
          </div>
          <div className="relative w-full overflow-hidden py-3 bg-slate-50/80 rounded-2xl border border-slate-100">
            <div className="flex w-max animate-ticker gap-8 hover:[animation-play-state:paused]">
              {[...RECRUITERS, ...RECRUITERS].map((recruiter, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-200/60 text-xs font-bold text-navy flex-shrink-0"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber" />
                  <span>{recruiter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alumni Testimonials */}
        <div>
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">
            Alumni Success Stories
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALUMNI_TESTIMONIALS.map((alumni, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-amber/30 mb-3" />
                  <p className="text-xs text-slate-600 italic leading-relaxed mb-6">
                    &ldquo;{alumni.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-navy">{alumni.name}</h4>
                    <span className="text-[11px] text-slate-400 block">{alumni.program}</span>
                    <span className="text-[11px] font-semibold text-navy-light block mt-0.5">
                      {alumni.role} @ {alumni.company}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-green-50 text-green-700">
                    {alumni.package}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
