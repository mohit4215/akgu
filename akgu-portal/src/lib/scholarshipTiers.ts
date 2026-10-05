export interface ScholarshipTier {
  minPct: number
  discountPct: number
  label: string
  emoji: string
  badgeColor: string
}

export interface ScholarshipResult {
  tier: ScholarshipTier
  discountAmount: number
  netPayable: number
  monthlyEmi: number
  baseFee: number
  percentage: number
}

export const SCHOLARSHIP_TIERS: ScholarshipTier[] = [
  { minPct: 95, discountPct: 100, label: 'Super-30 Full Scholarship', emoji: '🏆', badgeColor: 'bg-amber-500 text-white' },
  { minPct: 90, discountPct: 75,  label: 'Gold Merit Scholarship',    emoji: '🥇', badgeColor: 'bg-yellow-500 text-navy-dark' },
  { minPct: 85, discountPct: 50,  label: 'Silver Merit Scholarship',  emoji: '🥈', badgeColor: 'bg-slate-400 text-white' },
  { minPct: 80, discountPct: 30,  label: 'Bronze Merit Scholarship',  emoji: '🥉', badgeColor: 'bg-amber-700 text-white' },
  { minPct: 75, discountPct: 15,  label: 'Academic Excellence Award', emoji: '⭐', badgeColor: 'bg-blue-600 text-white' },
  { minPct: 0,  discountPct: 0,   label: 'Standard Tuition Fee',     emoji: '📋', badgeColor: 'bg-gray-100 text-gray-700' },
]

export function calculateScholarship(baseFee: number, percentage: number): ScholarshipResult {
  const safeBaseFee = Math.max(0, baseFee || 0)
  const safePct = Math.max(0, Math.min(100, percentage || 0))

  const tier = SCHOLARSHIP_TIERS.find((t) => safePct >= t.minPct) ?? SCHOLARSHIP_TIERS[SCHOLARSHIP_TIERS.length - 1]
  const discountAmount = Math.round((safeBaseFee * tier.discountPct) / 100)
  const netPayable = Math.max(0, safeBaseFee - discountAmount)
  const monthlyEmi = Math.ceil(netPayable / 12)

  return {
    tier,
    discountAmount,
    netPayable,
    monthlyEmi,
    baseFee: safeBaseFee,
    percentage: safePct,
  }
}
