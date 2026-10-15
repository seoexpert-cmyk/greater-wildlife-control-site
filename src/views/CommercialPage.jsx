import React from 'react';
import ContentSection from '@/components/ContentSection';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { Building2, ClipboardCheck, EyeOff } from 'lucide-react';

const CommercialPage = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col bg-stone-50">

            <main className="flex-1">
                <section className="border-b border-stone-200 bg-stone-900 px-6 py-20 text-white sm:py-28">
                    <div className="mx-auto max-w-[72rem]">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                            Commercial Services
                        </p>
                        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
                            Discreet wildlife control built for your business
                        </h1>
                        <p className="mt-5 max-w-xl text-stone-300">
                            Property managers, warehouses, restaurants, and multi-unit buildings trust our
                            franchise network for fast response, documented compliance, and service that stays
                            out of sight of tenants and customers.
                        </p>
                    </div>
                </section>

                <ContentSection
                    eyebrow="Property Management"
                    title="One call for every property in your portfolio"
                    imageSrc="https://images.hostinger.com/5f5ab7a0-94d4-42a5-a763-df7196db7d49.png"
                    imageAlt="Technician inspecting a commercial warehouse exterior"
                    bullets={[
                        'Standardized service across single sites or entire portfolios',
                        'Unmarked vehicles and low-visibility service windows on request',
                        'Detailed inspection reports for compliance and insurance records',
                        'Warehouse, loading dock, and rooftop unit protection',
                    ]}
                />

                <ContentSection
                    eyebrow="Built to Scale"
                    title="The same standards, whatever the size of the job"
                    reverse
                    className="bg-white"
                    imageSrc="https://images.hostinger.com/dda1325a-2bbf-4555-a40c-561cc44b04cb.png"
                    imageAlt="Wildlife technician conducting a building exterior inspection"
                    description="From a single storefront to a multi-building industrial complex, our local franchise network scales to match the job — with the same rigorous standards, response times, and guaranteed results for every account."
                />

                <section className="border-t border-stone-200 bg-stone-50 px-6 py-16">
                    <div className="mx-auto grid max-w-[72rem] gap-6 sm:grid-cols-3">
                        {[
                            { icon: Building2, label: 'Multi-Site Contracts' },
                            { icon: EyeOff, label: 'Discreet, Low-Visibility Service' },
                            { icon: ClipboardCheck, label: 'Compliance Documentation' },
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
                    eyebrow="Request a commercial quote"
                    title="Talk to us about your property"
                    areaName="Commercial"
                />
            </main>
        </div>
    );
};

export default CommercialPage;
