export type CalculatorCategory = 
  | 'ecommerce' 
  | 'creator-economy' 
  | 'digital-marketplaces' 
  | 'b2b-pricing'
  | 'wealth-investing';

export type EngineType = 
  | 'platform-profit' 
  | 'youtube-rpm' 
  | 'platform-vs-platform' 
  | 'shipping-cost' 
  | 'markup-margin';

export interface FormulaVariable {
  symbol: string;
  meaning: string;
}

export interface FormulaBreakdown {
  formulaString: string;
  variables: FormulaVariable[];
}

export interface WorkedExample {
  scenarioTitle: string;
  narrative: string;
  stepByStepMath: string[];
  finalTakeaway: string;
}

export interface BenchmarkTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface OptimizationLever {
  title: string;
  actionableAdvice: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GuideContent {
  executiveSummary: string; // Minimum 120 words
  formulaBreakdown: FormulaBreakdown;
  workedExample: WorkedExample;
  benchmarkTable: BenchmarkTable;
  optimizationLevers: OptimizationLever[];
  faqs: FAQItem[]; // Minimum 5 items, 50+ words each
}

export interface PlatformTierRates {
  name: string;
  monthlyFee: number;
  percentageRate: number;
  fixedFee: number;
  additionalNotes?: string;
}

export interface CalculatorDefinition {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: CalculatorCategory;
  engineType: EngineType;
  lastUpdated: string;
  officialSourceName: string;
  officialSourceUrl: string;
  defaultInputs: Record<string, number | string>;
  platformRates: {
    baseCurrency: string;
    tiers?: Record<string, PlatformTierRates>;
    standardPercentage?: number;
    standardFixed?: number;
    extraParameters?: Record<string, number | string | boolean>;
  };
  guideContent: GuideContent;
  relatedSlugs: string[]; // Minimum 3 related calculator slugs
}

/**
 * Validation utility function to ensure strict adherence to YMYL anti-thin-content requirements.
 * Throws compile-time or build-time error if any calculator entry fails validation.
 */
export function validateCalculatorDefinition(calc: CalculatorDefinition): void {
  const errors: string[] = [];

  if (!calc.slug || typeof calc.slug !== 'string' || calc.slug.trim() === '') {
    errors.push(`Missing slug`);
  }
  if (!calc.title || calc.title.length < 5) {
    errors.push(`${calc.slug}: Title too short`);
  }
  if (!calc.metaTitle || calc.metaTitle.length < 15) {
    errors.push(`${calc.slug}: Meta title too short`);
  }
  if (!calc.metaDescription || calc.metaDescription.length < 50) {
    errors.push(`${calc.slug}: Meta description too short`);
  }
  if (!calc.officialSourceName || !calc.officialSourceUrl) {
    errors.push(`${calc.slug}: Missing official source citation`);
  }
  if (!calc.lastUpdated) {
    errors.push(`${calc.slug}: Missing lastUpdated date`);
  }

  // Word count check for executiveSummary (minimum 120 words)
  const execWords = calc.guideContent.executiveSummary.trim().split(/\s+/).filter(Boolean).length;
  if (execWords < 120) {
    errors.push(`${calc.slug}: Executive summary must have at least 120 words (current: ${execWords})`);
  }

  // Formula checks
  if (!calc.guideContent.formulaBreakdown.formulaString || calc.guideContent.formulaBreakdown.variables.length === 0) {
    errors.push(`${calc.slug}: Formula breakdown is incomplete`);
  }

  // Worked example checks
  if (!calc.guideContent.workedExample.scenarioTitle || calc.guideContent.workedExample.stepByStepMath.length === 0) {
    errors.push(`${calc.slug}: Worked example incomplete`);
  }

  // Benchmark table checks
  if (calc.guideContent.benchmarkTable.rows.length < 3 || calc.guideContent.benchmarkTable.headers.length === 0) {
    errors.push(`${calc.slug}: Benchmark table must have at least 3 rows and valid headers`);
  }

  // Optimization levers checks
  if (calc.guideContent.optimizationLevers.length < 3) {
    errors.push(`${calc.slug}: Must provide at least 3 strategic optimization levers`);
  }

  // FAQ checks (minimum 5 FAQs, 50+ words each)
  if (calc.guideContent.faqs.length < 5) {
    errors.push(`${calc.slug}: Must contain at least 5 FAQs (current: ${calc.guideContent.faqs.length})`);
  } else {
    calc.guideContent.faqs.forEach((faq, idx) => {
      const words = faq.answer.trim().split(/\s+/).filter(Boolean).length;
      if (words < 50) {
        errors.push(`${calc.slug}: FAQ #${idx + 1} ("${faq.question.slice(0, 30)}...") has ${words} words; minimum required is 50`);
      }
    });
  }

  // Related slugs check (minimum 3)
  if (calc.relatedSlugs.length < 3) {
    errors.push(`${calc.slug}: Must list at least 3 related slugs`);
  }

  if (errors.length > 0) {
    throw new Error(`Calculator Validation Failed for "${calc.slug}":\n` + errors.map(e => ` - ${e}`).join('\n'));
  }
}
