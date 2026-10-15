import React from 'react';
import CITIES from '@/data/cities.json';
import SERVICES from '@/data/services.json';
import { humanizeSlug, provinceLabel } from '@/lib/formatSlug';

const SiteFooter = () => {
    const hubAreas = CITIES.filter((c) => c.isHub).map((c) => ({ id: `${c.province}-${c.slug}`, province_code: c.province, city_slug: c.slug, name: c.name }));
    const services = SERVICES.map((s) => ({ id: s.slug, service_slug: s.slug, name: s.name }));

    return (
        <footer className="border-t border-stone-800 bg-stone-900 py-12 text-stone-400">
            <div className="mx-auto max-w-[90rem] px-6">
                <div className="mb-10 flex items-center gap-3 pb-8 border-b border-stone-800">
                    <img src="/gwc-logo.png" alt="Greater Wildlife Control" className="h-12 w-12" />
                    <span className="text-lg font-bold tracking-tight text-stone-100">Greater Wildlife Control</span>
                </div>
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-stone-200">Service Areas</p>
                        <ul className="mt-4 space-y-2">
                            {hubAreas.map((a) => (
                                <li key={a.id}>
                                    <a
                                        href={`/${a.province_code}/${a.city_slug}`}
                                        className="text-sm transition hover:text-emerald-400"
                                    >
                                        {a.name}, {provinceLabel(a.province_code)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-stone-200">Our Services</p>
                        <ul className="mt-4 space-y-2">
                            {services.map((s) => (
                                <li key={s.id}>
                                    <a
                                        href={`/services/${s.service_slug}`}
                                        className="text-sm transition hover:text-emerald-400"
                                    >
                                        {humanizeSlug(s.service_slug)}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="/services/residential" className="text-sm transition hover:text-emerald-400">
                                    Residential Services
                                </a>
                            </li>
                            <li>
                                <a href="/services/commercial" className="text-sm transition hover:text-emerald-400">
                                    Commercial Services
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-stone-200">Company</p>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="/about" className="text-sm transition hover:text-emerald-400">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-sm transition hover:text-emerald-400">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/blog" className="text-sm transition hover:text-emerald-400">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="/partner" className="text-sm transition hover:text-emerald-400">
                                    Partner Portal
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-stone-200">Legal</p>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="/privacy" className="text-sm transition hover:text-emerald-400">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-sm transition hover:text-emerald-400">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="/accessibility" className="text-sm transition hover:text-emerald-400">
                                    Accessibility
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-stone-200">Contact</p>
                        <p className="mt-4 text-sm">
                            1600-2300 Yonge St<br />
                            Toronto, ON M4P 1E4<br />
                            Canada
                        </p>
                        <a
                            href="tel:18002649416"
                            className="mt-3 inline-block text-sm font-semibold text-stone-200 transition hover:text-emerald-400"
                        >
                            1 (800) 264-9416
                        </a>
                        <a
                            href="mailto:contact@greaterwildlifecontrol.ca"
                            className="mt-2 inline-block text-sm font-semibold text-stone-200 transition hover:text-emerald-400"
                        >
                            contact@greaterwildlifecontrol.ca
                        </a>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-stone-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Greater Wildlife Control. All rights reserved.
                    </p>
                    <p className="text-sm">Locally owned and operated franchises across Canada.</p>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
