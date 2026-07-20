import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';

const pillarColors: Record<string, string> = {
	'Quantum Algorithms': '#a78bfa',
	'Quantum Hardware': '#38bdf8',
	'Quantum Cryptography': '#34d399',
	'AI Integrations': '#fbbf24',
	'Future Tech': '#f87171',
};
const BRAND = '#60a5fa';

type Card = {
	title: string;
	label: string;
	accent: string;
	subtitle?: string;
	author?: string;
};

const escapeXml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Word-wrap into at most `maxLines` lines of ~maxChars each (with ellipsis overflow).
function wrap(text: string, maxChars: number, maxLines: number): string[] {
	const words = text.split(/\s+/);
	const lines: string[] = [];
	let current = '';
	for (const word of words) {
		const candidate = current ? `${current} ${word}` : word;
		if (candidate.length > maxChars && current) {
			lines.push(current);
			current = word;
		} else {
			current = candidate;
		}
	}
	if (current) lines.push(current);
	if (lines.length > maxLines) {
		const kept = lines.slice(0, maxLines);
		kept[maxLines - 1] = kept[maxLines - 1].replace(/[.,;:—-]?\s*\S*$/, '') + '…';
		return kept;
	}
	return lines;
}

function renderCard(card: Card): string {
	const { accent } = card;
	const hasSub = Boolean(card.subtitle);
	const lines = wrap(card.title, 26, 4);
	const fontSize = lines.length >= 4 ? 54 : lines.length === 3 ? 60 : 66;
	const lineHeight = fontSize + 14;
	const centerY = hasSub ? 250 : 300;
	const startY = centerY - (lines.length * lineHeight) / 2 + fontSize;

	const titleText = lines
		.map(
			(line, i) =>
				`<text x="90" y="${startY + i * lineHeight}" font-family="DejaVu Sans" font-weight="bold" font-size="${fontSize}" fill="#e6e8ee">${escapeXml(line)}</text>`,
		)
		.join('\n  ');

	let subtitleText = '';
	if (card.subtitle) {
		const subLines = wrap(card.subtitle, 62, 2);
		const subStart = startY + (lines.length - 1) * lineHeight + 78;
		subtitleText = subLines
			.map(
				(line, i) =>
					`<text x="90" y="${subStart + i * 42}" font-family="DejaVu Sans" font-size="30" fill="#9aa3ba">${escapeXml(line)}</text>`,
			)
			.join('\n  ');
	}

	const footerRight = card.author
		? `<text x="1110" y="556" text-anchor="end" font-family="DejaVu Sans" font-size="26" fill="#9aa3ba">${escapeXml(card.author)}</text>`
		: '';

	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117"/>
      <stop offset="100%" stop-color="#0a0f1a"/>
    </linearGradient>
    <radialGradient id="glow" cx="88%" cy="12%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g fill="${accent}" opacity="0.22">
    ${Array.from({ length: 6 })
			.map((_, r) =>
				Array.from({ length: 8 })
					.map((_, c) => `<circle cx="${820 + c * 46}" cy="${70 + r * 46}" r="3"/>`)
					.join(''),
			)
			.join('\n    ')}
  </g>
  <rect x="0" y="0" width="12" height="630" fill="${accent}"/>
  <text x="90" y="120" font-family="DejaVu Sans" font-weight="bold" font-size="24" letter-spacing="4" fill="${accent}">${escapeXml(card.label)}</text>
  ${titleText}
  ${subtitleText}
  <rect x="90" y="500" width="1020" height="2" fill="#262c3a"/>
  <text x="90" y="556" font-family="DejaVu Sans" font-weight="bold" font-size="30" fill="#e6e8ee">${escapeXml(SITE_TITLE)}</text>
  ${footerRight}
</svg>`;
}

// ── Static (non-article) page cards ──────────────────────────────────────────
const pillarSubtitles: Record<string, string> = {
	'quantum-algorithms': 'Shor’s, Grover’s, and the variational methods defining the near-term era.',
	'quantum-hardware': 'Superconducting, trapped-ion, neutral-atom, photonic, and topological qubits.',
	'quantum-cryptography': 'Quantum key distribution and the post-quantum cryptography replacing RSA.',
	'ai-integrations': 'Quantum kernels, barren plateaus, and the honest limits of the NISQ era.',
	'future-tech': 'The quantum internet, neuromorphic hardware, and the trajectory of the field.',
};
const pillarNames: Record<string, string> = {
	'quantum-algorithms': 'Quantum Algorithms',
	'quantum-hardware': 'Quantum Hardware',
	'quantum-cryptography': 'Quantum Cryptography',
	'ai-integrations': 'AI Integrations',
	'future-tech': 'Future Tech',
};
const pillarAccentBySlug: Record<string, string> = {
	'quantum-algorithms': '#a78bfa',
	'quantum-hardware': '#38bdf8',
	'quantum-cryptography': '#34d399',
	'ai-integrations': '#fbbf24',
	'future-tech': '#f87171',
};

function pageCards(): { slug: string; card: Card }[] {
	const staticPages: { slug: string; card: Card }[] = [
		{ slug: 'home', card: { title: SITE_TITLE, label: 'THE PUBLICATION', subtitle: SITE_DESCRIPTION, accent: BRAND } },
		{ slug: 'about', card: { title: `About ${SITE_TITLE}`, label: 'ABOUT', subtitle: 'Quantum computing, cryptography, and their convergence with AI — the physics and engineering, not the hype.', accent: BRAND } },
		{ slug: 'glossary', card: { title: 'Glossary', label: 'REFERENCE', subtitle: 'Key terms in quantum computing and artificial intelligence.', accent: BRAND } },
		{ slug: 'newsletter', card: { title: 'Subscribe', label: 'NEWSLETTER', subtitle: 'New articles across all five sections, delivered to your inbox.', accent: BRAND } },
		{ slug: 'pillars', card: { title: 'Browse by Section', label: 'SECTIONS', subtitle: 'Five pillars: algorithms, hardware, cryptography, AI integrations, and future tech.', accent: BRAND } },
		{ slug: 'articles', card: { title: 'All Articles', label: 'ARCHIVE', subtitle: 'Every piece across all five sections, newest first.', accent: BRAND } },
	];
	const pillarPages = Object.keys(pillarNames).map((slug) => ({
		slug: `pillar-${slug}`,
		card: {
			title: pillarNames[slug],
			label: 'SECTION',
			subtitle: pillarSubtitles[slug],
			accent: pillarAccentBySlug[slug],
		} as Card,
	}));
	return [...staticPages, ...pillarPages];
}

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
const plural = (n: number) => `${n} article${n !== 1 ? 's' : ''}`;

export async function getStaticPaths() {
	const posts = await getCollection('blog');
	const authorProfiles = await getCollection('authors');

	const articlePaths = posts.map((post) => ({
		params: { slug: post.id },
		props: {
			card: {
				title: post.data.title,
				label: (post.data.pillar ?? 'Quantum Computing').toUpperCase(),
				accent: (post.data.pillar && pillarColors[post.data.pillar]) || BRAND,
				author: post.data.author,
			} as Card,
		},
	}));

	const pagePaths = pageCards().map(({ slug, card }) => ({
		params: { slug },
		props: { card },
	}));

	// Tags
	const tagCounts = new Map<string, { name: string; count: number }>();
	posts.forEach((p) =>
		p.data.tags?.forEach((t) => {
			const key = slugify(t);
			const e = tagCounts.get(key) ?? { name: t, count: 0 };
			e.count++;
			tagCounts.set(key, e);
		}),
	);
	const tagPaths = [...tagCounts.entries()].map(([slug, { name, count }]) => ({
		params: { slug: `tag-${slug}` },
		props: {
			card: {
				title: `#${name}`,
				label: 'TAG',
				subtitle: `${plural(count)} tagged “${name}”.`,
				accent: BRAND,
			} as Card,
		},
	}));

	// Authors
	const authorCounts = new Map<string, { name: string; count: number }>();
	posts.forEach((p) => {
		const key = slugify(p.data.author);
		const e = authorCounts.get(key) ?? { name: p.data.author, count: 0 };
		e.count++;
		authorCounts.set(key, e);
	});
	const authorPaths = [...authorCounts.entries()].map(([slug, { name, count }]) => {
		const role = authorProfiles.find((a) => a.id === slug)?.data.role;
		return {
			params: { slug: `author-${slug}` },
			props: {
				card: {
					title: name,
					label: 'AUTHOR',
					subtitle: role ? `${role} · ${plural(count)}` : plural(count),
					accent: BRAND,
				} as Card,
			},
		};
	});

	// Series
	const seriesCounts = new Map<string, { name: string; count: number }>();
	posts.forEach((p) => {
		if (!p.data.series) return;
		const key = slugify(p.data.series);
		const e = seriesCounts.get(key) ?? { name: p.data.series, count: 0 };
		e.count++;
		seriesCounts.set(key, e);
	});
	const seriesPaths = [...seriesCounts.entries()].map(([slug, { name, count }]) => ({
		params: { slug: `series-${slug}` },
		props: {
			card: {
				title: name,
				label: 'SERIES',
				subtitle: `A ${count}-part series.`,
				accent: BRAND,
			} as Card,
		},
	}));

	return [...articlePaths, ...pagePaths, ...tagPaths, ...authorPaths, ...seriesPaths];
}

export const GET: APIRoute = async ({ props }) => {
	const { card } = props as { card: Card };
	const svg = renderCard(card);
	const png = await sharp(Buffer.from(svg)).png().toBuffer();
	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
