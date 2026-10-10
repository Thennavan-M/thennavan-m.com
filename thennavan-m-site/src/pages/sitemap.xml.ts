import type { APIRoute } from 'astro';

// List every page here so search engines can find it.
const pages = ['', 'research/', 'projects/', 'publications/', 'teaching/', 'cv/', 'contact/'];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://www.thennavan-m.com/');
  const urls = pages.map((p) => `  <url><loc>${new URL(p, base).href}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
