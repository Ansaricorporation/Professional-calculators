import type { CalculatorDefinition, CalculatorCategory } from './schema';
import { validateCalculatorDefinition } from './schema';
import ecommerceCalculators from './calculators/ecommerce.json';
import creatorEconomyCalculators from './calculators/creator-economy.json';
import digitalMarketplacesCalculators from './calculators/digital-marketplaces.json';
import b2bPricingCalculators from './calculators/b2b-pricing.json';

const allRawCalculators: CalculatorDefinition[] = [
  ...(ecommerceCalculators as unknown as CalculatorDefinition[]),
  ...(creatorEconomyCalculators as unknown as CalculatorDefinition[]),
  ...(digitalMarketplacesCalculators as unknown as CalculatorDefinition[]),
  ...(b2bPricingCalculators as unknown as CalculatorDefinition[])
];

// Perform strict compile-time/initialization validation across every calculator
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
