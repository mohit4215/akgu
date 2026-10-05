import { getPayloadClient } from './payload'

export async function seedDatabase() {
  const payload = await getPayloadClient()

  console.log('--- Starting AKGU Database Seeder ---')

  // 1. Seed Schools
  const existingSchools = await payload.find({ collection: 'schools', limit: 10 })
  let schoolMap: Record<string, string> = {}

  if (existingSchools.totalDocs === 0) {
    const schoolsData = [
      { name: 'School of Computer Science & AI', code: 'SCSAI', description: 'Computing, Artificial Intelligence, and Data Science' },
      { name: 'School of Engineering', code: 'SOE', description: 'Robotics, Electronics, Mechanical and Civil Engineering' },
      { name: 'School of Management', code: 'SOM', description: 'Business Analytics, Technology Management and Leadership' },
    ]

    for (const s of schoolsData) {
      const doc = await payload.create({ collection: 'schools', data: s })
      schoolMap[s.code] = doc.id
      console.log(`Created school: ${s.name}`)
    }
  } else {
    for (const doc of existingSchools.docs) {
      if (doc.code) schoolMap[doc.code] = doc.id
    }
  }

  // 2. Seed Programs
  const existingPrograms = await payload.find({ collection: 'programs', limit: 10 })
  if (existingPrograms.totalDocs === 0) {
    const programsData = [
      {
        title: 'B.Tech Computer Science & Engineering',
        slug: 'btech-cse',
        level: 'UG',
        school: schoolMap['SCSAI'],
        durationYears: 4,
        intakeCapacity: 240,
        tuitionFeePerYear: 155000,
        specializations: [{ specialization: 'Cloud Computing' }, { specialization: 'Full-Stack Development' }],
        published: true,
      },
      {
        title: 'B.Tech Artificial Intelligence & Machine Learning',
        slug: 'btech-aiml',
        level: 'UG',
        school: schoolMap['SCSAI'],
        durationYears: 4,
        intakeCapacity: 180,
        tuitionFeePerYear: 155000,
        specializations: [{ specialization: 'Deep Learning' }, { specialization: 'Computer Vision' }],
        published: true,
      },
      {
        title: 'B.Tech Electronics & Communication (Robotics & IoT)',
        slug: 'btech-ece',
        level: 'UG',
        school: schoolMap['SOE'],
        durationYears: 4,
        intakeCapacity: 120,
        tuitionFeePerYear: 145000,
        specializations: [{ specialization: 'Industrial Robotics' }, { specialization: 'Embedded IoT' }],
        published: true,
      },
      {
        title: 'Bachelor of Computer Applications (BCA)',
        slug: 'bca',
        level: 'UG',
        school: schoolMap['SCSAI'],
        durationYears: 3,
        intakeCapacity: 120,
        tuitionFeePerYear: 95000,
        specializations: [{ specialization: 'Web Architecture' }, { specialization: 'Mobile Apps' }],
        published: true,
      },
      {
        title: 'Master of Business Administration (MBA)',
        slug: 'mba',
        level: 'PG',
        school: schoolMap['SOM'],
        durationYears: 2,
        intakeCapacity: 120,
        tuitionFeePerYear: 160000,
        specializations: [{ specialization: 'Tech Management' }, { specialization: 'Business Analytics' }],
        published: true,
      },
      {
        title: 'Doctor of Philosophy (Ph.D.) in Computer Science',
        slug: 'phd-cs',
        level: 'PhD',
        school: schoolMap['SCSAI'],
        durationYears: 3,
        intakeCapacity: 15,
        tuitionFeePerYear: 80000,
        specializations: [{ specialization: 'Quantum Computing' }, { specialization: 'Autonomous Systems' }],
        published: true,
      },
    ]

    for (const prog of programsData) {
      await payload.create({ collection: 'programs', data: prog as any })
      console.log(`Created program: ${prog.title}`)
    }
  }

  // 3. Seed Centres of Excellence
  const existingCoEs = await payload.find({ collection: 'centres-of-excellence', limit: 10 })
  if (existingCoEs.totalDocs === 0) {
    const coesData = [
      {
        name: 'KUKA Industrial Robotics Training Centre',
        industryPartner: 'KUKA AG (Germany)',
        description: 'Industrial robotics facility equipped with heavy articulated arms.',
        keyHighlights: [{ highlight: 'KUKA Certified Credentials' }, { highlight: 'Industrial Robot Programming' }],
      },
      {
        name: 'Siemens PLM & Bosch Rexroth Automation Lab',
        industryPartner: 'Siemens & Bosch Rexroth',
        description: 'Industry 4.0 hydraulic, pneumatic, and digital factory simulation.',
        keyHighlights: [{ highlight: 'Smart Factory Testbed' }, { highlight: 'Joint Bosch Certifications' }],
      },
      {
        name: '3D Printing & Additive Manufacturing Centre',
        industryPartner: 'Stratasys & 3D Systems',
        description: 'Rapid industrial prototyping with SLA and FDM printers.',
        keyHighlights: [{ highlight: 'High-precision CAD Workflows' }, { highlight: 'Rapid Prototyping' }],
      },
      {
        name: 'National Instruments (NI) LabVIEW Centre',
        industryPartner: 'National Instruments (USA)',
        description: 'Virtual instrumentation and automated measurement systems.',
        keyHighlights: [{ highlight: 'CLAD Certification Support' }, { highlight: 'Hardware-in-the-Loop Testing' }],
      },
    ]

    for (const c of coesData) {
      await payload.create({ collection: 'centres-of-excellence', data: c as any })
      console.log(`Created CoE: ${c.name}`)
    }
  }

  // 4. Seed Placements
  const existingPlacements = await payload.find({ collection: 'placements', limit: 1 })
  if (existingPlacements.totalDocs === 0) {
    await payload.create({
      collection: 'placements',
      data: {
        year: 2025,
        highestPackage: '₹42 LPA',
        averagePackage: '₹8.5 LPA',
        totalOffers: 1200,
        topRecruiters: [
          { name: 'Google' },
          { name: 'Amazon AWS' },
          { name: 'Microsoft' },
          { name: 'Bosch Rexroth' },
          { name: 'TCS Digital' },
        ],
      } as any,
    })
    console.log('Created Placements document (2025)')
  }

  // 5. Seed Homepage
  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  if (existingHome.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Ajay Kumar Garg University — Homepage',
        slug: 'home',
        published: true,
        meta: {
          title: 'Ajay Kumar Garg University (AKGU) | Education 4.0 | Ghaziabad, Delhi-NCR',
          description: 'Official university portal with B.Tech, MBA, and Ph.D. admissions open for 2026–27.',
        },
        layout: [
          { blockType: 'hero' },
          { blockType: 'stats' },
          { blockType: 'program-explorer' },
          { blockType: 'centres-of-excellence' },
          { blockType: 'placement-ticker' },
          { blockType: 'call-to-action' },
        ],
      } as any,
    })
    console.log('Created Homepage document (slug: home)')
  }

  console.log('--- Database Seeding Complete ---')
}
