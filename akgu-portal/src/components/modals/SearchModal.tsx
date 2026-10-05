'use client'

import React, { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Search, ArrowRight, BookOpen, Cpu, Award, Building, FileText } from 'lucide-react'

export interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchItem {
  title: string
  category: 'Program' | 'Centre of Excellence' | 'Campus' | 'Admission' | 'Research'
  url: string
  desc: string
}

const SEARCH_INDEX: SearchItem[] = [
  { title: 'B.Tech Computer Science & Engineering', category: 'Program', url: '#programs', desc: '4 Years | ₹1,55,000/yr | Specializations in Cloud, Full-stack' },
  { title: 'B.Tech Artificial Intelligence & Machine Learning', category: 'Program', url: '#programs', desc: '4 Years | ₹1,55,000/yr | Deep Learning, NLP, Computer Vision' },
  { title: 'B.Tech Data Science', category: 'Program', url: '#programs', desc: '4 Years | ₹1,55,000/yr | Big Data Analytics, Predictive Modeling' },
  { title: 'Bachelor of Computer Applications (BCA)', category: 'Program', url: '#programs', desc: '3 Years | ₹95,000/yr | Web Dev, App Design, Database Systems' },
  { title: 'Master of Business Administration (MBA)', category: 'Program', url: '#programs', desc: '2 Years | ₹1,60,000/yr | Tech Management, Business Analytics, Finance' },
  { title: 'M.Tech Computer Science', category: 'Program', url: '#programs', desc: '2 Years | ₹1,15,000/yr | High Performance Computing, Distributed Systems' },
  { title: 'Doctor of Philosophy (Ph.D.) in Engineering', category: 'Research', url: '#research', desc: 'Full-time & Part-time research under UGC & AICTE frameworks' },
  { title: 'KUKA Industrial Robotics Training Centre', category: 'Centre of Excellence', url: '#coe', desc: 'German 6-axis industrial robots, certified automation training' },
  { title: 'Siemens PLM & Bosch Rexroth Automation Lab', category: 'Centre of Excellence', url: '#coe', desc: 'Industry 4.0 hydraulic, pneumatic, and CNC manufacturing' },
  { title: '3D Printing & Additive Manufacturing Centre', category: 'Centre of Excellence', url: '#coe', desc: 'Industrial grade SLA & FDM rapid prototyping machines' },
  { title: 'National Instruments (NI) LabVIEW Centre', category: 'Centre of Excellence', url: '#coe', desc: 'Virtual instrumentation, graphical system design, and sensors' },
  { title: 'AICTE IDEA Lab Maker Space', category: 'Research', url: '#research', desc: 'Interdisciplinary fabrication facility with laser cutters & IoT' },
  { title: 'Campus Placements 2025', category: 'Campus', url: '#placements', desc: 'Highest package ₹42 LPA, 1200+ total job offers' },
  { title: 'Hostel & Residential Life', category: 'Campus', url: '#campus', desc: 'Air-conditioned on-campus accommodation with 24x7 security' },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        // toggle modal
        if (isOpen) onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const results = query.trim()
    ? SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_INDEX.slice(0, 5)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Program':
        return <BookOpen className="w-4 h-4 text-amber" />
      case 'Centre of Excellence':
        return <Cpu className="w-4 h-4 text-blue-500" />
      case 'Research':
        return <Award className="w-4 h-4 text-purple-500" />
      case 'Campus':
        return <Building className="w-4 h-4 text-green-500" />
      default:
        return <FileText className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl" ariaLabel="Search AKGU Portal">
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, robotics lab, faculty, placements..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
          />
        </div>

        {/* Results List */}
        <div className="space-y-1.5 max-h-80 overflow-y-auto">
          <div className="text-[11px] font-semibold text-slate-400 px-2 uppercase tracking-wider">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Searches'}
          </div>

          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No results found for &ldquo;<span className="text-navy font-semibold">{query}</span>&rdquo;. Try searching &ldquo;B.Tech&rdquo; or &ldquo;Robotics&rdquo;.
            </div>
          ) : (
            results.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                onClick={onClose}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group block border border-transparent hover:border-slate-100"
              >
                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all mt-0.5">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-navy group-hover:text-amber transition-colors truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber transition-colors self-center flex-shrink-0" />
              </a>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </Modal>
  )
}
