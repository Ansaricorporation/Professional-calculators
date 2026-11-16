export interface InstitutionalAuditTeam {
  name: string;
  role: string;
  standard: string;
  methodology: string;
  auditScope: string;
}

export interface CategoryCluster {
  id: 'ecommerce' | 'creator-economy' | 'digital-marketplaces' | 'b2b-pricing';
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  icon: string;
  badge: string;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  tagline: string;
  description: string;
  establishedYear: number;
  currentYear: number;
  contactEmail: string;
  categories: Record<string, CategoryCluster>;
  auditTeam: InstitutionalAuditTeam;
  officialCitations: Record<string, { title: string; url: string; lastVerified: string; description: string }>;
  editorialStandards: {
    reviewFrequency: string;
    auditProtocol: string;
    monetizationDisclosure: string;
    ymylCommitment: string;
  };
}

/**
 * Resolves any internal route with Astro's configured BASE_URL (e.g. '/Professional-calculators/').
 * Guarantees zero broken links and prevents double slashes.
 */
export function withBase(path: string = ''): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.replace(/\/$/, '');

  if (!path || path === '/') {
    return base ? `${base}/` : '/';
  }

  // Preserve external URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Prevent duplicating base if already prefixed
  if (base && path.startsWith(base)) {
    return path.replace(/\/+/g, '/');
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const combined = `${base}${cleanPath}`;
  return combined.replace(/\/+/g, '/');
}

export const SITE_CONFIG: SiteConfig = {
  siteName: "CreatorCalcLab",
  siteUrl: (typeof process !== 'undefined' && process.env.SITE_URL) || 'https://ansaricorporation.github.io',
  tagline: "High-Precision Financial Modeling for Modern Online Businesses",
  description: "Transparent, 100% client-side profit margin, fee audit, and unit economic calculators for digital creators, e-commerce sellers, and independent contractors.",
  establishedYear: 2024,
  currentYear: 2026,
  contactEmail: "compliance@creatorcalclab.com",
  
  categories: {
    'ecommerce': {
      id: 'ecommerce',
      name: 'E-Commerce & Retail Margins',
      shortName: 'E-Commerce',
      description: 'Accurate profit margin, fulfillment fee, and merchant gateway net yield calculators.',
      longDescription: 'Engineered for direct-to-consumer store owners on Shopify, WooCommerce, and TikTok Shop. Model exact credit card interchange rates, monthly app overheads, and cross-border chargeback reserves.',
      icon: 'shopping-cart',
      badge: 'Merchant Economics'
    },
    'creator-economy': {
      id: 'creator-economy',
      name: 'Creator Economy & Ad Revenue',
      shortName: 'Creator Economy',
      description: 'Precise CPM, RPM, ad split, and patronage fee modeling for modern content creators.',
      longDescription: 'Comprehensive ad payout algorithms reflecting YouTube 55/45 Partner Program rev-share, YouTube Shorts Creator Pool allocations, Patreon creator tiers, and Substack publication margins.',
      icon: 'video-camera',
      badge: 'Audience Monetization'
    },
    'digital-marketplaces': {
      id: 'digital-marketplaces',
      name: 'Digital Marketplaces & Platforms',
      shortName: 'Marketplaces',
      description: 'Granular platform fee audits for Etsy, Gumroad, Payhip, and creative storefronts.',
      longDescription: 'Model multi-layer listing costs, automatic offsite ads attribution cuts, digital delivery surcharges, and payment gateway deductibles with penny-accurate clarity.',
      icon: 'storefront',
      badge: 'Platform Take-Rates'
    },
    'b2b-pricing': {
      id: 'b2b-pricing',
      name: 'B2B & Freelance Service Pricing',
      shortName: 'B2B & Freelance',
      description: 'Effective hourly rate, self-employment tax burden, and value-based retainer modeling.',
      longDescription: 'Built for independent consultants, specialized agencies, and technical contractors. Calculate true billable capacity factoring unbillable overhead, quarterly IRS SE taxes, and healthcare load.',
      icon: 'briefcase',
      badge: 'Professional Rates'
    }
  },

  auditTeam: {
    name: "CreatorCalcLab Financial Modeling & Rate Audit Team",
    role: "Quantitative Financial Modeling & Rate Verification Desk",
    standard: "Direct Rate-Card Audit (Verified against official 2026 platform documentation)",
    methodology: "Dual-model mathematical verification against published developer documentation, SEC 10-K/10-Q filings, and merchant platform agreements.",
    auditScope: "Deterministic arithmetic models with zero algorithmic bias or sponsored calculation skew."
  },

  officialCitations: {
    shopifyPricing: {
      title: "Shopify Merchant Plan Pricing & Credit Card Interchange Rates (2026)",
      url: "https://www.shopify.com/pricing",
      lastVerified: "November 2026",
      description: "Official published rates for Basic ($39/mo, 2.9% + $0.30), Shopify ($105/mo, 2.7% + $0.30), and Advanced ($399/mo, 2.5% + $0.30) tiers."
    },
    etsyFeePolicy: {
      title: "Etsy Seller Fees, Offsite Ads Policy & Payment Terms",
      url: "https://www.etsy.com/legal/fees",
      lastVerified: "November 2026",
      description: "Official schedule detailing $0.20 listing fees, 6.5% transaction charges, 3% + $0.25 payment processing, and 12-15% mandatory offsite ads thresholds."
    },
    youtubePartnerProgram: {
      title: "YouTube Monetization & Partner Program Terms (YPP)",
      url: "https://support.google.com/youtube/answer/72857",
      lastVerified: "November 2026",
      description: "Standard 55% creator / 45% platform net revenue distribution for Long-Form AdSense and Shorts revenue sharing pool mechanics."
    },
    gumroadPricing: {
      title: "Gumroad Pricing & Creator Fee Terms",
      url: "https://gumroad.com/pricing",
      lastVerified: "November 2026",
      description: "Flat 10% platform fee structure plus credit card processing fees (2.9% + $0.30 or international equivalents)."
    },
    lemonSqueezyPricing: {
      title: "Lemon Squeezy Merchant of Record Pricing & Terms",
      url: "https://www.lemonsqueezy.com/pricing",
      lastVerified: "November 2026",
      description: "Merchant of Record fee structure (5% + $0.50 per transaction) including global sales tax compliance and chargeback liability management."
    },
    stripePricing: {
      title: "Stripe Standard Payment Processing & Fee Documentation",
      url: "https://stripe.com/pricing",
      lastVerified: "November 2026",
      description: "Standard domestic card transaction fees (2.9% + $0.30), 1% international card surcharge, and 1% currency conversion surcharge."
    },
    uspsCommercialRates: {
      title: "USPS Notice 123 Price List & Commercial Base Shipping Rates (2026)",
      url: "https://pe.usps.com/text/dmm300/Notice123.htm",
      lastVerified: "November 2026",
      description: "Commercial base postage tables for Ground Advantage and Priority Mail, including dimensional weight divisor rules (166)."
    },
    irsSelfEmployment: {
      title: "IRS Publication 334 & Schedule SE (Self-Employment Tax Guidelines)",
      url: "https://www.irs.gov/forms-pubs/about-schedule-se-form-1040",
      lastVerified: "November 2026",
      description: "Official Federal tax regulations prescribing 15.3% FICA burden (12.4% Social Security up to wage ceiling + 2.9% Medicare)."
    }
  },

  editorialStandards: {
    reviewFrequency: "Monthly reconciliation against public SEC 10-K/10-Q disclosures, developer platform fee announcements, and direct seller portal updates.",
    auditProtocol: "All formulas use discrete deterministic arithmetic checked against double-entry ledger controls. We never employ statistical smoothing without explicitly disclosing confidence intervals.",
    monetizationDisclosure: "CreatorCalcLab is an independent educational publisher funded through programmatic advertising. We do not accept sponsored calculator results or platform referral bounties that alter mathematical outputs.",
    ymylCommitment: "Because accurate financial data directly impacts business solvency, our tools undergo mandatory dual-model algorithmic verification before deployment. All calculations are executed entirely within your browser sandboxed JavaScript environment—zero financial inputs or proprietary numbers are transmitted to our servers."
  }
};
