import type { CalculatorDefinition } from '../data/schema';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from './paths';

export interface FeedOptions {
  title: string;
  description: string;
  feedPath: string;
  calculators: CalculatorDefinition[];
}

export function buildPinterestRssXml(options: FeedOptions): string {
  const { title, description, feedPath, calculators } = options;
  const siteUrl = SITE_CONFIG.siteUrl;
  const feedUrl = getCanonicalUrl(feedPath, siteUrl);
  const nowRfc822 = new Date('2026-11-18T12:00:00Z').toUTCString();

  const itemsXml = calculators.map(calc => {
    const pageUrl = getCanonicalUrl(`/calculator/${calc.slug}/`, siteUrl);
    const pinUrl = getCanonicalUrl(`/pins/${calc.slug}.png`, siteUrl);
    const itemTitle = `${calc.title} (2026 Cheat Sheet)`;
    
    // Pinterest description with high-converting keywords and hashtags
    const descText = `${calc.title}: Verified 2026 fee schedule, take-rate formulas, and unit economics benchmarks. Simulate your exact net profit and payout at kitaaab.net. #${calc.category.replace(/-/g, '')} #financialcalculator #business #freelancer #kitaaab`;

    return `    <item>
      <title><![CDATA[${itemTitle}]]></title>
      <link>${pageUrl}</link>
      <guid isPermaLink="true">${pageUrl}</guid>
      <description><![CDATA[${descText}]]></description>
      <pubDate>${nowRfc822}</pubDate>
      <enclosure url="${pinUrl}" type="image/png" length="185000" />
      <media:content url="${pinUrl}" medium="image" type="image/png">
        <media:title type="html"><![CDATA[${itemTitle}]]></media:title>
        <media:description type="html"><![CDATA[${descText}]]></media:description>
      </media:content>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title><![CDATA[${title} | ${SITE_CONFIG.siteName}]]></title>
    <link>${siteUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description><![CDATA[${description}]]></description>
    <language>en-us</language>
    <lastBuildDate>${nowRfc822}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`.trim();
}
