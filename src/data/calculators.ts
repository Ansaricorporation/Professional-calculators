import type { CalculatorDefinition, CalculatorCategory } from './schema';
import { validateCalculatorDefinition } from './schema';
import ecommerceCalculators from './calculators/ecommerce.json';

const allRawCalculators: CalculatorDefinition[] = [
  ...(ecommerceCalculators as unknown as CalculatorDefinition[]),
];

// Perform strict compile-time/initialization validation
allRawCalculators.forEach(calc => {
  validateCalculatorDefinition(calc);
});

export function getAllCalculators(): CalculatorDefinition[] {
  return allRawCalculators;
}

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return allRawCalculators.find(c => c.slug === slug);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorDefinition[] {
  return allRawCalculators.filter(c => c.category === category);
}

export function getRelatedCalculators(slug: string): CalculatorDefinition[] {
  const current = getCalculatorBySlug(slug);
  if (!current) return [];
  return allRawCalculators.filter(c => current.relatedSlugs.includes(c.slug));
}
