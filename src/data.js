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

// The tilted pills floating around the hero portrait. Order matters — each one
// gets its own position, angle and float in Hero.jsx.
export const heroTags = ['UI/UX', 'Product', 'Web Design', 'Mobile Design']

/* Keep these true — they are the first hard claim a visitor reads, and the
   first thing a sharp interviewer will test.
   TODO(you): correct the numbers if they are off. */
export const about = {
  statement:
    'I design interfaces people can actually use — then I build them, so nothing gets lost between the Figma file and the browser.',
  image: '/images/portrait.png',

  // The small plate tucked into the corner of the third bento tile.
  // TODO(you): a crop of your work — a UI screen, a component sheet, anything.
  tileImage: '/images/about-tile.svg',

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
   PROJECTS — your real work, replacing the ten invented ones the template
   shipped with.

   The URLs you sent all carried a `?utm_source=chatgpt.com` tracking parameter.
   That is not part of your sites' addresses — it would have tagged every
   outbound link on your portfolio with a third party's analytics. Stripped.
   The `#/...` fragments on Montestory and SRIQR are real routes and are kept.

   STILL NEEDED FROM YOU (see the chat):
     - `desc` for every project: what the problem was, what you changed.
       Every one below is a marked placeholder, NOT copy. Do not publish as is.
     - `image` for every project: ~1600x1200, cropped to the centre.
     - `images` for the two concepts: exported PNGs of the screens. A Figma
       LINK will not work here — the lightbox renders image files. See chat.
--------------------------------------------------------------------------- */
const TODO_DESC = 'TODO(you): one paragraph — the problem, and what you changed.'

export const projects = [
  {
    title: 'Tensor School',
    type: 'live',
    url: 'https://tensorschool.com/',
    image: '/images/tensor-school.jpg',
    desc: TODO_DESC,
  },
  {
    title: 'AlgoUniversity',
    type: 'live',
    url: 'https://algouniversity-web.vercel.app/',
    image: '/images/algouniversity.jpg',
    desc: TODO_DESC,
  },
  {
    title: 'Montestory',
    type: 'live',
    url: 'https://www.montestory.in/#/montessori/home',
    image: '/images/montestory.jpg',
    desc: TODO_DESC,
  },
  /* Srshta Technologies is PULLED, not lost. As of 2026-07-17 srshta.com serves
     an ASP.NET "Server Error in '/' Application — Runtime Error" page, behind a
     TLS certificate that expired 2024-03-15. "Explore Project" would have sent
     every visitor to a browser security warning and then a stack-trace page,
     which reads worse than having no entry at all.

     To restore it: get the site back up, or send me screenshots from when it
     worked and it goes back as a `concept` with no outbound link.

  {
    title: 'Srshta Technologies',
    type: 'live',
    url: 'https://srshta.com/',
    image: '/images/srshta.jpg',
    desc: TODO_DESC,
  },
  */
  {
    title: 'SRIQR',
    type: 'live',
    url: 'https://www.sriqr.com/#/home',
    image: '/images/sriqr.jpg',
    desc: TODO_DESC,
  },
  {
    title: 'Nirmala Foods',
    type: 'live',
    url: 'https://www.nirmalafoods.in/en',
    image: '/images/nirmala-foods.jpg',
    desc: TODO_DESC,
  },
  {
    title: 'Amoogh Fashions',
    type: 'live',
    url: 'https://www.amoogh.com/',
    image: '/images/amoogh.jpg',
    desc: TODO_DESC,
  },

  /* Concepts. `image` is the deck thumbnail; `images` is what the lightbox
     pages through. TODO(you): export the screens from Figma — add or remove
     entries to match however many you actually have. */
  {
    title: 'Breath — Meditation Application',
    type: 'concept',
    image: '/images/breath-1.jpg',
    images: ['/images/breath-1.jpg', '/images/breath-2.jpg', '/images/breath-3.jpg'],
    desc: TODO_DESC,
  },
  {
    title: 'Aura — Wellness',
    type: 'concept',
    image: '/images/aura-1.jpg',
    images: ['/images/aura-1.jpg', '/images/aura-2.jpg', '/images/aura-3.jpg'],
    desc: TODO_DESC,
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
    image: '/images/services/ux-research.svg',
  },
  {
    title: 'Web & Mobile Experience',
    desc: 'Marketing sites, landing pages and app screens designed to convert and built to scale.',
    tone: 'dark',
    media: 'ticker',
    images: [
      '/images/services/web-1.svg',
      '/images/services/web-2.svg',
      '/images/services/web-3.svg',
      '/images/services/web-4.svg',
    ],
  },
  {
    title: 'Frontend Development',
    desc: 'I build what I design — React, HTML and CSS — so the shipped page matches the file, down to the spacing.',
    tone: 'light',
    media: 'bleed',
    image: '/images/services/frontend.svg',
  },
]

/* The tall card on the right of the services block.

   The title was "Let's Create Impact", which is a phrase with no author — it
   could sit on any agency site ever made and mean the same nothing. The good
   line was already sitting in `desc` underneath it. So the strongest sentence
   is now the heading, and the body finishes it rather than repeating it: the
   two read as one thought instead of a slogan followed by an explanation. */
export const impact = {
  chip: 'Design & Build, One Person',
  title: 'Bring me the problem',
  desc: 'Not the spec. I’ll come back with the flow, the screens and the build.',
  cta: 'Start A Project',
  image: '/images/services/impact.svg',
}

/* ---------------------------------------------------------------------------
   The scrolling strip under Services.

   This used to be a "Trusted By Global Partners" logo row with invented client
   names on it. You haven't told me you have named clients, and inventing them
   is the kind of thing that gets found out in one conversation. It's now your
   actual toolchain, which is a claim you can defend in any room.
--------------------------------------------------------------------------- */
/* Marks are from Simple Icons (simpleicons.org), whose paths are CC0, vendored
   into public/images/tools rather than hot-linked off a CDN — no third party
   gets to watch your visitors, and the strip can't break when someone else's
   CDN does. The trademarks stay with their owners; naming the tools you work in
   is ordinary nominative use.

   Each is a single path with no fill, so the strip drives them through a CSS
   mask and paints them in one tone. Brand colours were the other option and a
   worse one: orange Illustrator and navy-on-navy Photoshop against this
   section's deep blue is noise plus a contrast failure.

   FigJam is gone: Simple Icons has no separate FigJam mark (it's part of the
   Figma platform), and the choices were an inaccurate logo or one bare label in
   a row of logos. Figma already covers it. Say the word if you want it back as
   a text-only entry. */
export const tools = [
  { label: 'Figma', icon: '/images/tools/figma.svg' },
  { label: 'Framer', icon: '/images/tools/framer.svg' },
  { label: 'Adobe Illustrator', icon: '/images/tools/illustrator.svg' },
  { label: 'Photoshop', icon: '/images/tools/photoshop.svg' },
  { label: 'Canva', icon: '/images/tools/canva.svg' },
  { label: 'Maze', icon: '/images/tools/maze.svg' },
  { label: 'Google Sheets', icon: '/images/tools/sheets.svg' },
  { label: 'Notion', icon: '/images/tools/notion.svg' },
  { label: 'React', icon: '/images/tools/react.svg' },
  { label: 'HTML', icon: '/images/tools/html.svg' },
  { label: 'CSS', icon: '/images/tools/css.svg' },
  { label: 'Tailwind', icon: '/images/tools/tailwind.svg' },
  { label: 'Git', icon: '/images/tools/git.svg' },
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
    image: '/images/client-1.svg',
  },
  {
    quote:
      'PLACEHOLDER — replace with a real client quote, or delete this section entirely.',
    name: 'Client name',
    role: 'Role, Company',
    image: '/images/client-2.svg',
  },
  {
    quote:
      'PLACEHOLDER — replace with a real client quote, or delete this section entirely.',
    name: 'Client name',
    role: 'Role, Company',
    image: '/images/client-3.svg',
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
    image: '/images/post-1.svg',
    href: null,
  },
  {
    title: 'Designing in Figma, then building it in React',
    tag: 'Design & Code',
    image: '/images/post-2.svg',
    href: null,
  },
  {
    title: 'The usability problems users feel but never report',
    tag: 'UX Research',
    image: '/images/post-3.svg',
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
