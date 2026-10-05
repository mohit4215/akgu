import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Ajay Kumar Garg University (AKGU) | Education 4.0 | Ghaziabad, Delhi-NCR',
    template: '%s | AKGU',
  },
  description:
    'Ajay Kumar Garg University (AKGU) — Empowering Innovation & Education 4.0 in Ghaziabad, Delhi-NCR. UG, PG & Ph.D. admissions open for 2026–27.',
  keywords: ['AKGU', 'Ajay Kumar Garg University', 'B.Tech', 'MBA', 'Ph.D.', 'Ghaziabad', 'Delhi-NCR', 'Engineering'],
  authors: [{ name: 'AKGU Web Team' }],
  creator: 'AKGU',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    siteName: 'Ajay Kumar Garg University',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
