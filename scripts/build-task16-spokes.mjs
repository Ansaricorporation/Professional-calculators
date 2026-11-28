import fs from 'fs';
import path from 'path';

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export const task16Calculators = [
  // =========================================================================
  // 1. STEAM VS EPIC GAMES STORE REVENUE CALCULATOR (digital-marketplaces.json)
  // =========================================================================
  {
    slug: 'steam-vs-epic-games-store-revenue-calculator',
    title: 'Steam (30%) vs. Epic Games Store (12%) Game Developer Revenue Calculator',
    metaTitle: 'Steam vs Epic Games Store Fee Calculator 2026 | Payouts',
    metaDescription: 'Compare Steam 30% revenue cut ($100 Direct fee, tiered 25%/20%) vs Epic Games Store 12% flat split across indie unit volume. Model payouts instantly.',
    category: 'digital-marketplaces',
    engineType: 'platform-vs-platform',
    lastUpdated: 'November 2026',
    officialSourceName: 'Valve Steamworks Revenue Tiers & Epic Games Store Distribution Agreement (2026)',
    officialSourceUrl: 'https://store.epicgames.com/en-US/news',
    defaultInputs: {
      productPrice: 19.99,
      monthlyUnits: 1250,
      refundRate: 8.5,
      internationalSales: true
    },
    platformRates: {
      baseCurrency: 'USD',
      extraParameters: {
        platformAName: 'Valve Steam (30% Standard Tier)',
        platformAFeePct: 30.0,
        platformAFixed: 0,
        platformAGatewayPct: 0,
        platformAGatewayFixed: 0,
        platformBName: 'Epic Games Store (12% Flat Cut)',
        platformBFeePct: 12.0,
        platformBFixed: 0,
        platformBGatewayPct: 0,
        platformBGatewayFixed: 0,
        steamDirectFee: 100,
        steamTier2CutPct: 25.0,
        steamTier3CutPct: 20.0,
        unrealRoyaltyWaiverPct: 5.0,
        internationalFxSurcharge: 1.2
      }
    },
    guideContent: {
      executiveSummary:
        'Selecting between Valve Steam and the Epic Games Store (EGS) in 2026 hinges on balancing per-unit take-rate economics against organic storefront discovery and wishlist velocity. Valve charges an initial 30% store share on Adjusted Gross Revenue up to $10 million, steps down to 25% between $10 million and $50 million, and drops to 20% above $50 million, alongside a $100 Steam Direct app deposit that Valve recoups once your title surpasses $1,000 in net sales. By contrast, Epic Games Store charges a flat 12% revenue share from dollar one and waives the standard 5% Unreal Engine commercial royalty on EGS sales—a combined 18 to 23 percentage point fee advantage on Unreal-built PC titles. However, because Steam captures the dominant share of PC discovery queues, seasonal sale traffic, Next Fest demo loops, and Steam Deck verified play, most studios deploy simultaneous or staggered cross-store launches rather than treating the two storefronts as mutually exclusive distribution channels.',
      formulaBreakdown: {
        formulaString: 'Net Studio Payout = [(Gross Units × Price) − Refunds − Regional VAT] × (1 − Store Cut % − Unreal Royalty %)',
        variables: [
          { symbol: 'Store Cut %', meaning: '30% initial Valve Steam split (25% at $10M+, 20% at $50M+) versus 12% flat on Epic Games Store.' },
          { symbol: 'Direct Recoupment', meaning: 'The $100 Steam Direct deposit is returned in the payout cycle following $1,000 in Adjusted Gross Revenue.' },
          { symbol: 'Unreal Royalty %', meaning: '5% gross royalty on Unreal Engine projects over $1M lifetime revenue, waived on Epic Games Store sales.' },
          { symbol: 'Refund Allowance', meaning: 'Standard PC storefront refund allowance (~7%–10% across 2-hour play windows) deducted before revenue share.' }
        ]
      },
      workedExample: {
        scenarioTitle: 'Indie PC Action Roguelike ($19.99 Launch, 1,250 Monthly Units)',
        narrative:
          'Suppose a two-person studio ships a $19.99 indie roguelike built in Unreal Engine 5 and moves 1,250 units in its launch month with an 8.5% buyer refund rate inside the 14-day/2-hour window. After refunds, net adjusted storefront receipts equal roughly $22,864 before regional VAT adjustments. On Steam, Valve retains 30% ($6,859) and pays out $16,005—minus the 5% Unreal Engine royalty if lifetime cross-store Unreal revenue exceeds $1 million. On the Epic Games Store, Epic retains 12% ($2,744) and pays out $20,120 with zero Unreal royalty owed on those copies, creating a $4,115 per-month take-home difference on identical unit velocity.',
        stepByStepMath: [
          'Gross Monthly Receipts: 1,250 units × $19.99 = $24,987.50 gross buyer spend.',
          'Post-Refund Net Receipts (8.5% returns): $24,987.50 × (1 − 0.085) = $22,863.56 Adjusted Gross Revenue.',
          'Steam Store Cut (30% Tier 1): $22,863.56 × 0.30 = $6,859.07 -> Studio Pre-Tax Net = $16,004.49.',
          'Epic Games Store Cut (12% Flat): $22,863.56 × 0.12 = $2,743.63 -> Studio Pre-Tax Net = $20,119.93 (+$4,115.44 fee spread).'
        ],
        finalTakeaway:
          'Epic yields 25.7% more cash per copy sold than Tier-1 Steam (88% vs. 70%), and up to 35% more for Unreal Engine games subject to the 5% engine royalty. Because Steam typically drives 4× to 8× higher organic volume for mid-tier indies, modeling break-even traffic multipliers prevents sacrificing total dollars for a lower percentage cut.'
      },
      benchmarkTable: {
        title: 'Steam vs. Epic Games Store Developer Economics by Revenue Tier (2026)',
        headers: ['Storefront & Revenue Tier', 'Platform Revenue Cut', 'Engine / App Overhead', 'Effective Studio Share', 'Strategic Break-Even Role'],
        rows: [
          ['Valve Steam (Up to $10M Gross)', '30.0% revenue share', '$100 Direct fee (recouped at $1k)', '70.0% of adjusted net', 'Primary PC organic discovery & Steam Deck hub'],
          ['Valve Steam ($10M to $50M Tier)', '25.0% marginal cut', '$0 recurring app fee', '75.0% marginal payout', 'AA/breakout hit scale discount threshold'],
          ['Valve Steam (Over $50M Tier)', '20.0% marginal cut', '$0 recurring app fee', '80.0% marginal payout', 'AAA & mega-indie franchise margin parity'],
          ['Epic Games Store (Non-Unreal Game)', '12.0% flat cut', '$100 submission fee per product', '88.0% from first copy', 'Maximum margin on direct creator-driven traffic'],
          ['Epic Games Store (Unreal Engine Title)', '12.0% flat cut', '5% UE royalty waived on EGS', '88.0% (+5% royalty saved)', 'Highest net unit yield for Unreal 5 studios']
        ]
      },
      optimizationLevers: [
        {
          title: 'Route Creator & Off-Platform Traffic to 12% Storefront Links',
          impact: 'Saves 18% Gross Revenue Share',
          actionableAdvice:
            'When running paid sponsorships with YouTube or Twitch creators, test sending direct UTM purchase links to Epic Games Store (or Epic First Run 100%-for-6-months eligibility) for audiences not locked into Steam libraries, capturing 88% to 100% of external marketing conversions.'
        },
        {
          title: 'Leverage Steam Keys at 0% Platform Fee for Authorized Bundles',
          impact: 'Reduces Blended Valve Cut Below 24%',
          actionableAdvice:
            'Valve allows developers to request Steam product keys at zero fee to sell through Humble Store, Fanatical, or studio direct shops. Keeping external key volume proportionate to Steam store purchases lowers your blended effective distribution cost without leaving the Steam ecosystem.'
        },
        {
          title: 'Time Seasonal 20%–35% Discounts Around Wishlist Thresholds',
          impact: '+35% Conversion Spike',
          actionableAdvice:
            'Steam automatically emails every user with a wishlisted title when a discount hits 20% or higher. Concentrating launch discounts cleanly around 20% triggers automated Steam notification waves while preserving strong post-cut dollar profit per unit.'
        }
      ],
      faqs: [
        {
          question: 'When does Valve reduce the Steam 30% cut to 25% and 20%?',
          answer:
            'Valve uses marginal revenue tiers calculated on cumulative game sales plus DLC and in-game purchases since October 2018. Your studio pays 30% on the first $10 million in Adjusted Gross Revenue, 25% on every dollar earned between $10 million and $50 million, and 20% on all revenue exceeding $50 million. Earlier revenue is not retroactively refunded.'
        },
        {
          question: 'How does the $100 Steam Direct fee recoupment actually work?',
          answer:
            'Developers pay a one-time $100 deposit per game build through Steamworks before publishing a store page or testing multiplayer builds. Once the released title crosses $1,000 in Adjusted Gross Revenue (after customer refunds, credit card chargebacks, and regional VAT/sales taxes are stripped out), Valve automatically credits that exact $100 deposit back inside your next scheduled monthly bank wire payout without manual requests.'
        },
        {
          question: 'Is the Epic Games Store First Run 100% revenue share program still worth considering?',
          answer:
            'Under Epic First Run, qualifying studios that grant Epic Games Store six months of PC storefront exclusivity keep 100% of net revenue (0% Epic cut) during that six-month launch window before reverting to the standard 88%/12% split. Only studios with strong external marketing or Epic minimum guarantees benefit, as delaying Steam delays wishlist conversion.'
        },
        {
          question: 'Does Valve charge a 30% fee on Steam keys sold on my own website?',
          answer:
            'No. Valve generates standard Steam retail keys for developers free of charge and collects zero commission when those keys are sold directly on a studio store or partner sites like Humble Bundle. However, Steamworks guidelines require offering Steam customers comparable pricing and disallow disproportionate free key generation relative to Steam sales.'
        },
        {
          question: 'How do Unreal Engine royalties interact with Steam vs. Epic Games Store payouts?',
          answer:
            'Epic Games charges a 5% gross royalty on commercial Unreal Engine games only after the product exceeds $1 million in lifetime gross revenue. That 5% royalty applies to copies sold on Steam, console stores, and direct sites, whereas copies purchased directly through the Epic Games Store are permanently exempt from the 5% engine fee.'
        }
      ]
    },
    relatedSlugs: [
      'steam-game-developer-net-revenue-calculator',
      'steam-regional-pricing-tax-withholding-calculator',
      'game-asset-store-royalty-calculator',
      'apple-app-store-vs-google-play-fee-calculator'
    ]
  },

  // =========================================================================
  // 2. STEAM REGIONAL PRICING, VAT & 30% TAX WITHHOLDING CALCULATOR (digital-marketplaces.json)
  // =========================================================================
  {
    slug: 'steam-regional-pricing-tax-withholding-calculator',
    title: 'Steam Regional Pricing, VAT & 30% US Tax Withholding Net Payout Calculator',
    metaTitle: 'Steam VAT & 30% Tax Withholding Calculator 2026 Payout',
    metaDescription: 'Model Steam regional pricing net deposits after country VAT, 9% refunds, Valve 30% split, and 0%–30% IRS W-8BEN tax withholding. Audit payouts instantly.',
    category: 'digital-marketplaces',
    engineType: 'platform-profit',
    lastUpdated: 'November 2026',
    officialSourceName: 'Steamworks Payments, Regional Pricing & IRS W-8BEN Treaty Documentation (2026)',
    officialSourceUrl: 'https://partner.steamgames.com/doc/finance/taxfaq',
    defaultInputs: {
      sellingPrice: 14.99,
      cogs: 0,
      shippingCharged: 0,
      shippingActualCost: 0,
      monthlyUnits: 2400,
      planTier: 'steam-treaty-0pct',
      appFeesMonthly: 100,
      marketingPerOrder: 1.85,
      returnsRate: 9.0,
      useThirdPartyGateway: false
    },
    platformRates: {
      baseCurrency: 'USD',
      tiers: {
        'steam-treaty-0pct': {
          name: 'W-8BEN Treaty Country (0% US Tax Withholding + ~12% VAT Avg + 30% Valve Cut)',
          monthlyFee: 0,
          percentageRate: 38.4,
          fixedFee: 0,
          additionalNotes: 'Models ~12% blended global VAT/sales tax backed out before Valve takes 30% on Net Receipts, yielding 0% IRS withholding under valid treaty.'
        },
        'steam-treaty-15pct': {
          name: 'Partial Treaty Country (15% US Withholding on US Sales + VAT + 30% Valve Cut)',
          monthlyFee: 0,
          percentageRate: 42.1,
          fixedFee: 0,
          additionalNotes: 'Applies 15% IRS US-source royalty withholding (~35% US buyer share) alongside global VAT deduction and Valve 30% distribution cut.'
        },
        'steam-no-treaty-30pct': {
          name: 'Non-Treaty / No W-8BEN (Full 30% IRS Withholding on US Sales + VAT + 30% Cut)',
          monthlyFee: 0,
          percentageRate: 45.8,
          fixedFee: 0,
          additionalNotes: 'Without a valid W-8BEN tax treaty reduction, Steam withholds 30% of US-derived net royalties for the IRS in addition to VAT and Valve 30% cut.'
        }
      }
    },
    guideContent: {
      executiveSummary:
        'First-time Steam developers routinely calculate launch projections by multiplying unit sales by $19.99 and taking 70%, only to discover their actual bank wire arrives 15% to 32% lower than expected. Three silent deductions explain the gap before a single dollar reaches your studio checking account: tax-inclusive regional pricing (where 19% to 25% European VAT, UK VAT, or Australian GST is backed out of the sticker price), Valve’s 30% distribution cut on net receipts, and IRS statutory tax withholding of up to 30% on US customer sales for international developers without a valid W-8BEN treaty certificate. Furthermore, purchasing-power-parity regional currencies across Latin America, Southeast Asia, and Eastern Europe compress blended global average selling prices well below the headline US USD sticker. Modeling every layered deduction ensures indie teams forecast cash runway and publishing break-even points accurately.',
      formulaBreakdown: {
        formulaString: 'Bank Wire Deposit = [(Gross Sticker ÷ (1 + VAT %)) − Refunds] × (1 − 30% Valve Cut) × (1 − US Share × Withholding %)',
        variables: [
          { symbol: 'VAT %', meaning: 'Tax-inclusive buyer consumption tax (e.g., 19% Germany, 20% UK, 25% Sweden) backed out prior to revenue split.' },
          { symbol: 'Valve 30% Cut', meaning: 'Applied strictly to Net Adjusted Receipts after local VAT/GST and buyer refunds are deducted.' },
          { symbol: 'US Share %', meaning: 'Proportion of total game revenue generated by United States buyers (typically 30%–45% for English-first indie titles).' },
          { symbol: 'Withholding %', meaning: '0% under full US tax treaties (e.g., UK, Canada, Germany), 10%–15% under partial treaties, or 30% statutory fallback.' }
        ]
      },
      workedExample: {
        scenarioTitle: 'International Developer Selling 2,400 Copies at $14.99 Blended Price',
        narrative:
          'Consider an independent game developer incorporated in a country without a 0% US royalty tax treaty (such as Brazil or an unverified sole proprietor missing a TIN on Form W-8BEN), selling 2,400 copies monthly at an effective blended price of $14.99 ($35,976 gross). First, an average 12% global tax-inclusive VAT/GST is stripped out ($32,121 ex-VAT), followed by a 9% refund adjustment ($29,230 Net Receipts). Valve takes its 30% cut ($8,769), leaving $20,461 studio share. Because 35% of buyers reside in the US ($7,161 share) and the account lacks a W-8BEN treaty rate, Steam must remit 30% of that US share ($2,148) directly to the IRS—reducing actual cash wired to $18,313, or just 50.9% of gross buyer sticker spend.',
        stepByStepMath: [
          'Gross Buyer Sticker Revenue: 2,400 units × $14.99 = $35,976.00.',
          'VAT-Exclusive Base (~12% blended global VAT): $35,976 ÷ 1.12 = $32,121.43.',
          'Post-Refund Net Receipts (9% returns): $32,121.43 × (1 − 0.09) = $29,230.50 -> Valve 30% Cut = $8,769.15.',
          'Studio Pre-Withholding Share: $20,461.35 -> Less 30% IRS Withholding on 35% US Sales ($2,148.44) = $18,312.91 Wire.'
        ],
        finalTakeaway:
          'Filing a complete Form W-8BEN or W-8BEN-E with a local Tax Identification Number (TIN) immediately recovers up to 10.5% of global cash flow by dropping US royalty withholding from 30% down to your nation’s bilateral treaty rate.'
      },
      benchmarkTable: {
        title: 'Steam Effective Studio Take-Home Waterfall by Tax & Treaty Status (2026)',
        headers: ['Developer Tax Jurisdiction Profile', 'Blended Global VAT Deducted', 'Valve Share (Net)', 'IRS US Withholding Rate', 'Net Wire % of Gross Sticker'],
        rows: [
          ['US Studio (Form W-9 Filed)', '~11.5% foreign VAT avg', '30.0% of net', '0% withheld at source', '61.9% net wired pre-income tax'],
          ['UK / Germany / Canada (W-8BEN 0%)', '~12.0% global VAT avg', '30.0% of net', '0% (full royalty treaty)', '61.6% net wired cleanly'],
          ['Australia / Japan / Korea (5%–10% Treaty)', '~12.0% global VAT avg', '30.0% of net', '5%–10% on US revenue share', '59.4%–60.5% net wired'],
          ['Partial Treaty Country (15% Rate)', '~12.0% global VAT avg', '30.0% of net', '15% on ~35% US buyer share', '58.3% net wired'],
          ['No Treaty / Missing W-8BEN TIN (30%)', '~12.0% global VAT avg', '30.0% of net', '30% statutory on US sales', '55.1% net wired']
        ]
      },
      optimizationLevers: [
        {
          title: 'Submit Valid Foreign TIN on Steamworks W-8BEN Immediately',
          impact: 'Recovers 15%–30% of US Revenue',
          actionableAdvice:
            'Many non-US indie devs leave the Foreign Tax ID field blank during Steamworks onboarding, forcing Valve to default to the punitive 30% IRS withholding rate even when their home country holds a 0% bilateral royalty tax treaty with Washington. Double-checking treaty eligibility and entering your local tax registration number restores immediate cash flow.'
        },
        {
          title: 'Audit Valve Suggested Regional Conversions Against Grey-Market Key Risk',
          impact: 'Protects Blended ASP by +11%',
          actionableAdvice:
            'While regional pricing in Brazil, Turkey, and LATAM dramatically expands unit volume, setting regions more than 55% below USD parity encourages VPN account switching. Review Valve recommended regional price matrices quarterly against current FX volatility and raise severely devalued currencies proactively.'
        },
        {
          title: 'Account for Minimum $100 Wire Payout Threshold & Monthly Timing',
          impact: 'Prevents Working Capital Gaps',
          actionableAdvice:
            'Valve processes monthly revenue shares around the 30th of the following month (for example, May sales pay out June 30) only once accrued earnings exceed your configured minimum bank wire threshold ($50–$1,000) to minimize intermediary SWIFT banking charges and maintain predictable payroll liquidity.'
        }
      ],
      faqs: [
        {
          question: 'Why does Steam deduct VAT from my payout instead of adding it at checkout like US sales tax?',
          answer:
            'In the United States and Canada, sales tax is added on top of the $19.99 sticker at checkout, so you never notice it in gross pricing. Across the European Union, UK, Japan, and Australia, consumer law mandates tax-inclusive storefront pricing—meaning 19% to 25% VAT is inside the sticker price and backed out before Valve calculates your 70% share.'
        },
        {
          question: 'Who pays the 30% US IRS withholding tax on Steam game earnings?',
          answer:
            'IRS withholding applies only to non-US developers and strictly on the portion of sales made to United States buyers (treated as US-source copyright royalties). US studios submitting Form W-9 have 0% withheld, while foreign developers can reduce that 30% withholding down to 0%–15% by completing the Steamworks tax interview with a valid W-8BEN and Tax ID.'
        },
        {
          question: 'Can a developer reclaim Steam IRS tax withholding at year-end?',
          answer:
            'In most treaty jurisdictions, taxes withheld by Valve and remitted to the IRS on Form 1042-S can be claimed as a foreign tax credit against your domestic corporate or personal income tax return, provided your home tax authority recognizes the treaty credit. However, recovering cash via credit still harms short-term studio liquidity compared to upfront treaty exemption.'
        },
        {
          question: 'What is a realistic blended average selling price (ASP) when Steam regional pricing is enabled?',
          answer:
            'If a game launches at a $19.99 USD base price using Valve standard regional recommendations across 39 currencies without discounts, its actual blended gross price per copy worldwide usually settles between $14.20 and $16.50 depending on what share of players originate from North America versus Europe, China, and Latin America.'
        },
        {
          question: 'Do Steam chargebacks or fraud refunds reduce my future payouts?',
          answer:
            'Yes. Any customer refund within Valve standard 14-day or 2-hour play window, as well as fraudulent credit card chargebacks or payment reversals, are deducted directly from Adjusted Gross Revenue during the month the reversal posts. High-refund launches above 12% reduce net bank deposits and delay reaching the $1,000 Steam Direct fee recoupment milestone.'
        }
      ]
    },
    relatedSlugs: [
      'steam-game-developer-net-revenue-calculator',
      'steam-vs-epic-games-store-revenue-calculator',
      'roblox-devex-payout-calculator',
      'game-asset-store-royalty-calculator'
    ]
  },

  // =========================================================================
  // 3. WALMART WFS VS AMAZON FBA FEE CALCULATOR (ecommerce.json)
  // =========================================================================
  {
    slug: 'walmart-wfs-vs-amazon-fba-fee-calculator',
    title: 'Walmart WFS vs. Amazon FBA Fulfillment & Referral Fee Calculator (2026)',
    metaTitle: 'Walmart WFS vs Amazon FBA Fee Calculator 2026 Compare',
    metaDescription: 'Compare Walmart WFS base fees ($3.45–$5.75+) and 5%–15% referral rates against Amazon FBA 2026 pick-and-pack and referral charges. Audit margins instantly.',
    category: 'ecommerce',
    engineType: 'platform-vs-platform',
    lastUpdated: 'November 2026',
    officialSourceName: 'Walmart Fulfillment Services (WFS) & Amazon FBA 2026 Rate Schedules',
    officialSourceUrl: 'https://marketplace.walmart.com/wfs/',
    defaultInputs: {
      productPrice: 34.99,
      monthlyUnits: 450,
      refundRate: 4.2,
      internationalSales: false
    },
    platformRates: {
      baseCurrency: 'USD',
      extraParameters: {
        platformAName: 'Walmart WFS (15% Referral + $4.95 Avg Pick/Pack)',
        platformAFeePct: 15.0,
        platformAFixed: 4.95,
        platformAGatewayPct: 0,
        platformAGatewayFixed: 0,
        platformBName: 'Amazon FBA (15% Referral + $5.65 Avg Fulfillment)',
        platformBFeePct: 15.0,
        platformBFixed: 5.65,
        platformBGatewayPct: 0,
        platformBGatewayFixed: 0,
        wfsUnder1LbFee: 3.45,
        wfs2LbFee: 4.95,
        wfs3LbFee: 5.45,
        wfsOver4LbBase: 5.75,
        wfsOver4LbPerLb: 0.4,
        wfsApparelHazmatSurcharge: 0.5,
        wfsUnder10RetailSurcharge: 1.0,
        internationalFxSurcharge: 0
      }
    },
    guideContent: {
      executiveSummary:
        'Cross-listing top-performing private-label and wholesale SKUs between Amazon FBA and Walmart Fulfillment Services (WFS) has become one of the highest-ROI expansion levers in US e-commerce in 2026. While both marketplaces share an identical 15% referral fee across core home, kitchen, beauty, and sports categories, their underlying fulfillment rate cards diverge sharply. Walmart WFS relies on straightforward shipping-weight brackets—$3.45 up to 1 lb, $4.95 up to 2 lb, $5.45 up to 3 lb, and $5.75 plus $0.40 per additional pound from 4 to 20 lb, with targeted surcharges of $0.50 for apparel or hazmat and $1.00 on items priced under $10—while waiving the $39.99 monthly Professional account subscription Amazon charges. Conversely, Amazon FBA adds inbound placement fees, low-inventory-level penalties, and tighter dimensional weight divisors that frequently make WFS 10% to 18% cheaper per fulfilled parcel across mid-weight everyday goods.',
      formulaBreakdown: {
        formulaString: 'Fulfillment Savings = [FBA Fulfillment + Inbound Placement + Low-Inv Penalty] − [WFS Weight Fee + Retail/Apparel Surcharges]',
        variables: [
          { symbol: 'WFS Weight Fee', meaning: '$3.45 (≤1 lb), $4.95 (2 lb), $5.45 (3 lb), and $5.75 + $0.40/lb (4–20 lb) for standard shipments.' },
          { symbol: 'WFS Surcharges', meaning: '+$0.50 per unit for Apparel or Hazmat handling; +$1.00 per unit for retail items priced under $10.' },
          { symbol: 'Category Referral %', meaning: '6%–15% depending on category (Walmart charges 5% on qualifying apparel under promotional tiers vs 17% on Amazon).' },
          { symbol: 'Monthly SaaS Fee', meaning: '$0/mo account subscription on Walmart Marketplace versus $39.99/mo on Amazon Professional Seller plans.' }
        ]
      },
      workedExample: {
        scenarioTitle: '2-lb Kitchen Organization SKU ($34.99 Price, 450 Monthly Units)',
        narrative:
          'Suppose an omnichannel home-goods brand sells a 1.6-lb (billable 2-lb shipping bracket) kitchen organizer at $34.99 across both Walmart WFS and Amazon FBA at 450 monthly orders with a 4.2% customer return rate. Both marketplaces apply a standard 15% referral commission ($5.25 per unit sold). Under Walmart WFS, the 2-lb standard fulfillment rate is a predictable $4.95 with zero monthly account subscription fees and zero multi-region inbound placement surcharges—yielding $10.20 in total platform fees per shipped item. Under Amazon FBA’s 2026 schedule, the equivalent 1.5–2 lb Large Standard tier costs $5.65 when accounting for bundled inbound placement splits and low-inventory buffering ($10.90 total per order). Moving 450 monthly orders through Walmart WFS saves $0.70 per fulfilled parcel, or $315.00 monthly ($3,780 annually) before factoring in lower Q1–Q3 pallet storage costs.',
        stepByStepMath: [
          'Gross Monthly Sales at 450 Units: 450 × $34.99 = $15,745.50 (Less 4.2% returns = $661.31).',
          'Walmart WFS Fees: 15% Referral ($2,361.83) + 450 × $4.95 WFS Pick/Pack ($2,227.50) = $4,589.33 total.',
          'Amazon FBA Fees: 15% Referral ($2,361.83) + 450 × $5.65 FBA + Placement ($2,542.50) = $4,904.33 total.',
          'Net WFS Unit Cost Advantage: $315.00/mo ($3,780/year) + $39.99/mo saved in Amazon Seller Central subscription.'
        ],
        finalTakeaway:
          'For bulky-yet-lightweight or 1.5 lb to 4 lb standard-size SKUs priced over $15, Walmart WFS consistently undercuts Amazon FBA by $0.55 to $1.40 per fulfilled order while rewarding omnichannel marketplace sellers with the high-converting "Fulfilled by Walmart" two-day shipping badge, lower inbound pallet receiving charges, and zero monthly Professional account overhead.'
      },
      benchmarkTable: {
        title: 'Walmart WFS vs. Amazon FBA 2026 Unit Fulfillment & Referral Benchmarks',
        headers: ['Product Weight / Tier', 'Walmart WFS Base Fee', 'WFS Special Surcharges', 'Amazon FBA Equivalent (Incl. Placement)', 'Unit Winner'],
        rows: [
          ['Under 1 lb ($15+ Small Standard)', '$3.45 flat', '$0 (unless apparel/hazmat)', '$3.60–$4.15 (size-dependent)', 'Walmart WFS (~$0.35 saved)'],
          ['1.1 to 2.0 lb (Large Standard)', '$4.95 flat', '$0 standard items', '$5.35–$5.95 + inbound split', 'Walmart WFS (~$0.70 saved)'],
          ['2.1 to 3.0 lb (Large Standard)', '$5.45 flat', '$0 standard items', '$6.10–$6.85 + inbound split', 'Walmart WFS (~$0.95 saved)'],
          ['Sub-$10 Low-Price SKU (12 oz)', '$3.45 + $1.00 = $4.45', '+$1.00 under-$10 fee', '$2.65–$3.15 (Low-Price FBA)', 'Amazon Low-Price FBA'],
          ['Apparel SKU ($25 Retail, 1 lb)', '$3.45 + $0.50 = $3.95', '5%–15% referral vs 17% AMZ', '$4.45–$4.85 + 17% referral', 'Walmart WFS (Big Margin Edge)']
        ]
      },
      optimizationLevers: [
        {
          title: 'Migrate $15–$60 Apparel & Heavy-Volume 2–5 lb SKUs to WFS First',
          impact: 'Saves $0.75–$2.10/Unit',
          actionableAdvice:
            'Amazon applies a higher 17% referral rate on apparel priced over $20 alongside steep FBA inbound placement fees. Walmart charges lower referral commissions on qualifying fashion tiers and cleaner 2–5 lb flat fulfillment fees, widening per-order contribution margin immediately on fast-moving SKUs.'
        },
        {
          title: 'Bundle Sub-$10 Products into 2-Packs to Avoid the $1.00 WFS Surcharge',
          impact: 'Eliminates $1.00/Order Penalty',
          actionableAdvice:
            'Walmart WFS adds a flat $1.00 retail surcharge to every item priced below $10.00 (bumping the base 1-lb fee from $3.45 to $4.45). Multipacking two $7 items into a single $13.99 multipack bundle drops your effective fulfillment cost per shipped unit by over 50% and unlocks FBA-beating unit economics.'
        },
        {
          title: 'Use Walmart Inbound Services (Preferred Carrier) to Cut Receiving Freight',
          impact: 'Reduces Inbound Logistics by 25%',
          actionableAdvice:
            'Unlike Amazon FBA multi-node inbound placement fees that split pallets across regional hubs, Walmart WFS routes single-destination consolidated shipments through Walmart Preferred Carriers at pre-negotiated LTL and parcel rates, lowering landed inventory cost before units even hit the warehouse shelf.'
        }
      ],
      faqs: [
        {
          question: 'How does Walmart WFS calculate dimensional weight compared to Amazon FBA?',
          answer:
            'For standard shipments weighing 1 lb or less, Walmart WFS uses strictly actual unit weight (eliminating small-box dimensional weight penalties). For items over 1 lb (excluding select dense goods), WFS bills based on the greater of actual weight plus packaging or dimensional weight (Length × Width × Height ÷ 139) rounded up to the nearest whole pound.'
        },
        {
          question: 'Why is Amazon Low-Price FBA cheaper than Walmart WFS on products under $10?',
          answer:
            'Amazon grants an automatic $0.77 fee discount on FBA items priced under $10.00 across eligible small and standard sizes without imposing extra retail surcharges. Conversely, Walmart WFS adds a $1.00 under-$10 handling surcharge on top of its $3.45 base rate ($4.45 total), making Amazon materially cheaper for standalone sub-$10 impulse items unless sellers create multi-packs.'
        },
        {
          question: 'Does Walmart Marketplace charge a monthly subscription fee like Amazon’s $39.99 plan?',
          answer:
            'No. Walmart Marketplace charges zero monthly Professional account subscription fees, zero onboarding setup charges, and zero per-listing insertion fees regardless of active SKU count. Sellers pay only the category referral commission when an order captures payment and WFS fulfillment or storage charges when leveraging Walmart warehouses instead of merchant-fulfilled shipping.'
        },
        {
          question: 'What are Walmart’s 2026 category referral fee rates compared to Amazon?',
          answer:
            'Most core retail categories—including Home, Kitchen, Health & Beauty, Sports, Toys, and Patio—carry an identical 15% referral commission on both Walmart and Amazon. Key divergences include Consumer Electronics and Computers (6%–8% on Walmart vs. 8% on Amazon), Watches (tiered 15%), and qualifying Apparel tiers where Walmart undercuts Amazon 17% apparel fees.'
        },
        {
          question: 'Can I share inventory between Amazon FBA and Walmart WFS without duplicating prep?',
          answer:
            'Not directly from one unified warehouse pool—Amazon Multi-Channel Fulfillment (MCF) ships in unbranded boxes only at higher off-Amazon fulfillment rates and triggers Walmart carrier compliance penalties because Walmart strictly prohibits Amazon Logistics (TBA) tracking numbers on Marketplace orders. High-volume sellers split factory purchase orders directly between FBA and WFS receiving hubs.'
        }
      ]
    },
    relatedSlugs: [
      'walmart-marketplace-fee-calculator',
      'walmart-wfs-storage-return-fee-calculator',
      'amazon-fba-vs-fbm-profit-calculator',
      'amazon-fba-storage-fee-calculator'
    ]
  },

  // =========================================================================
  // 4. WALMART WFS STORAGE, AGED INVENTORY & RETURN FEE CALCULATOR (ecommerce.json)
  // =========================================================================
  {
    slug: 'walmart-wfs-storage-return-fee-calculator',
    title: 'Walmart WFS Storage, Aged Inventory (365+ Days) & Return Fee Calculator (2026)',
    metaTitle: 'Walmart WFS Storage & Return Fee Calculator 2026 Audit',
    metaDescription: 'Model Walmart WFS storage ($0.75–$2.25/cu ft), June 30, 2026 aged inventory tiers (366+ and 450+ days), and $4.70–$6.70 return fees. Audit costs instantly.',
    category: 'ecommerce',
    engineType: 'platform-profit',
    lastUpdated: 'November 2026',
    officialSourceName: 'Walmart Fulfillment Services 2026 Storage, Aged Inventory & Returns Schedule',
    officialSourceUrl: 'https://marketplacelearn.walmart.com/guides/Walmart%20Fulfillment%20Services/Inventory%20%26%20fees/wfs-storage-fees',
    defaultInputs: {
      sellingPrice: 39.99,
      cogs: 11.2,
      shippingCharged: 0,
      shippingActualCost: 4.95,
      monthlyUnits: 240,
      planTier: 'wfs-standard-storage',
      appFeesMonthly: 45,
      marketingPerOrder: 2.9,
      returnsRate: 5.8,
      useThirdPartyGateway: false
    },
    platformRates: {
      baseCurrency: 'USD',
      tiers: {
        'wfs-standard-storage': {
          name: 'Jan–Sep Base WFS Storage ($0.75/cu ft) + 15% Referral',
          monthlyFee: 0,
          percentageRate: 15.0,
          fixedFee: 0,
          additionalNotes: 'Standard non-peak WFS storage is $0.75/cu ft/mo (and for <=30 days during Oct–Dec); WFS return processing adds $4.70 (<=1 lb), $6.20 (2 lb), or $6.70 (3 lb) per returned unit.'
        },
        'wfs-q4-peak-storage': {
          name: 'Q4 Peak WFS Storage (+$1.50/cu ft Over 30 Days Oct–Dec) + 15% Referral',
          monthlyFee: 180,
          percentageRate: 15.0,
          fixedFee: 0,
          additionalNotes: 'Inventory held over 30 days during Oct–Dec incurs an additional $1.50/cu ft peak surcharge ($2.25/cu ft total), increasing effective monthly fixed holding cost.'
        },
        'wfs-aged-366-450': {
          name: 'Aged Inventory Tier 1 (366–450 Days: $2.25/cu ft Effective June 30, 2026)',
          monthlyFee: 270,
          percentageRate: 15.0,
          fixedFee: 0,
          additionalNotes: 'Effective June 30, 2026, units stored 366 to 450 days incur $2.25/cu ft/mo aged inventory surcharge on top of base storage fees.'
        },
        'wfs-aged-450-plus': {
          name: 'Aged Inventory Tier 2 (>450 Days: $7.50/cu ft Effective June 30, 2026)',
          monthlyFee: 720,
          percentageRate: 15.0,
          fixedFee: 0,
          additionalNotes: 'Effective June 30, 2026, stale units stored over 450 days face punitive $7.50/cu ft monthly charges, wiping out slow-mover SKU profit.'
        }
      }
    },
    guideContent: {
      executiveSummary:
        'Effective June 30, 2026, Walmart Fulfillment Services (WFS) enforces a major restructuring of aged inventory penalties alongside updated reverse-logistics return fees, fundamentally changing how marketplace brands manage warehouse velocity. While standard non-peak WFS storage remains competitive at $0.75 per cubic foot per month from January through September (and for inventory aged 30 days or less during Q4), inventory sitting over 30 days in October through December triggers an additional $1.50/cu ft peak surcharge ($2.25/cu ft combined). More critically, slow-moving stock passing 365 days now splits into escalating penalty brackets: $2.25/cu ft for units aged 366 to 450 days, jumping to a punishing $7.50/cu ft past 450 days. Combined with WFS return processing fees of $4.70 to $6.70+ per returned parcel, auditing storage turn rate and defect returns is mandatory for 2026 SKU survival.',
      formulaBreakdown: {
        formulaString: 'Monthly Holding & Return Drag = (Total Cu Ft × Monthly Storage Rate) + (Units × Return % × WFS Return Processing Fee)',
        variables: [
          { symbol: 'Base WFS Storage', meaning: '$0.75 per cubic foot per month (Jan–Sep, and ≤30 days during Oct–Dec); Q4 >30 days adds +$1.50/cu ft.' },
          { symbol: 'Aged 366–450 Days', meaning: '$2.25/cu ft monthly aged inventory charge taking effect June 30, 2026 on 12–15 month stagnant stock.' },
          { symbol: 'Aged >450 Days', meaning: '$7.50/cu ft monthly punitive penalty (10× base rate) designed to clear dead warehouse space.' },
          { symbol: 'WFS Return Fee', meaning: '$4.70 (≤1 lb), $6.20 (2 lb), and $6.70 (3 lb) charged per customer-returned WFS parcel for inspection and restock.' }
        ]
      },
      workedExample: {
        scenarioTitle: '240 Monthly Sales vs. 120 Cu Ft Stagnant Q4 / Aged Stock ($39.99 SKU)',
        narrative:
          'Suppose a WFS merchant sells 240 units per month of a $39.99 home gadget ($11.20 landed COGS, $4.95 outbound WFS fulfillment, 15% referral fee = $6.00) with a 5.8% customer return rate (~14 returned parcels per month). At standard Jan–Sep storage rates ($0.75/cu ft across 60 active cubic feet), monthly storage runs just $45.00, while 14 returns at $6.20 add $86.80 in reverse logistics—leaving healthy operating net profit near $3,040 monthly. However, if 120 cubic feet of slow seasonal color variations cross the June 30, 2026 aged inventory cliff past 450 days ($7.50/cu ft), monthly storage immediately explodes by +$900.00/month, erasing nearly 30% of the entire SKU operating cash flow unless liquidated or removed proactively.',
        stepByStepMath: [
          'Gross Monthly Sales: 240 units × $39.99 = $9,597.60 | 15% Referral = $1,439.64 | Outbound WFS = $1,188.00.',
          'COGS & Ad Spend: 240 × $11.20 COGS ($2,688.00) + 240 × $2.90 Ads ($696.00) = $3,384.00.',
          'Standard Storage (60 cu ft × $0.75) + Return Handling (14 units × $6.20) + $45 SaaS = $176.80/mo drag.',
          'Aged Inventory Risk (>450 Days at $7.50/cu ft on 120 cu ft): $900.00/mo pure surcharge if dead inventory is not removed.'
        ],
        finalTakeaway:
          'Keeping WFS inventory turnover under 60 days keeps storage under 0.6% of revenue, whereas crossing the 366-day and 450-day aged thresholds multiplies warehouse cost 3× to 10× overnight.'
      },
      benchmarkTable: {
        title: 'Walmart WFS 2026 Storage, Aged Inventory & Return Processing Schedule',
        headers: ['WFS Cost Category', '2026 WFS Fee Rate', 'Effective Billing Rule', 'Amazon FBA Comparison', 'Merchant Action Threshold'],
        rows: [
          ['Base Monthly Storage (Jan–Sep)', '$0.75 / cu ft / month', 'Pro-rated daily cubic volume', '$0.78 / cu ft (Standard)', 'Maintain 45–60 days cover'],
          ['Q4 Peak Storage (Oct–Dec >30 Days)', '$2.25 / cu ft ($0.75 + $1.50)', 'Units stored over 30 days in Q4', '$2.40 / cu ft peak', 'Drip-feed weekly in Oct–Nov'],
          ['Aged Inventory (366–450 Days)', '$2.25 / cu ft / month', 'Effective June 30, 2026', 'Starts earlier at 181 days', 'Discount 20% at day 300'],
          ['Aged Inventory (>450 Days)', '$7.50 / cu ft / month', '10× standard rate penalty', 'Escalating >365 day tier', 'Create removal order before day 440'],
          ['WFS Return Processing (1 / 2 / 3 lb)', '$4.70 / $6.20 / $6.70 / return', 'Covers return ship & restock audit', 'High-return rate category fee', 'Target <4.5% defect/size returns']
        ]
      },
      optimizationLevers: [
        {
          title: 'Trigger Automatic 25% Flash Markdowns at 300 Days Inventory Age',
          impact: 'Avoids $2.25–$7.50/cu ft Penalties',
          actionableAdvice:
            'Set an automated inventory-age alert at 300 days inside Walmart Seller Center. Running a targeted clearance promotion or Rollback badge at breakeven recovers trapped working capital and avoids both the June 30, 2026 aged inventory fees and costly outbound removal shipping expenses.'
        },
        {
          title: 'Time Q4 Holiday Restocks to Land Under the 30-Day Rolling Threshold',
          impact: 'Saves $1.50/cu ft in Q4',
          actionableAdvice:
            'Because WFS charges only $0.75/cu ft on inventory held 30 days or less even during October–December peak shopping windows, pacing smaller bi-weekly replenishment shipments instead of dumping 90 days of stock in September bypasses the +$1.50/cu ft peak surcharge across top-selling ASINs.'
        },
        {
          title: 'Add Clear Dimension Infographics to Curb $6.20 WFS Return Loops',
          impact: 'Cuts Return Losses by 32%',
          actionableAdvice:
            'Each 2-lb WFS customer return costs $6.20 in return processing plus lost outbound fulfillment ($4.95)—totaling $11.15 wasted per round-trip before inspection write-offs. Adding scaled visual dimension callouts and compatibility checklists in Gallery Image #2 directly lowers "smaller than expected" returns.'
        }
      ],
      faqs: [
        {
          question: 'When do Walmart WFS new 2026 aged inventory storage fees take effect?',
          answer:
            'Walmart updated long-term WFS storage fee tiers effective June 30, 2026. Previously, legacy WFS aged fees followed simpler brackets; under the 2026 schedule, units stored between 366 and 450 days incur $2.25 per cubic foot monthly, and inventory exceeding 450 days faces a steep $7.50 per cubic foot monthly charge.'
        },
        {
          question: 'How does Walmart calculate the Q4 peak storage surcharge (+$1.50/cu ft)?',
          answer:
            'During October, November, and December, Walmart charges only the standard $0.75/cu ft rate on inventory units that have been in WFS fulfillment centers for 30 days or less. Only units remaining in WFS longer than 30 days during Q4 are hit with the extra $1.50/cu ft peak surcharge ($2.25/cu ft total).'
        },
        {
          question: 'What does Walmart charge sellers when a customer returns a WFS order?',
          answer:
            'When a buyer returns a WFS item, Walmart refunds the referral commission (minus any small admin holdback) and bills a WFS Return Processing Fee based on shipping weight: $4.70 for items up to 1 lb, $6.20 for 2 lb, and $6.70 for 3 lb. The seller also loses the original outbound fulfillment fee paid to ship the order.'
        },
        {
          question: 'How much does it cost to remove or dispose of aged inventory from Walmart WFS?',
          answer:
            'If slow-moving stock approaches the 450-day $7.50/cu ft cliff and will not sell even at discount, merchants can initiate a WFS removal or disposal order from Seller Center. Standard removal/return-to-vendor shipping typically runs ~$0.50 to $1.50+ per unit depending on weight, which is usually far cheaper than 60 days of aged fees.'
        },
        {
          question: 'Does Walmart WFS charge a low-inventory-level fee like Amazon FBA?',
          answer:
            'No. Unlike Amazon FBA, which penalizes sellers who carry less than 28 days of historical supply, Walmart WFS imposes zero low-inventory-level fees. This allows lean brands to replenish every 2 to 3 weeks during Q4 to legally stay under the 30-day Q4 peak storage surcharge threshold without triggering minimum-stock penalties.'
        }
      ]
    },
    relatedSlugs: [
      'walmart-marketplace-fee-calculator',
      'walmart-wfs-vs-amazon-fba-fee-calculator',
      'amazon-fba-storage-fee-calculator',
      'ecommerce-return-rate-cost-calculator'
    ]
  }
];

function validate() {
  let hasErrors = false;
  for (const c of task16Calculators) {
    const g = c.guideContent;
    const execWords = countWords(g.executiveSummary);
    const totalText = [
      g.executiveSummary,
      g.formulaBreakdown.formulaString,
      ...g.formulaBreakdown.variables.map(v => `${v.symbol} ${v.meaning}`),
      g.workedExample.scenarioTitle,
      g.workedExample.narrative,
      ...g.workedExample.stepByStepMath,
      g.workedExample.finalTakeaway,
      g.benchmarkTable.title,
      ...g.benchmarkTable.headers,
      ...g.benchmarkTable.rows.flat(),
      ...g.optimizationLevers.map(l => `${l.title} ${l.actionableAdvice}`),
      ...g.faqs.map(f => `${f.question} ${f.answer}`)
    ].join(' ');
    const totalWords = countWords(totalText);

    console.log(`\nChecking: ${c.slug}`);
    console.log(`  metaTitle (${c.metaTitle.length} chars): ${c.metaTitle}`);
    console.log(`  metaDesc  (${c.metaDescription.length} chars): ${c.metaDescription}`);
    console.log(`  Total words: ${totalWords} | Exec words: ${execWords} | Rows: ${g.benchmarkTable.rows.length} | FAQs: ${g.faqs.length}`);

    if (c.metaTitle.length < 50 || c.metaTitle.length > 62) {
      console.error(`  ❌ metaTitle length ${c.metaTitle.length} out of range 50-62!`);
      hasErrors = true;
    }
    if (c.metaDescription.length < 140 || c.metaDescription.length > 158) {
      console.error(`  ❌ metaDescription length ${c.metaDescription.length} out of range 140-158!`);
      hasErrors = true;
    }
    if (totalWords < 1100) {
      console.error(`  ❌ Total words ${totalWords} < 1100!`);
      hasErrors = true;
    }
    if (execWords <= 120) {
      console.error(`  ❌ Exec summary words ${execWords} <= 120!`);
      hasErrors = true;
    }
    g.faqs.forEach((f, idx) => {
      const w = countWords(f.answer);
      if (w < 50) {
        console.error(`  ❌ FAQ #${idx + 1} has ${w} words (< 50)!`);
        hasErrors = true;
      }
    });
  }
  if (hasErrors) {
    process.exit(1);
  }
  console.log('\n✅ ALL 4 TASK 16 SPOKES PASSED PRE-FLIGHT VALIDATION!');
}

if (process.argv[1] && process.argv[1].endsWith('build-task16-spokes.mjs')) {
  validate();
}
