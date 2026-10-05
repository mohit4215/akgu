import React from 'react'
import { Cpu, Cog, Layers, Activity, ArrowRight, ExternalLink } from 'lucide-react'

export interface CoEItem {
  name: string
  industryPartner: string
  description: string
  keyHighlights: string[]
  iconType: 'robot' | 'automation' | 'printing' | 'ni'
}

const DEFAULT_COES: CoEItem[] = [
  {
    name: 'KUKA Industrial Robotics Training Centre',
    industryPartner: 'KUKA AG (Germany)',
    description:
      'Premier industrial robotics facility equipped with heavy-payload articulated robotic arms for robotic welding, palletizing, machine tending, and autonomous factory cells.',
    keyHighlights: ['KUKA Certified Trainee credentials', 'Direct recruitment into auto OEMs', 'Hands-on robot teach pendant programming'],
    iconType: 'robot',
  },
  {
    name: 'Siemens PLM & Bosch Rexroth Automation Lab',
    industryPartner: 'Siemens Industry & Bosch Rexroth',
    description:
      'Advanced smart factory testbed featuring electro-pneumatics, proportional hydraulics, PLC/SCADA control systems, and digital twin simulation.',
    keyHighlights: ['Mechatronics & Industry 4.0 curriculum', 'Joint certification by Bosch Rexroth', 'Industrial conveyor and sorter lines'],
    iconType: 'automation',
  },
  {
    name: '3D Printing & Additive Manufacturing Centre',
    industryPartner: 'Stratasys & 3D Systems',
    description:
      'High-precision prototyping lab featuring industrial FDM, stereolithography (SLA) resin printers, and 3D optical scanning for rapid medical and aerospace modeling.',
    keyHighlights: ['CAD to functional prototype workflows', 'Reverse engineering 3D scanners', 'Student start-up incubation support'],
    iconType: 'printing',
  },
  {
    name: 'National Instruments (NI) LabVIEW Centre',
    industryPartner: 'National Instruments (USA)',
    description:
      'Dedicated virtual instrumentation laboratory utilizing NI cRIO controllers, PXI chassis, and LabVIEW graphical programming for automated measurement and testing.',
    keyHighlights: ['Certified LabVIEW Associate Developer (CLAD)', 'Hardware-in-the-loop (HIL) testing', 'Sensor data telemetry & IoT'],
    iconType: 'ni',
  },
]

export function CentresOfExcellenceBlock() {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'robot':
        return <Cpu className="w-6 h-6 text-amber" />
      case 'automation':
        return <Cog className="w-6 h-6 text-blue-400" />
      case 'printing':
        return <Layers className="w-6 h-6 text-green-400" />
      case 'ni':
        return <Activity className="w-6 h-6 text-purple-400" />
      default:
        return <Cpu className="w-6 h-6 text-amber" />
    }
  }

  return (
    <section id="coe" className="py-20 px-4 bg-navy-dark text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber/20 text-amber-pale border border-amber/30 mb-3">
            <Cpu className="w-3.5 h-3.5 text-amber" />
            <span>Industry 4.0 Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Centres of Excellence & Innovation
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Established in partnership with top global industry leaders, offering our students industry-grade lab exposure and global corporate certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEFAULT_COES.map((coe, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-amber/50 hover:bg-white/10 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Partner Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {renderIcon(coe.iconType)}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber/20 text-amber border border-amber/30">
                    {coe.industryPartner}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber transition-colors mb-2.5 leading-snug">
                  {coe.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {coe.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-white/10 mb-4">
                  {coe.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#research"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber hover:text-white transition-colors pt-2"
              >
                <span>Lab Tour & Facilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
