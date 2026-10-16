import React, { useState, useRef, useEffect } from 'react';
import { Phone, ChevronDown, MapPin, Menu, X } from 'lucide-react';

const SERVICE_GROUPS = [
  {
    heading: 'Residential',
    services: [
      ['raccoon-removal', 'Raccoon Removal'],
      ['squirrel-removal', 'Squirrel Removal'],
      ['skunk-removal', 'Skunk Removal'],
      ['bat-removal', 'Bat Removal'],
    ],
  },
  {
    heading: 'Commercial',
    services: [
      ['bird-removal', 'Bird Removal'],
      ['mouse-control', 'Mouse Control'],
      ['rat-control', 'Rat Control'],
      ['wasp-removal', 'Wasp Removal'],
    ],
  },
];

const PROVINCE_HUBS = [
  { name: 'Ontario', code: 'on', hubs: [['greater-toronto', 'Greater Toronto Area'], ['greater-ottawa', 'Greater Ottawa Area'], ['greater-hamilton', 'Greater Hamilton Area']] },
  { name: 'Quebec', code: 'qc', hubs: [['greater-montreal', 'Greater Montreal Area'], ['greater-quebec-city', 'Greater Quebec City Area']] },
  { name: 'British Columbia', code: 'bc', hubs: [['greater-vancouver', 'Greater Vancouver Area'], ['greater-victoria', 'Greater Victoria Area']] },
  { name: 'Alberta', code: 'ab', hubs: [['greater-calgary', 'Greater Calgary Area'], ['greater-edmonton', 'Greater Edmonton Area']] },
  { name: 'Saskatchewan', code: 'sk', hubs: [['greater-saskatoon', 'Greater Saskatoon Area'], ['greater-regina', 'Greater Regina Area']] },
  { name: 'Manitoba', code: 'mb', hubs: [['greater-winnipeg', 'Greater Winnipeg Area'], ['greater-brandon', 'Greater Brandon Area']] },
  { name: 'Nova Scotia', code: 'ns', hubs: [['greater-halifax', 'Greater Halifax Area'], ['greater-sydney', 'Greater Sydney Area']] },
  { name: 'New Brunswick', code: 'nb', hubs: [['greater-moncton', 'Greater Moncton Area'], ['greater-saint-john', 'Greater Saint John Area']] },
  { name: 'Newfoundland', code: 'nl', hubs: [['greater-st-johns', "Greater St. John's Area"], ['greater-corner-brook', 'Greater Corner Brook Area']] },
  { name: 'PEI', code: 'pe', hubs: [['greater-charlottetown', 'Greater Charlottetown Area'], ['greater-summerside', 'Greater Summerside Area']] },
];

const SiteHeader = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), []);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <a href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={() => setMobileOpen(false)}>
          <img src="/gwc-logo.png" alt="Greater Wildlife Control" className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
          <div className="flex min-w-0 flex-col">
            <span className="whitespace-nowrap text-[clamp(1rem,4.8vw,1.125rem)] font-bold tracking-tight text-stone-900 sm:text-lg">Greater Wildlife Control</span>
            <span className="hidden text-xs text-stone-600 sm:block">Commercial and Residential Services</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex" onMouseLeave={scheduleClose}>
          <div className="relative" onMouseEnter={openMega}>
            <button
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              className="flex items-center gap-1.5 py-2 text-sm font-semibold text-stone-700 transition hover:text-emerald-700"
              aria-expanded={megaOpen}
            >
              Services &amp; Locations
              <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
            </button>

            {megaOpen && (
              <div
                className="fixed left-0 right-0 top-[73px] z-50 border-y border-stone-200 bg-white shadow-xl"
                onMouseEnter={openMega}
                onMouseLeave={scheduleClose}
              >
                <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-[minmax(280px,1fr)_2fr]">
                  {/* Services */}
                  <div className="lg:border-r lg:border-stone-200 lg:pr-10">
                    <a href="/services/wildlife-control" onClick={() => setMegaOpen(false)} className="text-xs font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-900 transition">Our Services</a>

                    {/* Row 1 */}
                    <div className="mt-5 grid grid-cols-3 gap-6">
                      {/* Animal Services */}
                      <div>
                        <p className="mb-3 text-sm font-bold text-stone-900">Animal Services</p>
                        <ul className="space-y-2.5">
                          {[['raccoon-removal', 'Raccoon Removal'], ['squirrel-removal', 'Squirrel Removal'], ['skunk-removal', 'Skunk Removal'], ['bat-removal', 'Bat Removal'], ['bird-removal', 'Bird Removal'], ['opossum-removal', 'Opossum Removal'], ['groundhog-removal', 'Groundhog Removal']].map(([slug, label]) => (
                            <li key={slug}>
                              <a href={`/services/${slug}`} onClick={() => setMegaOpen(false)} className="text-sm text-stone-600 transition hover:text-emerald-700">{label}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Pest Control Services */}
                      <div>
                        <p className="mb-3 text-sm font-bold text-stone-900">Pest Control Services</p>
                        <ul className="space-y-2.5">
                          {[['mouse-control', 'Mouse Control'], ['rat-control', 'Rat Control'], ['wasp-removal', 'Wasp Removal']].map(([slug, label]) => (
                            <li key={slug}>
                              <a href={`/services/${slug}`} onClick={() => setMegaOpen(false)} className="text-sm text-stone-600 transition hover:text-emerald-700">{label}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Additional Services */}
                      <div>
                        <p className="mb-3 text-sm font-bold text-stone-900">Additional Services</p>
                        <ul className="space-y-2.5">
                          {[['restoration', 'Restoration'], ['roofing', 'Roofing']].map(([slug, label]) => (
                            <li key={slug}>
                              <a href={`/services/${slug}`} onClick={() => setMegaOpen(false)} className="text-sm text-stone-600 transition hover:text-emerald-700">{label}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-stone-200" />

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <a href="/services/residential" className="text-sm font-bold text-stone-900 transition hover:text-emerald-700">Residential Services</a>
                      </div>
                      <div>
                        <a href="/services/commercial" className="text-sm font-bold text-stone-900 transition hover:text-emerald-700">Commercial Services</a>
                      </div>
                    </div>
                  </div>

                  {/* Service Areas */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-700">Service Areas</h3>
                    <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 xl:grid-cols-5">
                      {PROVINCE_HUBS.map((prov) => (
                        <div key={prov.code}>
                          <p className="mb-2.5 text-sm font-bold text-stone-900">{prov.name}</p>
                          <ul className="space-y-2">
                            {prov.hubs.map(([slug, label]) => (
                              <li key={slug}>
                                <a
                                  href={`/${prov.code}/${slug}`}
                                  onClick={() => setMegaOpen(false)}
                                  className="flex items-start gap-1.5 text-sm leading-snug text-stone-600 transition hover:text-emerald-700"
                                >
                                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                                  {label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:18002649416"
            className="hidden items-center gap-2 text-sm font-semibold text-stone-700 transition hover:text-emerald-700 sm:flex"
          >
            <Phone className="h-4 w-4" />
            1 (800) 264-9416
          </a>
          <a
            href="#lead-capture"
            className="hidden items-center gap-2 rounded-full bg-emerald-700 sm:flex px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Get a Quote
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex items-center justify-center rounded-md p-2 text-stone-700 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="max-h-[calc(100dvh-73px)] overflow-y-auto border-t border-stone-200 bg-white px-6 py-6 lg:hidden">
          <a href="/services/wildlife-control" onClick={() => setMobileOpen(false)} className="text-xs font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-900 transition">Our Services</a>
          <div className="mt-4 grid grid-cols-1 gap-6">
            <div>
              <p className="mb-2 text-sm font-bold text-stone-900">Animal Services</p>
              <ul className="space-y-2">
                {[['raccoon-removal', 'Raccoon Removal'], ['squirrel-removal', 'Squirrel Removal'], ['skunk-removal', 'Skunk Removal'], ['bat-removal', 'Bat Removal'], ['bird-removal', 'Bird Removal'], ['opossum-removal', 'Opossum Removal'], ['groundhog-removal', 'Groundhog Removal']].map(([slug, label]) => (
                  <li key={slug}><a href={`/services/${slug}`} onClick={() => setMobileOpen(false)} className="text-sm text-stone-600">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-bold text-stone-900">Pest Control Services</p>
              <ul className="space-y-2">
                {[['mouse-control', 'Mouse Control'], ['rat-control', 'Rat Control'], ['wasp-removal', 'Wasp Removal']].map(([slug, label]) => (
                  <li key={slug}><a href={`/services/${slug}`} onClick={() => setMobileOpen(false)} className="text-sm text-stone-600">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-bold text-stone-900">Additional Services</p>
              <ul className="space-y-2">
                {[['restoration', 'Restoration'], ['roofing', 'Roofing']].map(([slug, label]) => (
                  <li key={slug}><a href={`/services/${slug}`} onClick={() => setMobileOpen(false)} className="text-sm text-stone-600">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="my-5 border-t border-stone-200" />
          <div className="grid grid-cols-2 gap-6">
            <a href="/services/residential" className="text-sm font-bold text-stone-900 hover:text-emerald-700">Residential Services</a>
            <a href="/services/commercial" className="text-sm font-bold text-stone-900 hover:text-emerald-700">Commercial Services</a>
          </div>

          <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-emerald-700">Service Areas</h3>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
            {PROVINCE_HUBS.map((prov) => (
              <div key={prov.code}>
                <p className="mb-2 text-sm font-bold text-stone-900">{prov.name}</p>
                <ul className="space-y-2">
                  {prov.hubs.map(([slug, label]) => (
                    <li key={slug}>
                      <a href={`/${prov.code}/${slug}`} onClick={() => setMobileOpen(false)} className="text-sm leading-snug text-stone-600">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
