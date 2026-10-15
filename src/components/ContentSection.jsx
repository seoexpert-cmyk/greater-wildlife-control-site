import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// Reusable, alternating SEO content block. Prop-based so these sections
// can later be wired straight to PocketBase records (title/eyebrow/bullets
// or numbered steps + imageSrc) without touching layout code.
//
//   type="bullets" -> checkmarked list        (Why choose us)
//   type="steps"   -> numbered process list   (Our process)
//   default        -> plain paragraph body    (Residential & Commercial)
const ContentSection = ({
  eyebrow,
  title,
  description,
  bullets = [],
  steps = [],
  content,
  imageSrc,
  imageAlt = '',
  reverse = false,
  className = '',
}) => {
  return (
    <section className={`px-6 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto grid max-w-[72rem] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? 'order-1 lg:order-2' : 'order-1'}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-72 w-full rounded-xl object-cover shadow-md sm:h-96"
            loading="lazy"
          />
        </div>

        <div className={reverse ? 'order-2 lg:order-1' : 'order-2'}>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
          )}
          <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">{title}</h2>
          {description && <p className="mt-3 text-stone-600">{description}</p>}

          {content && (
            <div
              className="mt-4 flex flex-col gap-3 text-stone-600 [&_li]:text-stone-700 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:pl-1 [&_p]:leading-relaxed [&_strong]:text-stone-900 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {bullets.length > 0 && (
            <ul className="mt-6 flex flex-col gap-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  </span>
                  <span className="text-stone-700">{b}</span>
                </li>
              ))}
            </ul>
          )}

          {steps.length > 0 && (
            <ol className="mt-6 flex flex-col gap-5">
              {steps.map((s, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-stone-900">{s.title}</p>
                    {s.description && <p className="mt-1 text-sm text-stone-600">{s.description}</p>}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
