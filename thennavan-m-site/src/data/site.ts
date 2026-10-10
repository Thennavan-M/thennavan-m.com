// ---------------------------------------------------------------------------
// All the words on the website live in this one file.
// Edit text here, save, and every page updates. You never need to touch the
// page templates to add a paper, a project, a course or a news item.
//
// Lists appear on the site in the order written here, so keep the newest
// item at the top.
// ---------------------------------------------------------------------------

export const person = {
  name: 'Thennavan M',
  honorific: 'Dr.',
  role: 'Postdoctoral Fellow',
  department: 'Department of Earthquake Engineering',
  institution: 'Indian Institute of Technology Roorkee',
  institutionShort: 'IIT Roorkee',

  // Used in search results and when the site is shared.
  summary:
    'Structural and earthquake engineer at IIT Roorkee working on seismic protection and vibration control: passive dampers, steel sections, functionally graded materials and large-scale testing.',

  // Biography on the home page, one paragraph per string.
  bio: [
    'Dr. Thennavan M is a structural and earthquake engineer and a Postdoctoral Fellow in the Department of Earthquake Engineering at IIT Roorkee. His work is about keeping seismic energy out of structures rather than asking structures to endure it. He designs passive and tunable energy-dissipating devices and takes them from concept and constitutive model to patent. Four Indian patent applications have come from this work so far, one of them granted.',
    'He received his PhD from IIT Madras in 2024 under Prof. Srinivasan Chandrasekaran. His thesis developed a coped steel beam for offshore topsides with a functionally graded stiffener, printed by wire arc additive manufacturing from carbon-manganese steel graded to Stellite 6. He tested the beams to failure and under drop-weight impact from 1 to 10 m, validated finite element models against every test series, and showed that the stiffener reduces strain and displacement at the cope.',
    'From October 2024 to January 2026 he was a Postdoctoral Researcher at the University of Naples Federico II, working with Prof. Nicolò Vaiana and Prof. Daniele Losanno on hysteretic modelling and eco-friendly seismic protection of underground tunnels under the EU-funded PRIN 2022 PNRR project. His Marie Skłodowska-Curie fellowship proposal received the European Commission’s Seal of Excellence. He is open to faculty positions, collaboration on vibration-control devices, and consultancy in seismic assessment and retrofit.',
  ],

  email: 'thennavan.tm@gmail.com',
  phone: '+91 94891 66603',
  // Set to false to hide the phone number everywhere on the site.
  showPhone: true,
  office: [
    'Department of Earthquake Engineering',
    'Indian Institute of Technology Roorkee',
    'Roorkee, Uttarakhand 247667, India',
  ],
  mapQuery: 'Department of Earthquake Engineering, IIT Roorkee',

  // Square photo in public/images/. Set to '' to show initials instead.
  photo: '/images/thennavan.jpg',
  initials: 'TM',

  // Your CV: save it in public/ (e.g. public/Thennavan_CV.pdf) and write
  // '/Thennavan_CV.pdf' here. "Download CV" buttons appear once this is set.
  cv: '',

  // Shown in the footer, as on the old site.
  motto: { text: 'யாதும் ஊரே யாவரும் கேளிர்', lang: 'ta' },
};

export const profiles = [
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=4X9LXlgAAAAJ&hl=en' },
  { label: 'ORCID', href: 'https://orcid.org/0000-0002-7682-4511' },
  { label: 'Scopus', href: 'https://www.scopus.com/authid/detail.uri?authorId=58956895500' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Thennavan-M' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thennavan17' },
];

// Shown in one gold line under your name and department on the About page.
export const specialisations = ['Steel Structures', 'Additive Manufacturing', 'Seismic Protection'];

export const openTo = [
  'Faculty positions in structural and earthquake engineering',
  'Research collaboration on vibration-control devices',
  'Consultancy in seismic assessment and retrofit',
];

// ---------------------------------------------------------------------------
// Research
// ---------------------------------------------------------------------------

export const researchIntro =
  'I work on seismic protection and vibration control, from passive devices that dissipate earthquake energy to steel sections that resist buckling and impact. Material behaviour comes from the laboratory, and a numerical model is only as useful as the experiment it can reproduce.';

// Research areas: listed on the home page and at the top of the Research page.
export const areas = [
  {
    id: 'seismic-protection',
    title: 'Seismic vibration control and passive devices',
    text: 'Hysteretic, wire-rope, granular and viscoelastic dampers, taken from concept and constitutive model to patent. A device has to be manufacturable, installable and tunable on site, and its model stays provisional until test data exists.',
  },
  {
    id: 'steel-sections',
    title: 'Performance of steel sections',
    text: 'Filled steel tubes, composite sections, coped beams and connections under buckling, impact and axial load.',
  },
  {
    id: 'graded-materials',
    title: 'Functionally graded materials',
    text: 'Steels graded by wire arc additive manufacturing to put strength where stress concentrates.',
  },
  {
    id: 'experimental-numerical',
    title: 'Large-scale experimental and numerical analysis',
    text: 'Full-scale, impact, fatigue and shake-table tests with strain gauges and digital image correlation, paired with nonlinear models in ABAQUS and OpenSees.',
  },
  {
    id: 'railway-bridges',
    title: 'Fatigue of ageing steel bridges',
    text: 'Fatigue and corrosion of riveted joints taken from in-service railway girders.',
  },
];

// Research and experimental work, with figures. `plot: true` adds the
// computed damper loops. Figures live in public/images/research/.
export const experiments = [
  {
    id: 'vibration-control-devices',
    title: 'Passive vibration control devices',
    place: 'Department of Structures for Engineering and Architecture, University of Naples Federico II',
    period: '2024–2026',
    text: 'Seismic protection strategies for underground tunnels, developed within a national research project funded by the European Union through NextGenerationEU. The emphasis is on eco-friendly solutions: low-impact, resource-efficient devices for underground infrastructure. The work covers constitutive and hysteretic modelling of passive energy-dissipating and isolation devices, and their use in nonlinear dynamic analysis.',
    outcomes: [] as string[],
    funding:
      'PRIN 2022 PNRR project P2022ZT5X5, Smart Under-Ground Infra-Structures for Secure Communities and Post-Disaster Emergency Response: Eco-Friendly Seismic Protection Solutions.',
    plot: true,
    figures: [] as Figure[],
  },
  {
    id: 'fgm',
    title: 'Functionally graded materials (FGM)',
    place: 'JAM Lab, IIT Madras',
    period: '2021–2024',
    text: 'The bearing plate of the coped-beam stiffener was made by wire arc additive manufacturing (WAAM) as a functionally graded material, grading carbon-manganese steel into Stellite 6. Its microstructure was characterised down to individual grains, and its strength, corrosion resistance and fracture mechanism were studied alongside those of the constituent alloys.',
    outcomes: ['The graded material reached an ultimate tensile strength of 720 MPa.'],
    funding: '',
    plot: false,
    figures: [
      {
        src: '/images/research/waam-fgm.webp',
        width: 1277,
        height: 693,
        alt: 'Robotic WAAM cell, deposition of the graded wall, hardness profile, tensile tests and electron micrographs of the graded steel',
        caption:
          'Wire arc additive manufacturing: robotic deposition cell, the graded wall from carbon-manganese steel to Stellite 6, hardness across the interface, tensile tests, and microstructure with element maps.',
      },
    ] as Figure[],
  },
  {
    id: 'coped-beam-tests',
    title: 'Coped beam testing with DIC',
    place: 'Structural Engineering Laboratory, IIT Madras',
    period: '2021–2024',
    text: 'Steel coped beams in industrial structures carry clusters of water mains, fire hydrants, power cables and telecom lines. A new coped beam for offshore topsides was tested to failure, with digital image correlation (DIC) recording the strain field at the cope, and a finite element model was built and validated against the results. Buckling behaviour and failure patterns were studied in detail.',
    outcomes: [
      'Digital image correlation is proposed as an effective tool for the structural assessment of steel coped beams.',
    ],
    funding: '',
    plot: false,
    figures: [
      {
        src: '/images/research/coped-beam-conventional.webp',
        width: 1217,
        height: 676,
        alt: 'Test set-up, load–displacement curves and six photographs of failed conventional coped beams',
        caption:
          'Conventional coped beams: test set-up, load–displacement response of CB-300, CB-500 and CB-600 against an uncoped 600 mm beam, and failure at the cope (a–f).',
      },
      {
        src: '/images/research/coped-beam-fgm.webp',
        width: 1232,
        height: 672,
        alt: 'Test set-up with the FGM stiffener, load–displacement curves and photographs of FGM-stiffened coped beams after testing',
        caption:
          'FGM-stiffened coped beams: test set-up with the graded stiffener at the cope, load–displacement response of FGM-CB-300, FGM-CB-500 and FGM-CB-600, and the specimens after testing.',
      },
      {
        src: '/images/research/coped-beam-dic.webp',
        width: 1195,
        height: 636,
        alt: 'Digital image correlation set-up and speckle patterns with measured strain fields for three coped beams',
        caption:
          'Digital image correlation: camera set-up, and the speckle pattern with the measured strain field at the cope for beams 300, 500 and 600 mm deep.',
      },
    ] as Figure[],
  },
  {
    id: 'impact-tests',
    title: 'Impact behaviour of coped beams',
    place: 'Department of Ocean Engineering, IIT Madras',
    period: '2021–2024',
    text: 'Drop-weight impact tests on steel and FGM-stiffened coped beams from heights of 1, 3, 5, 7 and 10 m, with strains and displacements recorded throughout.',
    outcomes: [
      'The cope corner and the impact region were the most vulnerable, with the highest strains and displacements.',
      'The FGM stiffener significantly reduced strains and displacements in the cope region.',
    ],
    funding: '',
    plot: false,
    figures: [
      {
        src: '/images/research/impact-tests.webp',
        width: 1198,
        height: 662,
        alt: 'Drop-weight impact set-up, strain gauge layout, strain time histories and a chart of displacement against fall height',
        caption:
          'Drop-weight impact tests: set-up and strain-gauge and accelerometer layout, strain histories of steel (CB) and FGM-stiffened (FGM-CB) beams, and displacement at each fall height.',
      },
    ] as Figure[],
  },
];

export type Figure = { src: string; width: number; height: number; alt: string; caption: string };

export const methods = [
  'ABAQUS',
  'OpenSees',
  'MATLAB',
  'Digital image correlation',
  'Strain gauges and accelerometers',
  'Servo-hydraulic static and fatigue testing',
  'Drop-weight impact testing',
  'Shake-table testing',
  'Wire arc additive manufacturing',
  'Autodesk Fusion',
];

export const codes = ['IS 1893', 'ASCE 7', 'Eurocode 8'];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const currentProjects = [
  {
    title: 'Fatigue and corrosion of riveted joints in steel railway bridges',
    tagline: 'Remaining-life assessment of in-service girders',
    where: 'IIT Roorkee, with Indian Railways (RDSO)',
    since: '2026',
    text: 'Coupon, static and high-cycle fatigue tests on riveted joint types, including crevice-corrosion and corrosion-fatigue series, backed by ABAQUS models scaled up to full girders.',
    role: 'Postdoctoral Fellow',
    focus: 'Riveted joints, fatigue, crevice corrosion',
    status: 'Ongoing',
  },
  {
    title: 'Wood-filled steel tubes',
    tagline: 'Axial compression of infilled hollow sections',
    where: 'IIT Roorkee',
    since: '2026',
    text: 'A half-scale pilot of 18 stub columns in circular, square and rectangular sections, comparing hollow, wood-filled and rod-reinforced wood-filled tubes, with analytical buckling studies run ahead of the tests.',
    role: 'Lead researcher',
    focus: 'Local buckling, confinement, axial capacity',
    status: 'Ongoing',
  },
  {
    title: 'Hybrid steel-wire hysteretic damper',
    tagline: 'A double-acting spring and wire-rope damper',
    where: 'Independent work',
    since: '2025',
    text: 'A damper of my own design that pairs a compression spring with a helical wire rope, so it dissipates energy in both tension and compression. Indian patent application 202541130528 was filed in December 2025 and the complete specification is in preparation. A journal paper on its analytical hysteretic model is being written.',
    role: 'Inventor',
    focus: 'Hysteresis, energy dissipation, railway track',
    status: 'Patent filed',
  },
  {
    title: 'Wire-rope isolators for buried pipelines',
    tagline: 'An analytical design approach',
    where: 'Independent work',
    since: '2025',
    text: 'A method for sizing wire-rope isolators that protect pipelines during earthquakes, to be checked against large-scale shake-table tests.',
    role: 'Lead author',
    focus: 'Pipelines, isolation, design method',
    status: 'Paper in preparation',
  },
];

export const pastProjects = [
  {
    title: 'PRIN 2022 PNRR P2022ZT5X5',
    tagline:
      'Smart Under-Ground Infra-Structures for Secure Communities and Post-Disaster Emergency Response: Eco-Friendly Seismic Protection Solutions',
    where: 'University of Naples Federico II',
    period: 'Oct 2024 – Jan 2026',
    text: 'Eco-friendly modelling and design of seismic protection for underground tunnels: constitutive and hysteretic modelling of passive energy-dissipating and isolation devices for nonlinear dynamic analysis.',
    facts: [
      { label: 'Role', value: 'Researcher (postdoctoral)' },
      { label: 'PI', value: 'Prof. M. Ferretti; substitute PI Prof. N. Vaiana' },
      { label: 'Funding', value: 'European Union, NextGenerationEU, Mission 4, Component 1' },
      { label: 'CUP Master', value: 'E53D23017620001' },
    ],
  },
  {
    title: 'Offshore topside with steel and FGM-stiffened coped beams',
    tagline: 'PhD research',
    where: 'IIT Madras',
    period: 'Aug 2021 – Jun 2024',
    text: 'A coped steel beam for offshore topsides with a functionally graded stiffener at the cope: full-scale and drop-weight impact tests, digital image correlation, wire arc additive manufacturing of the graded steel, and validated finite element models.',
    facts: [
      { label: 'Supervisor', value: 'Prof. Srinivasan Chandrasekaran' },
      { label: 'Outcomes', value: 'Indian Patent No. 574714, two journal articles, two conference papers' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Publications and patents
// ---------------------------------------------------------------------------

export type Article = {
  authors: string;
  year: number;
  title: string;
  venue: string;
  details?: string;
  doi?: string;
  url?: string;
};

export const journalArticles: Article[] = [
  {
    authors: 'Chandrasekaran, S., Thennavan, M. & Phimpisan, P.',
    year: 2024,
    title: 'Experimental and numerical investigations of steel coped beam using DIC method',
    venue: 'Journal of Mechanical Science and Technology',
    details: '38, 4153–4160',
    doi: '10.1007/s12206-024-0712-x',
  },
  {
    authors: 'Chandrasekaran, S. & Thennavan, M.',
    year: 2024,
    title: 'Steel coped beam with functionally graded material for offshore topside: numerical investigations',
    venue: 'International Journal of Steel Structures',
    details: '24, 506–514',
    doi: '10.1007/s13296-024-00832-9',
  },
];

export const conferencePapers: Article[] = [
  {
    authors: 'Chandrasekaran, S., Thennavan, M. & Amirthalingam, M.',
    year: 2024,
    title: 'Structural assessment of functionally graded coped beam stiffeners used in offshore topside',
    venue: 'Proceedings of the ASME 2024 43rd International Conference on Ocean, Offshore and Arctic Engineering (OMAE2024)',
    details: 'Singapore, 9–14 June 2024, Vol. 3: Materials Technology; Subsea Technology',
    doi: '10.1115/OMAE2024-121355',
  },
  {
    authors: 'Chandrasekaran, S. & Thennavan, M.',
    year: 2023,
    title: 'Numerical analysis of coped beam with X52 steel and FGM used in offshore topside',
    venue: '33rd International Ocean and Polar Engineering Conference (ISOPE 2023)',
    details: 'Ottawa, Canada, June 2023',
    url: 'http://publications.isope.org/proceedings/ISOPE/ISOPE%202023/data/pdfs/287-2023-TPC-0174.pdf',
  },
  {
    authors: 'Pandurangan, K., Thennavan, M. & Muthadhi, A.',
    year: 2018,
    title: 'Studies on effect of source of flyash on the bond strength of geopolymer concrete',
    venue: 'Materials Today: Proceedings',
    details: '5(5, Part 2), 12725–12733',
    doi: '10.1016/j.matpr.2018.02.256',
  },
];

// Manuscripts under review or in preparation.
export const manuscripts = [
  { title: 'Experimental analysis of FGM-stiffened coped beams', venue: 'Structures (Elsevier)', status: 'Under review' },
  { title: 'WAAM assessment of FGM-stiffened coped beams', venue: 'Materials Science and Engineering: A (Elsevier)', status: 'Under review' },
  { title: 'Experimental investigation of FGM stiffeners for coped beams', venue: 'Composites Part B: Engineering (Elsevier)', status: 'Under review' },
  { title: 'Analytical design approach for seismic protection of pipelines using wire-rope isolators', venue: '', status: 'In preparation' },
];

export const patents = [
  {
    status: 'Granted',
    title: 'A functionally graded material (FGM) stiffened coped beam used in offshore and heavy industrial structures',
    number: 'Indian Patent No. 574714',
    note: 'Application 202341054963. Filed 16 Aug 2023, granted 27 Nov 2025.',
    year: 2025,
    link: 'https://drive.google.com/file/d/1373IiPrXzY7bo9-hhYwI08gg_jau0dgW/view',
  },
  {
    status: 'Filed',
    title: 'A hybrid multi-degree-of-freedom energy dissipating damper using a combined compression spring and wire-based damping mechanism',
    number: 'Application 202541130528',
    note: 'Filed 23 Dec 2025 at the Chennai Patent Office.',
    year: 2025,
    link: '',
  },
  {
    status: 'Filed',
    title: 'A tunable modular granular-viscoelastic adaptive damper for seismic protection of structures',
    number: 'Application 202541127849',
    note: '',
    year: 2025,
    link: '',
  },
  {
    status: 'Filed',
    title: 'An adaptive intelligent seismic damper with controllable fluid-elastomer energy dissipation mechanism',
    number: 'Application 202541127521',
    note: '',
    year: 2025,
    link: '',
  },
];

// ---------------------------------------------------------------------------
// Teaching
// ---------------------------------------------------------------------------

export const teachingStatement =
  'I prefer to teach structural dynamics through laboratory work and real devices rather than through equations alone.';

export const courses = [
  {
    title: 'Nonlinear Dynamics and Vibration Control',
    where: 'University of Naples Federico II',
    when: '2024–25',
    role: 'Teaching assistant',
    text: 'Nonlinear structural response, hysteretic behaviour and passive control devices.',
  },
  {
    title: 'Advanced Steel Design',
    where: 'IIT Madras',
    when: '2022–24',
    role: 'Teaching assistant',
    text: 'Design of steel members and connections for strength and stability.',
  },
  {
    title: 'Computer Methods of Structural Analysis',
    where: 'IIT Madras',
    when: '2022–24',
    role: 'Teaching assistant',
    text: 'Matrix stiffness methods and their computer implementation.',
  },
  {
    title: 'Dynamics of Ocean Structures',
    where: 'IIT Madras',
    when: '2022–24',
    role: 'Teaching assistant',
    text: 'Dynamic response of offshore structures to wave and environmental loads.',
  },
  {
    title: 'Offshore Structures under Special Loads',
    where: 'IIT Madras',
    when: '2022–24',
    role: 'Teaching assistant',
    text: 'Fire, blast, impact and other accidental loads on offshore platforms.',
  },
];

// ---------------------------------------------------------------------------
// News (newest first). Keep each item to one sentence.
// ---------------------------------------------------------------------------

export const news = [
  { date: 'Sep 2026', text: 'Joined the Department of Earthquake Engineering, IIT Roorkee, as a Postdoctoral Fellow.' },
  { date: 'Aug 2026', text: 'Elected a Member of the American Society of Civil Engineers (M.ASCE).' },
  { date: 'Dec 2025', text: 'Filed Indian patent application 202541130528 for a double-acting spring and wire-rope damper.' },
  { date: 'Nov 2025', text: 'Indian Patent No. 574714 granted for the FGM-stiffened coped beam.' },
  { date: '2025', text: 'Seal of Excellence from the European Commission for a Marie Skłodowska-Curie Postdoctoral Fellowship proposal.' },
  { date: 'Oct 2024', text: 'Joined the University of Naples Federico II as a Postdoctoral Researcher.' },
  { date: 'Jul 2024', text: 'PhD viva-voce at IIT Madras.' },
];

// ---------------------------------------------------------------------------
// CV
// ---------------------------------------------------------------------------

export const positions = [
  {
    when: 'Sep 2026 – present',
    title: 'Postdoctoral Fellow',
    org: 'Department of Earthquake Engineering, IIT Roorkee, India',
    note: 'With Prof. P. C. Ashwin Kumar',
  },
  { when: 'Feb 2026 – Aug 2026', title: 'Researcher', org: 'Puducherry, India', note: '' },
  {
    when: 'Oct 2024 – Jan 2026',
    title: 'Postdoctoral Researcher',
    org: 'Department of Structures for Engineering and Architecture, University of Naples Federico II, Italy',
    note: 'Mentors: Prof. Nicolò Vaiana and Prof. Daniele Losanno. PRIN 2022 PNRR project on eco-friendly seismic protection of underground structures.',
  },
  {
    when: 'Aug 2021 – Jun 2024',
    title: 'Research Scholar',
    org: 'Department of Ocean Engineering, IIT Madras, India',
    note: '',
  },
  { when: 'Sep 2020 – May 2021', title: 'Project Engineer', org: 'Studio Naqshabandi, Auroville, India', note: '' },
  { when: 'May 2019 – May 2020', title: 'Registered Engineer', org: 'Puducherry Planning Authority, India', note: '' },
  { when: 'Dec 2017 – Apr 2018', title: 'Graduate Trainee', org: 'Vland Engineering & Construction, Chennai, India', note: '' },
];

export const education = [
  {
    when: '2021–2024',
    year: '2024',
    title: 'Ph.D., Structural Engineering',
    org: 'Indian Institute of Technology Madras',
    thesis: 'Offshore topside with steel and FGM (functionally graded materials) stiffened coped beam',
    supervisor: 'Prof. Srinivasan Chandrasekaran',
  },
  {
    when: '2015–2017',
    year: '2017',
    title: 'M.Tech., Structural Engineering',
    org: 'Pondicherry Engineering College (now Puducherry Technological University)',
    thesis: 'Nonlinear finite element analysis to predict tension stiffening effects in RC beam',
    supervisor: 'Prof. K. Pandurangan',
  },
  {
    when: '2012–2015',
    year: '2015',
    title: 'B.Tech., Civil Engineering',
    org: 'Pondicherry Engineering College (now Puducherry Technological University)',
    thesis: 'Studies on bond strength of geopolymer concrete',
    supervisor: 'Prof. K. Pandurangan',
  },
];

// Education list on the About page: the Naples postdoc first, then the degrees.
export const aboutEducation = [
  { title: 'Postdoc, Structural and Earthquake Engineering', year: '2024–2026', org: 'University of Naples Federico II, Italy' },
  ...education.map((e) => ({ title: e.title, year: e.year, org: e.org })),
];

export const honours = [
  { when: '2026', text: 'Elected Member, American Society of Civil Engineers (M.ASCE)' },
  { when: '2025', text: 'Seal of Excellence, European Commission, Marie Skłodowska-Curie Actions Postdoctoral Fellowships' },
  { when: '2025', text: 'Indian Patent No. 574714 granted' },
];

export const training = [
  {
    when: '2024–25',
    text: 'One year of advanced training with DIST, UC Berkeley and EUCENTRE in structural control, seismic isolation, random vibration, soil–structure interaction and the numerical treatment of hysteretic systems.',
  },
];

export const collaborators = [
  { name: 'Prof. Srinivasan Chandrasekaran', org: 'IIT Madras' },
  { name: 'Prof. Murugaiyan Amirthalingam', org: 'IIT Madras' },
  { name: 'Prof. Nicolò Vaiana', org: 'University of Naples Federico II' },
  { name: 'Prof. Daniele Losanno', org: 'University of Naples Federico II' },
  { name: 'Prof. P. C. Ashwin Kumar', org: 'IIT Roorkee' },
];

export const memberships = [
  'American Society of Civil Engineers (M.ASCE)',
  'Earthquake Engineering Research Institute (EERI)',
  'Anti-Seismic Systems International Society (ASSISi)',
  'Institution of Engineers (India)',
  'Institution of Engineering and Technology (IET)',
  'Indian National Academy of Engineering (INAE)',
];

