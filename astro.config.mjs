import fs from 'fs';
import dayjs from 'dayjs';
import tailwind from '@astrojs/tailwind';
import remarkBreaks from 'remark-breaks';
import sitemap from '@astrojs/sitemap';

import { defineConfig } from 'astro/config';
import { parse } from 'node-html-parser';
import { SITE } from './src/config';

const DEFAULT_FORMAT = 'YYYY/MM/DD';
const WEEKLY_REPO_NAME = 'liam-pat/weekly';
const START_DATE = '2024-06-06';

function formatDate(date) {
	return dayjs(date).format(DEFAULT_FORMAT);
}

function getFileCreateDate(filePath) {
	return formatDate(fs.statSync(filePath).birthtime);
}

function getWeeklyDate(num, filePath) {
	return num < 100 ? formatDate(dayjs(START_DATE).subtract(100 - num, 'week')) : getFileCreateDate(filePath);
}

function defaultLayoutPlugin() {
	return function (tree, file) {
		const filePath = file.history[0];
		const { frontmatter } = file.data.astro;
		frontmatter.layout = '@layouts/post.astro';

		if (tree.children[0]?.value && !frontmatter.pic) {
			const imageElement = parse(tree.children[0].value).querySelector('img');
			frontmatter.pic = imageElement.getAttribute('src');
		}

		if (tree.children[1]?.children[1]?.value) {
			frontmatter.desc = tree.children[1].children[1].value;
		}

		frontmatter.desc = frontmatter.desc || SITE.description;
		frontmatter.pic = frontmatter.pic || SITE.pic;

		if (!frontmatter.date) {
			const postNumber = filePath.split('/posts/')[1].split('-')[0];
			frontmatter.date =
				SITE.repo === WEEKLY_REPO_NAME
					? getWeeklyDate(postNumber, filePath)
					: getFileCreateDate(filePath);
		}
	};
}

export default defineConfig({
	site: SITE.homePage,
	prefetch: true,
	integrations: [
		tailwind(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
			filter: (page) => {
				// Filter out URLs with post titles, keep only numeric URLs
				// e.g., keep /posts/1/ but exclude /posts/1-title/
				const url = new URL(page);
				const postPathMatch = url.pathname.match(/\/posts\/(\d+)-/);
				return !postPathMatch;  // Return false to exclude URLs with titles
			},
		}),
	],
	markdown: {
		remarkPlugins: [remarkBreaks, defaultLayoutPlugin],
		rehypePlugins: [],
		gfm: true,  // GitHub Flavored Markdown
		smartypants: true,  // Smart quotes and dashes
		remarkRehype: {
			handlers: {},
			allowDangerousHtml: true,
		},
	},
	vite: {
		server: {
			host: true,
			allowedHosts: ['weekly.orb.local'],
		},
	},
});
