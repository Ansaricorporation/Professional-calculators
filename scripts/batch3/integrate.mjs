import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ecommerceCalculators } from './ecommerce.mjs';
import { creatorCalculators } from './creator.mjs';
import { marketplacesCalculators } from './marketplaces.mjs';
import { b2bCalculators } from './b2b.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

const dataDir = path.join(rootDir, 'src', 'data', 'calculators');

function loadJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, filename), 'utf8'));
}

const currentEcom = loadJson('ecommerce.json');
const currentCreator = loadJson('creator-economy.json');
const currentMarketplaces = loadJson('digital-marketplaces.json');
const currentB2b = loadJson('b2b-pricing.json');

console.log(`Current counts:`);
console.log(`- ecommerce: ${currentEcom.length}`);
console.log(`- creator-economy: ${currentCreator.length}`);
console.log(`- digital-marketplaces: ${currentMarketplaces.length}`);
console.log(`- b2b-pricing: ${currentB2b.length}`);
console.log(`Total current: ${currentEcom.length + currentCreator.length + currentMarketplaces.length + currentB2b.length}`);

// Combine
const newEcom = [...currentEcom, ...ecommerceCalculators];
const newCreator = [...currentCreator, ...creatorCalculators];
const newMarketplaces = [...currentMarketplaces, ...marketplacesCalculators];
const newB2b = [...currentB2b, ...b2bCalculators];

const all80 = [...newEcom, ...newCreator, ...newMarketplaces, ...newB2b];
console.log(`\nNew total: ${all80.length} calculators (should be 80)`);

// Import audit utilities logic
function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function calculateGuideWords(calc) {
  const g = calc.guideContent;
  let text = '';
  text += (g.executiveSummary || '') + ' ';
  text += (g.formulaBreakdown?.formulaString || '') + ' ';
  if (g.formulaBreakdown?.variables) {
    text += g.formulaBreakdown.variables.map(v => `${v.symbol} ${v.meaning}`).join(' ') + ' ';
  }
  if (g.workedExample) {
    text += (g.workedExample.scenarioTitle || '') + ' ';
    text += (g.workedExample.narrative || '') + ' ';
    text += (g.workedExample.stepByStepMath || []).join(' ') + ' ';
    text += (g.workedExample.finalTakeaway || '') + ' ';
  }
  if (g.benchmarkTable) {
    text += (g.benchmarkTable.title || '') + ' ';
    text += (g.benchmarkTable.headers || []).join(' ') + ' ';
    text += (g.benchmarkTable.rows || []).flat().join(' ') + ' ';
  }
  if (g.optimizationLevers) {
    text += g.optimizationLevers.map(l => `${l.title} ${l.actionableAdvice}`).join(' ') + ' ';
  }
  if (g.faqs) {
    text += g.faqs.map(f => `${f.question} ${f.answer}`).join(' ') + ' ';
  }
  return countWords(text);
}

function extractTextForNGram(calc) {
  const g = calc.guideContent;
  let text = '';
  text += (g.executiveSummary || '') + ' ';
  if (g.workedExample?.narrative) {
    text += g.workedExample.narrative + ' ';
  }
  if (g.optimizationLevers) {
    text += g.optimizationLevers.map(l => `${l.title} ${l.actionableAdvice}`).join(' ') + ' ';
  }
  if (g.faqs) {
    text += g.faqs.map(f => `${f.question} ${f.answer}`).join(' ') + ' ';
  }
  return text;
}

function get4GramShingles(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const shingles = new Set();
  for (let i = 0; i <= words.length - 4; i++) {
    shingles.add(`${words[i]} ${words[i + 1]} ${words[i + 2]} ${words[i + 3]}`);
  }
  return shingles;
}

function calculateJaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) {
      intersection++;
    }
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

const allSlugs = new Set(all80.map(c => c.slug));
const errors = [];

// 1. Slug uniqueness
const seenSlugs = new Set();
for (const c of all80) {
  if (seenSlugs.has(c.slug)) {
    errors.push(`Duplicate slug: ${c.slug}`);
  }
  seenSlugs.add(c.slug);
}

// 2. Title uniqueness
const seenTitles = new Map();
for (const c of all80) {
  const t = c.title.trim().toLowerCase();
  if (seenTitles.has(t)) {
    errors.push(`Duplicate title: "${c.title}" in ${c.slug} matches ${seenTitles.get(t)}`);
  }
  seenTitles.set(t, c.slug);
}

// 3. MetaTitle uniqueness
const seenMetaTitles = new Map();
for (const c of all80) {
  const mt = c.metaTitle.trim().toLowerCase();
  if (seenMetaTitles.has(mt)) {
    errors.push(`Duplicate metaTitle: "${c.metaTitle}" in ${c.slug} matches ${seenMetaTitles.get(mt)}`);
  }
  seenMetaTitles.set(mt, c.slug);
}

// 4. Comparison pairs
const seenPairs = new Map();
for (const c of all80) {
  if (c.slug.includes('-vs-')) {
    const basePair = c.slug.replace(/-(fee-)?calculator$/, '');
    const parts = basePair.split('-vs-');
    if (parts.length === 2) {
      const k = parts.map(p => p.trim().toLowerCase()).sort().join('-vs-');
      if (seenPairs.has(k)) {
        errors.push(`Mirror comparison pair collision: "${k}" in ${c.slug} matches ${seenPairs.get(k)}`);
      }
      seenPairs.set(k, c.slug);
    }
  }
}

// 5. Unique defaultInputs per engine
const seenInputs = new Map();
for (const c of all80) {
  const sortedKeys = Object.keys(c.defaultInputs || {}).sort();
  const sortedObj = {};
  for (const k of sortedKeys) {
    sortedObj[k] = c.defaultInputs[k];
  }
  const k = `${c.engineType}::${JSON.stringify(sortedObj)}`;
  if (seenInputs.has(k)) {
    errors.push(`Duplicate defaultInputs in ${c.slug} under engine ${c.engineType} matches ${seenInputs.get(k)}`);
  }
  seenInputs.set(k, c.slug);
}

// 6. Individual guide checks
for (const c of all80) {
  const words = calculateGuideWords(c);
  if (words < 650) {
    errors.push(`[${c.slug}] Word count too low: ${words} words (min 650)`);
  }
  const execWords = countWords(c.guideContent.executiveSummary);
  if (execWords < 120) {
    errors.push(`[${c.slug}] Executive summary too short: ${execWords} words (min 120)`);
  }
  if (!c.guideContent.faqs || c.guideContent.faqs.length < 5) {
    errors.push(`[${c.slug}] Less than 5 FAQs: ${c.guideContent.faqs?.length || 0}`);
  } else {
    c.guideContent.faqs.forEach((faq, i) => {
      const fw = countWords(faq.answer);
      if (fw < 50) {
        errors.push(`[${c.slug}] FAQ #${i+1} answer too short: ${fw} words (min 50)`);
      }
    });
  }
  if (!c.guideContent.benchmarkTable || !c.guideContent.benchmarkTable.rows || c.guideContent.benchmarkTable.rows.length < 4) {
    errors.push(`[${c.slug}] Benchmark table has fewer than 4 rows`);
  }
  if (!c.relatedSlugs || c.relatedSlugs.length < 3) {
    errors.push(`[${c.slug}] Fewer than 3 related slugs`);
  } else {
    for (const rel of c.relatedSlugs) {
      if (!allSlugs.has(rel)) {
        errors.push(`[${c.slug}] Broken related slug reference: "${rel}"`);
      }
    }
  }
}

// 7. 4-Gram Shingle Similarity across ALL pairs (80 * 79 / 2 = 3,160 pairs)
console.log(`\nComputing 4-gram Jaccard similarity across ${(all80.length * (all80.length - 1)) / 2} pairs...`);
const shingleMap = new Map();
for (const c of all80) {
  shingleMap.set(c.slug, get4GramShingles(extractTextForNGram(c)));
}

let maxSimilarity = 0;
let maxPair = 'N/A';

for (let i = 0; i < all80.length; i++) {
  for (let j = i + 1; j < all80.length; j++) {
    const slugA = all80[i].slug;
    const slugB = all80[j].slug;
    const setA = shingleMap.get(slugA);
    const setB = shingleMap.get(slugB);
    const sim = calculateJaccardSimilarity(setA, setB);
    if (sim > maxSimilarity) {
      maxSimilarity = sim;
      maxPair = `${slugA} vs ${slugB}`;
    }
    if (sim >= 0.18) {
      errors.push(`Excessive 4-Gram Similarity: ${(sim * 100).toFixed(2)}% between "${slugA}" and "${slugB}" (>= 18% ceiling)`);
    }
  }
}

console.log(`🔍 Max 4-Gram Similarity across all 3,160 pairs: ${(maxSimilarity * 100).toFixed(2)}% (${maxPair})`);

if (errors.length > 0) {
  console.error(`\n❌ AUDIT FAILED with ${errors.length} errors:`);
  errors.slice(0, 20).forEach(e => console.error(`  - ${e}`));
  if (errors.length > 20) console.error(`  ... and ${errors.length - 20} more errors`);
  process.exit(1);
}

console.log(`\n✅ ALL 80 CALCULATORS PASSED ALL AUDIT CHECKS WITH ZERO ERRORS!`);

// Write files
fs.writeFileSync(path.join(dataDir, 'ecommerce.json'), JSON.stringify(newEcom, null, 2), 'utf8');
fs.writeFileSync(path.join(dataDir, 'creator-economy.json'), JSON.stringify(newCreator, null, 2), 'utf8');
fs.writeFileSync(path.join(dataDir, 'digital-marketplaces.json'), JSON.stringify(newMarketplaces, null, 2), 'utf8');
fs.writeFileSync(path.join(dataDir, 'b2b-pricing.json'), JSON.stringify(newB2b, null, 2), 'utf8');

console.log(`\nSuccessfully updated all 4 JSON files in src/data/calculators/!`);
