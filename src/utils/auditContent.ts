import type { CalculatorDefinition } from '../data/schema';

export interface AuditResult {
  slug: string;
  wordCount: number;
  faqCount: number;
  tableRows: number;
  validRelated: boolean;
  status: 'PASSED' | 'FAILED';
  errors: string[];
}

export function countWords(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export function calculateGuideWords(calc: CalculatorDefinition): number {
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

export function extractTextForNGram(calc: CalculatorDefinition): string {
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

export function get4GramShingles(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - 4; i++) {
    shingles.add(`${words[i]} ${words[i + 1]} ${words[i + 2]} ${words[i + 3]}`);
  }
  return shingles;
}

export function calculateJaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
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

export function auditAllCalculators(calculators: CalculatorDefinition[]): AuditResult[] {
  const allSlugs = new Set(calculators.map(c => c.slug));
  const results: AuditResult[] = [];
  const globalErrors: string[] = [];

  // Step 1: Global Anti-Cannibalization & Uniqueness Checks
  const seenSlugs = new Map<string, string>();
  const seenTitles = new Map<string, string>();
  const seenMetaTitles = new Map<string, string>();
  const seenComparisonPairs = new Map<string, string>();
  const seenInputsByEngine = new Map<string, string>();

  for (const calc of calculators) {
    // 1. Slug uniqueness
    if (seenSlugs.has(calc.slug)) {
      globalErrors.push(`Duplicate slug detected: "${calc.slug}" is defined more than once.`);
    } else {
      seenSlugs.set(calc.slug, calc.slug);
    }

    // 2. Title uniqueness
    const titleKey = calc.title.trim().toLowerCase();
    if (seenTitles.has(titleKey)) {
      globalErrors.push(`Duplicate title detected in "${calc.slug}": matches "${seenTitles.get(titleKey)}".`);
    } else {
      seenTitles.set(titleKey, calc.slug);
    }

    // 3. MetaTitle uniqueness
    const metaTitleKey = calc.metaTitle.trim().toLowerCase();
    if (seenMetaTitles.has(metaTitleKey)) {
      globalErrors.push(`Duplicate metaTitle detected in "${calc.slug}": matches "${seenMetaTitles.get(metaTitleKey)}".`);
    } else {
      seenMetaTitles.set(metaTitleKey, calc.slug);
    }

    // 4. Comparison Pair Normalization (Anti-Mirror-Image Cannibalization)
    if (calc.slug.includes('-vs-')) {
      const basePair = calc.slug.replace(/-(fee-)?calculator$/, '');
      const parts = basePair.split('-vs-');
      if (parts.length === 2) {
        const normalizedKey = parts.map(p => p.trim().toLowerCase()).sort().join('-vs-');
        if (seenComparisonPairs.has(normalizedKey)) {
          globalErrors.push(
            `Cannibalization Warning: Comparison pair "${normalizedKey}" in "${calc.slug}" conflicts with existing "${seenComparisonPairs.get(normalizedKey)}". Mirror-image comparisons are prohibited.`
          );
        } else {
          seenComparisonPairs.set(normalizedKey, calc.slug);
        }
      }
    }

    // 5. Unique Default Inputs per Engine Check
    const sortedKeys = Object.keys(calc.defaultInputs || {}).sort();
    const sortedObj: Record<string, any> = {};
    for (const k of sortedKeys) {
      sortedObj[k] = calc.defaultInputs[k];
    }
    const inputKey = `${calc.engineType}::${JSON.stringify(sortedObj)}`;
    if (seenInputsByEngine.has(inputKey)) {
      globalErrors.push(
        `Duplicate defaultInputs detected: "${calc.slug}" has 100% identical default inputs to "${seenInputsByEngine.get(inputKey)}" under engine "${calc.engineType}". Every niche calculator must feature unique, realistic defaults.`
      );
    } else {
      seenInputsByEngine.set(inputKey, calc.slug);
    }
  }

  // Step 2: 4-Gram Shingle Similarity & Anti-Boilerplate Check (< 0.18 Jaccard)
  const shingleMap = new Map<string, Set<string>>();
  for (const calc of calculators) {
    const text = extractTextForNGram(calc);
    shingleMap.set(calc.slug, get4GramShingles(text));
  }

  let maxSimilarity = 0;
  let maxSimilarityPair = 'N/A';

  for (let i = 0; i < calculators.length; i++) {
    for (let j = i + 1; j < calculators.length; j++) {
      const slugA = calculators[i].slug;
      const slugB = calculators[j].slug;
      const setA = shingleMap.get(slugA)!;
      const setB = shingleMap.get(slugB)!;
      const sim = calculateJaccardSimilarity(setA, setB);

      if (sim > maxSimilarity) {
        maxSimilarity = sim;
        maxSimilarityPair = `${slugA} vs ${slugB}`;
      }

      if (sim >= 0.18) {
        globalErrors.push(
          `Excessive 4-Gram Content Similarity (${(sim * 100).toFixed(2)}% >= 18% limit) between "${slugA}" and "${slugB}". Prohibited under Anti-Scaled Content Abuse rules.`
        );
      }
    }
  }

  for (const calc of calculators) {
    const errors: string[] = [];
    const wordCount = calculateGuideWords(calc);
    const faqCount = calc.guideContent?.faqs?.length || 0;
    const tableRows = calc.guideContent?.benchmarkTable?.rows?.length || 0;

    // Rule 1: Minimum 650 words total guideContent
    if (wordCount < 650) {
      errors.push(`Guide content has only ${wordCount} words (minimum required: 650)`);
    }

    // Rule 2: Executive summary minimum 120 words
    const execWords = countWords(calc.guideContent?.executiveSummary || '');
    if (execWords < 120) {
      errors.push(`Executive summary has ${execWords} words (minimum required: 120)`);
    }

    // Rule 3: Minimum 5 FAQs, each answer >= 50 words
    if (faqCount < 5) {
      errors.push(`FAQ count is ${faqCount} (minimum required: 5)`);
    } else {
      calc.guideContent.faqs.forEach((faq, idx) => {
        const aWords = countWords(faq.answer || '');
        if (aWords < 50) {
          errors.push(`FAQ #${idx + 1} ("${faq.question.slice(0, 25)}...") answer has only ${aWords} words (minimum required: 50)`);
        }
      });
    }

    // Rule 4: Benchmark table rows >= 4
    if (tableRows < 4) {
      errors.push(`Benchmark table has ${tableRows} rows (minimum required: 4)`);
    }

    // Rule 5: Related slugs validity
    let validRelated = true;
    if (!calc.relatedSlugs || calc.relatedSlugs.length < 3) {
      errors.push(`Must have at least 3 related slugs (current: ${calc.relatedSlugs?.length || 0})`);
      validRelated = false;
    } else {
      for (const rel of calc.relatedSlugs) {
        if (!allSlugs.has(rel)) {
          errors.push(`Broken related slug reference: "${rel}" does not exist in dataset`);
          validRelated = false;
        }
      }
    }

    const passed = errors.length === 0;
    if (!passed) {
      globalErrors.push(`[${calc.slug}] Failed:\n` + errors.map(e => `  - ${e}`).join('\n'));
    }

    results.push({
      slug: calc.slug,
      wordCount,
      faqCount,
      tableRows,
      validRelated,
      status: passed ? 'PASSED' : 'FAILED',
      errors
    });
  }

  // Print a formatted audit table to console
  console.log('\n========================================================================================');
  console.log('🛡️  CREATORCALCLAB QUALITY GATE: 2026 YMYL & ANTI-SPAM CONTENT AUDIT');
  console.log(`🔍  Max 4-Gram Shingle Similarity: ${(maxSimilarity * 100).toFixed(2)}% (${maxSimilarityPair}) | Threshold: < 18.00%`);
  console.log('========================================================================================');
  console.log(
    'Slug'.padEnd(46) +
    'Words'.padEnd(10) +
    'FAQs'.padEnd(8) +
    'Rows'.padEnd(8) +
    'Cross-Links'.padEnd(14) +
    'Status'
  );
  console.log('----------------------------------------------------------------------------------------');

  results.forEach(r => {
    const statusFormatted = r.status === 'PASSED' ? '\x1b[32mPASSED\x1b[0m' : '\x1b[31mFAILED\x1b[0m';
    console.log(
      r.slug.padEnd(46) +
      r.wordCount.toString().padEnd(10) +
      r.faqCount.toString().padEnd(8) +
      r.tableRows.toString().padEnd(8) +
      (r.validRelated ? 'Valid' : 'INVALID').padEnd(14) +
      statusFormatted
    );
  });
  console.log('========================================================================================\n');

  if (globalErrors.length > 0) {
    const errorMsg = `\n🚨 CRITICAL QUALITY GATE FAILURE:\n` + globalErrors.join('\n\n');
    throw new Error(errorMsg);
  }

  return results;
}
