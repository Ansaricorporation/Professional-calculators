import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const { NEW_CALCULATORS_TASK15 } = await import('./build-task15-famous.mjs');

// Map of which calculators go to which category JSON file
const CALCULATOR_DISTRIBUTION = {
  'digital-marketplaces.json': [
    'airbnb-host-only-fee-calculator',
    'depop-seller-fee-boosted-listing-calculator',
    'whatnot-seller-fee-profit-calculator'
  ],
  'creator-economy.json': [
    'roblox-devex-payout-calculator'
  ]
};

// Parent relatedSlugs updates (without removing any existing links)
const PARENT_LINKS = {
  'airbnb-vs-vrbo-host-fee-calculator': [
    'airbnb-host-only-fee-calculator'
  ],
  'airbnb-arbitrage-calculator': [
    'airbnb-host-only-fee-calculator'
  ],
  'poshmark-vs-mercari-vs-depop-fee-calculator': [
    'depop-seller-fee-boosted-listing-calculator',
    'whatnot-seller-fee-profit-calculator'
  ],
  'ebay-vs-mercari-vs-poshmark-fee-calculator': [
    'depop-seller-fee-boosted-listing-calculator',
    'whatnot-seller-fee-profit-calculator'
  ],
  'ebay-fee-calculator': [
    'depop-seller-fee-boosted-listing-calculator',
    'whatnot-seller-fee-profit-calculator'
  ],
  'ebay-promoted-listings-fee-calculator': [
    'whatnot-seller-fee-profit-calculator'
  ],
  'steam-game-developer-net-revenue-calculator': [
    'roblox-devex-payout-calculator'
  ],
  'game-asset-store-royalty-calculator': [
    'roblox-devex-payout-calculator'
  ]
};

console.log('Applying Task 15 Famous-Platform integration into category JSON files...');

const files = [
  'ecommerce.json',
  'creator-economy.json',
  'digital-marketplaces.json',
  'b2b-pricing.json',
  'wealth-investing.json'
];

let totalAdded = 0;

for (const file of files) {
  const filePath = path.join(root, 'src/data/calculators', file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Update parent relatedSlugs if present in this file
  for (const calc of data) {
    if (PARENT_LINKS[calc.slug]) {
      for (const link of PARENT_LINKS[calc.slug]) {
        if (!calc.relatedSlugs.includes(link)) {
          calc.relatedSlugs.push(link);
          console.log(`  🔗 Added related link "${link}" to parent "${calc.slug}"`);
        }
      }
    }
  }

  // Append new calculators assigned to this file
  const calcsToAdd = CALCULATOR_DISTRIBUTION[file] || [];
  for (const slug of calcsToAdd) {
    const existing = data.find(c => c.slug === slug);
    if (!existing) {
      const def = NEW_CALCULATORS_TASK15.find(s => s.slug === slug);
      if (!def) {
        throw new Error(`Definition not found for slug: ${slug}`);
      }
      data.push(def);
      totalAdded++;
      console.log(`  ➕ Appended calculator "${slug}" to ${file}`);
    } else {
      console.log(`  ℹ️ Calculator "${slug}" already in ${file}, skipping append`);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Saved ${file} (${data.length} total calculators)`);
}

console.log(`\n🎉 Task 15 integration complete! Added ${totalAdded} new calculators.`);
