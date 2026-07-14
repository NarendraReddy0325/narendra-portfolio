import SmoothScroll from './components/SmoothScroll'
import TravelingStats from './components/TravelingStats'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import DeepGlow from './components/DeepGlow'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Blog from './components/Blog'
import Footer from './components/Footer'

/* Single page, anchor scroll (routed through Lenis so anchors ease rather than
   jump). Pricing exists at ./components/Pricing but isn't mounted — you asked
   to drop it. Import it and drop <Pricing /> inside <DeepGlow> to bring it back;
   it's already styled for the navy. */
export default function App() {
  return (
    <div className="min-h-screen bg-page">
      <SmoothScroll />

      {/* The two counter cards live here, not in Hero or About — they travel
          between the two, so neither section can own them. */}
      <TravelingStats />

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-deep focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Portfolio />

        {/* Services and Testimonials share one enormous blurred navy glow that
            grows as you scroll into it. Its soft edges bleed into the sections
            either side — that's why nothing here is overflow-clipped. */}
        <DeepGlow>
          <Services />
          <Testimonials />
        </DeepGlow>

        <FAQ />
        <Blog />
      </main>

      <Footer />
    </div>
  )
}
