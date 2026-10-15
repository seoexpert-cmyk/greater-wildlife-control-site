import React, { useState } from 'react';
import SERVICES from '@/data/services.json';
import { submitLead } from '@/lib/submitLead';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  Mail,
  User,
  ShieldCheck,
} from 'lucide-react';
import { humanizeSlug } from '@/lib/formatSlug';

const STEP_META = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Contact' },
  { id: 3, label: 'Confirm' },
];

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
};

const LeadForm = ({ serviceSlug = '', serviceRequested = '', serviceName = '', areaName = '', className = '' }) => {
  const preselected = serviceSlug || serviceRequested || '';

  const services = SERVICES.map((s) => ({ service_slug: s.slug, category: s.category }));
  const [step, setStep] = useState(preselected ? 2 : 1);
  const [direction, setDirection] = useState(1);
  const [selectedService, setSelectedService] = useState(preselected);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);


  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const selectService = (slug) => {
    setSelectedService(slug);
    goTo(2);
  };

  // Strict format validation. Phone: 10+ digits allowing common separators.
  // Email: standard address shape (optional field — only validated if filled).
  const PHONE_RE = /^[+]?[\d\s().-]{10,}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const nameValid = form.name.trim().length > 1;
  const phoneDigits = form.phone.replace(/\D/g, '');
  const phoneValid = PHONE_RE.test(form.phone.trim()) && phoneDigits.length >= 10;
  const emailValid = form.email.trim() === '' || EMAIL_RE.test(form.email.trim());
  const contactValid = nameValid && phoneValid && emailValid;

  const handleContinueFromContact = () => {
    setTouched(true);
    if (!contactValid) return;
    goTo(3);
  };

  const onSubmit = async () => {
    setError('');
    setStatus('submitting');
    // `serviceName`/`areaName` are passed down from dynamic pages (service +
    // service area names); fall back to the slug picked in step 1 when the
    // page didn't supply them (e.g. the generic /services/:slug form).
    const resolvedServiceName =
      serviceName || (selectedService ? humanizeSlug(selectedService.split(' (')[0]) : '');
    const animalIssue = [resolvedServiceName, areaName].filter(Boolean).join(' - ');
    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        animal_issue: animalIssue,
        source_url: typeof window !== 'undefined' ? window.location.href : '/',
        status: 'New',
      });
      setStatus('success');
      setForm({ name: '', phone: '', email: '' });
      setTouched(false);
      if (!preselected) {
        setSelectedService('');
        goTo(1);
      }
    } catch (err) {
      console.error('lead submit failed', err);
      setStatus('error');
      setError('Something went wrong. Please try again or call us directly.');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={`flex flex-col items-center gap-4 rounded-2xl border border-emerald-400/30 bg-gradient-to-b from-emerald-950 to-stone-950 px-6 py-12 text-center shadow-xl ${className}`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
        </span>
        <p className="text-xl font-semibold text-white">Success!</p>
        <p className="max-w-xs text-sm text-stone-300">
          Thanks! A local technician will call you shortly.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 shadow-xl ${className}`}
    >
      {/* Progress */}
      <div className="flex items-center gap-2 border-b border-stone-800 px-6 py-4">
        {STEP_META.map((s, idx) => (
          <React.Fragment key={s.id}>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                  step > s.id
                    ? 'bg-emerald-500 text-emerald-950'
                    : step === s.id
                    ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50'
                    : 'bg-stone-800 text-stone-500'
                }`}
              >
                {step > s.id ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.id}
              </span>
              <span
                className={`hidden text-xs font-medium sm:inline ${
                  step >= s.id ? 'text-stone-200' : 'text-stone-500'
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < STEP_META.length - 1 && (
              <span className="h-px flex-1 bg-stone-800" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative overflow-hidden px-6 py-6">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <p className="text-sm font-semibold text-stone-200">What do you need help with?</p>
              <p className="mt-1 text-xs text-stone-500">Pick one to get started.</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {services.map((s) => (
                  <button
                    key={s.id || s.service_slug}
                    type="button"
                    onClick={() => selectService(s.service_slug)}
                    className="flex min-h-[64px] flex-col items-start justify-center gap-1 rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-left transition active:scale-[0.98] hover:border-emerald-500/50 hover:bg-stone-800"
                  >
                    {s.category && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                        {s.category}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-white">
                      {humanizeSlug(s.service_slug)}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <p className="text-sm font-semibold text-stone-200">Your contact details</p>
              <p className="mt-1 text-xs text-stone-500">We'll use this to call you back.</p>

              <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="lead-name" className="text-xs font-medium text-stone-400">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                    <input
                      id="lead-name"
                      name="name"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={onChange}
                      className="h-12 w-full rounded-xl border border-stone-800 bg-stone-900 pl-10 pr-3 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched && !nameValid && (
                    <p className="text-xs text-red-400">Please enter your full name.</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lead-phone" className="text-xs font-medium text-stone-400">
                    Phone number
                  </label>
                  <div className="relative">
                    <PhoneCall className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                    <input
                      id="lead-phone"
                      name="phone"
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={onChange}
                      className="h-12 w-full rounded-xl border border-stone-800 bg-stone-900 pl-10 pr-3 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched && !phoneValid && (
                    <p className="text-xs text-red-400">Enter a valid phone number (at least 10 digits).</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lead-email" className="text-xs font-medium text-stone-400">
                    Email <span className="text-stone-600">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      placeholder="jane@email.com"
                      value={form.email}
                      onChange={onChange}
                      className="h-12 w-full rounded-xl border border-stone-800 bg-stone-900 pl-10 pr-3 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched && !emailValid && (
                    <p className="text-xs text-red-400">Enter a valid email address.</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                {!preselected ? (
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-stone-400 transition hover:text-stone-200"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={handleContinueFromContact}
                  disabled={touched && !contactValid}
                  className="flex items-center gap-1 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition active:scale-[0.98] hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <p className="text-sm font-semibold text-stone-200">Confirm your request</p>
              <p className="mt-1 text-xs text-stone-500">Double-check the details below.</p>

              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Service</span>
                  <span className="font-medium text-white">
                    {selectedService ? humanizeSlug(selectedService.split(' (')[0]) : 'General inquiry'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Name</span>
                  <span className="font-medium text-white">{form.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Phone</span>
                  <span className="font-medium text-white">{form.phone}</span>
                </div>
                {form.email && (
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Email</span>
                    <span className="font-medium text-white">{form.email}</span>
                  </div>
                )}
              </div>

              <p className="mt-4 flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Your info goes straight to a
                trained local operator — no spam, ever.
              </p>

              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goTo(2)}
                  disabled={status === 'submitting'}
                  className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-stone-400 transition hover:text-stone-200 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={status === 'submitting'}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition active:scale-[0.98] hover:bg-emerald-400 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    'Get my free quote'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LeadForm;
