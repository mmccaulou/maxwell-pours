import { getCollection } from 'astro:content';

// Per-track settings shared by the /work-with-me cards and the service pages.
// `interest` must match an <option> value in the contact form's select.
export const tracks = {
  restaurants: { cta: 'Free Wine List Review', interest: 'Restaurant' },
  cellars:     { cta: 'Free Private Cellar Review', interest: 'Private Cellar' },
} as const;

export async function getServices(track?: keyof typeof tracks) {
  const all = await getCollection('services');
  return all
    .filter((s) => !track || s.data.track === track)
    .sort((a, b) => a.data.order - b.data.order);
}

// Link to the contact form with the matching option preselected
// (the /work-with-me script reads ?interest= on load).
export function contactHref(track: keyof typeof tracks) {
  return `/work-with-me/?interest=${encodeURIComponent(tracks[track].interest)}#contact-form`;
}
