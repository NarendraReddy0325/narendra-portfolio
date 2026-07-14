/* ---------------------------------------------------------------------------
   SITE CONTENT — everything personal lives here.
   Every value below is PLACEHOLDER copy. Replace it with your own; you should
   not need to touch any component to do it.
--------------------------------------------------------------------------- */

export const site = {
  // TODO(you): your real name.
  name: 'Narendra Reddy',
  shortName: 'Narendra',
  role: 'Product & UI/UX Designer',
  location: 'Hyderabad, IN',

  // TODO(you): your one-line positioning statement. This is the largest text
  // on the site — say what you do and who for, not "experiences that matter".
  positioning:
    'I design the screens people actually use — commerce, booking and SaaS interfaces built to be shipped, not just presented.',

  // TODO(you): the availability line in the hero colophon.
  availability: 'Open to freelance work — 2026',

  // Numbers shown in the about/skills strip. Keep them true.
  stats: [
    { value: '2', label: 'Years designing' },
    { value: '10', label: 'Projects shipped' },
    { value: '6', label: 'Live in production' },
  ],

  // TODO(you): your real email + socials. Remove any you don't use.
  email: 'hello@narendra.design',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
    { label: 'Dribbble', href: 'https://dribbble.com/your-handle' },
    { label: 'Behance', href: 'https://behance.net/your-handle' },
    { label: 'GitHub', href: 'https://github.com/NarendraReddy0325' },
  ],

  // Short blurb used on the home page.
  blurb: [
    'I’m a product designer with two years of studio and freelance work behind me. Most of what I do is unglamorous and load-bearing: auditing a checkout that leaks users, redrawing a booking flow so it fits on one thumb, building the component library that stops a team from reinventing a button every sprint.',
    'I work end to end — research, wireframes, high-fidelity UI, and the handoff notes that make it survive engineering.',
  ],

  // Longer bio for /about.
  bio: [
    'I started out building marketing sites in Webflow and kept following the problem upstream — from “make this page prettier” to “this page is the wrong shape for the job it’s doing.” That’s where I’ve stayed. Today I design product interfaces for small teams that need one person to own the whole surface.',
    'Ten projects in, the pattern I trust most is boring: talk to the people using the thing, map what actually happens, cut the steps that exist only because someone built them once. The visual work is the last twenty percent, and it goes faster when the first eighty is honest.',
    'I care about the details that don’t photograph well — focus states, empty screens, the error copy nobody writes until launch week. Those are the parts people remember, usually by not noticing them.',
  ],

  // /about — the process. This is a real sequence, which is why it's numbered.
  process: [
    {
      title: 'Interrogate the brief',
      body: 'Before anything gets drawn, I want to know what breaks if this project doesn’t happen. Stakeholder interviews, whatever analytics exist, and a hard look at the current flow. Half the time the brief changes here.',
    },
    {
      title: 'Map, then cut',
      body: 'Flows and wireframes at low fidelity, fast and disposable. The goal is to find the shortest honest path through the task and delete the steps that exist for the org’s convenience rather than the user’s.',
    },
    {
      title: 'Design the system',
      body: 'Type scale, spacing, colour, states. I build the primitives before the pages so the tenth screen costs a tenth of what the first one did — and so engineering gets tokens instead of adjectives.',
    },
    {
      title: 'Hand off and stay',
      body: 'Annotated specs, edge cases, empty and error states, and a Loom walking through the intent. Then I stick around through build, because the decisions that matter get made in implementation.',
    },
  ],

  // /about — grouped tools.
  toolkit: [
    { group: 'Design', items: ['Figma', 'FigJam', 'Framer', 'Adobe Illustrator', 'Photoshop'] },
    { group: 'Build', items: ['Webflow', 'HTML & CSS', 'Tailwind', 'React (basics)'] },
    { group: 'Research', items: ['Maze', 'Hotjar', 'Google Analytics', 'User interviews'] },
    { group: 'Practice', items: ['Design systems', 'Prototyping', 'Accessibility', 'Usability testing'] },
  ],

  // Marquee strip on the home page.
  skills: [
    'Product design',
    'Design systems',
    'User research',
    'Wireframing',
    'Prototyping',
    'Interaction design',
    'Usability testing',
    'Webflow build',
    'Accessibility',
    'Design handoff',
  ],
}
