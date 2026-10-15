import React from 'react';
import { ShieldCheck } from 'lucide-react';
import InteractiveLeadForm from '@/components/InteractiveLeadForm';

// Homepage-only hero. This is a deliberate fork of <DynamicHero> so the
// Homepage's image is fully isolated in the visual editor — the <img> src
// here is hardcoded (not prop-driven), meaning editing it in the visual
// editor only ever affects the Homepage, never the dynamic city/service
// route templates, which pull their image from the database via
// <DynamicHero imageSrc={...} />.
//
// Side-by-side conversion layout: left = authoritative national headline +
// trust line, right = <InteractiveLeadForm> (the hook). Stacks on mobile
// with the form appearing directly below the headline.
const HomeHero = ({
  title,
  eyebrow,
  description,
}) => {
  return (
    <section className="relative isolate overflow-hidden bg-stone-950">
      {/* Native <img> tag for visual editor compatibility; hardcoded src keeps this hero independent of the dynamic route templates */}
      <img
        src="https://horizons-cdn.hostinger.com/d23961a1-05fc-4b52-981a-ee3af1df1164/greater-wildlife-control-and-roof-repair-B53js.jpg"
        alt="Hero background"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        aria-hidden="true"
      />

      {/* Dark overlay on top of image; pointer-events-none lets clicks pass through to the image for the visual editor */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-slate-950/40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-slate-950/60 via-slate-950/25 to-slate-950/50"
        aria-hidden="true"
      />

      {/* Content sits on top of image and overlays */}
      <div className="relative z-20 mx-auto grid w-full max-w-[72rem] gap-10 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-28">
        <div className="pointer-events-none">
          {eyebrow && (
            <p className="pointer-events-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              {eyebrow}
            </p>
          )}
          <h1 className="pointer-events-auto max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
            {title}
          </h1>
          {description && (
            <p className="pointer-events-auto mt-5 max-w-lg text-lg text-stone-200 sm:text-xl">
              {description}
            </p>
          )}
        </div>

        <div className="w-full max-w-md justify-self-start lg:justify-self-end">
          <InteractiveLeadForm />
        </div>
      </div>
    </section>
  );
};
export default HomeHero;
