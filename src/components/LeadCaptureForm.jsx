import React from 'react';
import { Star } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

// Universal lead capture section. Every page (city, service, localized
// service) renders this at the anchor `#lead-capture` so the header's and
// mobile bar's "Get a Quote" CTA always resolves to the same landing spot.
// `LeadForm` itself already reads province/city/service context straight
// from the URL, so this wrapper only supplies the shared shell + copy.
const LeadCaptureForm = ({
  eyebrow = 'Get a free quote',
  title = 'Tell us what you need',
  description = "Share a few details and a local, experienced technician will call you back — usually the same day.",
  serviceSlug = '',
  serviceRequested = '',
  serviceName = '',
  areaName = '',
  className = '',
}) => (
  <section
    id="lead-capture"
    className={`scroll-mt-24 border-t border-stone-200 bg-white px-6 py-16 ${className}`}
  >
    <div className="mx-auto flex max-w-[72rem] flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-xl">
        <p className="mb-2 flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-stone-900">{title}</h2>
        <p className="mt-2 text-stone-600">{description}</p>
      </div>
      <div className="w-full max-w-md">
        <LeadForm serviceSlug={serviceSlug} serviceRequested={serviceRequested} serviceName={serviceName} areaName={areaName} />
      </div>
    </div>
  </section>
);

export default LeadCaptureForm;
