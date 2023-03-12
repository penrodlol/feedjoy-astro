import netlify from '@astrojs/netlify/functions';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://feedjoy.fyi',
  output: 'server',
  adapter: netlify(),
  integrations: [
    preact(),
    tailwind(),
    sitemap({ changefreq: 'daily', lastmod: new Date() }),
    robotsTxt({ host: true, policy: [{ userAgent: '*', disallow: ['/404'] }] }),
  ],
});
