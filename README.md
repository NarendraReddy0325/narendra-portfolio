# Narendra Reddy — Portfolio

Editorial portfolio site for a product / UI-UX designer. React + Vite, React Router, Tailwind CSS v4, Framer Motion.

Everything currently on the site is **placeholder content**. It's realistic placeholder copy rather than lorem ipsum, so the layout can be judged as-is — but every word and image is meant to be replaced. The two files below are the only ones you need to touch to do that.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
npm run lint
```

If `http://localhost:5173` shows an error page in Chrome, it's Chrome's "Always use secure connections" setting upgrading it to HTTPS. Turn it off for localhost, or use `http://127.0.0.1:5173`.

---

## 1. Your details — `src/data/site.js`

Every field is marked. The ones that matter most:

| Field | What it is |
| --- | --- |
| `name` | Set at 144px in the hero. Each word becomes its own animated line. |
| `positioning` | **Your one-line statement.** The largest body text on the site. |
| `availability` | The line in the hero colophon and footer ("Open to freelance work — 2026"). |
| `email`, `socials[]` | Real email and links. Delete any social you don't use — the list just gets shorter. |
| `stats[]` | The 2 / 10 / 6 figures. Keep them true. |
| `blurb[]`, `bio[]` | Home about-section and `/about` body copy. |
| `process[]` | The four numbered steps on `/about`. |
| `toolkit[]`, `skills[]` | Tools list and the running strip on the home page. |

---

## 2. Your projects — `src/data/projects.js`

One array, ten entries. **Order in the array is order on the site.** `featured: true` pulls a project onto the home page — keep that to 4–6.

Every project needs the shared fields:

```js
{
  slug: "lumen-supply",          // url-safe. Becomes /work/lumen-supply
                                 // AND the image folder: public/images/lumen-supply/
  title: "Lumen Supply",
  type: "live",                  // "live" | "concept"  <-- drives the whole page
  category: "E-commerce",
  year: "2025",
  role: "UI/UX Designer",
  timeline: "6 weeks",
  tools: ["Figma", "Webflow"],
  thumbnail: "/images/lumen-supply/thumb.jpg",
  summary: "One or two lines. Shown in the grid and under the title.",
  problem: "...",                // the three case-study sections
  process: "...",
  outcome: "...",
  featured: true,                // optional
}
```

Then **one** type-specific field:

### `type: "live"` → add `liveUrl`

```js
liveUrl: "https://actual-site.com"
```

The case study renders the thumbnail in **browser chrome** with the real domain in the address bar, and puts a **"View live site"** button directly under the summary — above the fold, before the case-study text. It's repeated as a full section at the bottom for anyone who reads to the end. Opens in a new tab.

### `type: "concept"` → add `figmaImages`

```js
figmaImages: [
  "/images/atlas-booking/1.jpg",
  "/images/atlas-booking/2.jpg",
  "/images/atlas-booking/3.jpg",
]
```

The case study renders a **"Concept — unpublished design"** label under the title (so nothing implies a shipped product), and the screens become the body of the page: a gallery that alternates contained → full-bleed → offset, so it reads with a rhythm instead of as a uniform grid. Add as many images as you like; the pattern repeats every three.

A `live` project ignores `figmaImages`; a `concept` project ignores `liveUrl`.

---

## 3. Your images — `public/images/`

```
public/
└── images/
    ├── portrait.jpg                 ← you, on /about (4:5 portrait)
    ├── lumen-supply/
    │   └── thumb.jpg                ← live project: just the thumbnail
    ├── atlas-booking/
    │   ├── thumb.jpg                ← concept: thumbnail…
    │   ├── 1.jpg                    ← …plus the Figma screens
    │   ├── 2.jpg
    │   └── 3.jpg
    └── …one folder per slug
```

**Folder name must match the project's `slug`.** Paths in `projects.js` start with `/images/…` — no `public/` prefix, Vite serves that directory from the root.

Suggested sizes: `thumb.jpg` at **1600×1200** (4:3), Figma screens at **2000px wide**, portrait at **1200×1500**. JPEG or WebP.

**Until you add the real files, nothing breaks.** Any missing image falls back to a composed typographic plate carrying the project name, so the layout stays judgeable. The moment a real file lands at the path in `projects.js`, it swaps in automatically — no code change.

---

## Design system

Defined once in `src/index.css` under `@theme`. Tailwind v4 is CSS-first, so those tokens *are* the utility classes (`bg-paper`, `text-ink`, `text-d1`). Nothing uses Tailwind's default palette or type scale.

**Colour** — one neutral, one ink, one accent. That's the whole system.

| Token | Value | |
| --- | --- | --- |
| `paper` | `#F7F5F1` | warm off-white base |
| `ink` | `#141414` | near-black text |
| `ink-muted` / `ink-faint` | `#6B6862` / `#A19D95` | secondary, metadata |
| `accent` | `#0E5A54` | deep teal — 7.4:1 on paper (AAA) |
| `deep` | `#101413` | the dark section |

The accent is used **sparingly and on purpose**: the live-site CTA, the active nav state, the numbered case-study markers, the custom cursor, text selection. It is not on every button.

**Type** — Fraunces (display, with its `WONK` and `opsz` axes on — that's what gives large headlines their drawn quality), Inter (body only), JetBrains Mono (metadata and labels). The scale jumps deliberately: `17 → 22 → 32 → 52 → 88 → 144`.

**Layout** — an asymmetric 12-column grid hung off a **folio rail**: a hairline margin column carrying running metadata, with headlines and images deliberately overhanging into it. Below `lg` the rail collapses to a horizontal eyebrow and columns stack — a real mobile layout, not a shrunk desktop one.

**Motion** — used in four places only, not sprinkled on every element: masked line reveals on display headlines, a clip-path wipe on project imagery, hover micro-interactions, and route transitions via `AnimatePresence`. All of it respects `prefers-reduced-motion`.

**The signature** — `/work` is a contact sheet. Ten thumbnails in a grid is unreadable noise, so the desktop index is a typographic list where pointing at a row hollows out every other title (`-webkit-text-stroke`) and summons that project's image, floating with the cursor. One project, full attention, at a time. Touch devices get the card grid instead — there's no hover to hang it on.

---

## Structure

```
src/
├── components/
│   ├── Cursor.jsx           custom cursor; labels itself ("View case", "Live site")
│   ├── DeviceFrame.jsx      BrowserFrame (live) + PhoneFrame
│   ├── ExternalLinkCTA.jsx  the "View live site" button
│   ├── Folio.jsx            the margin rail + content measure. Used by every page.
│   ├── Footer.jsx
│   ├── ImageGallery.jsx     concept-project screens
│   ├── Media.jsx            lazy image + the fallback plate
│   ├── Motion.jsx           MaskLines, ImageReveal, Rise, Rule
│   ├── Navbar.jsx
│   ├── PageTransition.jsx   wrap every page in this
│   ├── ProjectCard.jsx      grid card + TypeTag (live/concept)
│   ├── ProjectHero.jsx      top of a case study; forks on `type`
│   └── SkillsStrip.jsx      marquee + ToolsList
├── data/
│   ├── projects.js          ← your 10 projects
│   └── site.js              ← your name, bio, email, socials
├── pages/                   Home, Work, CaseStudy, About, Contact, NotFound
├── index.css                design tokens + the few custom classes
└── App.jsx                  routes + AnimatePresence
```

## Deploying

Static build — `npm run build`, deploy `dist/`. On Vercel or Netlify, add a rewrite so client-side routes work on a hard refresh: all paths → `/index.html`. Without it, loading `/work/lumen-supply` directly returns a 404.
