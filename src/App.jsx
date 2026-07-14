import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Blog from './components/Blog'
import Contact from './components/Contact'

/* Single-page scroll. Section order = the order below; delete a line and the
   section is gone (its nav link lives in src/data.js → `nav`). */
export default function App() {
  return (
    <div className="relative min-h-screen bg-ink">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Portfolio />
        <Services />
        <Testimonials />
        <FAQ />
        <Blog />
      </main>

      <Contact />
    </div>
  )
}
