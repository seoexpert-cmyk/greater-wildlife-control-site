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

// Pulls "### Question?" + answer pairs out of an article's FAQ section so the
// page can publish FAQPage structured data.
export function extractFaqs(markdown = '') {
  const faqStart = markdown.search(/^##\s+.*(FAQ|Frequently Asked)/im);
  if (faqStart === -1) return [];
  const rest = markdown.slice(faqStart).split('\n').slice(1).join('\n');
  const end = rest.search(/^##\s/m);
  const section = end === -1 ? rest : rest.slice(0, end);
  const faqs = [];
  const re = /^###\s+(?:\*\*)?(?:Q\d+[:.]\s*)?(.+?\?)(?:\*\*)?\s*$([\s\S]*?)(?=^###\s|$(?![\s\S]))/gm;
  let m;
  while ((m = re.exec(section))) {
    const answer = m[2]
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`>#|]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (answer) faqs.push({ q: m[1].trim(), a: answer });
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
