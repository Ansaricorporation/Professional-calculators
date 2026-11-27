import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const { SPOKE_CALCULATORS_TASK14 } = await import('./build-task14-spokes.mjs');

const APPROVED_META = {
  'ebay-store-subscription-break-even-calculator': {
    metaTitle: 'eBay Store Subscription Break-Even Calculator (2026 Tiers)',
    metaDescription: 'Calculate your eBay store subscription break-even point across Starter, Basic, Premium, and Anchor tiers with insertion fee savings and net margins today.'
  },
  'ebay-vs-mercari-vs-poshmark-fee-calculator': {
    metaTitle: 'eBay vs Mercari vs Poshmark Fee Calculator (2026 Payouts)',
    metaDescription: 'Compare seller fees, payment processing rates, and net profits across eBay, Mercari, and Poshmark to choose the most profitable marketplace to sell now.'
  },
  'patreon-vs-kofi-vs-substack-fee-calculator': {
    metaTitle: 'Patreon vs Ko-fi vs Substack Fee Calculator (2026 Rates)',
    metaDescription: 'Compare platform cut percentages, payment processing fees, and creator take-home pay across Patreon, Ko-fi, and Substack to maximize monthly revenue now.'
  },
  'stripe-vs-square-vs-shopify-payments-calculator': {
    metaTitle: 'Stripe vs Square vs Shopify Payments Fee Calculator 2026',
    metaDescription: 'Compare payment processing fees, in-person POS swipes, and online checkout margins across Stripe, Square, and Shopify Payments to minimize merchant costs now.'
  },
  'shopify-usps-vs-ups-vs-fedex-shipping-calculator': {
    metaTitle: 'Shopify USPS vs UPS vs FedEx Shipping Calculator (2026 Rates)',
    metaDescription: 'Compare commercial carrier rates, parcel dimensional weight pricing, and delivery speed across USPS, UPS, and FedEx to maximize Shopify shipping margins now.'
  },
  'stock-wash-sale-capital-gains-calculator': {
    metaTitle: 'Stock Wash Sale Rule Capital Gains Calculator (2026 IRS)',
    metaDescription: 'Calculate disallowed losses, cost basis adjustments, and taxable net capital gains under the IRS 30-day wash sale rule for stock and ETF trading accounts now.'
  },
  'finance-youtube-rpm-calculator': {
    metaTitle: 'Finance YouTube Channel RPM & AdSense Calculator (2026 CPM)',
    metaDescription: 'Calculate high-RPM finance YouTube channel AdSense earnings, personal finance CPM rates, and video sponsorship payouts across US and global audiences now.'
  },
  'gaming-youtube-rpm-calculator': {
    metaTitle: 'Gaming YouTube Channel RPM & AdSense Calculator (2026 CPM)',
    metaDescription: 'Calculate gaming YouTube channel earnings across long-form video views, Shorts Creator Pool payouts, Super Chats, and channel memberships at 2026 CPM rates now.'
  },
  'podcast-youtube-rpm-calculator': {
    metaTitle: 'Podcast YouTube Channel RPM & AdSense Calculator (2026 CPM)',
    metaDescription: 'Calculate video podcast YouTube AdSense earnings, mid-roll ad density returns, and host-read sponsor CPM revenue to forecast monthly studio income now.'
  },
  'tech-saas-youtube-rpm-calculator': {
    metaTitle: 'Tech & SaaS YouTube RPM & AdSense Calculator (2026 CPM)',
    metaDescription: 'Calculate tech software tutorial YouTube AdSense revenue, B2B advertiser CPMs, and recurring SaaS affiliate commissions to forecast creator earnings now.'
  }
};

// Set approved meta on all 10 spokes
for (const spoke of SPOKE_CALCULATORS_TASK14) {
  if (APPROVED_META[spoke.slug]) {
    spoke.metaTitle = APPROVED_META[spoke.slug].metaTitle;
    spoke.metaDescription = APPROVED_META[spoke.slug].metaDescription;
  }
}

// Map of which spokes go to which category JSON file
const SPOKE_DISTRIBUTION = {
  'digital-marketplaces.json': [
    'ebay-store-subscription-break-even-calculator',
    'ebay-vs-mercari-vs-poshmark-fee-calculator'
  ],
  'creator-economy.json': [
    'patreon-vs-kofi-vs-substack-fee-calculator',
    'finance-youtube-rpm-calculator',
    'gaming-youtube-rpm-calculator',
    'podcast-youtube-rpm-calculator',
    'tech-saas-youtube-rpm-calculator'
  ],
  'b2b-pricing.json': [
    'stripe-vs-square-vs-shopify-payments-calculator'
  ],
  'ecommerce.json': [
    'shopify-usps-vs-ups-vs-fedex-shipping-calculator'
  ],
  'wealth-investing.json': [
    'stock-wash-sale-capital-gains-calculator'
  ]
};

// Parent relatedSlugs updates
const PARENT_LINKS = {
  'ebay-fee-calculator': [
    'ebay-store-subscription-break-even-calculator',
    'ebay-vs-mercari-vs-poshmark-fee-calculator'
  ],
  'shopify-shipping-calculator': [
    'shopify-usps-vs-ups-vs-fedex-shipping-calculator'
  ],
  'patreon-fee-calculator': [
    'patreon-vs-kofi-vs-substack-fee-calculator'
  ],
  'stripe-fee-calculator': [
    'stripe-vs-square-vs-shopify-payments-calculator'
  ],
  'stripe-vs-paypal-fee-calculator': [
    'stripe-vs-square-vs-shopify-payments-calculator'
  ],
  'stock-average-cost-calculator': [
    'stock-wash-sale-capital-gains-calculator'
  ],
  'youtube-finance-rpm-calculator': [
    'finance-youtube-rpm-calculator'
  ],
  'youtube-gaming-rpm-calculator': [
    'gaming-youtube-rpm-calculator'
  ],
  'youtube-podcast-rpm-calculator': [
    'podcast-youtube-rpm-calculator'
  ],
  'youtube-tech-channel-rpm-calculator': [
    'tech-saas-youtube-rpm-calculator'
  ]
};

console.log('Applying Task 14 spoke integration into category JSON files...');

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

  // Append spokes assigned to this file
  const spokesToAdd = SPOKE_DISTRIBUTION[file] || [];
  for (const slug of spokesToAdd) {
    const existing = data.find(c => c.slug === slug);
    if (!existing) {
      const spokeDef = SPOKE_CALCULATORS_TASK14.find(s => s.slug === slug);
      if (!spokeDef) {
        throw new Error(`Spoke definition not found for slug: ${slug}`);
      }
      data.push(spokeDef);
      totalAdded++;
      console.log(`  ➕ Appended spoke "${slug}" to ${file}`);
    } else {
      console.log(`  ℹ️ Spoke "${slug}" already in ${file}, skipping append`);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Saved ${file} (${data.length} total calculators)`);
}

console.log(`\n🎉 Task 14 integration complete! Added ${totalAdded} new spokes.`);
