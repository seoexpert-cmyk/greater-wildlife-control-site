import React from 'react';
import { ArrowRight } from 'lucide-react';

const ALL_SERVICES = [
  { slug: 'raccoon-removal', label: 'Raccoon Removal', desc: 'Safe, humane removal of raccoons from attics, garages, and crawl spaces.' },
  { slug: 'squirrel-removal', label: 'Squirrel Removal', desc: 'Expert squirrel exclusion and trapping for homes and commercial buildings.' },
  { slug: 'skunk-removal', label: 'Skunk Removal', desc: 'Humane skunk trapping and odour remediation by trained technicians.' },
  { slug: 'bat-removal', label: 'Bat Removal', desc: 'Bat exclusion services that comply with wildlife protection regulations.' },
  { slug: 'bird-removal', label: 'Bird Removal', desc: 'Deterrent installation and removal for pigeons, starlings, and more.' },
  { slug: 'mouse-control', label: 'Mouse Control', desc: 'Comprehensive mouse proofing, trapping, and sanitation services.' },
  { slug: 'rat-control', label: 'Rat Control', desc: 'Targeted rat eradication and entry-point sealing for lasting results.' },
  { slug: 'wasp-removal', label: 'Wasp Removal', desc: 'Fast, safe removal of wasp and hornet nests from your property.' },
  { slug: 'opossum-removal', label: 'Opossum Removal', desc: 'Humane opossum trapping and exclusion for homes and businesses.' },
  { slug: 'groundhog-removal', label: 'Groundhog Removal', desc: 'Effective groundhog control to protect foundations, gardens, and landscaping.' },
];

const WildlifeControlPage = ({ children }) => (
  <>

    {/* Hero */}
    <section className="relative overflow-hidden bg-stone-900 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
      <div className="relative mx-auto max-w-[72rem] px-6 text-center">
        <span className="inline-block rounded-full bg-emerald-700/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Wildlife Control Services
        </span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          All Wildlife &amp; Pest Removal Services
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-300">
          From raccoons and squirrels to wasps and groundhogs — our trained technicians handle every species humanely and effectively. Same-day appointments available across Canada.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="tel:18002649416"
            className="rounded-full bg-emerald-700 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Call 1 (800) 264-9416
          </a>
          <a
            href="/contact"
            className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </section>

    {/* Services grid */}
    <section className="mx-auto max-w-[90rem] px-6 py-20 sm:py-28">
      <h2 className="text-center text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
        Choose a Service
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-stone-500">
        Click any service below to learn more about our approach, pricing, and coverage.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ALL_SERVICES.map(({ slug, label, desc }) => (
          <a
            key={slug}
            href={`/services/${slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition">
                {label}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0.5" />
            </div>
            <p className="text-sm leading-relaxed text-stone-500">{desc}</p>
          </a>
        ))}
      </div>
    </section>

    {children}

    {/* CTA band */}
    <section className="border-t border-stone-200 bg-emerald-50 py-16">
      <div className="mx-auto max-w-[72rem] px-6 text-center">
        <h2 className="text-2xl font-bold text-stone-900">Not sure what you need?</h2>
        <p className="mx-auto mt-3 max-w-xl text-stone-600">
          Describe your situation and our team will identify the animal and recommend the right service.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block rounded-full bg-emerald-700 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Contact Us Today
        </a>
      </div>
    </section>
  </>
);

export default WildlifeControlPage;
