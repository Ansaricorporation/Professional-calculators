import type { APIRoute } from 'astro';
import { getAllCalculators } from '../data/calculators';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../utils/paths';

export const GET: APIRoute = () => {
  const calculators = getAllCalculators();
  const today = '2026-11-19';

  const staticPages = [
    { url: getCanonicalUrl('/', SITE_CONFIG.siteUrl), priority: '1.0', changefreq: 'daily' },
    { url: getCanonicalUrl('/all-calculators/', SITE_CONFIG.siteUrl), priority: '0.9', changefreq: 'daily' },
    { url: getCanonicalUrl('/category/ecommerce/', SITE_CONFIG.siteUrl), priority: '0.8', changefreq: 'weekly' },
    { url: getCanonicalUrl('/category/creator-economy/', SITE_CONFIG.siteUrl), priority: '0.8', changefreq: 'weekly' },
    { url: getCanonicalUrl('/category/digital-marketplaces/', SITE_CONFIG.siteUrl), priority: '0.8', changefreq: 'weekly' },
    { url: getCanonicalUrl('/category/b2b-pricing/', SITE_CONFIG.siteUrl), priority: '0.8', changefreq: 'weekly' },
    { url: getCanonicalUrl('/category/wealth-investing/', SITE_CONFIG.siteUrl), priority: '0.8', changefreq: 'weekly' },
    { url: getCanonicalUrl('/about/', SITE_CONFIG.siteUrl), priority: '0.6', changefreq: 'monthly' },
    { url: getCanonicalUrl('/methodology/', SITE_CONFIG.siteUrl), priority: '0.7', changefreq: 'monthly' },
    { url: getCanonicalUrl('/contact/', SITE_CONFIG.siteUrl), priority: '0.5', changefreq: 'monthly' },
    { url: getCanonicalUrl('/privacy-policy/', SITE_CONFIG.siteUrl), priority: '0.4', changefreq: 'monthly' },
    { url: getCanonicalUrl('/terms/', SITE_CONFIG.siteUrl), priority: '0.4', changefreq: 'monthly' },
  ];

  const calculatorPages = calculators.map(calc => ({
    url: getCanonicalUrl(`/calculator/${calc.slug}/`, SITE_CONFIG.siteUrl),
    priority: '0.9',
    changefreq: 'weekly'
  }));

  const allUrls = [...staticPages, ...calculatorPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
