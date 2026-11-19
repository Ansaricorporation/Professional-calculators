import fs from 'fs';

const html = fs.readFileSync('dist/calculator/shopify-profit-margin-calculator/index.html', 'utf8');

// Check canonical
const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
console.log('Canonical URL:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');

// Check Title
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
console.log('Title (' + (titleMatch ? titleMatch[1].length : 0) + ' chars):', titleMatch ? titleMatch[1] : 'NOT FOUND');

// Check Meta Description
const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
console.log('Description (' + (descMatch ? descMatch[1].length : 0) + ' chars):', descMatch ? descMatch[1] : 'NOT FOUND');

// Check JSON-LD scripts
const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
console.log('JSON-LD script tags found:', jsonLdMatches.length);
jsonLdMatches.forEach((m, idx) => {
  try {
    const parsed = JSON.parse(m[1]);
    console.log(`Script ${idx + 1} @context:`, parsed['@context']);
    if (parsed['@graph']) {
      console.log('  @graph nodes:');
      parsed['@graph'].forEach((n, nIdx) => {
        console.log(`    Node ${nIdx + 1}: ${JSON.stringify(n['@type'])} -> ${n.name || n['@id']}`);
      });
    } else {
      console.log('  @type:', parsed['@type']);
    }
  } catch(e) {
    console.log(`Script ${idx + 1} JSON parse error:`, e.message);
  }
});

// Check Related Calculators section
console.log('Contains "Compare Related Calculators":', html.includes('Compare Related Calculators'));
const relatedCards = [...html.matchAll(/Compare Rates &rarr;/g)];
console.log('Related calculator card count:', relatedCards.length);

// Check Homepage
const homeHtml = fs.readFileSync('dist/index.html', 'utf8');
console.log('Home contains "Most Searched 2026 Fee & Profit Calculators":', homeHtml.includes('Most Searched 2026 Fee & Profit Calculators'));
const homeCards = [...homeHtml.matchAll(/Open Model/g)];
console.log('Home top-20 card count:', homeCards.length);

// Check Sitemap
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1]);
console.log('Sitemap URL count:', sitemapUrls.length);
console.log('Sitemap all 2026-11-19:', lastmods.every(d => d === '2026-11-19'));
console.log('Sample sitemap URL:', sitemapUrls[0], '| lastmod:', lastmods[0]);
