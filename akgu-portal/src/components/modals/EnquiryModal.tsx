'use client'

import React, { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Sparkles, CheckCircle, Send, ArrowRight } from 'lucide-react'

export interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  defaultProgram?: string
}

export function EnquiryModal({ isOpen, onClose, defaultProgram }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: defaultProgram || 'btech-cse',
    city: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (defaultProgram) {
      setFormData((prev) => ({ ...prev, program: defaultProgram }))
    }
  }, [defaultProgram])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your full name')
      return
    }
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    // Success state
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setFormData({
      name: '',
      phone: '',
      email: '',
      program: 'btech-cse',
      city: '',
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Admissions Enquiry 2026–27" maxWidth="max-w-md">
      {isSubmitted ? (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-bold text-navy font-display">Application Received!</h4>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
            Thank you, <span className="font-semibold text-navy">{formData.name}</span>! Our admissions counselor will contact you at{' '}
            <span className="font-semibold text-navy">{formData.phone}</span> within 24 hours.
          </p>
          <div className="p-3 bg-amber-pale/60 rounded-xl border border-amber/20 text-xs text-amber-900 font-medium">
            Application Reference ID: <span className="font-mono font-bold">AKGU-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-light transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-slate-500">
            Fill out the details below to receive program brochures, fee schedules, and scholarship guidance.
          </p>

          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="10-digit mobile number"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Interested Program <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy bg-white"
            >
              <option value="btech-cse">B.Tech Computer Science & Engineering</option>
              <option value="btech-ai">B.Tech Artificial Intelligence & Machine Learning</option>
              <option value="btech-ds">B.Tech Data Science</option>
              <option value="btech-ece">B.Tech Electronics & Communication (Robotics)</option>
              <option value="bca">Bachelor of Computer Applications (BCA)</option>
              <option value="mba">MBA in Technology Management</option>
              <option value="mtech">M.Tech Advanced Computing</option>
              <option value="phd">Doctoral Research (Ph.D.)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">City / State</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="e.g. Ghaziabad / Delhi / Lucknow"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber hover:bg-amber-light text-navy-dark font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Enquiry & Get Prospectus</span>
          </button>
        </form>
      )}
    </Modal>
  )
}
