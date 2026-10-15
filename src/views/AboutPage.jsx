import React from 'react';
import ContentSection from '@/components/ContentSection';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { HeartHandshake, ShieldCheck, MapPin } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col bg-stone-50">

            <main className="flex-1">
                <section className="border-b border-stone-200 bg-stone-900 px-6 py-20 text-white sm:py-28">
                    <div className="mx-auto max-w-[72rem]">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                            Our Mission
                        </p>
                        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
                            Humane wildlife control, done right the first time
                        </h1>
                        <p className="mt-5 max-w-xl text-stone-300">
                            Greater Wildlife Control started with a simple idea: every home and business
                            deserves a permanent, humane solution to wildlife conflicts — delivered by trained
                            technicians who actually live in the communities they serve.
                        </p>
                    </div>
                </section>

                <ContentSection
                    eyebrow="Humane Practices"
                    title="Animals removed safely. Homes protected permanently."
                    imageSrc="https://images.hostinger.com/b65dd632-731b-40da-abcd-c8e06b3b1625.png"
                    imageAlt="Wildlife control technicians beside a service van"
                    description="We follow humane, evidence-based removal methods for every species we handle — no poison, no unnecessary harm. Once an animal is safely relocated, our technicians repair and seal the entry point so the problem doesn't return."
                />

                <ContentSection
                    eyebrow="Locally Owned"
                    title="A national network, run by your neighbours"
                    reverse
                    className="bg-white"
                    imageSrc="https://images.hostinger.com/dda1325a-2bbf-4555-a40c-561cc44b04cb.png"
                    imageAlt="Technician inspecting a residential roofline"
                    description="Every Greater Wildlife Control franchise is independently owned and operated by an experienced local technician — so you get a real person who knows your neighbourhood, backed by the training, tools, and standards of a national brand."
                />

                <section className="border-t border-stone-200 bg-stone-50 px-6 py-16">
                    <div className="mx-auto grid max-w-[72rem] gap-6 sm:grid-cols-3">
                        {[
                            { icon: HeartHandshake, label: 'Humane Removal Standards' },
                            { icon: ShieldCheck, label: 'Guaranteed Results' },
                            { icon: MapPin, label: 'Locally Owned Franchises' },
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
                    eyebrow="Ready when you are"
                    title="Get a free quote from a local technician"
                />
            </main>
        </div>
    );
};

export default AboutPage;
