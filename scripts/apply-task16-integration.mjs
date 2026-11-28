import fs from 'fs';
import path from 'path';
import { task16Calculators } from './build-task16-spokes.mjs';

const calcDir = path.resolve('src/data/calculators');

function appendUnique(arr, ...items) {
  for (const item of items) {
    if (!arr.includes(item)) {
      arr.push(item);
    }
  }
}

// 1. Update digital-marketplaces.json (add 2 Steam spokes + wire steam parent relatedSlugs)
const dmPath = path.join(calcDir, 'digital-marketplaces.json');
const dmData = JSON.parse(fs.readFileSync(dmPath, 'utf8'));

for (const newCalc of task16Calculators.filter(c => c.category === 'digital-marketplaces')) {
  if (!dmData.some(c => c.slug === newCalc.slug)) {
    dmData.push(newCalc);
  }
}

const steamParent = dmData.find(c => c.slug === 'steam-game-developer-net-revenue-calculator');
if (steamParent) {
  appendUnique(
    steamParent.relatedSlugs,
    'steam-vs-epic-games-store-revenue-calculator',
    'steam-regional-pricing-tax-withholding-calculator'
  );
}

fs.writeFileSync(dmPath, JSON.stringify(dmData, null, 2) + '\n', 'utf8');
console.log(`Updated digital-marketplaces.json: ${dmData.length} calculators.`);

// 2. Update ecommerce.json (add 2 Walmart spokes + wire walmart parent relatedSlugs)
const ecPath = path.join(calcDir, 'ecommerce.json');
const ecData = JSON.parse(fs.readFileSync(ecPath, 'utf8'));

for (const newCalc of task16Calculators.filter(c => c.category === 'ecommerce')) {
  if (!ecData.some(c => c.slug === newCalc.slug)) {
    ecData.push(newCalc);
  }
}

const walmartParent = ecData.find(c => c.slug === 'walmart-marketplace-fee-calculator');
if (walmartParent) {
  appendUnique(
    walmartParent.relatedSlugs,
    'walmart-wfs-vs-amazon-fba-fee-calculator',
    'walmart-wfs-storage-return-fee-calculator'
  );
}

fs.writeFileSync(ecPath, JSON.stringify(ecData, null, 2) + '\n', 'utf8');
console.log(`Updated ecommerce.json: ${ecData.length} calculators.`);

// 3. Update creator-economy.json (wire 3-way cross-links between YouTube Gaming, Finance, Kids vs Standard)
const cePath = path.join(calcDir, 'creator-economy.json');
const ceData = JSON.parse(fs.readFileSync(cePath, 'utf8'));

const ytTargets = [
  'youtube-gaming-rpm-calculator',
  'youtube-finance-rpm-calculator',
  'youtube-kids-vs-standard-rpm-calculator'
];

for (const slug of ytTargets) {
  const item = ceData.find(c => c.slug === slug);
  if (item) {
    for (const peer of ytTargets) {
      if (peer !== slug) {
        appendUnique(item.relatedSlugs, peer);
      }
    }
  }
}

fs.writeFileSync(cePath, JSON.stringify(ceData, null, 2) + '\n', 'utf8');
console.log(`Updated creator-economy.json: ${ceData.length} calculators.`);
