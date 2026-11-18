import type { APIRoute } from 'astro';
import { getCalculatorsByCategory } from '../../data/calculators';
import { buildPinterestRssXml } from '../../utils/generatePinterestRss';

export const GET: APIRoute = () => {
  const creatorCalculators = getCalculatorsByCategory('creator-economy');
  const xml = buildPinterestRssXml({
    title: 'Creator Economy & Ad Splits Pinterest Cheat-Sheets',
    description: 'Auto-syndication feed for all 22 verified YouTube RPM, TikTok, podcast, and subscription income calculators from kitaaab.net.',
    feedPath: '/feeds/pinterest-creator-economy.xml',
    calculators: creatorCalculators
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
