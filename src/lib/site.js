import CITIES from '@/data/cities.json';
import SERVICES from '@/data/services.json';
import { EXTRA_SERVICE_SLUGS } from '@/lib/extraServices.mjs';
import { humanizeSlug } from '@/lib/formatSlug';

export const BRAND = 'Greater Wildlife Control';
export const PHONE_DISPLAY = '1 (800) 264-9416';
export const PHONE_TEL = '18002649416';

export const PROVINCES = {
  on: 'Ontario', qc: 'Quebec', bc: 'British Columbia', ab: 'Alberta', sk: 'Saskatchewan',
  mb: 'Manitoba', ns: 'Nova Scotia', nb: 'New Brunswick', nl: 'Newfoundland and Labrador', pe: 'Prince Edward Island',
};

export const cities = CITIES;
export const services = SERVICES;

// Services that only exist because the header menu links to them.
export const extraServices = EXTRA_SERVICE_SLUGS.map((slug) => ({
  slug,
  name: humanizeSlug(slug),
  category: 'Pest Control',
  baseContent: '',
}));

export const findCity = (province, slug) => CITIES.find((c) => c.province === province && c.slug === slug);
export const findService = (slug) => [...SERVICES, ...extraServices].find((s) => s.slug === slug);
export const childCities = (hub) => CITIES.filter((c) => c.province === hub.province && c.parentHub === hub.slug);
export const parentHubOf = (city) => (city.parentHub ? findCity(city.province, city.parentHub) : undefined);

export const pageTitle = (core) => `${core} | ${BRAND}`;

export function breadcrumbSchema(site, crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: site + path,
    })),
  };
}

// Pulls question + answer pairs out of an article's FAQ sections so the page
// can publish FAQPage structured data. A section is any H2 that mentions FAQ,
// questions, or what people ask. Questions are either "### Question?" headings
// or bold "**Question?**" lines, with the answer after them.
const FAQ_HEADING = /^##\s+.*\b(FAQ|Frequently Asked|Questions?|ask(?:s|ed)?)\b/i;

function cleanAnswer(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/[*_`>#|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractFaqs(markdown = '') {
  const faqs = [];
  const sections = markdown.split(/^(?=##\s)/m).filter((s) => FAQ_HEADING.test(s.split('\n')[0]));
  for (const section of sections) {
    const lines = section.split('\n').slice(1);
    let current = null;
    const flush = () => {
      if (current) {
        const a = cleanAnswer(current.a.join(' '));
        if (a) faqs.push({ q: current.q, a });
      }
      current = null;
    };
    for (const line of lines) {
      const h3 = line.match(/^###\s+(?:\*\*)?(?:Q\d+[:.]\s*)?(.+?\?)(?:\*\*)?\s*$/);
      const bold = line.match(/^\*\*(.+?\?)\*\*\s*(.*)$/);
      if (h3 || bold) {
        flush();
        current = { q: (h3 || bold)[1].trim(), a: bold ? [bold[2]] : [] };
      } else if (/^#{1,3}\s/.test(line)) {
        flush();
      } else if (current) {
        current.a.push(line);
      }
    }
    flush();
  }
  return faqs;
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
