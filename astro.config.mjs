// @ts-check
import { defineConfig } from 'astro/config';

// Zero JavaScript shipped to visitors by default.
// Astro already does this — no framework integrations means no client JS.
export default defineConfig({
  site: 'https://maxwellpours.com',
  output: 'static',
});
