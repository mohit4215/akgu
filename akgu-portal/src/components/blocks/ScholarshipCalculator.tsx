'use client'

import React, { useState, useMemo } from 'react'
import { calculateScholarship, SCHOLARSHIP_TIERS } from '@/lib/scholarshipTiers'
import { Calculator, Award, Sparkles, Check, HelpCircle } from 'lucide-react'

interface ProgramOption {
  slug: string
  title: string
  tuitionFeePerYear: number
}

const DEFAULT_PROGRAM_OPTIONS: ProgramOption[] = [
  { slug: 'btech-cse', title: 'B.Tech Computer Science & Engineering', tuitionFeePerYear: 155000 },
  { slug: 'btech-aiml', title: 'B.Tech AI & Machine Learning', tuitionFeePerYear: 155000 },
  { slug: 'btech-ds', title: 'B.Tech Data Science', tuitionFeePerYear: 155000 },
  { slug: 'btech-ece', title: 'B.Tech Electronics & Communication', tuitionFeePerYear: 145000 },
  { slug: 'bca', title: 'Bachelor of Computer Applications (BCA)', tuitionFeePerYear: 95000 },
  { slug: 'mba', title: 'Master of Business Administration (MBA)', tuitionFeePerYear: 160000 },
  { slug: 'mtech-cse', title: 'M.Tech Computer Science & Engineering', tuitionFeePerYear: 115000 },
  { slug: 'phd', title: 'Doctoral Studies (Ph.D.)', tuitionFeePerYear: 80000 },
]

export interface ScholarshipCalculatorProps {
  heading?: string
  subheading?: string
  onApplyForScholarship?: (programSlug: string) => void
}

export function ScholarshipCalculator({
  heading = 'Scholarship & Tuition Fee Calculator',
  subheading = 'Transparent financial planning. Estimate your scholarship eligibility under the Super-30 and Merit initiatives based on your qualifying marks.',
  onApplyForScholarship,
}: ScholarshipCalculatorProps) {
  const [selectedProgramSlug, setSelectedProgramSlug] = useState('btech-cse')
  const [percentage, setPercentage] = useState<number>(88)
  const [isEmiMode, setIsEmiMode] = useState(false)

  const currentProgram = useMemo(() => {
    return (
      DEFAULT_PROGRAM_OPTIONS.find((p) => p.slug === selectedProgramSlug) ||
      DEFAULT_PROGRAM_OPTIONS[0]
    )
  }, [selectedProgramSlug])

  const calcResult = useMemo(() => {
    return calculateScholarship(currentProgram.tuitionFeePerYear, percentage)
  }, [currentProgram, percentage])

  return (
    <section id="calculator" className="py-20 px-4 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-pale text-amber-900 mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber" />
            <span>Merit Awards 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight">
            {heading}
          </h2>
          <p className="text-sm text-slate-600 mt-2">{subheading}</p>
        </div>

        {/* Calculator Interactive Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Program Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                1. Select Academic Program
              </label>
              <select
                value={selectedProgramSlug}
                onChange={(e) => setSelectedProgramSlug(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-navy transition-all"
              >
                {DEFAULT_PROGRAM_OPTIONS.map((prog) => (
                  <option key={prog.slug} value={prog.slug}>
                    {prog.title} (₹{prog.tuitionFeePerYear.toLocaleString('en-IN')}/year)
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Percentage Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  2. Qualifying Marks (12th / Graduation %)
                </label>
                <span className="text-xl font-black text-amber font-mono bg-amber-pale px-3 py-1 rounded-lg">
                  {percentage}%
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                step={1}
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>50%</span>
                <span>75% (Min Award)</span>
                <span>85%</span>
                <span>95%+ (100% Waiver)</span>
              </div>
            </div>

            {/* Step 3: Payment Breakdown Option */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <div>
                <span className="text-xs font-bold text-navy block">Easy Monthly Installments</span>
                <span className="text-[11px] text-slate-500 block">
                  Show zero-interest 12-month payment plan
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEmiMode(!isEmiMode)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                  isEmiMode ? 'bg-amber' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform transform ${
                    isEmiMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Scholarship Tiers Quick Reference */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Scholarship Slabs
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SCHOLARSHIP_TIERS.slice(0, 5).map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg border text-[11px] ${
                      percentage >= tier.minPct
                        ? 'bg-amber-pale/40 border-amber/40 text-amber-900 font-semibold'
                        : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}
                  >
                    <div>{tier.emoji} {tier.discountPct}% Waiver</div>
                    <div className="text-[10px] text-slate-500 font-normal">≥ {tier.minPct}% marks</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy via-navy-light to-navy rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative">
              {/* Tier Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber text-navy-dark shadow-sm">
                <span>{calcResult.tier.emoji}</span>
                <span>{calcResult.tier.label}</span>
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Standard Annual Fee:</span>
                  <span className="font-mono text-white text-sm">
                    ₹{calcResult.baseFee.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-amber">
                  <span>Scholarship Discount ({calcResult.tier.discountPct}%):</span>
                  <span className="font-mono font-bold text-sm">
                    - ₹{calcResult.discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="h-px bg-white/10 my-2" />

                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-white">Net Annual Payable:</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber font-display">
                    ₹{calcResult.netPayable.toLocaleString('en-IN')}
                  </span>
                </div>

                {isEmiMode && (
                  <div className="p-3 bg-white/10 rounded-xl border border-white/10 mt-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Monthly 0% Interest EMI:</span>
                      <span className="text-base font-bold text-white font-mono">
                        ₹{calcResult.monthlyEmi.toLocaleString('en-IN')}/mo
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  if (onApplyForScholarship) onApplyForScholarship(selectedProgramSlug)
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber to-amber-light text-navy-dark font-extrabold text-xs sm:text-sm shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-navy-dark" />
                <span>Claim This Scholarship</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-snug">
                *Subject to verification of authentic marksheets during counseling. Limited seats under Super-30.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
