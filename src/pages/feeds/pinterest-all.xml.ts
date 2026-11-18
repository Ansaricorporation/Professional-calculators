import type { APIRoute } from 'astro';
import { getAllCalculators } from '../../data/calculators';
import { buildPinterestRssXml } from '../../utils/generatePinterestRss';

export const GET: APIRoute = () => {
  const allCalculators = getAllCalculators();
  const xml = buildPinterestRssXml({
    title: 'All Financial Calculators & Fee Cheat-Sheets (Pinterest Feed)',
    description: 'Auto-syndication feed for all 100 verified financial calculators, platform fee breakdowns, and profit margin cheat-sheets from kitaaab.net.',
    feedPath: '/feeds/pinterest-all.xml',
    calculators: allCalculators
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
