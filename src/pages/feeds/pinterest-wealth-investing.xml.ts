import type { APIRoute } from 'astro';
import { getCalculatorsByCategory } from '../../data/calculators';
import { buildPinterestRssXml } from '../../utils/generatePinterestRss';

export const GET: APIRoute = () => {
  const wealthCalculators = getCalculatorsByCategory('wealth-investing');
  const xml = buildPinterestRssXml({
    title: 'Wealth, Stocks & Real Estate Pinterest Cheat-Sheets',
    description: 'Auto-syndication feed for all 20 verified stock options, crypto staking, tax equity, and real estate calculators from kitaaab.net.',
    feedPath: '/feeds/pinterest-wealth-investing.xml',
    calculators: wealthCalculators
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
