import React, { useState } from 'react';
import { submitLead } from '@/lib/submitLead';
import { AnimatePresence, motion } from 'framer-motion';
import {
  PawPrint,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  User,
  PhoneCall,
  Mail,
  MapPin,
  ClipboardList,
  Bug,
  ScanSearch,
} from 'lucide-react';

// The three choices shown on the homepage hook. `label` is stored on the
// lead's `animal_issue` field; `slug` is kept for the icon/UI keying only.
const ANIMALS = [
  { label: 'Wildlife', slug: 'wildlife', icon: PawPrint, step2: 'Wildlife removal: almost done' },
  { label: 'Pests', slug: 'pests', icon: Bug, step2: 'Pest control: almost done' },
  { label: 'Inspection', slug: 'inspection', icon: ScanSearch, step2: 'Inspection request: almost done' },
];

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
};

const PHONE_RE = /^[+]?[\d\s().-]{10,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Homepage hook: Step 1 "What's the problem?" animal grid, Step 2 short
// contact form. Submits straight to PocketBase's `leads` collection —
// same schema every other lead form on the site uses.
const InteractiveLeadForm = ({ className = '' }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [animal, setAnimal] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', postal_code: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const selectAnimal = (a) => {
    setAnimal(a);
    goTo(2);
  };

  const currentAnimalIcon = ANIMALS.find((a) => a.slug === animal?.slug)?.icon;

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const nameValid = form.name.trim().length > 1;
  const phoneDigits = form.phone.replace(/\D/g, '');
  const phoneValid = PHONE_RE.test(form.phone.trim()) && phoneDigits.length >= 10;
  const emailValid = form.email.trim() === '' || EMAIL_RE.test(form.email.trim());
  const postalValid = form.postal_code.trim().length > 1;
  const formValid = nameValid && phoneValid && emailValid && postalValid;

  const onSubmit = async () => {
    setTouched(true);
    if (!formValid) return;
    setError('');
    setStatus('submitting');
    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        postal_code: form.postal_code.trim(),
        animal_issue: animal?.label || '',
        source_url: typeof window !== 'undefined' ? window.location.href : '/',
        status: 'New',
      });
      setStatus('success');
      setAnimal(null);
      setForm({ name: '', phone: '', email: '', postal_code: '' });
      setTouched(false);
    } catch (err) {
      console.error('lead submit failed', err);
      setStatus('error');
      setError('Something went wrong. Please try again or call us directly.');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={`flex flex-col items-center gap-4 rounded-2xl border border-emerald-400/30 bg-gradient-to-b from-emerald-950 to-stone-950 px-6 py-14 text-center shadow-2xl ${className}`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
        </span>
        <p className="text-xl font-semibold text-white">You're all set!</p>
        <p className="max-w-xs text-sm text-stone-300">
          Thanks! A local technician will call you shortly.
        </p>
      </div>
    );
  }

  return (
    <div
      id="lead-capture"
      className={`scroll-mt-24 overflow-hidden rounded-2xl border border-stone-800 bg-stone-950/95 shadow-2xl backdrop-blur-sm ${className}`}
    >
      <div className="border-b border-stone-800 bg-emerald-600 px-6 py-4 sm:px-7">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-lg font-bold text-white">
            <ClipboardList className="h-5 w-5" strokeWidth={2} /> Get a Free Quote
          </p>
          <span className="rounded-full bg-emerald-950/30 px-2.5 py-1 text-xs font-semibold text-white">Step {step} of 2</span>
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 flex-1 rounded-full bg-white" />
          <span className={`h-1.5 flex-1 rounded-full transition-colors ${step === 2 ? 'bg-white' : 'bg-white/30'}`} />
        </div>
      </div>
      <div className="relative overflow-hidden px-6 py-6 sm:px-7 sm:py-7">
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
              <p className="text-base font-semibold text-white">What do you need help with?</p>
              <p className="mt-1 text-sm text-stone-400">
                Pick one, then add your name and number. A local technician calls you back.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {ANIMALS.map(({ label, slug, icon: Icon }) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => selectAnimal({ label, slug })}
                    className="flex flex-col items-center gap-2 rounded-xl border border-stone-800 bg-stone-900 px-2 py-4 text-center transition active:scale-[0.97] hover:border-emerald-500/60 hover:bg-stone-800"
                  >
                    <Icon className="h-6 w-6 text-emerald-400" strokeWidth={1.75} />
                    <span className="text-xs font-semibold text-white">{label}</span>
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
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15">
                  {React.createElement(currentAnimalIcon || ClipboardList, { className: 'h-4 w-4 text-emerald-400' })}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{ANIMALS.find((a) => a.slug === animal?.slug)?.step2}</p>
                  <p className="text-xs text-stone-500">We'll use this to call you back with your quote.</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ilf-name" className="text-xs font-medium text-stone-400">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                    <input
                      id="ilf-name"
                      name="name"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={onChange}
                      className="h-11 w-full rounded-xl border border-stone-800 bg-stone-900 pl-10 pr-3 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched && !nameValid && <p className="text-xs text-red-400">Please enter your full name.</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ilf-phone" className="text-xs font-medium text-stone-400">
                    Phone number
                  </label>
                  <div className="relative">
                    <PhoneCall className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                    <input
                      id="ilf-phone"
                      name="phone"
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={onChange}
                      className="h-11 w-full rounded-xl border border-stone-800 bg-stone-900 pl-10 pr-3 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched && !phoneValid && (
                    <p className="text-xs text-red-400">Enter a valid phone number (at least 10 digits).</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ilf-email" className="text-xs font-medium text-stone-400">
                    Email <span className="text-stone-600">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                    <input
                      id="ilf-email"
                      name="email"
                      type="email"
                      placeholder="jane@email.com"
                      value={form.email}
                      onChange={onChange}
                      className="h-11 w-full rounded-xl border border-stone-800 bg-stone-900 pl-10 pr-3 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched && !emailValid && <p className="text-xs text-red-400">Enter a valid email address.</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ilf-postal" className="text-xs font-medium text-stone-400">
                    Postal code / City
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                    <input
                      id="ilf-postal"
                      name="postal_code"
                      placeholder="M4P 1E4 or Toronto"
                      value={form.postal_code}
                      onChange={onChange}
                      className="h-11 w-full rounded-xl border border-stone-800 bg-stone-900 pl-10 pr-3 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched && !postalValid && (
                    <p className="text-xs text-red-400">Let us know your postal code or city.</p>
                  )}
                </div>
              </div>

              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  disabled={status === 'submitting'}
                  className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-stone-400 transition hover:text-stone-200 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={status === 'submitting'}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition active:scale-[0.98] hover:bg-emerald-400 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Get My Free Quote <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="mt-4 flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Your info goes straight to a
                trained local operator — no spam, ever.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveLeadForm;
