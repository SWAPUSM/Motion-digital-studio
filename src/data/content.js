// All editable copy lives here so sections stay purely presentational.

export const PILLARS = [
  {
    key: 'design',
    title: 'Design',
    text: 'A distinctive visual identity that earns trust in the first three seconds.',
  },
  {
    key: 'performance',
    title: 'Performance',
    text: 'Fast, fluid and flawless on every screen — especially the one in your customer’s hand.',
  },
  {
    key: 'results',
    title: 'Results',
    text: 'Clear journeys and strong calls to action that turn attention into enquiries.',
  },
]

export const PACKAGES = [
  {
    id: 'one-page',
    name: 'One Page Website',
    price: '8,000',
    summary: 'Perfect for businesses that need a powerful, focused online presence.',
    features: [
      '1 complete page',
      'Responsive design',
      'Modern UI/UX',
      'Contact integration',
      'Basic SEO',
      '2 revision rounds',
    ],
  },
  {
    id: 'multi-page',
    name: 'Multi Page Website',
    price: '15,000',
    summary: 'For businesses that need a complete professional website.',
    features: [
      'Up to 5 pages',
      'Custom responsive design',
      'Modern animations',
      'Contact / WhatsApp integration',
      'Basic SEO',
      '2 revision rounds',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Website',
    price: '25,000',
    summary: 'For brands that want a more advanced and immersive digital experience.',
    featured: true,
    features: [
      'Up to approximately 8 pages',
      'Premium custom design',
      'Advanced animations',
      'Interactive experiences',
      'Possible bilingual website',
      'Integrations',
      'Enhanced basic SEO',
      '2 revision rounds',
    ],
  },
]

// `mock` selects the built-in device mockup, used until real screenshots are added.
// Real screenshots: `image` fills the browser frame (desktop capture, ideally a tall
// full-page shot) and `mobileImage` fills the phone frame (mobile capture). Put the
// files in public/work/, e.g. image: '/work/teddy-bike-desktop.webp'.
export const PROJECTS = [
  {
    id: 'teddy-bike',
    name: 'Teddy Bike Samui',
    category: 'Scooter & Car Rental',
    domain: 'teddybikesamui.com',
    url: 'https://teddybikesamui.com',
    description: 'A bright, mobile-first rental experience that makes choosing a ride on the island effortless.',
    tags: ['Web design', 'Mobile first', 'WhatsApp booking'],
    mock: 'teddy',
    accent: '#FFC928',
  },
  {
    id: 'samui-property-360',
    name: 'Samui Property 360',
    category: 'Virtual Tours & Real Estate',
    domain: 'samuiproperty360.com',
    url: 'https://samuiproperty360.com',
    description: 'An immersive gateway to 360° property tours — step inside a villa before you ever set foot on the island.',
    tags: ['Immersive UI', '360° tours', 'Real estate'],
    mock: 'property',
    accent: '#C89B5A',
  },
  {
    id: 'valerie-dart-don',
    name: 'Valérie d’Art Don',
    category: 'Beauty & Permanent Makeup',
    domain: 'valeriedartdon.com',
    url: 'https://valeriedartdon.com',
    description: 'A soft, refined showcase for permanent makeup artistry — elegant, calm and made to convert bookings.',
    tags: ['Brand elegance', 'Service showcase', 'Bookings'],
    mock: 'valerie',
    accent: '#D9A08E',
  },
]

export const REASONS = [
  {
    icon: 'design',
    title: 'Modern Design',
    text: 'Websites designed to make a strong first impression.',
  },
  {
    icon: 'mobile',
    title: 'Mobile First',
    text: 'Perfect experiences across phones, tablets and desktops.',
  },
  {
    icon: 'speed',
    title: 'Fast & Responsive',
    text: 'Optimized for smooth, fast browsing.',
  },
  {
    icon: 'business',
    title: 'Built for Business',
    text: 'Every design decision supports the client’s business goals.',
  },
]

export const STEPS = [
  { n: '01', title: 'Discover', text: 'Understand the business, goals and visual direction.' },
  { n: '02', title: 'Design', text: 'Build the visual experience and website structure.' },
  { n: '03', title: 'Develop', text: 'Turn the concept into a responsive, high-performance website.' },
  { n: '04', title: 'Launch', text: 'Final testing, optimization and publication.' },
]

export const INDUSTRIES = [
  'Villas',
  'Restaurants',
  'Hotels',
  'Real Estate',
  'Beauty',
  'Local Businesses',
  'Brands',
]
