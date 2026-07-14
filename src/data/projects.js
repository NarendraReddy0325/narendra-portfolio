/* ---------------------------------------------------------------------------
   PROJECTS — the only file you edit to add, remove or reorder work.

   Every entry is PLACEHOLDER content. Swap in your real projects, keeping the
   shape below. Order in this array = order on the site. `featured: true` pulls
   a project onto the home page (keep it to 4–6).

   SHARED FIELDS (all projects)
     slug       unique, url-safe. Becomes /work/<slug>. Also the image folder
                name: public/images/<slug>/
     title      project name
     type       "live" | "concept"   <-- drives the whole case-study layout
     category   E-commerce | SaaS | Booking | Portfolio | Fintech | ...
     year, role, timeline, tools[]
     thumbnail  /images/<slug>/thumb.jpg   (grid + hero)
     summary    1–2 lines, shown in grids
     problem / process / outcome   the case-study body
     featured   optional, boolean

   ONLY WHEN type: "live"
     liveUrl    https://... — renders the "View live site" CTA near the top

   ONLY WHEN type: "concept"
     figmaImages[]  /images/<slug>/1.jpg, 2.jpg, ...
                    Rendered as the gallery. A "Concept / Unpublished" label is
                    shown automatically — nothing implies it's a shipped product.

   A "live" project ignores figmaImages; a "concept" project ignores liveUrl.
--------------------------------------------------------------------------- */

export const projects = [
  {
    slug: 'lumen-supply',
    title: 'Lumen Supply',
    type: 'live',
    category: 'E-commerce',
    year: '2025',
    role: 'UI/UX Designer',
    timeline: '6 weeks',
    tools: ['Figma', 'Webflow', 'Shopify'],
    thumbnail: '/images/lumen-supply/thumb.jpg',
    featured: true,
    summary:
      'A direct-to-consumer lighting store rebuilt around a checkout that stopped losing people at the shipping step.',
    problem:
      'Lumen was selling a considered, expensive product through a checkout borrowed from a fast-fashion template. Analytics showed a 61% drop-off on the shipping step: five form fields were duplicated from the account screen, and delivery cost only appeared after payment details were entered. Customers were being asked to commit before they knew the price.',
    process:
      'I ran the existing flow with eight recent customers and watched every one hesitate in the same place. From there I rebuilt the checkout as a single scrolling page with delivery cost surfaced against the cart total from the first screen, collapsed the duplicate address fields into one autocompleted block, and designed the product page around a specification table rather than lifestyle photography — this audience reads before it buys.',
    outcome:
      'Checkout completion rose from 39% to 68% over the first quarter after launch. Support tickets asking “how much is shipping?” dropped to near zero, which was the cheapest win in the project.',
    liveUrl: 'https://example.com',
  },
  {
    slug: 'northbank-dashboard',
    title: 'Northbank',
    type: 'live',
    category: 'Fintech',
    year: '2025',
    role: 'Product Designer',
    timeline: '3 months',
    tools: ['Figma', 'Maze', 'Storybook'],
    thumbnail: '/images/northbank-dashboard/thumb.jpg',
    featured: true,
    summary:
      'A reconciliation dashboard for finance teams, designed so the exception — not the ledger — is what you see first.',
    problem:
      'Northbank’s users spent their mornings hunting for the handful of transactions that didn’t match. The product showed them all forty thousand that did. The interface was technically complete and practically useless: it answered “what happened?” when the job was “what went wrong?”',
    process:
      'I sat with three reconciliation analysts for a full working day each. The insight was that they were building the same mental filter every morning by hand. So I inverted the default view — unmatched and flagged items surface first, matched items collapse into a single confirmable row. Then I built the density controls, keyboard shortcuts and bulk actions the power users had been faking with browser extensions.',
    outcome:
      'Median time to clear a day’s exceptions fell from roughly 90 minutes to under 25. The component library from this project became Northbank’s internal design system.',
    liveUrl: 'https://example.com',
  },
  {
    slug: 'atlas-booking',
    title: 'Atlas Retreats',
    type: 'concept',
    category: 'Booking',
    year: '2025',
    role: 'UI/UX Designer',
    timeline: '4 weeks',
    tools: ['Figma', 'FigJam'],
    thumbnail: '/images/atlas-booking/thumb.jpg',
    featured: true,
    summary:
      'A booking flow for remote cabins where the calendar is the product, not a step buried three screens in.',
    problem:
      'Cabin booking sites ask you to choose a place before you can see when it’s free, then send you back when it isn’t. For a category where flexibility is the whole point — people book a cabin for “a weekend soon”, not for the 14th specifically — the sequence is backwards.',
    process:
      'I designed date-first: an availability map where you set a rough window and see what opens up, with price shifting live across the calendar. The hard part was the mobile calendar; I went through six versions before landing on a two-month vertical scroll with a persistent price footer that never covers the dates you’re reading.',
    outcome:
      'Concept work. The prototype tested at 4.6/5 for “I knew what to do next” across nine unmoderated sessions, and the date-first pattern is the piece I’d carry into any booking product.',
    figmaImages: [
      '/images/atlas-booking/1.jpg',
      '/images/atlas-booking/2.jpg',
      '/images/atlas-booking/3.jpg',
      '/images/atlas-booking/4.jpg',
    ],
  },
  {
    slug: 'meridian-saas',
    title: 'Meridian',
    type: 'live',
    category: 'SaaS',
    year: '2024',
    role: 'Product Designer',
    timeline: '10 weeks',
    tools: ['Figma', 'Webflow', 'Hotjar'],
    thumbnail: '/images/meridian-saas/thumb.jpg',
    featured: true,
    summary:
      'Onboarding for a project-management tool, rebuilt so the first session ends with real work in the product.',
    problem:
      'Meridian had healthy signups and a dead trial. Users landed in an empty workspace, met a five-step product tour, and left. Nothing in the first session produced anything they could keep.',
    process:
      'I cut the tour entirely. In its place, onboarding asks one question — what are you working on this week? — and builds a populated project from the answer, so the user’s first screen has their own content in it. Empty states became the teaching surface: each one names the next useful action instead of apologising for being empty.',
    outcome:
      'Trial-to-paid conversion improved by 31%. The tour we deleted had been the most-requested item on the roadmap for a year.',
    liveUrl: 'https://example.com',
  },
  {
    slug: 'kiln-studio',
    title: 'Kiln Studio',
    type: 'live',
    category: 'Portfolio',
    year: '2024',
    role: 'Designer & Webflow Build',
    timeline: '3 weeks',
    tools: ['Figma', 'Webflow'],
    thumbnail: '/images/kiln-studio/thumb.jpg',
    featured: true,
    summary:
      'A ceramics studio’s site, built so the work photographs itself and the type stays out of the way.',
    problem:
      'A two-person ceramics studio had beautiful photography and a website that displayed it at 400px wide inside a stock template. They were losing commission enquiries to studios with worse work and better sites.',
    process:
      'The whole design is a frame for the photographs: full-bleed imagery, a single condensed face for captions, and no interface chrome competing with the objects. I shot and edited the mobile layouts first, because two-thirds of their Instagram traffic never sees a desktop.',
    outcome:
      'Commission enquiries roughly tripled in the three months after launch. The studio maintains the site themselves in Webflow, which was the actual brief.',
    liveUrl: 'https://example.com',
  },
  {
    slug: 'verge-health',
    title: 'Verge Health',
    type: 'concept',
    category: 'Healthcare',
    year: '2024',
    role: 'UI/UX Designer',
    timeline: '5 weeks',
    tools: ['Figma', 'FigJam', 'Maze'],
    thumbnail: '/images/verge-health/thumb.jpg',
    featured: true,
    summary:
      'A patient-records interface designed for the ninety seconds a clinician actually has to read it.',
    problem:
      'Clinical software is written for completeness and read under pressure. A GP with a nine-minute appointment gets a wall of chronological entries and has to reconstruct the story themselves, every time.',
    process:
      'I designed a summary layer that sits above the record: current medications, active conditions, and anything changed since the last visit, in that order, above the fold. The full chronological record is still one click away and untouched — the concept adds a reading layer rather than replacing the source of truth, which is the only version a clinician would trust.',
    outcome:
      'Concept work, developed with input from two practising GPs. It’s the project that taught me to design for the worst-case reading condition rather than the demo.',
    figmaImages: [
      '/images/verge-health/1.jpg',
      '/images/verge-health/2.jpg',
      '/images/verge-health/3.jpg',
    ],
  },
  {
    slug: 'orbit-analytics',
    title: 'Orbit Analytics',
    type: 'concept',
    category: 'SaaS',
    year: '2024',
    role: 'UI/UX Designer',
    timeline: '4 weeks',
    tools: ['Figma'],
    thumbnail: '/images/orbit-analytics/thumb.jpg',
    summary:
      'A analytics product that answers questions in sentences before it draws a single chart.',
    problem:
      'Analytics dashboards hand you twelve charts and let you work out which one matters. Most people open them with one question and leave without the answer.',
    process:
      'I designed around a plain-language answer bar: you ask “why did signups drop last week”, you get a written answer with the chart underneath as evidence. The design work was mostly restraint — deciding which of the twelve charts to delete and how to make the remaining ones legible at a glance.',
    outcome:
      'Concept work. The answer-first pattern is what I’d push for in any data product I take on next.',
    figmaImages: [
      '/images/orbit-analytics/1.jpg',
      '/images/orbit-analytics/2.jpg',
      '/images/orbit-analytics/3.jpg',
    ],
  },
  {
    slug: 'ferra-market',
    title: 'Ferra Market',
    type: 'live',
    category: 'E-commerce',
    year: '2024',
    role: 'UI/UX Designer',
    timeline: '5 weeks',
    tools: ['Figma', 'Shopify'],
    thumbnail: '/images/ferra-market/thumb.jpg',
    summary:
      'A grocery marketplace whose search finally understands that people shop by meal, not by SKU.',
    problem:
      'Ferra’s search matched product names literally. Customers typed “pasta night” and got nothing, then left. The catalogue was fine; the way in was wrong.',
    process:
      'I designed a browse layer above search — collections built around occasions rather than aisles — and reworked the results page so substitutions appear inline instead of as a dead “no results” page. Reordering, which is most of the volume, moved to a single tap from the home screen.',
    outcome:
      'Repeat-order rate improved noticeably in the first two months, and the zero-results page — previously the fourth most-visited screen — fell out of the top twenty.',
    liveUrl: 'https://example.com',
  },
  {
    slug: 'palette-ds',
    title: 'Palette',
    type: 'concept',
    category: 'Design System',
    year: '2023',
    role: 'Design Systems',
    timeline: '6 weeks',
    tools: ['Figma', 'Storybook', 'Tokens Studio'],
    thumbnail: '/images/palette-ds/thumb.jpg',
    summary:
      'A component library built token-first, so a rebrand is a variable change rather than a redraw.',
    problem:
      'A team of four designers had produced four button styles, three type scales and no agreement. Every new screen restarted the argument.',
    process:
      'I built the system from tokens up: primitives, then semantic aliases, then components — so nothing in a component file ever references a raw hex value. Each component ships with its states, its accessibility notes, and the one sentence explaining when not to use it.',
    outcome:
      'Concept work, built as a reference implementation. It’s the system I now start every project from.',
    figmaImages: [
      '/images/palette-ds/1.jpg',
      '/images/palette-ds/2.jpg',
      '/images/palette-ds/3.jpg',
      '/images/palette-ds/4.jpg',
    ],
  },
  {
    slug: 'tide-mobile',
    title: 'Tide',
    type: 'concept',
    category: 'Mobile',
    year: '2023',
    role: 'UI/UX Designer',
    timeline: '3 weeks',
    tools: ['Figma', 'Principle'],
    thumbnail: '/images/tide-mobile/thumb.jpg',
    summary:
      'A surf-forecast app that gives you a decision, not a dataset, in the four seconds before you leave the house.',
    problem:
      'Surf forecasting apps are dense with swell period, wind direction, tide height and buoy readings. The user has exactly one question: is it worth going right now?',
    process:
      'I designed the answer as the interface — a single verdict at the top, the three variables that drove it underneath, and the full data set for anyone who wants to argue with it. The type had to survive being read in bright sun at arm’s length, which drove the scale and contrast harder than anything else.',
    outcome:
      'Concept work. A small personal project, and still the one I’d point to for “can this designer make something legible under pressure”.',
    figmaImages: [
      '/images/tide-mobile/1.jpg',
      '/images/tide-mobile/2.jpg',
      '/images/tide-mobile/3.jpg',
    ],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)

export const featuredProjects = () => projects.filter((p) => p.featured)
