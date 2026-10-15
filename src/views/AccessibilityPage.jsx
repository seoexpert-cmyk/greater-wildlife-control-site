import React from 'react';

const AccessibilityPage = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col bg-stone-50">

            <main className="flex-1 px-6 py-16 sm:py-20">
                <div className="mx-auto max-w-[56rem]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Legal</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                        Accessibility Statement
                    </h1>
                    <p className="mt-3 text-sm text-stone-500">Last updated: January 2026</p>

                    <div className="prose mt-10 flex flex-col gap-8 text-stone-700">
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">Our commitment</h2>
                            <p className="mt-3 leading-relaxed">
                                Greater Wildlife Control is committed to ensuring digital accessibility for
                                people of all abilities. We are continually improving the user experience for
                                everyone and applying the relevant accessibility standards, including the Web
                                Content Accessibility Guidelines (WCAG) 2.1, Level AA.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">Measures we take</h2>
                            <p className="mt-3 leading-relaxed">
                                We aim to design our website with sufficient color contrast, clear focus
                                states, keyboard-navigable menus and forms, descriptive alt text for images,
                                and semantic page structure so it works well with assistive technologies such
                                as screen readers.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">Ongoing work</h2>
                            <p className="mt-3 leading-relaxed">
                                Accessibility is an ongoing effort. As we add new features and content, we
                                review them for accessibility and address issues as they are identified.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-stone-900">Feedback</h2>
                            <p className="mt-3 leading-relaxed">
                                If you encounter an accessibility barrier on this website or need assistance
                                accessing any information or service, please contact us at{' '}
                                <a
                                    href="mailto:contact@greaterwildlifecontrol.ca"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >
                                    contact@greaterwildlifecontrol.ca
                                </a>{' '}
                                or call 1 (800) 264-9416. We will do our best to address your concerns
                                promptly.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AccessibilityPage;
