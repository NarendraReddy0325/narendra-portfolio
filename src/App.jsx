import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Blog from './components/Blog'
import Footer from './components/Footer'

/* Single page, anchor scroll. Section order = the order below.
   Pricing exists at ./components/Pricing but isn't mounted — you asked to drop
   it. Import it and drop <Pricing /> in after <Services /> to bring it back. */
export default function App() {
  return (
    <div className="min-h-screen bg-page">
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
        <Services />
        <Testimonials />
        <FAQ />
        <Blog />
      </main>

      <Footer />
    </div>
  )
}
