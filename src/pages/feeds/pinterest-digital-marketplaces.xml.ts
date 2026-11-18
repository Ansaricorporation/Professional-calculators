import type { APIRoute } from 'astro';
import { getCalculatorsByCategory } from '../../data/calculators';
import { buildPinterestRssXml } from '../../utils/generatePinterestRss';

export const GET: APIRoute = () => {
  const marketplaceCalculators = getCalculatorsByCategory('digital-marketplaces');
  const xml = buildPinterestRssXml({
    title: 'Digital Marketplaces & Storefronts Pinterest Cheat-Sheets',
    description: 'Auto-syndication feed for all 26 verified digital store, freelance platform, and marketplace fee calculators from kitaaab.net.',
    feedPath: '/feeds/pinterest-digital-marketplaces.xml',
    calculators: marketplaceCalculators
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
