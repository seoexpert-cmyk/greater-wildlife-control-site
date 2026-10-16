import React from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';

// Defensive title-casing so any dynamically injected slug-derived string
// (city or service name) always renders with capitalized first letters,
// e.g. "raccoon-removal in toronto" -> "Raccoon-Removal In Toronto".
// Small connector words are left lowercase (except at the start) so
// headlines like "Raccoon Removal in Toronto, ON" read naturally.
const MINOR_WORDS = new Set(['in', 'of', 'and', 'the', 'a', 'an', 'for', 'on', 'to']);
const toTitleCase = value => {
  if (typeof value !== 'string') return value;
  return value.split(' ').map((word, i) => {
    if (!word) return word;
    const lower = word.toLowerCase();
    if (i > 0 && MINOR_WORDS.has(lower)) return lower;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

// Reusable parallax hero. Accepts already-resolved copy (title/eyebrow/
// description) so it stays route-agnostic — each page derives its own
// dynamic string from PocketBase data + useParams and passes it down here.
const DynamicHero = ({
  title,
  eyebrow,
  description,
  eyebrowIcon = 'location',
  imageSrc
}) => {
  const EyebrowIcon = eyebrowIcon === 'service' ? ShieldCheck : MapPin;
  return <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden sm:min-h-[70vh]">
      {/* Database-driven image: dynamic routes (city/service templates) share this component, so the image must come from data, not the visual editor */}
      <img src={imageSrc || "/default-hero.jpg"} alt="Hero background" className="absolute inset-0 z-0 h-full w-full object-cover object-center" aria-hidden="true" />
      
      {/* Overlay darkest on the left behind the text, lighter on the right so the image (e.g. the GREATER map pin) stays visible */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" aria-hidden="true" />

      {/* Content sits on top of image and overlays */}
      <div className="pointer-events-none container relative z-20 mx-auto w-full max-w-[72rem] px-6 py-20 sm:py-28">
        {eyebrow && <p className="pointer-events-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300 backdrop-blur-sm">
            <EyebrowIcon className="h-3.5 w-3.5" />
            {eyebrow}
          </p>}
        <h1 className="pointer-events-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {toTitleCase(title)}
        </h1>
        {description && <p className="pointer-events-auto mt-5 max-w-2xl text-lg text-stone-200 sm:text-xl">{description}</p>}
      </div>
    </section>;
};
export default DynamicHero;