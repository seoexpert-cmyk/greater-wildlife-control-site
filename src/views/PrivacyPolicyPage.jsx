import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col bg-stone-50">

            <main className="flex-1 px-6 py-16 sm:py-20">
                <div className="mx-auto max-w-[56rem]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Legal</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-3 text-sm text-stone-500">Last updated: January 2026</p>

                    <div className="prose mt-10 flex flex-col gap-8 text-stone-700">
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">1. Information we collect</h2>
                            <p className="mt-3 leading-relaxed">
                                When you request a quote, call us, or submit a form on this website, we may
                                collect your name, phone number, email address, postal code or service address,
                                and details about the wildlife or pest issue you're experiencing. We also
                                collect standard technical information such as browser type and referring
                                page to help us improve the site.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">2. How we use your information</h2>
                            <p className="mt-3 leading-relaxed">
                                We use the information you provide to route your request to the local,
                                independently owned franchise serving your area, schedule appointments,
                                communicate with you about your service, and improve our offerings. We do not
                                sell your personal information to third parties.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">3. Sharing with local franchises</h2>
                            <p className="mt-3 leading-relaxed">
                                Because Greater Wildlife Control operates through a network of independently
                                owned and operated local franchises, your contact details and service request
                                are shared with the franchise assigned to your area so they can contact you and
                                deliver service.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">4. Data retention & security</h2>
                            <p className="mt-3 leading-relaxed">
                                We retain lead and customer information only as long as necessary to provide
                                service and comply with our legal obligations. We use reasonable administrative
                                and technical safeguards to protect the information you share with us.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">5. Your choices</h2>
                            <p className="mt-3 leading-relaxed">
                                You can request access to, correction of, or deletion of your personal
                                information at any time by contacting us at{' '}
                                <a
                                    href="mailto:contact@greaterwildlifecontrol.ca"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >
                                    contact@greaterwildlifecontrol.ca
                                </a>
                                .
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">6. Contact us</h2>
                            <p className="mt-3 leading-relaxed">
                                Questions about this policy can be sent to Greater Wildlife Control, 1600-2300
                                Yonge St, Toronto, ON M4P 1E4, Canada, or by phone at 1 (800) 264-9416.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
