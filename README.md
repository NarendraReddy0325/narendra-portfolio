# Narendra Reddy — Portfolio

Single-page portfolio. React + Vite, Tailwind CSS v4, Framer Motion, and Three.js (React Three Fiber) for the hero.

A clean-room React rebuild of the reference design — same palette, type, layout, animations and 3D hero. **No Framer runtime, no Framer branding, no framer.com links anywhere.** Every component is source you own.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
npm run lint
```

> If `http://localhost:5173` shows an error page in Chrome, that's Chrome's **"Always use secure connections"** (HTTPS-First) setting upgrading it to HTTPS and failing. Turn it off at `chrome://settings/security`, or open the site in a different browser.

---

## Editing the site — `src/data.js`

Everything is in that one file. No component needs touching.

| Export | What it drives |
| --- | --- |
| `profile` | Name, initial (the lime circle), greeting, hero paragraph, availability chip, email |
| `socials` | Behance / LinkedIn / GitHub — used in the footer and the contact panel |
| `nav` | Navbar + footer links. Each `href` is an anchor to a section `id`. |
| `stats` | The three big numbers |
| `about` | Heading, bio, tool chips |
| `projects` | All 10 projects — see below |
| `services` | The four numbered cards |
| `testimonials` | **Placeholders. Replace before publishing.** See the warning below. |
| `faqs` | The accordion |
| `posts` | Blog cards |
| `marqueeWords` | The scrolling strip under the hero |

Anything marked `TODO(you)` in that file is placeholder text.

### Projects — live vs concept

Each project has a `type`, and the card behaves differently:

```js
// A shipped site — card links straight out, tagged "Live" in lime.
{
  title: 'Lumen Supply',
  category: 'E-commerce',
  year: '2025',
  type: 'live',
  url: 'https://the-real-site.com',   // ← opens in a new tab
  desc: 'One or two lines.',
  color: 'from-[#f5d6c6] to-[#c98b6f]',
}

// Concept work — no live site, so the card opens the Figma screens in a
// lightbox instead of a dead link. Tagged "Concept", not "Live".
{
  title: 'Atlas Retreats',
  category: 'Booking',
  year: '2025',
  type: 'concept',
  images: [
    '/images/atlas-retreats/1.jpg',
    '/images/atlas-retreats/2.jpg',
  ],
  desc: 'One or two lines.',
  color: 'from-[#d6f5cf] to-[#6fb86f]',
}
```

`color` is the gradient used as the card artwork. To use a **real screenshot** instead, add `image: '/images/<slug>/thumb.jpg'` to the entry — it renders over the gradient automatically.

### Images — `public/images/`

```
public/
└── images/
    ├── atlas-retreats/
    │   ├── 1.jpg
    │   └── 2.jpg
    └── verge-health/
        ├── 1.jpg
        └── 2.jpg
```

Paths in `data.js` start with `/images/…` — no `public/` prefix. Until the real files exist, the lightbox shows a labelled panel telling you which path it's waiting for, rather than a broken image.

---

## Before you publish

**The testimonials are invented.** They're placeholder quotes with placeholder names, there only so the section can be laid out. Publishing them as-is means putting words in the mouths of people who never said them. Either swap in real client quotes, or delete `<Testimonials />` from `src/App.jsx` — the section disappears cleanly and nothing else breaks.

Also still placeholder: the four `url: 'https://example.com'` entries on the live projects, and the blog posts (`href: null`, so they render as inert "Coming soon" cards rather than pretending to link somewhere).

---

## Design system — `src/index.css`

Tailwind v4 is CSS-first, so the `@theme` block *is* the config — those tokens become utilities (`bg-ink`, `text-accent`, `font-display`, `animate-marquee`).

| Token | Value | |
| --- | --- | --- |
| `ink` | `#0a0a0c` | page background |
| `panel` / `card` | `#121216` / `#16161c` | raised surfaces |
| `line` | `#23232c` | every border |
| `muted` / `cream` | `#8a8a96` / `#ededed` | secondary / primary text |
| `accent` | `#c6f24e` | lime |

Type: **Clash Display** (headings, via Fontshare) + **Inter** (body, via Google Fonts).

Reusable classes: `.container-px`, `.eyebrow`, `.btn-primary`, `.btn-ghost`, `.card-surface`, plus `.grid-bg` (graph-paper), `.glow` (lime bloom), `.text-gradient` (the white→grey headline fade).

---

## Structure

```
src/
├── components/
│   ├── Navbar.jsx          floating pill; gains border + blur on scroll
│   ├── Hero.jsx            staggered entrance, lazy-loads the 3D scene
│   ├── Scene3D.jsx         R3F: distorted lime icosahedron + wire torus knot
│   ├── Marquee.jsx         infinite scrolling strip
│   ├── Stats.jsx           three-panel hairline grid
│   ├── About.jsx
│   ├── Portfolio.jsx       10 cards; forks on live vs concept
│   ├── ProjectGallery.jsx  lightbox for concept screens (← → / Esc)
│   ├── Services.jsx
│   ├── Testimonials.jsx
│   ├── FAQ.jsx             accordion
│   ├── Blog.jsx
│   ├── Contact.jsx         CTA panel + footer
│   └── Reveal.jsx          the shared scroll-in animation
├── data.js                 ← everything you edit
├── index.css               design tokens
└── App.jsx                 section order
```

**Notes on what I changed from the reference:** the 3D scene is `pointer-events-none` so it can't swallow clicks; there's a visible keyboard focus ring and a skip link; `prefers-reduced-motion` is respected throughout; concept projects open a gallery instead of linking nowhere; and unlinked blog posts don't masquerade as links.

## Deploying

Static build. `npm run build`, deploy `dist/`. Single page with anchor links, so no routing config needed.
