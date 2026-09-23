import MagneticButton from '../components/MagneticButton.jsx'
import Ribbon from '../components/Ribbon.jsx'
import Reveal from '../components/Reveal.jsx'
import MaskedLines from '../components/MaskedLines.jsx'
import { Mail, WhatsApp } from '../components/Icons.jsx'
import { SITE, mailtoLink, whatsappLink } from '../config.js'

const RIBBON = 'M-100 560 C 200 600, 340 180, 620 240 S 900 620, 1120 420 S 1360 120, 1560 200'

export default function FinalCta() {
  return (
    <section id="contact" className="relative px-3 py-20 md:px-6 md:py-28" aria-labelledby="contact-title">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] border border-white/[.08] bg-[radial-gradient(120%_90%_at_50%_0%,#0d3a78_0%,#08203f_40%,#040f1d_100%)] px-5 py-24 text-center md:rounded-[48px] md:py-36">
        <div aria-hidden="true" className="absolute inset-0">
          <Ribbon d={RIBBON} className="absolute inset-0 h-full w-full opacity-60" animateIn={false} />
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan to-transparent" />
          <div className="absolute left-1/2 top-[-30%] h-[60%] w-[70%] -translate-x-1/2 rounded-full bg-cyan/20 blur-[100px]" />
          <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]" />
          <div className="noise absolute inset-0" />
        </div>

        <div className="relative">
          <p className="eyebrow">Let’s talk</p>
          <MaskedLines id="contact-title" lines={['Ready to move', 'your business forward?']} className="mx-auto mt-6 max-w-5xl text-[clamp(2rem,8.6vw,6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-white" />
          <Reveal as="p" delay={0.2} className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-mist/75 md:text-[19px]">
            Let’s build a website your customers will remember.
          </Reveal>

          <Reveal delay={0.35} className="mt-12 flex flex-col items-center gap-5">
            <MagneticButton href={whatsappLink()} target="_blank" rel="noopener" size="xl" strength={0.35} className="w-full max-w-[380px] sm:w-auto sm:max-w-none">
              <WhatsApp width="22" height="22" /> Start your project
            </MagneticButton>
            <a
              href={mailtoLink()}
              className="group inline-flex items-center gap-2.5 py-2 text-[12px] font-semibold uppercase tracking-[0.25em] text-mist/70 transition-colors hover:text-white"
            >
              <Mail className="text-cyan" /> Email us
              <span className="sr-only"> at {SITE.email}</span>
              <span aria-hidden="true" className="h-px w-6 bg-cyan/60 transition-all duration-500 group-hover:w-10" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
