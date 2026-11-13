import type { APIRoute } from 'astro';
import { getAllCalculators } from '../data/calculators';
import { SITE_CONFIG } from '../config/site';

export const GET: APIRoute = () => {
  const calculators = getAllCalculators();
  const baseUrl = SITE_CONFIG.siteUrl.replace(/\/$/, '');
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${baseUrl}/all-calculators/`, priority: '0.9', changefreq: 'daily' },
    { url: `${baseUrl}/category/ecommerce/`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/category/creator-economy/`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/category/digital-marketplaces/`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/category/b2b-pricing/`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/about/`, priority: '0.6', changefreq: 'monthly' },
    { url: `${baseUrl}/contact/`, priority: '0.5', changefreq: 'monthly' },
    { url: `${baseUrl}/privacy-policy/`, priority: '0.4', changefreq: 'monthly' },
    { url: `${baseUrl}/terms/`, priority: '0.4', changefreq: 'monthly' },
  ];

  const calculatorPages = calculators.map(calc => ({
    url: `${baseUrl}/calculator/${calc.slug}/`,
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
