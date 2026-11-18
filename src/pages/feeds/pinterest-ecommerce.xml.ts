import type { APIRoute } from 'astro';
import { getCalculatorsByCategory } from '../../data/calculators';
import { buildPinterestRssXml } from '../../utils/generatePinterestRss';

export const GET: APIRoute = () => {
  const ecomCalculators = getCalculatorsByCategory('ecommerce');
  const xml = buildPinterestRssXml({
    title: 'E-Commerce & DTC Margins Pinterest Cheat-Sheets',
    description: 'Auto-syndication feed for all 26 verified e-commerce, fulfillment, and retail profit margin calculators from kitaaab.net.',
    feedPath: '/feeds/pinterest-ecommerce.xml',
    calculators: ecomCalculators
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
