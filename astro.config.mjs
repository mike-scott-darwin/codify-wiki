import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import backlinks from './astro.backlinks.ts';
import remarkWikiLinks from './remark-wikilinks.ts';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    site: 'https://codify-wiki.michael-a6c.workers.dev',

    // Every retired page forwards to the page that replaced it, so a link or a
    // search result never dead-ends. Targets are final: no redirect points at
    // another redirect.
    //
    // 2026-10-19: the wiki was cut from 25 pages to six, built on the two things
    // we sell (the website, and keeping you found). The four-documents pages,
    // the interview, the three-rung ladder and every page about how the work is
    // made were removed. Earlier entries date from the 2026-08-25 rewrite.
    redirects: {
        // 2026-08-25 and earlier
        '/notes/station-1-snapshot':         '/notes/a-worked-example',
        '/notes/station-2-codify':           '/notes/the-website',
        '/notes/station-3-orchestrate':      '/notes/keeping-you-found',
        '/notes/the-graduation-path':        '/',
        '/notes/the-graduation-walkthrough': '/notes/a-worked-example',
        '/notes/research-step':              '/notes/keeping-you-found',
        '/notes/writing-step':               '/notes/keeping-you-found',
        '/notes/outreach-step':              '/notes/keeping-you-found',
        '/notes/packaging-step':             '/notes/keeping-you-found',
        '/notes/review-step':                '/notes/keeping-you-found',
        '/notes/the-growing-library':        '/',
        // 2026-10-19
        '/notes/rung-0-snapshot':            '/notes/a-worked-example',
        '/notes/rung-1-foundation-build':    '/notes/the-website',
        '/notes/rung-2-the-service':         '/notes/keeping-you-found',
        '/notes/the-three-rungs':            '/',
        '/notes/a-client-walkthrough':       '/notes/a-worked-example',
        '/notes/the-codify-case-study':      '/notes/a-worked-example',
        '/notes/clients-while-you-sleep':    '/',
        '/notes/the-managed-service':        '/notes/keeping-you-found',
        '/notes/what-happens-each-week':     '/notes/keeping-you-found',
        '/notes/the-alignment-map':          '/notes/keeping-you-found',
        '/notes/the-compounding-loop':       '/notes/keeping-you-found',
        '/notes/decision-gates':             '/notes/keeping-you-found',
        '/notes/training-by-voice-note':     '/notes/keeping-you-found',
        '/notes/the-privacy-line':           '/notes/common-questions',
        '/notes/you-own-everything':         '/notes/common-questions',
        '/notes/what-changes':               '/',
        '/notes/the-genius-with-amnesia':    '/',
        '/notes/the-static-brain':           '/',
        '/notes/your-voice':                 '/',
        '/notes/your-audience':              '/',
        '/notes/your-offer':                 '/',
        '/notes/your-beliefs':               '/',
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