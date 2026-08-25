import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import backlinks from './astro.backlinks.ts';
import remarkWikiLinks from './remark-wikilinks.ts';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    site: 'https://codify-wiki.michael-a6c.workers.dev',

    // The five URLs below were public and crawlable for 75+ days under the old
    // five-rung ladder before the 2026-08-25 rewrite renamed them. Anything that
    // linked or indexed them would otherwise hit a 404, so they redirect to the
    // page that replaced them rather than dead-ending.
    redirects: {
        '/notes/station-1-snapshot':         '/notes/rung-0-snapshot',
        '/notes/station-2-codify':           '/notes/rung-1-foundation-build',
        '/notes/station-3-orchestrate':      '/notes/rung-2-the-service',
        '/notes/the-graduation-path':        '/notes/the-three-rungs',
        '/notes/the-graduation-walkthrough': '/notes/a-client-walkthrough',
    },

    markdown: {
		remarkPlugins: [remarkWikiLinks],
	},

    integrations: [
		tailwind({
			// Don't apply Tailwind's base styles - preserve our design system
			applyBaseStyles: false,
		}),
		backlinks(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		}),
	],

    output: "hybrid",
    adapter: cloudflare()
});