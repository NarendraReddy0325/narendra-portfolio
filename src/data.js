/* ---------------------------------------------------------------------------
   ALL CONTENT. Edit this file only — no component needs touching.
   Anything marked TODO(you) is placeholder copy.
--------------------------------------------------------------------------- */

export const profile = {
  name: 'Narendra Reddy',
  greeting: 'Hey, I’m Narendra',
  // The two hero lines. Kept as separate lines so they break exactly here.
  headline: ['Product, UI/UX', '& Brand Design'],
  ghostWord: 'DESIGNER', // the giant word behind the hero portrait
  email: 'reddynarendra.vemireddy@gmail.com',
  // Your photo, background removed. Transparent PNG — it sits directly on the
  // hero wash with no card behind it.
  portrait: '/images/portrait.png',
}

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

// The tilted pills floating over the hero portrait.
export const heroTags = ['Web design', 'UI/UX']

export const about = {
  statement:
    'I create thoughtful digital experiences that connect strategy, usability, and visual clarity.',
  image: '/images/portrait.png',
  // Count-up cards. `value` is the number that animates; `suffix` is appended.
  stats: [
    { value: 2, suffix: '+', label: 'Years Crafting Digital Products' },
    { value: 10, suffix: '', label: 'Projects Shipped End To End' },
    { value: 6, suffix: '', label: 'Live In Production Today' },
  ],
  rating: { score: '4.8', label: 'Client Satisfaction Score' },
  approach: {
    title: 'Strategic Thinking, Clean Execution.',
    tags: ['Interface Design', 'Product Strategy', 'No-code Development', 'Branding'],
  },
}

/* ---------------------------------------------------------------------------
   PROJECTS — the numbered 01…10 rows.

   `type` decides what the button does:
     live    → "Explore Project" opens `url` in a new tab
     concept → "View Screens" opens `images` in a lightbox, and the row is
               marked "Concept" so nothing implies a shipped product
--------------------------------------------------------------------------- */
export const projects = [
  {
    title: 'Lumen Supply',
    type: 'live',
    url: 'https://example.com', // TODO(you)
    image: '/images/lumen-supply.jpg',
    desc: 'Rebuilt a direct-to-consumer lighting store around a checkout that stopped losing people at the shipping step — delivery cost surfaced up front, duplicate fields collapsed.',
  },
  {
    title: 'Northbank',
    type: 'live',
    url: 'https://example.com',
    image: '/images/northbank.jpg',
    desc: 'A reconciliation dashboard for finance teams, inverted so the exceptions surface first and the forty thousand matched rows collapse into one confirmable line.',
  },
  {
    title: 'Atlas Retreats',
    type: 'concept',
    images: ['/images/atlas-1.jpg', '/images/atlas-2.jpg', '/images/atlas-3.jpg'],
    image: '/images/atlas-1.jpg',
    desc: 'A date-first booking flow for remote cabins, where the availability calendar is the product rather than a step buried three screens in.',
  },
  {
    title: 'Meridian',
    type: 'live',
    url: 'https://example.com',
    image: '/images/meridian.jpg',
    desc: 'Onboarding for a project-management tool, rebuilt so the first session ends with the user’s own work in the product instead of a five-step tour.',
  },
  {
    title: 'Kiln Studio',
    type: 'live',
    url: 'https://example.com',
    image: '/images/kiln-studio.jpg',
    desc: 'A ceramics studio’s site, designed as a frame for the photography — full-bleed imagery, no interface chrome competing with the objects.',
  },
  {
    title: 'Verge Health',
    type: 'concept',
    images: ['/images/verge-1.jpg', '/images/verge-2.jpg'],
    image: '/images/verge-1.jpg',
    desc: 'A patient-records summary layer designed for the ninety seconds a clinician actually has — current medications and anything changed since the last visit, above the fold.',
  },
  {
    title: 'Orbit Analytics',
    type: 'concept',
    images: ['/images/orbit-1.jpg', '/images/orbit-2.jpg'],
    image: '/images/orbit-1.jpg',
    desc: 'An analytics product that answers the question in a sentence and puts the chart underneath as evidence, rather than handing over twelve charts and hoping.',
  },
  {
    title: 'Ferra Market',
    type: 'live',
    url: 'https://example.com',
    image: '/images/ferra-market.jpg',
    desc: 'A grocery marketplace whose browse layer is built around meals rather than aisles, with substitutions inline instead of a dead zero-results page.',
  },
  {
    title: 'Palette',
    type: 'concept',
    images: ['/images/palette-1.jpg', '/images/palette-2.jpg'],
    image: '/images/palette-1.jpg',
    desc: 'A component library built token-first — primitives, then semantic aliases, then components — so a rebrand is a variable change rather than a redraw.',
  },
  {
    title: 'Tide',
    type: 'concept',
    images: ['/images/tide-1.jpg', '/images/tide-2.jpg'],
    image: '/images/tide-1.jpg',
    desc: 'A surf-forecast app that gives you a verdict, not a dataset, in the four seconds before you leave the house — legible at arm’s length in bright sun.',
  },
]

/* Services bento. `tone` picks the card colour: 'dark' or 'light'.
   `tags` only render on the first card, matching the reference layout. */
export const services = [
  {
    title: 'Brand Identity',
    desc: 'Strategic brand systems built for clarity and growth.',
    tone: 'dark',
    tags: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Colour', 'Typography', 'Voice'],
  },
  {
    title: 'UI/UX Design',
    desc: 'End-to-end product design, from research and flows to the shipped interface.',
    tone: 'light',
  },
  {
    title: 'Web Experience',
    desc: 'Marketing sites and landing pages designed to convert and built to scale.',
    tone: 'dark',
  },
  {
    title: 'Development',
    desc: 'Pixel-accurate, performant front-ends that bring the design to life.',
    tone: 'light',
  },
]

// TODO(you): swap for real client logos, or delete the <Partners/> strip.
export const partners = ['Lumen', 'Northbank', 'Atlas', 'Meridian', 'Kiln', 'Ferra', 'Orbit']

/* TODO(you): REPLACE BEFORE PUBLISHING.
   Invented quotes with invented names — placeholders so the carousel can be
   laid out. Publishing them attributes words to people who never said them.
   Swap in real quotes, or delete <Testimonials /> from App.jsx. */
export const testimonials = [
  {
    quote:
      'PLACEHOLDER — replace with a real client quote. Every design decision was thoughtful, strategic, and clearly aligned with our product goals.',
    name: 'Client name',
    role: 'Role, Company',
    image: '/images/client-1.jpg',
  },
  {
    quote:
      'PLACEHOLDER — replace with a real client quote. Our platform became significantly easier to use after the redesign.',
    name: 'Client name',
    role: 'Role, Company',
    image: '/images/client-2.jpg',
  },
  {
    quote:
      'PLACEHOLDER — replace with a real client quote. The execution was precise, timely, and focused on delivering measurable results.',
    name: 'Client name',
    role: 'Role, Company',
    image: '/images/client-3.jpg',
  },
]

export const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects take between two and six weeks depending on scope, research depth, and revision rounds. Clear timelines are shared before we begin.',
  },
  {
    q: 'What does your design process look like?',
    a: 'Discovery, direction, design, delivery. You get async updates at every step, and I stay through build — the decisions that matter get made in implementation.',
  },
  {
    q: 'Do you offer revisions?',
    a: 'Revisions are unlimited within an active engagement. We iterate until it is right — no per-round billing, no surprises.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. Every project includes 30 days of support, and ongoing care is available on retainer.',
  },
]

// `href: null` renders an inert card rather than a link that goes nowhere.
export const posts = [
  { title: 'Design Principles', tag: 'Featured', image: '/images/post-1.jpg', href: null },
  { title: 'UX Insights', tag: 'Trending', image: '/images/post-2.jpg', href: null },
  { title: 'Brand Strategy', tag: 'New', image: '/images/post-3.jpg', href: null },
]

export const socials = [
  { label: 'Behance', href: 'https://www.behance.net/narendarreddy994' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/narendrareddy-uiuxdesigner/' },
  { label: 'GitHub', href: 'https://github.com/NarendraReddy0325' },
]

/* Pricing is built but NOT mounted — you asked to drop it.
   To bring it back: import Pricing from './components/Pricing' in App.jsx and
   add <Pricing /> after <Services />. */
export const pricing = [
  {
    name: 'Starter',
    price: '$1,800',
    period: '/Month',
    desc: 'For startups needing consistent product design support and structured visual direction.',
    features: [
      'Website or landing page design',
      'Core UI system setup',
      'Mobile-responsive layouts',
      'Monthly strategy sync',
      'Two revision rounds',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    price: '$3,200',
    period: '/Month',
    desc: 'For scaling brands seeking advanced UX thinking, conversion strategy, and continuous design.',
    features: [
      'Full website or product design',
      'UX research & wireframing',
      'Conversion optimisation',
      'Analytics review & insights',
      'Priority design support',
    ],
    featured: true,
  },
]
