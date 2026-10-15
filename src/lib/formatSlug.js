// Turns a slug like "greater-toronto" or "raccoon-removal" into
// human-readable Title Case: "Greater Toronto" / "Raccoon Removal".
export function humanizeSlug(slug = '') {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function provinceLabel(code = '') {
  return code.toUpperCase();
}
