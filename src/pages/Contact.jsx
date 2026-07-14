import { useState } from 'react'
import PageTransition from '../components/PageTransition'
import { Folio, Shell } from '../components/Folio'
import { MaskLines, Rise, Rule } from '../components/Motion'
import { site } from '../data/site'

/**
 * Contact.
 *
 * No backend. The form composes a mailto: — which means it must never pretend
 * to have sent anything. The button says "Open in your email app", because that
 * is literally what happens when you press it.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', message: '' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const mailto = () => {
    const subject = form.company
      ? `Project enquiry — ${form.company}`
      : `Project enquiry${form.name ? ` from ${form.name}` : ''}`

    const body = [
      form.name && `Hi Narendra, I'm ${form.name}.`,
      form.company && `I'm with ${form.company}.`,
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n')

    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const field =
    'w-full border-b border-rule bg-transparent py-3 text-[1.05rem] text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors duration-300'

  return (
    <PageTransition>
      <Folio label="Contact" index="—">
        <section className="pt-36 pb-24 lg:pt-52">
          <Shell>
            <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-12">
              {/* --------------------------------------------------- THE DIRECT WAY */}
              <div className="lg:col-span-6">
                <p className="font-mono text-micro text-ink-faint">Contact</p>
                <h1 className="font-display mt-7 -ml-1 text-[3.4rem] sm:text-[5.5rem] lg:-ml-3">
                  <MaskLines lines={['Let’s talk.']} delay={0.1} />
                </h1>

                <Rise delay={0.35} className="mt-10">
                  <p className="max-w-[42ch] text-lead leading-[1.5] text-ink-muted">
                    The fastest route is email. Tell me what you&apos;re building, roughly when you
                    need it, and what&apos;s not working today.
                  </p>

                  <a
                    href={`mailto:${site.email}`}
                    data-cursor="Write to me"
                    className="link-draw font-display mt-10 inline-block text-[1.9rem] break-all sm:text-[2.4rem]"
                  >
                    {site.email}
                  </a>

                  <div className="mt-14">
                    <p className="font-mono text-micro text-ink-faint">Elsewhere</p>
                    <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                      {site.socials.map(({ label, href }) => (
                        <li key={label}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-draw font-display-sm text-[1.15rem] hover:text-accent"
                          >
                            {label}
                            <span aria-hidden="true" className="ml-1 text-ink-faint">
                              ↗
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-12 font-mono text-micro text-accent">{site.availability}</p>
                </Rise>
              </div>

              {/* ------------------------------------------------------- THE FORM */}
              <Rise delay={0.2} className="lg:col-span-5 lg:col-start-8">
                <div className="border-t border-rule pt-8 lg:border-t-0 lg:pt-4">
                  <p className="font-mono text-micro text-ink-faint">Or draft it here</p>

                  <form
                    className="mt-8 space-y-8"
                    onSubmit={(e) => {
                      e.preventDefault()
                      window.location.href = mailto()
                    }}
                  >
                    <div>
                      <label htmlFor="name" className="font-mono text-micro text-ink-muted">
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={set('name')}
                        className={`${field} mt-2`}
                        placeholder="Jane Okafor"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="font-mono text-micro text-ink-muted">
                        Company <span className="text-ink-faint">(optional)</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={set('company')}
                        className={`${field} mt-2`}
                        placeholder="Northbank"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="font-mono text-micro text-ink-muted">
                        What are you building?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={set('message')}
                        className={`${field} mt-2 resize-none`}
                        placeholder="We're rebuilding our checkout and it's leaking users at the shipping step…"
                      />
                    </div>

                    <button
                      type="submit"
                      data-cursor="Compose"
                      className="group inline-flex w-full items-center justify-between gap-4 bg-ink px-6 py-4 text-paper transition-colors duration-400 hover:bg-accent sm:w-auto"
                    >
                      <span className="font-display-sm text-[1.15rem]">Open in your email app</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </button>

                    {/* Say plainly what the button does. No fake success state. */}
                    <p className="text-[0.9rem] leading-relaxed text-ink-faint">
                      This fills out an email and hands it to your mail app — nothing is sent from
                      this page, and nothing is stored. You&apos;ll get to read it before it goes.
                    </p>
                  </form>
                </div>
              </Rise>
            </div>

            <Rule className="mt-24" />
          </Shell>
        </section>
      </Folio>
    </PageTransition>
  )
}
