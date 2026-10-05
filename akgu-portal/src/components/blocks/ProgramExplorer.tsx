'use client'

import React, { useState, useMemo } from 'react'
import { Search, BookOpen, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react'

export interface ProgramItem {
  id?: string
  title: string
  slug: string
  level: 'UG' | 'PG' | 'PhD'
  schoolName: string
  durationYears: number
  intakeCapacity: number
  tuitionFeePerYear: number
  specializations: string[]
}

const DEFAULT_PROGRAMS: ProgramItem[] = [
  {
    title: 'B.Tech Computer Science & Engineering',
    slug: 'btech-cse',
    level: 'UG',
    schoolName: 'School of Computer Science & AI',
    durationYears: 4,
    intakeCapacity: 240,
    tuitionFeePerYear: 155000,
    specializations: ['Full-Stack Development', 'Cloud Computing', 'Cyber Security'],
  },
  {
    title: 'B.Tech Artificial Intelligence & Machine Learning',
    slug: 'btech-aiml',
    level: 'UG',
    schoolName: 'School of Computer Science & AI',
    durationYears: 4,
    intakeCapacity: 180,
    tuitionFeePerYear: 155000,
    specializations: ['Deep Learning & Neural Networks', 'Natural Language Processing', 'Computer Vision'],
  },
  {
    title: 'B.Tech Data Science',
    slug: 'btech-ds',
    level: 'UG',
    schoolName: 'School of Computer Science & AI',
    durationYears: 4,
    intakeCapacity: 120,
    tuitionFeePerYear: 155000,
    specializations: ['Big Data Systems', 'Predictive Modeling', 'Business Intelligence'],
  },
  {
    title: 'B.Tech Electronics & Communication (Robotics & IoT)',
    slug: 'btech-ece',
    level: 'UG',
    schoolName: 'School of Engineering',
    durationYears: 4,
    intakeCapacity: 120,
    tuitionFeePerYear: 145000,
    specializations: ['Industrial Robotics', 'Embedded IoT Systems', 'VLSI Design'],
  },
  {
    title: 'B.Tech Mechanical Engineering (Smart Manufacturing)',
    slug: 'btech-me',
    level: 'UG',
    schoolName: 'School of Engineering',
    durationYears: 4,
    intakeCapacity: 60,
    tuitionFeePerYear: 135000,
    specializations: ['Additive 3D Prototyping', 'CAD/CAM & Digital Twins', 'Hydraulics & Automation'],
  },
  {
    title: 'Bachelor of Computer Applications (BCA)',
    slug: 'bca',
    level: 'UG',
    schoolName: 'School of Computer Science & AI',
    durationYears: 3,
    intakeCapacity: 120,
    tuitionFeePerYear: 95000,
    specializations: ['Modern Web Architecture', 'Mobile Apps Development', 'Database Administration'],
  },
  {
    title: 'Master of Business Administration (MBA)',
    slug: 'mba',
    level: 'PG',
    schoolName: 'School of Management',
    durationYears: 2,
    intakeCapacity: 120,
    tuitionFeePerYear: 160000,
    specializations: ['Technology Management', 'Business Analytics', 'Digital Marketing'],
  },
  {
    title: 'M.Tech Computer Science & Engineering',
    slug: 'mtech-cse',
    level: 'PG',
    schoolName: 'School of Computer Science & AI',
    durationYears: 2,
    intakeCapacity: 30,
    tuitionFeePerYear: 115000,
    specializations: ['High Performance Computing', 'Distributed Algorithms', 'Applied AI Systems'],
  },
  {
    title: 'Doctor of Philosophy (Ph.D.) in Computer Science',
    slug: 'phd-cs',
    level: 'PhD',
    schoolName: 'School of Computer Science & AI',
    durationYears: 3,
    intakeCapacity: 15,
    tuitionFeePerYear: 80000,
    specializations: ['AI & Autonomous Systems', 'Quantum Computing', 'Bioinformatics'],
  },
  {
    title: 'Doctor of Philosophy (Ph.D.) in Electronics & Engineering',
    slug: 'phd-ece',
    level: 'PhD',
    schoolName: 'School of Engineering',
    durationYears: 3,
    intakeCapacity: 10,
    tuitionFeePerYear: 80000,
    specializations: ['Advanced Robotics & MEMS', 'RF & Antenna Systems', 'IoT Architectures'],
  },
]

export interface ProgramExplorerProps {
  programs?: ProgramItem[]
  onSelectProgram?: (slug: string) => void
}

export function ProgramExplorer({
  programs = DEFAULT_PROGRAMS,
  onSelectProgram,
}: ProgramExplorerProps) {
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'UG' | 'PG' | 'PhD'>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchesLevel = selectedLevel === 'All' || p.level === selectedLevel
      const matchesQuery =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesLevel && matchesQuery
    })
  }, [programs, selectedLevel, searchQuery])

  return (
    <section id="programs" className="py-20 px-4 bg-slate-50/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-pale text-amber-900 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber" />
            <span>Academic Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight">
            Explore Future-Ready Programs
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Multidisciplinary degree programs mapped to Industry 4.0 competencies, experiential laboratories, and global research standards.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Level Tabs */}
          <div className="flex items-center p-1 bg-white rounded-xl shadow-sm border border-slate-200">
            {(['All', 'UG', 'PG', 'PhD'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                {lvl === 'All' ? 'All Programs' : lvl === 'PhD' ? 'Doctoral (Ph.D.)' : `${lvl} Degrees`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by degree or specialization..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
            <p className="text-sm font-semibold text-navy">No matching programs found.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the filter or search keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.slug}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Badge & School */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        prog.level === 'UG'
                          ? 'bg-blue-50 text-blue-700'
                          : prog.level === 'PG'
                          ? 'bg-purple-50 text-purple-700'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {prog.level}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium truncate">
                      {prog.schoolName}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-navy group-hover:text-amber transition-colors leading-snug">
                    {prog.title}
                  </h3>

                  {/* Program stats */}
                  <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prog.durationYears} Years</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prog.intakeCapacity} Seats</span>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="space-y-1.5 mb-5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Focus Tracks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.specializations.map((spec, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-amber" />
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with fee & CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Annual Tuition</span>
                    <span className="text-sm font-extrabold text-navy">
                      ₹{prog.tuitionFeePerYear.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <a
                    href="#calculator"
                    onClick={() => {
                      if (onSelectProgram) onSelectProgram(prog.slug)
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-bold transition-colors group-hover:bg-amber group-hover:text-navy-dark"
                  >
                    <span>Check Fee</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
