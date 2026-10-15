import React from 'react';
import ContentSection from '@/components/ContentSection';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { Home, ShieldCheck, Hammer } from 'lucide-react';

const ResidentialPage = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col bg-stone-50">

            <main className="flex-1">
                <section className="border-b border-stone-200 bg-stone-900 px-6 py-20 text-white sm:py-28">
                    <div className="mx-auto max-w-[72rem]">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                            Residential Services
                        </p>
                        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
                            Keep your home and family safe from wildlife intrusion
                        </h1>
                        <p className="mt-5 max-w-xl text-stone-300">
                            From attics and crawlspaces to rooflines and chimneys, our local technicians find
                            every entry point, remove the animal humanely, and repair the damage — so it stays
                            gone for good.
                        </p>
                    </div>
                </section>

                <ContentSection
                    eyebrow="Home Protection"
                    title="Full-property inspections, not guesswork"
                    imageSrc="https://images.hostinger.com/dda1325a-2bbf-4555-a40c-561cc44b04cb.png"
                    imageAlt="Technician inspecting a home roofline for wildlife entry points"
                    bullets={[
                        'Detailed roof, attic, soffit, and foundation inspection on every visit',
                        'Humane removal of raccoons, squirrels, skunks, birds, bats, and more',
                        'Attic clean-up, sanitization, and insulation restoration',
                        'Entry-point sealing with durable, animal-proof materials',
                    ]}
                />

                <ContentSection
                    eyebrow="Family Safety First"
                    title="Repairs that actually hold up"
                    reverse
                    className="bg-white"
                    imageSrc="https://images.hostinger.com/b65dd632-731b-40da-abcd-c8e06b3b1625.png"
                    imageAlt="Wildlife control technicians beside a service van outside a home"
                    description="Wildlife damage rarely stops at the entry hole. We repair roof vents, fascia boards, and siding, and back every job with our results guarantee — if it comes back, so do we, at no extra cost."
                />

                <section className="border-t border-stone-200 bg-stone-50 px-6 py-16">
                    <div className="mx-auto grid max-w-[72rem] gap-6 sm:grid-cols-3">
                        {[
                            { icon: Home, label: 'Attic & Roof Restoration' },
                            { icon: ShieldCheck, label: 'Results Guarantee' },
                            { icon: Hammer, label: 'Entry-Point Repairs' },
                        ].map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-start gap-3 rounded-2xl border border-stone-200 bg-white p-6"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
                                    <Icon className="h-5 w-5 text-emerald-700" />
                                </span>
                                <p className="font-semibold text-stone-900">{label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <LeadCaptureForm
                    eyebrow="Free residential quote"
                    title="Get a technician out to your home"
                    areaName="Residential"
                />
            </main>
        </div>
    );
};

export default ResidentialPage;
