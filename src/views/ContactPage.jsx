import React from 'react';
import LeadForm from '@/components/LeadForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col bg-stone-50">

            <main className="flex-1">
                <section className="border-b border-stone-200 bg-stone-900 px-6 py-20 text-white sm:py-24">
                    <div className="mx-auto max-w-[72rem]">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                            Get In Touch
                        </p>
                        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
                            Talk to a local technician today
                        </h1>
                        <p className="mt-5 max-w-xl text-stone-300">
                            Call us, email us, or send your details below — a technician in your area will
                            follow up quickly, usually the same day.
                        </p>
                    </div>
                </section>

                <section className="px-6 py-16 sm:py-20">
                    <div className="mx-auto grid max-w-[72rem] gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-stone-900">Contact information</h2>
                            <div className="mt-6 flex flex-col gap-6">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                        <Phone className="h-5 w-5 text-emerald-700" />
                                    </span>
                                    <div>
                                        <p className="text-sm text-stone-500">Call us anytime</p>
                                        <a
                                            href="tel:18002649416"
                                            className="text-lg font-semibold text-stone-900 transition hover:text-emerald-700"
                                        >
                                            1 (800) 264-9416
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                        <Mail className="h-5 w-5 text-emerald-700" />
                                    </span>
                                    <div>
                                        <p className="text-sm text-stone-500">Email us</p>
                                        <a
                                            href="mailto:contact@greaterwildlifecontrol.ca"
                                            className="text-lg font-semibold text-stone-900 transition hover:text-emerald-700"
                                        >
                                            contact@greaterwildlifecontrol.ca
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                        <MapPin className="h-5 w-5 text-emerald-700" />
                                    </span>
                                    <div>
                                        <p className="text-sm text-stone-500">Head office</p>
                                        <p className="text-lg font-semibold text-stone-900">
                                            1600-2300 Yonge St<br />
                                            Toronto, ON M4P 1E4<br />
                                            Canada
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                        <Clock className="h-5 w-5 text-emerald-700" />
                                    </span>
                                    <div>
                                        <p className="text-sm text-stone-500">Availability</p>
                                        <p className="text-lg font-semibold text-stone-900">
                                            Same-day appointments, 7 days a week
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <LeadForm />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ContactPage;
