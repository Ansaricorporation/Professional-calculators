import type { APIRoute } from 'astro';
import { getCalculatorsByCategory } from '../../data/calculators';
import { buildPinterestRssXml } from '../../utils/generatePinterestRss';

export const GET: APIRoute = () => {
  const b2bCalculators = getCalculatorsByCategory('b2b-pricing');
  const xml = buildPinterestRssXml({
    title: 'B2B Hourly & Retainer Pricing Pinterest Cheat-Sheets',
    description: 'Auto-syndication feed for all 26 verified agency retainer, freelance billing, tax liability, and payment transfer calculators from kitaaab.net.',
    feedPath: '/feeds/pinterest-b2b-pricing.xml',
    calculators: b2bCalculators
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
