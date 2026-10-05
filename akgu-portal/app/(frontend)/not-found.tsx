import React from 'react'
import Link from 'next/link'
import { GraduationCap, ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-pale text-amber flex items-center justify-center mx-auto shadow-sm">
          <GraduationCap className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black font-display text-navy">404</span>
          <h1 className="text-xl font-bold text-navy">Page Not Found</h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            The university portal page you are looking for does not exist or may have been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-light transition-all flex items-center justify-center gap-2 shadow"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/#programs"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-navy border border-slate-200 text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Explore Programs</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
