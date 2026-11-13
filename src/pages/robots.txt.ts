import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../utils/paths';

export const GET: APIRoute = () => {
  const sitemapUrl = getCanonicalUrl('/sitemap.xml', SITE_CONFIG.siteUrl);

  const content = `User-agent: *
Allow: /

# Google AdSense & Verification Crawlers
User-agent: Mediapartners-Google
Allow: /

User-agent: Google-AdSense
Allow: /

# Googlebot & Search Quality Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# XML Sitemap Location
Sitemap: ${sitemapUrl}
`;

  return new Response(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
