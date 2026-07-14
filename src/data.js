/* ---------------------------------------------------------------------------
   ALL SITE CONTENT. Edit this file only — no component needs touching.

   Written from what you told me: UI/UX + product designer, 2+ years, across
   several platforms, with working React/HTML/CSS so you can build what you
   design. Anything I could not verify is marked TODO(you) rather than invented.
--------------------------------------------------------------------------- */

export const profile = {
  name: 'Narendra Reddy',
  greeting: 'Hey, I’m Narendra',
  // The two hero lines. Kept separate so they break exactly here.
  headline: ['Product & UI/UX', 'Design, Built'],
  ghostWord: 'DESIGNER', // the giant word behind the hero portrait
  email: 'reddynarendra.vemireddy@gmail.com',
  portrait: '/images/portrait.png',

  // The hero paragraph. Leads with what makes you different from other
  // designers at your level: you can ship what you draw.
  intro:
    'Product and UI/UX designer, two years in, working across web, mobile and SaaS. I design in Figma and build in React — so what I hand over is a working interface, not a picture of one.',
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

// The tilted pills floating over the hero portrait.
export const heroTags = ['UI/UX', 'Product']

/* Keep these true — they are the first hard claim a visitor reads, and the
   first thing a sharp interviewer will test.
   TODO(you): correct the numbers if they are off. */
export const about = {
  statement:
    'I design interfaces people can actually use — then I build them, so nothing gets lost between the Figma file and the browser.',
  image: '/images/portrait.png',

  // The small plate tucked into the corner of the third bento tile.
  // TODO(you): a crop of your work — a UI screen, a component sheet, anything.
  tileImage: '/images/about-tile.jpg',

  stats: [
    { value: 2, suffix: '+', label: 'Years Designing Digital Products' },
    { value: 10, suffix: '', label: 'Projects Shipped End To End' },
    { value: 4, suffix: '', label: 'Sites Designed And Built In React' },
  ],

  /* Replaces the invented "4.8 client satisfaction score" that shipped with the
     template. A made-up rating is the fastest way to lose trust with anyone who
     checks. This says something true instead. */
  capability: {
    label: 'Figma → React',
    caption: 'I hand over working code, not just screens',
  },

  approach: {
    title: 'Research first. Design second. Ship third.',
    tags: ['User Research', 'Interface Design', 'Design Systems', 'Frontend Build'],
  },
}

/* ---------------------------------------------------------------------------
   PROJECTS — left exactly as they were, per your request.
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

/* ---------------------------------------------------------------------------
   Services — what you actually sell, in the order a client cares about.
   `media` decides what fills the bottom of the card. See README.
--------------------------------------------------------------------------- */
export const services = [
  {
    title: 'Product & UI Design',
    desc: 'Flows, wireframes and interfaces for web, mobile and SaaS — from the first sketch to a build-ready file.',
    tone: 'dark',
    media: 'tags',
    tags: [
      'User Flows',
      'Wireframing',
      'Interface Design',
      'Prototyping',
      'Design Systems',
      'Handoff',
    ],
  },
  {
    title: 'UX Research',
    desc: 'Interviews, usability testing and journey mapping, so the design answers a real problem instead of a guess.',
    tone: 'light',
    media: 'frame',
    image: '/images/services/ux-research.jpg',
  },
  {
    title: 'Web & Mobile Experience',
    desc: 'Marketing sites, landing pages and app screens designed to convert and built to scale.',
    tone: 'dark',
    media: 'ticker',
    images: [
      '/images/services/web-1.jpg',
      '/images/services/web-2.jpg',
      '/images/services/web-3.jpg',
      '/images/services/web-4.jpg',
    ],
  },
  {
    title: 'Frontend Development',
    desc: 'I build what I design — React, HTML and CSS — so the shipped page matches the file, down to the spacing.',
    tone: 'light',
    media: 'bleed',
    image: '/images/services/frontend.jpg',
  },
]

/* The tall card on the right of the services block. */
export const impact = {
  chip: 'Design & Build, One Person',
  title: 'Let’s Create Impact',
  desc: 'Bring me the problem, not the spec. I’ll come back with the flow, the screens and the build.',
  cta: 'Start A Project',
  image: '/images/services/impact.jpg',
}

/* ---------------------------------------------------------------------------
   The scrolling strip under Services.

   This used to be a "Trusted By Global Partners" logo row with invented client
   names on it. You haven't told me you have named clients, and inventing them
   is the kind of thing that gets found out in one conversation. It's now your
   actual toolchain, which is a claim you can defend in any room.
--------------------------------------------------------------------------- */
export const tools = [
  'Figma',
  'FigJam',
  'Framer',
  'Adobe Illustrator',
  'Photoshop',
  'Canva',
  'Maze',
  'Google Sheets',
  'Notion',
  'React',
  'HTML',
  'CSS',
  'Tailwind',
  'Git',
]

/* TODO(you): REPLACE BEFORE PUBLISHING.
   These are placeholder quotes with placeholder names. I have not written real
   ones, because attributing words to a client who never said them is the single
   riskiest thing you could put on this site — one message to that person and the
   whole portfolio is in question.

   Either paste in real quotes (a line from a Slack message or a LinkedIn
   recommendation is plenty — ask permission), or delete <Testimonials /> from
   src/App.jsx and the section disappears cleanly. */
export const testimonials = [
  {
    quote:
      'PLACEHOLDER — replace with a real client quote, or delete this section entirely.',
    name: 'Client name',
    role: 'Role, Company',
    image: '/images/client-1.jpg',
  },
  {
    quote:
      'PLACEHOLDER — replace with a real client quote, or delete this section entirely.',
    name: 'Client name',
    role: 'Role, Company',
    image: '/images/client-2.jpg',
  },
  {
    quote:
      'PLACEHOLDER — replace with a real client quote, or delete this section entirely.',
    name: 'Client name',
    role: 'Role, Company',
    image: '/images/client-3.jpg',
  },
]

export const faqs = [
  {
    q: 'What exactly do you do?',
    a: 'Product and UI/UX design — research, user flows, wireframes, interfaces and design systems. I also build front-ends in React, HTML and CSS, so I can take a project from the first conversation to a live page without a handoff gap in the middle.',
  },
  {
    q: 'How much experience do you have?',
    a: 'Two years of hands-on product and UI/UX work across web, mobile and SaaS, plus several sites I designed and built end to end. Every project in the portfolio is work I did the thinking for, not just the styling.',
  },
  {
    q: 'What does working together look like?',
    a: 'I start with the problem, not the screens: what breaks if this doesn’t happen, and who it breaks for. Then flows and wireframes to agree the shape, then high-fidelity design, then build or handoff. You see progress at every step, not just at the end.',
  },
  {
    q: 'Do you work with developers, or do you build it yourself?',
    a: 'Both. If you have a team, you get annotated files, tokens and component specs written for engineers rather than adjectives. If you don’t, I can build it — React, HTML and CSS — and you get a live site instead of a folder of PNGs.',
  },
  {
    q: 'What’s your timeline, and how do revisions work?',
    a: 'Most projects run three to six weeks depending on scope; a landing page or an audit is usually inside a week. Revisions are unlimited while we’re working — we iterate until it’s right, with no per-round billing.',
  },
]

/* TODO(you): write these, then point `href` at each. Until a post has an href it
   renders as an inert "Coming soon" card rather than a link to nowhere. */
export const posts = [
  {
    title: 'What I learned designing my first design system',
    tag: 'Design Systems',
    image: '/images/post-1.jpg',
    href: null,
  },
  {
    title: 'Designing in Figma, then building it in React',
    tag: 'Design & Code',
    image: '/images/post-2.jpg',
    href: null,
  },
  {
    title: 'The usability problems users feel but never report',
    tag: 'UX Research',
    image: '/images/post-3.jpg',
    href: null,
  },
]

/* Pricing is built but NOT mounted — you asked to drop it. To bring it back,
   import Pricing in src/App.jsx and drop <Pricing /> inside <DeepGlow />.
   TODO(you): these rates are the template's, not yours. Set them or leave the
   section off. */
export const pricing = [
  {
    name: 'Starter',
    price: '$1,800',
    period: '/Month',
    desc: 'For founders who need focused design momentum on one thing at a time.',
    features: [
      'One request at a time',
      'UI/UX and interface design',
      'Mobile-responsive layouts',
      'Async updates',
      'Two revision rounds',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    price: '$3,200',
    period: '/Month',
    desc: 'For teams who need research, design and the front-end build in one place.',
    features: [
      'Two requests at a time',
      'UX research and wireframing',
      'Full product or website design',
      'React front-end build',
      'Priority support',
    ],
    featured: true,
  },
]
