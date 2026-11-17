import fs from 'fs';
import { ecommerceCalculators } from './ecommerce.mjs';
import { creatorCalculators } from './creator.mjs';
import { marketplacesCalculators } from './marketplaces.mjs';
import { b2bCalculators } from './b2b.mjs';

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
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

async function run() {
  const existingEcommerce = JSON.parse(fs.readFileSync('src/data/calculators/ecommerce.json', 'utf8'));
  const existingCreator = JSON.parse(fs.readFileSync('src/data/calculators/creator-economy.json', 'utf8'));
  const existingMarketplaces = JSON.parse(fs.readFileSync('src/data/calculators/digital-marketplaces.json', 'utf8'));
  const existingB2B = JSON.parse(fs.readFileSync('src/data/calculators/b2b-pricing.json', 'utf8'));

  console.log(`Current counts: Ecommerce: ${existingEcommerce.length}, Creator: ${existingCreator.length}, Marketplaces: ${existingMarketplaces.length}, B2B: ${existingB2B.length}`);

  // Merge batch 4
  const mergedEcommerce = [...existingEcommerce, ...ecommerceCalculators];
  const mergedCreator = [...existingCreator, ...creatorCalculators];
  const mergedMarketplaces = [...existingMarketplaces, ...marketplacesCalculators];
  const mergedB2B = [...existingB2B, ...b2bCalculators];

  const allCalculators = [
    ...mergedEcommerce,
    ...mergedCreator,
    ...mergedMarketplaces,
    ...mergedB2B
  ];

  console.log(`Total calculators to audit: ${allCalculators.length}`);
  if (allCalculators.length !== 100) {
    throw new Error(`Expected exactly 100 calculators, got ${allCalculators.length}`);
  }

  const allSlugs = new Set(allCalculators.map(c => c.slug));
  const globalErrors = [];

  // Step 1: Uniqueness Checks
  const seenSlugs = new Map();
  const seenTitles = new Map();
  const seenMetaTitles = new Map();
  const seenComparisonPairs = new Map();
  const seenInputsByEngine = new Map();

  for (const calc of allCalculators) {
    // 1. Slug uniqueness
    if (seenSlugs.has(calc.slug)) {
      globalErrors.push(`Duplicate slug: "${calc.slug}"`);
    } else {
      seenSlugs.set(calc.slug, calc.slug);
    }

    // 2. Title uniqueness
    const titleKey = calc.title.trim().toLowerCase();
    if (seenTitles.has(titleKey)) {
      globalErrors.push(`Duplicate title in "${calc.slug}": matches "${seenTitles.get(titleKey)}"`);
    } else {
      seenTitles.set(titleKey, calc.slug);
    }

    // 3. MetaTitle uniqueness
    const metaTitleKey = calc.metaTitle.trim().toLowerCase();
    if (seenMetaTitles.has(metaTitleKey)) {
      globalErrors.push(`Duplicate metaTitle in "${calc.slug}": matches "${seenMetaTitles.get(metaTitleKey)}"`);
    } else {
      seenMetaTitles.set(metaTitleKey, calc.slug);
    }

    // 4. Comparison Pair Normalization
    if (calc.slug.includes('-vs-')) {
      const basePair = calc.slug.replace(/-(fee-)?calculator$/, '');
      const parts = basePair.split('-vs-');
      if (parts.length === 2) {
        const normalizedKey = parts.map(p => p.trim().toLowerCase()).sort().join('-vs-');
        if (seenComparisonPairs.has(normalizedKey)) {
          globalErrors.push(`Mirror-image comparison collision: "${normalizedKey}" in "${calc.slug}" vs "${seenComparisonPairs.get(normalizedKey)}"`);
        } else {
          seenComparisonPairs.set(normalizedKey, calc.slug);
        }
      }
    }

    // 5. Unique Default Inputs per Engine
    const sortedKeys = Object.keys(calc.defaultInputs || {}).sort();
    const sortedObj = {};
    for (const k of sortedKeys) sortedObj[k] = calc.defaultInputs[k];
    const inputKey = `${calc.engineType}::${JSON.stringify(sortedObj)}`;
    if (seenInputsByEngine.has(inputKey)) {
      globalErrors.push(`Duplicate defaultInputs in "${calc.slug}" matches "${seenInputsByEngine.get(inputKey)}" under engine "${calc.engineType}"`);
    } else {
      seenInputsByEngine.set(inputKey, calc.slug);
    }
  }

  // Step 2: 4-Gram Shingle Similarity Check
  const shingleMap = new Map();
  for (const calc of allCalculators) {
    const text = extractTextForNGram(calc);
    shingleMap.set(calc.slug, get4GramShingles(text));
  }

  let maxSimilarity = 0;
  let maxSimilarityPair = 'N/A';
  let totalPairs = 0;

  for (let i = 0; i < allCalculators.length; i++) {
    for (let j = i + 1; j < allCalculators.length; j++) {
      totalPairs++;
      const slugA = allCalculators[i].slug;
      const slugB = allCalculators[j].slug;
      const setA = shingleMap.get(slugA);
      const setB = shingleMap.get(slugB);
      const sim = calculateJaccardSimilarity(setA, setB);

      if (sim > maxSimilarity) {
        maxSimilarity = sim;
        maxSimilarityPair = `${slugA} vs ${slugB}`;
      }

      if (sim >= 0.18) {
        globalErrors.push(`4-Gram similarity violation (${(sim * 100).toFixed(2)}% >= 18%) between "${slugA}" and "${slugB}"`);
      }
    }
  }

  console.log(`Evaluated ${totalPairs} calculator pairs. Max 4-gram similarity: ${(maxSimilarity * 100).toFixed(2)}% (${maxSimilarityPair})`);

  // Step 3: Per-calculator content audit
  let totalWordsSum = 0;
  for (const calc of allCalculators) {
    const wordCount = calculateGuideWords(calc);
    totalWordsSum += wordCount;
    const faqCount = calc.guideContent?.faqs?.length || 0;
    const tableRows = calc.guideContent?.benchmarkTable?.rows?.length || 0;

    if (wordCount < 650) {
      globalErrors.push(`[${calc.slug}] Only ${wordCount} words (minimum 650)`);
    }

    const execWords = countWords(calc.guideContent?.executiveSummary || '');
    if (execWords < 120) {
      globalErrors.push(`[${calc.slug}] Executive summary has only ${execWords} words (minimum 120)`);
    }

    if (faqCount < 5) {
      globalErrors.push(`[${calc.slug}] Only ${faqCount} FAQs (minimum 5)`);
    } else {
      calc.guideContent.faqs.forEach((faq, idx) => {
        const aWords = countWords(faq.answer || '');
        if (aWords < 50) {
          globalErrors.push(`[${calc.slug}] FAQ #${idx + 1} has only ${aWords} words (minimum 50)`);
        }
      });
    }

    if (tableRows < 4) {
      globalErrors.push(`[${calc.slug}] Benchmark table has only ${tableRows} rows (minimum 4)`);
    }

    if (!calc.relatedSlugs || calc.relatedSlugs.length < 3) {
      globalErrors.push(`[${calc.slug}] Must have at least 3 related slugs`);
    } else {
      for (const rel of calc.relatedSlugs) {
        if (!allSlugs.has(rel)) {
          globalErrors.push(`[${calc.slug}] Broken related slug reference: "${rel}" does not exist in dataset`);
        }
      }
    }
  }

  if (globalErrors.length > 0) {
    console.error(`\n🚨 AUDIT FAILED with ${globalErrors.length} errors:`);
    globalErrors.forEach(err => console.error('  - ' + err));
    throw new Error('Audit failed. Aborting merge.');
  }

  console.log(`\n✅ ALL 100 CALCULATORS PASSED STRICT QUALITY GATE!`);
  console.log(`Average guide words per calculator: ${(totalWordsSum / allCalculators.length).toFixed(1)} words`);
  console.log(`Max 4-gram Jaccard similarity: ${(maxSimilarity * 100).toFixed(2)}% (${maxSimilarityPair})`);

  // Write back to JSON files
  fs.writeFileSync('src/data/calculators/ecommerce.json', JSON.stringify(mergedEcommerce, null, 2), 'utf8');
  fs.writeFileSync('src/data/calculators/creator-economy.json', JSON.stringify(mergedCreator, null, 2), 'utf8');
  fs.writeFileSync('src/data/calculators/digital-marketplaces.json', JSON.stringify(mergedMarketplaces, null, 2), 'utf8');
  fs.writeFileSync('src/data/calculators/b2b-pricing.json', JSON.stringify(mergedB2B, null, 2), 'utf8');

  console.log(`\n Successfully written 25 calculators to each of the 4 cluster files!`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
