import React from 'react';

const TermsPage = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col bg-stone-50">

            <main className="flex-1 px-6 py-16 sm:py-20">
                <div className="mx-auto max-w-[56rem]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Legal</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                        Terms of Service
                    </h1>
                    <p className="mt-3 text-sm text-stone-500">Last updated: January 2026</p>

                    <div className="prose mt-10 flex flex-col gap-8 text-stone-700">
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">1. Acceptance of terms</h2>
                            <p className="mt-3 leading-relaxed">
                                By using this website or requesting a quote from Greater Wildlife Control, you
                                agree to these Terms of Service. If you do not agree, please do not use the
                                site or submit a request.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">2. Services provided</h2>
                            <p className="mt-3 leading-relaxed">
                                Greater Wildlife Control connects customers with independently owned and
                                operated local franchises that provide wildlife removal, exclusion, repair, and
                                pest control services. Final scope of work, pricing, and scheduling are
                                confirmed directly between you and the local franchise servicing your area.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">3. Quotes & appointments</h2>
                            <p className="mt-3 leading-relaxed">
                                Quotes provided through this website or by phone are estimates based on the
                                information you provide and are subject to confirmation upon on-site
                                inspection. Actual pricing may vary depending on the scope of the issue found.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">4. Results guarantee</h2>
                            <p className="mt-3 leading-relaxed">
                                Where a results guarantee is offered, its specific terms, coverage period, and
                                conditions will be confirmed in writing by your local franchise at the time of
                                service.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">5. Limitation of liability</h2>
                            <p className="mt-3 leading-relaxed">
                                Greater Wildlife Control and its franchises are not liable for indirect,
                                incidental, or consequential damages arising from the use of this website or
                                delays in scheduling beyond our reasonable control.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">6. Changes to these terms</h2>
                            <p className="mt-3 leading-relaxed">
                                We may update these Terms of Service from time to time. Continued use of the
                                site after changes are posted constitutes acceptance of the revised terms.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">7. Contact us</h2>
                            <p className="mt-3 leading-relaxed">
                                Questions about these terms can be sent to{' '}
                                <a
                                    href="mailto:contact@greaterwildlifecontrol.ca"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >
                                    contact@greaterwildlifecontrol.ca
                                </a>{' '}
                                or by phone at 1 (800) 264-9416.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsPage;
