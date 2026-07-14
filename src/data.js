/* ---------------------------------------------------------------------------
   ALL SITE CONTENT.
   Edit this one file to change the site — no component needs touching.

   Anything marked TODO(you) is placeholder text I wrote so the layout looks
   finished. Replace it before you publish.
--------------------------------------------------------------------------- */

export const profile = {
  name: 'Narendra Reddy',
  initial: 'N', // the lime circle in the navbar + footer
  role: 'Product, UI/UX & Brand Design',
  greeting: 'Hey, I’m Narendra',

  // TODO(you): your real one-liner. This is the main hero paragraph.
  intro:
    'I design interfaces and then build them. Most of my work lives in the handoff gap — the place where a clean Figma file usually turns into messy code. I close that gap myself.',

  availability: 'Available for new projects',
  email: 'reddynarendra.vemireddy@gmail.com',
}

export const socials = [
  { label: 'Behance', href: 'https://www.behance.net/narendarreddy994' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/narendrareddy-uiuxdesigner/' },
  { label: 'GitHub', href: 'https://github.com/NarendraReddy0325' },
]

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

// Keep these true — they're the first hard claim a visitor reads.
export const stats = [
  { value: '2+', label: 'Years Designing Digital Products' },
  { value: '10', label: 'Projects Shipped End to End' },
  { value: '6', label: 'Live in Production Today' },
]

export const about = {
  heading: 'Design that earns trust and drives growth.',
  // TODO(you): your real bio.
  body: 'I’m a product designer two years in, working with founders and small teams on the interfaces people actually use — commerce, booking and SaaS. I care about the strategy behind the pixels: clarity, usability, and a point of view that survives contact with engineering.',
  tools: ['Figma', 'Framer', 'Webflow', 'React', 'Three.js', 'After Effects'],
}

/* ---------------------------------------------------------------------------
   PROJECTS — all 10.

   `type` is either "live" or "concept":
     live     → card links out to `url` in a new tab, tagged "Live"
     concept  → card opens a gallery of `images`, tagged "Concept"
                (so nothing implies a shipped product that isn't one)

   `color` is the Tailwind gradient used as the card artwork. To use a real
   screenshot instead, add `image: '/images/<slug>/thumb.jpg'` to an entry and
   drop the file in public/images/<slug>/ — the card renders it over the
   gradient automatically.
--------------------------------------------------------------------------- */
export const projects = [
  {
    title: 'Lumen Supply',
    category: 'E-commerce',
    year: '2025',
    type: 'live',
    url: 'https://example.com', // TODO(you): the real URL
    desc: 'A direct-to-consumer lighting store rebuilt around a checkout that stopped losing people at the shipping step.',
    color: 'from-[#f5d6c6] to-[#c98b6f]',
  },
  {
    title: 'Northbank',
    category: 'Fintech',
    year: '2025',
    type: 'live',
    url: 'https://example.com',
    desc: 'A reconciliation dashboard for finance teams, designed so the exception — not the ledger — is what you see first.',
    color: 'from-[#bcd0ff] to-[#5a78c4]',
  },
  {
    title: 'Atlas Retreats',
    category: 'Booking',
    year: '2025',
    type: 'concept',
    images: [
      '/images/atlas-retreats/1.jpg',
      '/images/atlas-retreats/2.jpg',
      '/images/atlas-retreats/3.jpg',
    ],
    desc: 'A booking flow for remote cabins where the calendar is the product, not a step buried three screens in.',
    color: 'from-[#d6f5cf] to-[#6fb86f]',
  },
  {
    title: 'Meridian',
    category: 'SaaS',
    year: '2024',
    type: 'live',
    url: 'https://example.com',
    desc: 'Onboarding for a project-management tool, rebuilt so the first session ends with real work in the product.',
    color: 'from-[#e3c6f5] to-[#9a6fc9]',
  },
  {
    title: 'Kiln Studio',
    category: 'Web Experience',
    year: '2024',
    type: 'live',
    url: 'https://example.com',
    desc: 'A ceramics studio’s site, built so the work photographs itself and the type stays out of the way.',
    color: 'from-[#f5e3c6] to-[#c9a86f]',
  },
  {
    title: 'Verge Health',
    category: 'Healthcare',
    year: '2024',
    type: 'concept',
    images: ['/images/verge-health/1.jpg', '/images/verge-health/2.jpg'],
    desc: 'A patient-records interface designed for the ninety seconds a clinician actually has to read it.',
    color: 'from-[#c6f0f5] to-[#6fa8c9]',
  },
  {
    title: 'Orbit Analytics',
    category: 'Product Design',
    year: '2024',
    type: 'concept',
    images: ['/images/orbit-analytics/1.jpg', '/images/orbit-analytics/2.jpg'],
    desc: 'An analytics product that answers the question in a sentence before it draws a single chart.',
    color: 'from-[#d8d8f5] to-[#7a7ac4]',
  },
  {
    title: 'Ferra Market',
    category: 'E-commerce',
    year: '2024',
    type: 'live',
    url: 'https://example.com',
    desc: 'A grocery marketplace whose search finally understands that people shop by meal, not by SKU.',
    color: 'from-[#f5cfd6] to-[#c96f85]',
  },
  {
    title: 'Palette',
    category: 'Design System',
    year: '2023',
    type: 'concept',
    images: ['/images/palette/1.jpg', '/images/palette/2.jpg', '/images/palette/3.jpg'],
    desc: 'A component library built token-first, so a rebrand is a variable change rather than a redraw.',
    color: 'from-[#e8f5c6] to-[#a8c96f]',
  },
  {
    title: 'Tide',
    category: 'Mobile UX',
    year: '2023',
    type: 'concept',
    images: ['/images/tide/1.jpg', '/images/tide/2.jpg'],
    desc: 'A surf-forecast app that gives you a decision, not a dataset, in the four seconds before you leave the house.',
    color: 'from-[#c6d8f5] to-[#6f8ec9]',
  },
]

export const services = [
  {
    title: 'Brand Identity',
    desc: 'Logos, visual systems, and guidelines that give your brand a distinct, lasting voice.',
    items: ['Logo & Marks', 'Visual Systems', 'Guidelines'],
  },
  {
    title: 'Web Experience',
    desc: 'Marketing sites and landing pages designed to convert and built to scale.',
    items: ['Landing Pages', 'Marketing Sites', 'Webflow / Framer'],
  },
  {
    title: 'UI/UX Design',
    desc: 'End-to-end product design from research and flows to polished interfaces.',
    items: ['Research', 'Wireframes', 'Design Systems'],
  },
  {
    title: 'Development',
    desc: 'Pixel-perfect, performant front-ends that bring the design to life.',
    items: ['React', 'Animation', 'Three.js'],
  },
]

/* TODO(you): REPLACE THESE BEFORE PUBLISHING.
   These are invented placeholder quotes with invented names — they exist only
   so the section can be laid out. Publishing them as-is means attributing words
   to people who never said them. Swap in real quotes from real clients, or
   delete <Testimonials /> from App.jsx and the section disappears cleanly. */
export const testimonials = [
  {
    quote:
      'PLACEHOLDER — replace with a real client quote. Narendra turned a messy brief into a brand that finally feels like us.',
    name: 'Client name',
    role: 'Role, Company',
  },
  {
    quote:
      'PLACEHOLDER — replace with a real client quote. The redesign lifted our trial conversion and every screen feels considered.',
    name: 'Client name',
    role: 'Role, Company',
  },
  {
    quote:
      'PLACEHOLDER — replace with a real client quote. Rare to find someone strong in both strategy and craft.',
    name: 'Client name',
    role: 'Role, Company',
  },
]

export const faqs = [
  {
    q: 'What is your typical project timeline?',
    a: 'Most brand or web projects run 3–6 weeks depending on scope. Smaller pieces — a landing page, an audit — usually land inside a week.',
  },
  {
    q: 'What does your design process look like?',
    a: 'Discovery, direction, design, delivery. You get async updates at every step, and I stay through build, because the decisions that matter get made in implementation.',
  },
  {
    q: 'How do revisions work?',
    a: 'Revisions are unlimited within an active engagement. We iterate until it is right — no surprises, no per-round billing.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'Yes. Every project includes 30 days of support, and ongoing care is available on retainer.',
  },
]

// TODO(you): real posts, and point `href` at them. Until then the cards are
// inert — they don't link anywhere, rather than pretending to.
export const posts = [
  { title: 'Designing with restraint: why less converts more', tag: 'Principles', date: 'May 2025', href: null },
  { title: 'The UX details users feel but never notice', tag: 'UX Insights', date: 'Apr 2025', href: null },
  { title: 'Building a brand system that scales with you', tag: 'Brand Strategy', date: 'Mar 2025', href: null },
]

export const marqueeWords = [
  'Brand Identity',
  'Product Design',
  'UI / UX',
  'Design Systems',
  'Prototyping',
  'Motion',
  'React',
  'Three.js',
]
