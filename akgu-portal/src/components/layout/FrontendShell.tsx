'use client'

import React, { useState, useEffect } from 'react'
import { AnnouncementBanner } from './AnnouncementBanner'
import { Header } from './Header'
import { Footer } from './Footer'
import { EnquiryModal } from '@/components/modals/EnquiryModal'
import { SearchModal } from '@/components/modals/SearchModal'

export interface FrontendShellProps {
  children: React.ReactNode
}

export function FrontendShell({ children }: FrontendShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const [enquiryProgram, setEnquiryProgram] = useState<string>('btech-cse')

  // Auto-open Enquiry modal after 10 seconds if not previously seen in this session
  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyPrompted = sessionStorage.getItem('akgu_enquiry_auto_prompted')
      if (!alreadyPrompted) {
        setIsEnquiryOpen(true)
        sessionStorage.setItem('akgu_enquiry_auto_prompted', 'true')
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  // Listen to hash changes or custom events for #enquiry
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#enquiry') {
        setIsEnquiryOpen(true)
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleOpenEnquiry = (programSlug?: string) => {
    if (programSlug) {
      setEnquiryProgram(programSlug)
    }
    setIsEnquiryOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-800 bg-offwhite">
      <AnnouncementBanner />
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      <main className="flex-1">{children}</main>

      <Footer />

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProgram={enquiryProgram}
      />
    </div>
  )
}
