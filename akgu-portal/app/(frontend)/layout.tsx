import React from 'react'
import { FrontendShell } from '@/components/layout/FrontendShell'
import { BackToTop } from '@/components/ui/BackToTop'

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Ajay Kumar Garg University',
  alternateName: 'AKGU',
  url: 'https://akgu.ac.in',
  logo: 'https://akgu.ac.in/logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '27 KM Milestone, Delhi-Meerut Expressway',
    addressLocality: 'Ghaziabad',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201009',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-1800-254-8264',
    contactType: 'admissions',
    email: 'admissions@akgu.ac.in',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://www.facebook.com/akgu',
    'https://twitter.com/akgu',
    'https://www.linkedin.com/school/akgu',
    'https://www.instagram.com/akgu',
  ],
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      <FrontendShell>
        {children}
        <BackToTop />
      </FrontendShell>
    </>
  )
}
