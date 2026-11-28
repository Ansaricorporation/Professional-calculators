import fs from 'fs';
import path from 'path';

// Complete curated mapping of all 100 calculators strictly calibrated to:
// - Title: 50–62 characters, primary keyword front-loaded + modifier (2026, Free, etc.), 0 duplicates
// - Description: 140–158 characters, concrete rates/figures from benchmark table, ends with action verb, 0 duplicates
export const OPTIMIZED_META = {
  // === E-COMMERCE & FULFILLMENT (26) ===
  'shopify-profit-margin-calculator': {
    title: 'Shopify Profit Margin Calculator 2026 | Free Plan Audit',
    description: 'Calculate exact Shopify net profits factoring 2.9% + 30¢ card processing, $39 to $399 monthly plans, and app costs. Model net margins instantly.'
  },
  'shopify-shipping-calculator': {
    title: 'Shopify Shipping Calculator 2026 | USPS & UPS Rates',
    description: 'Model Shopify shipping margins with up to 88% commercial USPS and UPS carrier discounts. Audit packaging costs and set free shipping thresholds instantly.'
  },
  'etsy-fee-calculator': {
    title: 'Etsy Fee Calculator 2026 | Free Seller Profit Math',
    description: 'Calculate true Etsy profits after 6.5% transaction cuts, $0.20 listing fees, and 3% + 25¢ payment charges. Audit net seller margins and take-rates instantly.'
  },
  'etsy-shipping-calculator': {
    title: 'Etsy Shipping Fee Calculator 2026 | True Label Cost',
    description: 'Audit Etsy shipping economics: factor 6.5% transaction cuts on postage, packaging costs, and carrier discounts. Calculate exact break-even prices instantly.'
  },
  'shopify-aov-calculator': {
    title: 'Shopify AOV Calculator 2026 | Order Value & Margins',
    description: 'Simulate average order value expansion from $45 to $85. Audit payment gateway fee savings, bundle margins, and calculate contribution profits instantly.'
  },
  'tiktok-shop-fee-calculator': {
    title: 'TikTok Shop US Seller Fee Calculator 2026 | Free Tool',
    description: 'Audit TikTok Shop US seller margins: factor 6% + 30¢ referral fees, creator affiliate cuts, and shipping subsidies. Calculate exact net payouts instantly.'
  },
  'etsy-vs-shopify-fee-calculator': {
    title: 'Etsy vs Shopify Fee Calculator 2026 | Platform Audit',
    description: 'Compare Etsy 6.5% fees plus 3% + 25¢ processing against Shopify 2.9% + 30¢ plus $39/mo SaaS overhead. Calculate exact monthly break-even volume instantly.'
  },
  'printify-profit-margin-calculator': {
    title: 'Printify Profit Margin Calculator 2026 | Free POD Math',
    description: 'Calculate print-on-demand profits: compare Standard vs $29/mo Premium 20% blank discounts, fulfillment costs, and calculate exact seller payouts instantly.'
  },
  'amazon-fba-vs-fbm-profit-calculator': {
    title: 'Amazon FBA vs FBM Fee Calculator 2026 | Net Margins',
    description: 'Compare Amazon 8% to 15% referral fees, FBA pick and pack fees, and merchant-fulfilled shipping costs. Calculate exact net seller profit margins instantly.'
  },
  'ebay-fee-calculator': {
    title: 'eBay Seller Fee Calculator 2026 | Final Value Rates',
    description: 'Calculate eBay seller fees: factor 13.25% final value fees, $0.40 order fees, Store tier discounts, and Promoted Listings. Audit net sale payouts instantly.'
  },
  'shopify-vs-woocommerce-cost-calculator': {
    title: 'Shopify vs WooCommerce Cost Calculator 2026 | TCO Tool',
    description: 'Compare Shopify $39/mo plans and 2.9% card processing against WooCommerce hosting, plugins, and Stripe gateways. Calculate total cost of ownership instantly.'
  },
  'product-landed-cost-calculator': {
    title: 'Product Landed Cost Calculator 2026 | True Unit COGS',
    description: 'Calculate true unit landed COGS: allocate factory FOB costs, ocean freight, 7.5% to 25% customs tariffs, and port drayage. Audit gross margins instantly.'
  },
  'walmart-marketplace-fee-calculator': {
    title: 'Walmart Marketplace Fee Calculator 2026 | WFS Profit',
    description: 'Calculate Walmart Marketplace seller referral fees (6% to 15%), WFS weight-based fulfillment costs, and storage fees. Model exact seller margins instantly.'
  },
  'printful-vs-printify-profit-calculator': {
    title: 'Printful vs Printify Margin Calculator 2026 | POD Tool',
    description: 'Compare Printful in-house apparel fulfillment against Printify network pricing and $29/mo Premium discounts. Calculate net print-on-demand profits instantly.'
  },
  'ecommerce-return-rate-cost-calculator': {
    title: 'E-Commerce Return Cost Calculator 2026 | Margin Decay',
    description: 'Audit reverse logistics costs, non-refundable 2.9% gateway fees, restock labor, and damaged inventory losses. Calculate net margin decay rates instantly.'
  },
  'dimensional-weight-shipping-calculator': {
    title: 'DIM Weight Shipping Calculator 2026 | USPS vs UPS/FedEx',
    description: 'Calculate dimensional billable weight comparing USPS 166 divisor against UPS and FedEx 139 divisor rules. Audit cubic parcel surcharges and rates instantly.'
  },
  'woocommerce-stripe-vs-square-fee-calculator': {
    title: 'WooCommerce Stripe vs Square Fee Calculator 2026 Rates',
    description: 'Compare Stripe 2.9% + 30¢ online processing against Square Online and in-person POS 2.6% + 10¢ rates. Calculate merchant fee crossover points instantly.'
  },
  'amazon-fba-storage-fee-calculator': {
    title: 'Amazon FBA Storage Fee Calculator 2026 | Q4 Peak Rates',
    description: 'Model Amazon FBA storage fees: $0.87 standard vs $2.40 Q4 peak per cu ft plus aged inventory surcharges. Calculate warehouse carrying costs instantly.'
  },
  'poshmark-vs-mercari-vs-depop-fee-calculator': {
    title: 'Poshmark vs Mercari vs Depop Fee Calculator 2026 Tool',
    description: 'Compare reseller fees: Poshmark flat 20% cut, Mercari 10% seller fee, and Depop transaction charges. Calculate exact net reseller payouts instantly.'
  },
  'dropshipping-net-profit-margin-calculator': {
    title: 'Dropshipping Net Margin Calculator 2026 | Free CPA Tool',
    description: 'Model dropshipping unit economics factoring supplier COGS, ad CPA ($15 to $35), and payment processing cuts. Calculate exact net profit margins instantly.'
  },
  'wholesale-faire-marketplace-fee-calculator': {
    title: 'Faire Wholesale Fee Calculator 2026 | Reorder Margins',
    description: 'Model Faire wholesale payouts across 15% + $10 opening orders, 15% standard reorders, and 0% Faire Direct links. Calculate net brand payouts instantly.'
  },
  'shopify-vs-bigcommerce-fee-calculator': {
    title: 'Shopify vs BigCommerce Fee Calculator 2026 | TCO Math',
    description: 'Compare BigCommerce 0% transaction fees and GMV sales tiers against Shopify plans and gateway costs. Calculate exact multi-channel TCO savings instantly.'
  },
  'etsy-offsite-ads-fee-calculator': {
    title: 'Etsy Offsite Ads Fee Calculator 2026 | 12% vs 15% Cut',
    description: 'Model Etsy 6.5% core transaction fees combined with mandatory 12% or optional 15% Offsite Ads deductions. Calculate true net profit per order instantly.'
  },
  'tiktok-shop-affiliate-commission-calculator': {
    title: 'TikTok Shop Affiliate Fee Calculator 2026 | Net Margin',
    description: 'Audit TikTok Shop seller economics: combine 6% + 30¢ platform fees with 10% to 20% creator affiliate commissions. Calculate exact net margins instantly.'
  },
  'woocommerce-vs-magento-hosting-cost-calculator': {
    title: 'WooCommerce vs Magento Cost Calculator 2026 | AWS TCO',
    description: 'Compare WooCommerce managed hosting and extensions against Magento Open Source AWS cloud infrastructure. Calculate enterprise e-commerce costs instantly.'
  },
  'ebay-promoted-listings-roas-calculator': {
    title: 'eBay Promoted Listings Calculator 2026 | ROAS & Margins',
    description: 'Calculate eBay Promoted Listings Standard ad rates (2% to 15%) combined with 13.25% final value fees. Audit break-even ROAS and ad margins instantly.'
  },

  // === CREATOR ECONOMY (22) ===
  'youtube-shorts-vs-long-form-calculator': {
    title: 'YouTube Shorts vs Long-Form Revenue Calculator 2026',
    description: 'Compare YouTube Shorts ad revenue ($0.04 to $0.08 RPM) against long-form ad splits ($2 to $12 RPM). Calculate exact creator video earnings instantly.'
  },
  'youtube-gaming-rpm-calculator': {
    title: 'YouTube Gaming RPM & Ad Revenue Calculator 2026 Model',
    description: 'Calculate YouTube Gaming channel ad revenue factoring $1.50 to $4.00 RPM benchmarks, live stream Super Chats, and 55% ad splits. Model payouts instantly.'
  },
  'youtube-finance-rpm-calculator': {
    title: 'YouTube Finance RPM Calculator 2026 | High-CPM Niche',
    description: 'Calculate YouTube finance and business channel ad revenue with $8 to $25 RPM rates, audience geos, and 55% creator ad splits. Model net payouts instantly.'
  },
  'tiktok-creativity-program-calculator': {
    title: 'TikTok Creativity Program RPM Calculator 2026 Model',
    description: 'Calculate TikTok Creator Rewards payouts: model $0.40 to $1.10 RPM benchmarks, watch completion rates, and qualified video views. Audit earnings instantly.'
  },
  'twitch-streamer-earnings-calculator': {
    title: 'Twitch Streamer Earnings Calculator 2026 | Sub Splits',
    description: 'Calculate Twitch streamer income: model 50/50 standard vs 70/30 Partner Plus subscription splits, Bits, and ad impressions. Audit monthly income instantly.'
  },
  'youtube-tech-channel-rpm-calculator': {
    title: 'YouTube Tech Channel RPM Calculator 2026 | CPM Model',
    description: 'Model YouTube consumer tech channel revenue: factor $4.00 to $9.00 RPM benchmarks, product affiliate links, and 55% ad splits. Calculate payouts instantly.'
  },
  'youtube-education-rpm-calculator': {
    title: 'YouTube Education RPM Calculator 2026 | Creator Math',
    description: 'Calculate educational YouTube channel ad revenue: factor $3.50 to $8.00 RPM rates, course lead funnels, and 55% creator splits. Model net payouts instantly.'
  },
  'youtube-sponsorship-rate-calculator': {
    title: 'YouTube Sponsorship Rate Calculator 2026 | Fair CPM',
    description: 'Calculate fair YouTube video sponsorship pricing: factor $20 to $45 CPM rates, dedicated vs integrated ad reads, and audience size. Quote brands instantly.'
  },
  'patreon-vs-kofi-calculator': {
    title: 'Patreon vs Ko-fi Fee Comparison Calculator 2026 Rates',
    description: 'Compare Patreon 8% to 12% platform cuts against Ko-fi 0% to 5% commission tiers plus payment processing. Calculate creator membership payouts instantly.'
  },
  'youtube-lifestyle-vlog-rpm-calculator': {
    title: 'YouTube Lifestyle Vlog RPM Calculator 2026 Benchmarks',
    description: 'Model YouTube lifestyle and daily vlog ad revenue: factor $1.80 to $4.20 RPM benchmarks, brand integrations, and 55% rev splits. Audit channel pay instantly.'
  },
  'youtube-podcast-rpm-calculator': {
    title: 'YouTube Podcast RPM Calculator 2026 | Ad Split Model',
    description: 'Calculate YouTube video podcast revenue: factor $5.00 to $14.00 RPM rates, mid-roll ad density, and host-read sponsorships. Model creator payouts instantly.'
  },
  'kick-vs-twitch-streamer-payout-calculator': {
    title: 'Kick vs Twitch Streamer Payout Calculator 2026 Rates',
    description: 'Compare Kick 95/5 subscription splits against Twitch 50/50 and 70/30 Partner Plus revenue cuts. Calculate exact monthly live streamer earnings instantly.'
  },
  'newsletter-sponsorship-cpm-calculator': {
    title: 'Newsletter Sponsorship CPM Calculator 2026 Ad Rates',
    description: 'Calculate email newsletter ad rates: model $30 to $65 CPM benchmarks, 40% open rates, click-through metrics, and sponsor packages. Quote sponsors instantly.'
  },
  'youtube-kids-vs-standard-rpm-calculator': {
    title: 'YouTube Kids vs Standard RPM Calculator 2026 COPPA',
    description: 'Compare COPPA restricted YouTube Kids ad revenue ($0.50 to $1.50 RPM) against standard general audience monetization. Calculate creator ad loss instantly.'
  },
  'spotify-apple-music-streaming-royalty-calculator': {
    title: 'Spotify vs Apple Music Royalty Calculator 2026 Rates',
    description: 'Compare music streaming royalties: Spotify $0.003 to $0.005 per stream vs Apple Music $0.007 to $0.01 per stream. Calculate distributor payouts instantly.'
  },
  'ugc-creator-video-rate-calculator': {
    title: 'UGC Creator Video Rate Calculator 2026 | Ad Pricing',
    description: 'Calculate user-generated content (UGC) pricing: factor base video production ($150 to $500), paid ad usage rights, and whitelisting. Quote clients instantly.'
  },
  'instagram-reels-vs-youtube-shorts-calculator': {
    title: 'Instagram Reels vs YouTube Shorts Revenue Calculator',
    description: 'Compare short-form creator monetization: Instagram Reels bonus payouts vs YouTube Shorts $0.04 to $0.08 RPM pooled revenue. Audit net video pay instantly.'
  },
  'twitch-vs-youtube-gaming-calculator': {
    title: 'Twitch vs YouTube Gaming Revenue Calculator 2026 Tool',
    description: 'Compare live streaming earnings: Twitch 50% sub splits and Bits against YouTube Gaming 70% memberships and 55% ad splits. Calculate stream income instantly.'
  },
  'substack-vs-ghost-newsletter-calculator': {
    title: 'Substack vs Ghost Newsletter Calculator 2026 Costs',
    description: 'Compare Substack 10% platform take-rate against Ghost $9 to $25 monthly flat hosting fees plus Stripe processing. Calculate creator net profits instantly.'
  },
  'instagram-vs-tiktok-creator-fund-calculator': {
    title: 'Instagram vs TikTok Creator Pay Calculator 2026 Model',
    description: 'Compare short-form creator payouts: Instagram Reels bonuses vs TikTok Creator Rewards $0.50 to $1.00 RPM benchmarks. Calculate monthly creator pay instantly.'
  },
  'thinkific-vs-teachable-fee-calculator': {
    title: 'Thinkific vs Teachable Fee Calculator 2026 SaaS Model',
    description: 'Compare online course platform costs: Teachable 10% Free tier cut vs Thinkific 0% transaction fee SaaS plans. Calculate creator course profits instantly.'
  },
  'podcast-cpm-vs-cpa-sponsorship-calculator': {
    title: 'Podcast CPM vs CPA Sponsorship Calculator 2026 Rates',
    description: 'Compare podcast advertising models: $18 to $35 CPM flat sponsorship rates against $30 to $100 CPA affiliate commissions. Calculate sponsor payouts instantly.'
  },

  // === DIGITAL MARKETPLACES & PAYMENTS (26) ===
  'gumroad-vs-lemon-squeezy-fee-calculator': {
    title: 'Gumroad vs Lemon Squeezy Fee Calculator 2026 Rates',
    description: 'Compare Gumroad flat 10% cut against Lemon Squeezy 5% + 50¢ MoR processing fees. Calculate exact digital product payouts and tax savings instantly.'
  },
  'gumroad-fee-calculator': {
    title: 'Gumroad Fee Calculator 2026 | Flat 10% Take-Rate Math',
    description: 'Calculate exact Gumroad seller payouts factoring flat 10% platform fees plus 2.9% + 30¢ credit card processing. Model net creator earnings instantly.'
  },
  'patreon-fee-calculator': {
    title: 'Patreon Fee Calculator 2026 | Pro 8% vs Premium 12%',
    description: 'Calculate Patreon creator earnings: model 8% Pro vs 12% Premium platform tiers, credit card processing cuts, and payout charges. Audit net income instantly.'
  },
  'substack-revenue-calculator': {
    title: 'Substack Revenue Calculator 2026 | 10% Cut & Stripe',
    description: 'Calculate Substack newsletter subscription revenue: deduct 10% platform cuts, Stripe 2.9% + 30¢ processing, and billing churn. Model creator pay instantly.'
  },
  'payhip-fee-calculator': {
    title: 'Payhip Fee Calculator 2026 | Free 5% vs Plus Plans',
    description: 'Calculate Payhip digital storefront profits: compare Free 5% fees against $29/mo Plus 2% and $99/mo Pro 0% tiers. Model net seller product payouts instantly.'
  },
  'gumroad-vs-payhip-fee-calculator': {
    title: 'Gumroad vs Payhip Fee Calculator 2026 | Digital Sales',
    description: 'Compare Gumroad 10% platform cut against Payhip 5% Free or 0% Pro plans. Calculate digital creator profit margins and payment gateway costs instantly.'
  },
  'patreon-vs-substack-calculator': {
    title: 'Patreon vs Substack Fee Calculator 2026 Creator Model',
    description: 'Compare membership economics: Patreon 8% to 12% fee tiers against Substack 10% newsletter cut plus Stripe charges. Calculate net creator take-home instantly.'
  },
  'lemon-squeezy-fee-calculator': {
    title: 'Lemon Squeezy Fee Calculator 2026 | Merchant of Record',
    description: 'Calculate Lemon Squeezy merchant fees: factor 5% + 50¢ transaction charges, 1.5% international card fees, and global sales tax. Model net payouts instantly.'
  },
  'etsy-digital-download-profit-calculator': {
    title: 'Etsy Digital Download Profit Calculator 2026 Schedule',
    description: 'Calculate Etsy digital download profits: factor 6.5% transaction cuts, $0.20 listing fees, and 3% + 25¢ payment charges. Model 80%+ net margins instantly.'
  },
  '3d-model-marketplace-royalty-calculator': {
    title: '3D Model Marketplace Royalty Calculator 2026 Rates',
    description: 'Compare 3D asset royalties across TurboSquid (40% to 60%), CGTrader (70% to 80%), and Sketchfab (88%). Calculate exact 3D artist payouts instantly.'
  },
  'whop-fee-calculator': {
    title: 'Whop Fee Calculator 2026 | 3% Platform Cut & Stripe',
    description: 'Calculate Whop digital marketplace profits: factor 3% platform commission, 2.9% + 30¢ Stripe processing, and affiliate fees. Audit net creator pay instantly.'
  },
  'teachable-vs-kajabi-fee-calculator': {
    title: 'Teachable vs Kajabi Fee Calculator 2026 SaaS Pricing',
    description: 'Compare course platform costs: Teachable 5% transaction fees on Basic vs Kajabi $149/mo flat fee 0% transaction plans. Calculate course margins instantly.'
  },
  'udemy-instructor-revenue-share-calculator': {
    title: 'Udemy Instructor Revenue Share Calculator 2026 Split',
    description: 'Calculate Udemy instructor course payouts: compare 97% instructor promotion coupon sales against 37% organic marketplace discovery. Audit royalties instantly.'
  },
  'stan-store-vs-gumroad-calculator': {
    title: 'Stan Store vs Gumroad Fee Calculator 2026 Creator Tool',
    description: 'Compare Stan Store $29/mo flat 0% transaction fee model against Gumroad 10% revenue take-rate. Calculate exact creator break-even volume instantly.'
  },
  'stock-footage-audio-royalty-calculator': {
    title: 'Stock Footage & Audio Royalty Calculator 2026 Rates',
    description: 'Calculate stock contributor royalties: compare Pond5 (50%), Shutterstock (15% to 40%), and Envato Elements revenue splits. Audit net earnings instantly.'
  },
  'game-asset-store-royalty-calculator': {
    title: 'Game Asset Store Royalty Calculator 2026 Developer Cut',
    description: 'Compare indie game developer asset earnings: Unity Asset Store (70% split), Unreal Engine Fab (88% split), and itch.io. Calculate net royalties instantly.'
  },
  'apple-app-store-vs-google-play-fee-calculator': {
    title: 'Apple vs Google Play Developer Fee Calculator 2026',
    description: 'Compare mobile app store commissions: Apple App Store 15% Small Business vs Google Play 15% first $1M tier. Calculate net app store revenue instantly.'
  },
  'steam-game-developer-net-revenue-calculator': {
    title: 'Steam Game Developer Net Revenue Calculator 2026 Math',
    description: 'Calculate Steam game developer net earnings: deduct Valve 30% revenue split, $100 Direct fee, VAT/sales tax, and 10% returns. Model indie profits instantly.'
  },
  'amazon-kdp-ebook-paperback-royalty-calculator': {
    title: 'Amazon KDP Royalty Calculator 2026 | 70% vs 35% Rates',
    description: 'Calculate Amazon KDP author royalties: compare 70% vs 35% eBook royalty tiers, delivery charges, and paperback print costs. Model author earnings instantly.'
  },
  'fiverr-seller-net-earnings-calculator': {
    title: 'Fiverr Seller Net Earnings Calculator 2026 | 20% Cut',
    description: 'Calculate Fiverr freelancer take-home pay: deduct flat 20% seller service commission, currency conversion, and withdrawal fees. Audit net payouts instantly.'
  },
  'notion-template-gumroad-vs-lemonsqueezy-calculator': {
    title: 'Notion Template Gumroad vs Lemon Squeezy 2026 Calculator',
    description: 'Compare selling Notion templates on Gumroad (flat 10% fee) vs Lemon Squeezy (5% + 50¢ MoR). Calculate digital product profit margins instantly.'
  },
  'teachers-pay-teachers-fee-calculator': {
    title: 'Teachers Pay Teachers Fee Calculator 2026 TpT Rates',
    description: 'Calculate TpT teacher earnings: compare Basic Free (55% payout minus $0.30) against Premium $59.95/yr (85% payout minus $0.15). Model net profits instantly.'
  },
  'artstation-vs-gumroad-fee-calculator': {
    title: 'ArtStation vs Gumroad Fee Calculator 2026 Artist Math',
    description: 'Compare digital art sales commissions: ArtStation Pro (88% to 95% payout) vs Gumroad flat 10% fee plus card processing. Calculate artist payouts instantly.'
  },
  'redbubble-vs-society6-margin-calculator': {
    title: 'Redbubble vs Society6 Margin Calculator 2026 POD Tool',
    description: 'Compare print-on-demand artist royalties: Redbubble 20% markup minus account tier fees vs Society6 shipping and plan cuts. Calculate artist profits instantly.'
  },
  'upwork-vs-freelancer-fee-calculator': {
    title: 'Upwork vs Freelancer Fee Calculator 2026 Freelance Pay',
    description: 'Compare freelance platform commissions: Upwork flat 10% service fee against Freelancer.com 10% or $5 project fee. Calculate net contractor payouts instantly.'
  },
  'airbnb-vs-vrbo-host-fee-calculator': {
    title: 'Airbnb vs Vrbo Host Fee Calculator 2026 Commission Tool',
    description: 'Compare vacation rental host fees: Airbnb 3% split-fee host model against Vrbo 5% commission plus 3% card processing. Calculate net booking payouts instantly.'
  },

  // === B2B & FREELANCE PRICING (26) ===
  'wholesale-to-retail-markup-calculator': {
    title: 'Wholesale to Retail Markup Calculator 2026 | Free Tool',
    description: 'Model wholesale to retail markup, 20% to 50% margins, payment gateway cuts, and keystone pricing. Calculate exact net payout and break-even ROAS instantly.'
  },
  'stripe-fee-calculator': {
    title: 'Stripe Fee Calculator 2026 | 2.9% + 30¢ Card Processing',
    description: 'Calculate Stripe merchant fees: model 2.9% + 30¢ domestic cards, 1.5% international fees, and reverse invoice formulas. Receive exact net payouts instantly.'
  },
  'paypal-fee-calculator': {
    title: 'PayPal Business Fee Calculator 2026 | 3.49% vs 2.99%',
    description: 'Calculate PayPal merchant fees: compare 3.49% + 49¢ standard checkout against 2.99% + 49¢ card fields and cross-border surcharges. Model net pay instantly.'
  },
  'stripe-vs-paypal-fee-calculator': {
    title: 'Stripe vs PayPal Fee Calculator 2026 | Rate Comparison',
    description: 'Compare Stripe 2.9% + 30¢ against PayPal 3.49% + 49¢. Audit fee differentials, international card surcharges, and annual business savings instantly.'
  },
  'upwork-vs-fiverr-fee-calculator': {
    title: 'Upwork vs Fiverr Fee Calculator 2026 | 10% vs 20% Cut',
    description: 'Compare Upwork flat 10% freelancer service fee against Fiverr 20% seller commission. Audit withdrawal costs and calculate net freelance take-home instantly.'
  },
  'freelance-hourly-rate-calculator': {
    title: 'Freelance Hourly Rate Calculator 2026 | Billable Math',
    description: 'Calculate the exact freelance hourly and day rate required for your target salary, factoring 25% unbillable time and 15.3% SE taxes. Model rates instantly.'
  },
  'self-employment-tax-calculator': {
    title: 'Self-Employment Tax Calculator 2026 | Schedule SE FICA',
    description: 'Calculate 2026 self-employment taxes: factor 15.3% Schedule SE rates, 92.35% taxable profit base, and quarterly estimated 1040-ES payments instantly.'
  },
  'consulting-day-rate-calculator': {
    title: 'Consulting Day Rate Calculator 2026 | Per Diem Pricing',
    description: 'Calculate commercial consulting day rates: convert annual salary targets factoring 180 to 220 billable days, taxes, and overhead. Model per diem instantly.'
  },
  'client-retainer-pricing-calculator': {
    title: 'Client Retainer Pricing Calculator 2026 | Agency Math',
    description: 'Calculate monthly agency client retainer pricing: allocate billable hours, 15% scope creep buffers, and gateway processing. Model contract margins instantly.'
  },
  'contractor-late-fee-calculator': {
    title: 'Contractor Late Fee Calculator 2026 | Net-30 Interest',
    description: 'Calculate commercial invoice late fees: model 1.5% monthly interest (18% statutory APR), compounding grace periods, and late penalties. Audit math instantly.'
  },
  'break-even-roas-calculator': {
    title: 'Break-Even ROAS Calculator 2026 | Target CPA & Margin',
    description: 'Calculate break-even ROAS, maximum allowable customer acquisition cost (CPA), and minimum profit margins across paid ad campaigns. Model ROAS instantly.'
  },
  'early-payment-discount-calculator': {
    title: 'Early Payment Discount Calculator 2026 | 2/10 Net 30',
    description: 'Calculate early payment trade discounts: model 2/10 Net 30 terms, 37.24% annualized APR interest, and supplier cash acceleration costs. Audit math instantly.'
  },
  'wise-international-transfer-fee-calculator': {
    title: 'Wise Transfer Fee Calculator 2026 | Mid-Market FX Rates',
    description: 'Calculate international wire fees: compare Wise mid-market FX rates and 0.45% fees against bank $35 SWIFT charges. Audit foreign exchange savings instantly.'
  },
  'saas-ltv-cac-calculator': {
    title: 'SaaS LTV to CAC Calculator 2026 | Unit Economics Model',
    description: 'Calculate SaaS customer lifetime value (LTV), acquisition cost (CAC), LTV/CAC ratios (3x benchmark), and payback months. Model unit SaaS metrics instantly.'
  },
  'margin-vs-markup-converter-calculator': {
    title: 'Margin vs Markup Converter Calculator 2026 Pricing',
    description: 'Convert markup percentage to gross margin percentage and vice versa. Calculate exact profit loss from pricing errors and discount leakage instantly.'
  },
  'invoice-factoring-cost-calculator': {
    title: 'Invoice Factoring Cost Calculator 2026 | APR & Advance',
    description: 'Calculate accounts receivable invoice factoring costs: model 80% to 90% advance rates, 1% to 3% discount fees, and annualized APR. Audit financing instantly.'
  },
  'equipment-financing-vs-cash-calculator': {
    title: 'Equipment Financing vs Cash Calculator 2026 | Section 179',
    description: 'Compare buying business equipment with cash vs commercial equipment loans, factoring IRS Section 179 first-year tax depreciation. Model cash flows instantly.'
  },
  'square-vs-clover-vs-toast-pos-fee-calculator': {
    title: 'Square vs Clover vs Toast POS Fee Calculator 2026 Rates',
    description: 'Compare POS card fees: Square 2.6% + 10¢, Clover rates, and Toast restaurant charges plus SaaS hardware leases. Calculate merchant processing costs instantly.'
  },
  'agency-project-fixed-bid-margin-calculator': {
    title: 'Agency Fixed-Bid Project Margin Calculator 2026 Rates',
    description: 'Calculate agency fixed-bid project margins: model blended rates ($75 to $150), 20% scope contingency, and net profit targets. Quote agency projects instantly.'
  },
  'saas-annual-vs-monthly-discount-calculator': {
    title: 'SaaS Annual vs Monthly Discount Calculator 2026 Cash',
    description: 'Model SaaS pricing: compare 15% to 20% annual discounts against monthly billing, churn rates, and cash runway. Audit subscription cash flows instantly.'
  },
  's-corp-vs-llc-self-employment-tax-calculator': {
    title: 'S-Corp vs LLC Tax Savings Calculator 2026 | Schedule SE',
    description: 'Calculate S-Corp vs LLC tax savings: model W-2 salary splits, 15.3% SE tax deductions, and payroll overhead. Audit net annual tax savings instantly.'
  },
  'stripe-vs-braintree-processing-calculator': {
    title: 'Stripe vs Braintree Processing Calculator 2026 Rates',
    description: 'Compare Stripe 2.9% + 30¢ against Braintree 2.59% + 49¢ card rates, dispute fees, and volume interchange. Calculate merchant processing fee savings instantly.'
  },
  'agency-retainer-vs-hourly-calculator': {
    title: 'Agency Retainer vs Hourly Billing Calculator 2026 Tool',
    description: 'Compare agency billing models: steady monthly retainers with 15% buffers vs hourly billing with 30% unbillable risk. Calculate agency profitability instantly.'
  },
  'b2b-wire-vs-ach-transfer-fee-calculator': {
    title: 'B2B Wire vs ACH Transfer Fee Calculator 2026 Banking',
    description: 'Compare B2B payment rails: domestic ACH (0.8% capped at $5) vs commercial $25 to $40 wire charges. Calculate corporate treasury payment fee savings instantly.'
  },
  'saas-mrr-growth-churn-calculator': {
    title: 'SaaS MRR Growth & Churn Calculator 2026 | Net Retention',
    description: 'Model SaaS revenue: factor new MRR expansion, 2% to 5% churn, and net revenue retention (NRR 110%+). Project forward ARR growth trajectories instantly.'
  },
  'freelance-project-roi-calculator': {
    title: 'Freelance Project ROI Calculator 2026 | Client Value',
    description: 'Calculate client project return on investment: factor freelance service fees ($3,000 to $20,000) against client revenue lift. Quote value pricing instantly.'
  },
  // === WEALTH, STOCKS, CRYPTO & REAL ESTATE (20) ===
  'stock-average-cost-calculator': {
    title: 'Stock Average Cost Calculator 2026 | Break-Even Price',
    description: 'Calculate average share cost across buy tranches, blended cost basis, and required rally percentage to break even. Model stock positions instantly.'
  },
  'options-profit-calculator': {
    title: 'Options Profit Calculator 2026 | Call & Put Payoff Math',
    description: 'Calculate option contract payoffs: factor strike prices, premium multipliers (x100), and underlying prices. Model net call and put profits instantly.'
  },
  'pattern-day-trader-margin-calculator': {
    title: 'PDT Margin Calculator 2026 | Day Trading Buying Power',
    description: 'Calculate FINRA Pattern Day Trader margin buying power: model 4x intraday leverage, 2x overnight rules, and the $25,000 equity minimum instantly.'
  },
  'short-selling-margin-call-calculator': {
    title: 'Short Selling Margin Call Calculator 2026 | Trigger Math',
    description: 'Calculate short selling margin call trigger prices: model 30% to 40% maintenance margin requirements and borrow fees. Audit short risk instantly.'
  },
  'dividend-reinvestment-drip-calculator': {
    title: 'Dividend DRIP Calculator 2026 | Compound Yield-on-Cost',
    description: 'Calculate dividend reinvestment growth: model quarterly DRIP compounding, annual dividend growth, and yield-on-cost yields. Audit wealth growth instantly.'
  },
  'crypto-dca-calculator': {
    title: 'Crypto DCA Calculator 2026 | Dollar Cost Average ROI',
    description: 'Model recurring crypto dollar-cost averaging: compare fixed periodic BTC/ETH buys against lump-sum entry, exchange fees, and net ROI returns instantly.'
  },
  'impermanent-loss-calculator': {
    title: 'Impermanent Loss Calculator 2026 | DeFi AMM Staking Math',
    description: 'Calculate AMM 50/50 liquidity pool impermanent loss: model token price divergence (2x, 3x, 5x) vs swap fee APY returns. Audit DeFi LP yields instantly.'
  },
  'crypto-mining-profitability-calculator': {
    title: 'Crypto Mining Profitability Calculator 2026 | ASIC Tool',
    description: 'Calculate crypto mining profit margins: deduct hardware wattage, electricity $/kWh tariffs, and 1% to 2% mining pool fees. Audit net cash flow instantly.'
  },
  'staking-apy-compound-calculator': {
    title: 'Crypto Staking APY Calculator 2026 | Compound Validator',
    description: 'Calculate Proof-of-Stake rewards: deduct 5% to 10% validator commissions and model daily/weekly auto-compounding yields. Audit net staking APY instantly.'
  },
  'crypto-liquidation-price-calculator': {
    title: 'Crypto Liquidation Calculator 2026 | Futures Leverage',
    description: 'Calculate crypto perpetual futures liquidation prices: model 5x to 50x leverage, maintenance margins, and taker fees. Audit long and short risk instantly.'
  },
  'capital-gains-tax-calculator': {
    title: 'Capital Gains Tax Calculator 2026 | Short vs Long-Term',
    description: 'Compare ordinary rates (10% to 37%) against 0%, 15%, 20% long-term capital gains brackets plus 3.8% NIIT surtax. Calculate net tax liabilities instantly.'
  },
  'rsu-vesting-tax-calculator': {
    title: 'RSU Vesting Tax Calculator 2026 | Sell-to-Cover Shares',
    description: 'Calculate net vested RSU shares after statutory 22% federal supplemental withholding, FICA, and state income tax cuts. Model equity compensation instantly.'
  },
  'espp-discount-profit-calculator': {
    title: 'ESPP Discount Profit Calculator 2026 | 15% Lookback ROI',
    description: 'Calculate Employee Stock Purchase Plan returns: model 15% statutory discounts with 6-month lookback provisions. Audit immediate-sale profit gains instantly.'
  },
  'wash-sale-rule-calculator': {
    title: 'Wash Sale Rule Calculator 2026 | Disallowed Tax Loss',
    description: 'Calculate IRS 30-day wash sale adjustments: add disallowed capital losses to replacement share basis. Audit deferred tax deductions accurately instantly.'
  },
  'roth-ira-conversion-calculator': {
    title: 'Roth IRA Conversion Calculator 2026 | Tax Break-Even',
    description: 'Compare upfront conversion taxes against decades of tax-free Roth compound growth. Audit marginal tax brackets and break-even retirement rates instantly.'
  },
  'brrrr-method-calculator': {
    title: 'BRRRR Method Calculator 2026 | Real Estate Cash-Out Math',
    description: 'Model BRRRR real estate deals: purchase, rehab, 75% LTV ARV cash-out refinance, and cash left in deal. Calculate equity velocity and cash returns instantly.'
  },
  'rental-property-roi-calculator': {
    title: 'Rental Property ROI Calculator 2026 | Cap Rate & Cash',
    description: 'Calculate rental property cash flow: deduct PITI mortgage, 8% management, 5% vacancy, and CapEx reserves. Audit capitalization rates and net ROI instantly.'
  },
  'fha-vs-conventional-mortgage-calculator': {
    title: 'FHA vs Conventional Mortgage Calculator 2026 | PMI Tool',
    description: 'Compare FHA 3.5% down + 1.75% UFMIP against Conventional loans with cancellable PMI at 78% LTV. Audit monthly mortgage payments and closing costs instantly.'
  },
  'airbnb-arbitrage-calculator': {
    title: 'Airbnb Arbitrage Calculator 2026 | Monthly STR Cash Flow',
    description: 'Calculate Airbnb rental arbitrage profits: deduct landlord master lease, utilities, cleaning, and 15% platform fees. Model upfront payback months instantly.'
  },
  'gold-silver-melt-value-calculator': {
    title: 'Gold & Silver Melt Value Calculator 2026 | Scrap Purity',
    description: 'Calculate intrinsic scrap gold and silver melt value: factor live spot prices, karat purities (10k to 24k), and gram weights. Audit dealer buyouts instantly.'
  },
  'shopify-dimensional-weight-shipping-calculator': {
    title: 'Shopify DIM Weight Calculator 2026 | Box Size Shipping Cost',
    description: 'Calculate Shopify dimensional weight with 139 and 166 cubic divisors. Compare actual scale weight to billable freight charges and audit margin decay today.'
  },
  'shopify-free-shipping-threshold-calculator': {
    title: 'Shopify Free Shipping Threshold Calculator | 2026 AOV Tool',
    description: 'Model Shopify free shipping thresholds against average order value and product margins. Audit cart subsidies, postage absorption, and boost net profit today.'
  },
  'stripe-reverse-fee-calculator': {
    title: 'Stripe Reverse Fee Calculator 2026 | Gross-Up Invoice Math',
    description: 'Calculate exact invoice totals needed to cover Stripe 2.9% + 30¢ processing fees. Pass merchant surcharges to clients and preserve net payout amounts now.'
  },
  'stripe-international-fx-fee-calculator': {
    title: 'Stripe International Card & FX Fee Calculator 2026 Rates',
    description: 'Model Stripe cross-border card fees, 1.5% international issuance, 1% FX conversions, and 0.7% billing tools. Audit net global merchant revenue payouts now.'
  },
  'ebay-promoted-listings-fee-calculator': {
    title: 'eBay Promoted Listings Fee Calculator 2026 | Ad Rate ROI',
    description: 'Calculate eBay net seller profit after stacking 13.25% Final Value Fees with 2% to 15% Promoted Listings Standard ad rates. Model advertising margins today.'
  },
  'ebay-international-shipping-fee-calculator': {
    title: 'eBay International Shipping Fee Calculator 2026 | EIS Cut',
    description: 'Calculate eBay cross-border profits deducting 1.65% International Fees, domestic hub shipping, and Final Value Fees. Model global export net margins today.'
  },
  'stock-cost-basis-fifo-vs-lifo-calculator': {
    title: 'Stock Cost Basis FIFO vs LIFO Calculator | 2026 Tax Lots',
    description: 'Compare stock capital gains taxes between FIFO, LIFO, and Specific Identification tax lots. Model realized gains and harvest tax loss deductions today.'
  },
  'stock-split-cost-basis-calculator': {
    title: 'Stock Split Cost Basis Calculator 2026 | Forward & Reverse',
    description: 'Calculate post-split cost basis per share, adjusted share counts, and cash-in-lieu fractions for forward and reverse stock splits. Audit tax records now.'
  },
  'patreon-apple-ios-fee-calculator': {
    title: 'Patreon Apple iOS Fee Calculator 2026 | 30% App Cut Math',
    description: 'Compare creator payouts between 30% Apple iOS App Store fees and 8% web checkout subscriptions. Calculate exact pricing markups to protect net income now.'
  },
  'patreon-tier-pricing-payout-calculator': {
    title: 'Patreon Tier Pricing & Payout Calculator 2026 | Pro vs Pre',
    description: 'Calculate creator net take-home pay comparing Patreon Pro (8%) and Premium (12%) tiers. Model micropayment processing and payout bank transfers today.'
  },
  'ebay-store-subscription-break-even-calculator': {
    title: 'eBay Store Subscription Break-Even Calculator (2026 Tiers)',
    description: 'Calculate your eBay store subscription break-even point across Starter, Basic, Premium, and Anchor tiers with insertion fee savings and net margins today.'
  },
  'ebay-vs-mercari-vs-poshmark-fee-calculator': {
    title: 'eBay vs Mercari vs Poshmark Fee Calculator (2026 Payouts)',
    description: 'Compare seller fees, payment processing rates, and net profits across eBay, Mercari, and Poshmark to choose the most profitable marketplace to sell now.'
  },
  'patreon-vs-kofi-vs-substack-fee-calculator': {
    title: 'Patreon vs Ko-fi vs Substack Fee Calculator (2026 Rates)',
    description: 'Compare platform cut percentages, payment processing fees, and creator take-home pay across Patreon, Ko-fi, and Substack to maximize monthly revenue now.'
  },
  'stripe-vs-square-vs-shopify-payments-calculator': {
    title: 'Stripe vs Square vs Shopify Payments Fee Calculator 2026',
    description: 'Compare payment processing fees, in-person POS swipes, and online checkout margins across Stripe, Square, and Shopify Payments to minimize merchant costs now.'
  },
  'shopify-usps-vs-ups-vs-fedex-shipping-calculator': {
    title: 'Shopify USPS vs UPS vs FedEx Shipping Calculator (2026 Rates)',
    description: 'Compare commercial carrier rates, parcel dimensional weight pricing, and delivery speed across USPS, UPS, and FedEx to maximize Shopify shipping margins now.'
  },
  'stock-wash-sale-capital-gains-calculator': {
    title: 'Stock Wash Sale Rule Capital Gains Calculator (2026 IRS)',
    description: 'Calculate disallowed losses, cost basis adjustments, and taxable net capital gains under the IRS 30-day wash sale rule for stock and ETF trading accounts now.'
  },
  'airbnb-host-only-fee-calculator': {
    title: 'Airbnb Host-Only Fee Calculator 2026 | 15.5% Price Markup',
    description: 'Calculate net host payouts under Airbnb 15.5% host-only service fees. Model exact 18.34% nightly rate markups to protect listing profit margins today.'
  },
  'depop-seller-fee-boosted-listing-calculator': {
    title: 'Depop Seller Fee Calculator 2026 | 12% Boosted Net Profit',
    description: 'Calculate Depop seller earnings with 0% marketplace fees, 3.3% + $0.45 payment processing, and 12% boosted listings. Model true net take-home pay now.'
  },
  'roblox-devex-payout-calculator': {
    title: 'Roblox DevEx Calculator 2026 | Robux to USD Payout Rates',
    description: 'Convert earned Robux to USD under 2026 DevEx rates ($0.0038 standard and $0.0054 eligible 18+ spend). Model 30k minimum thresholds and net profits now.'
  },
  'whatnot-seller-fee-profit-calculator': {
    title: 'Whatnot Seller Fee Calculator 2026 | Live Auction Profits',
    description: 'Calculate Whatnot live stream selling profits factoring 8% commission, 2.9% + $0.30 payment processing, and volume tier discounts. Audit net margins now.'
  },
  'steam-vs-epic-games-store-revenue-calculator': {
    title: 'Steam vs Epic Games Store Fee Calculator 2026 | Payouts',
    description: 'Compare Steam 30% revenue cut ($100 Direct fee, tiered 25%/20%) vs Epic Games Store 12% flat split across indie unit volume. Model payouts instantly.'
  },
  'steam-regional-pricing-tax-withholding-calculator': {
    title: 'Steam VAT & 30% Tax Withholding Calculator 2026 Payout',
    description: 'Model Steam regional pricing net deposits after country VAT, 9% refunds, Valve 30% split, and 0%–30% IRS W-8BEN tax withholding. Audit payouts instantly.'
  },
  'walmart-wfs-vs-amazon-fba-fee-calculator': {
    title: 'Walmart WFS vs Amazon FBA Fee Calculator 2026 Compare',
    description: 'Compare Walmart WFS base fees ($3.45–$5.75+) and 5%–15% referral rates against Amazon FBA 2026 pick-and-pack and referral charges. Audit margins instantly.'
  },
  'walmart-wfs-storage-return-fee-calculator': {
    title: 'Walmart WFS Storage & Return Fee Calculator 2026 Audit',
    description: 'Model Walmart WFS storage ($0.75–$2.25/cu ft), June 30, 2026 aged inventory tiers (366+ and 450+ days), and $4.70–$6.70 return fees. Audit costs instantly.'
  }
};

export function runOptimization(applyWrites = false) {
  const dir = path.join(process.cwd(), 'src/data/calculators');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

  const titlesSeen = new Set();
  const descriptionsSeen = new Set();
  let totalCalculators = 0;
  let titleErrors = 0;
  let descErrors = 0;

  console.log('='.repeat(80));
  console.log('🔍 TASK 12: SEO TITLE & META DESCRIPTION CTR AUDIT');
  console.log('='.repeat(80));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const calc of data) {
      totalCalculators++;
      const opt = OPTIMIZED_META[calc.slug];
      if (!opt) {
        console.error(`❌ Missing optimization mapping for slug: ${calc.slug} (${file})`);
        titleErrors++;
        continue;
      }

      // Validate Title Length (50–62 chars)
      const tLen = opt.title.length;
      if (tLen < 50 || tLen > 62) {
        console.error(`❌ Invalid Title Length (${tLen} chars) on ${calc.slug}: "${opt.title}"`);
        titleErrors++;
      }

      // Check Title Uniqueness
      if (titlesSeen.has(opt.title)) {
        console.error(`❌ Duplicate Title detected on ${calc.slug}: "${opt.title}"`);
        titleErrors++;
      }
      titlesSeen.add(opt.title);

      // Validate Meta Description Length (140–158 chars)
      const dLen = opt.description.length;
      if (dLen < 140 || dLen > 158) {
        console.error(`❌ Invalid Description Length (${dLen} chars) on ${calc.slug}: "${opt.description}"`);
        descErrors++;
      }

      // Check Description Uniqueness
      if (descriptionsSeen.has(opt.description)) {
        console.error(`❌ Duplicate Description detected on ${calc.slug}: "${opt.description}"`);
        descErrors++;
      }
      descriptionsSeen.add(opt.description);

      // Validate Action Verb ending
      if (!opt.description.endsWith('instantly.') && !opt.description.endsWith('today.') && !opt.description.endsWith('now.')) {
        console.warn(`⚠️ Warning: Description does not end with standard action verb on ${calc.slug}`);
      }

      // Update in data if write mode is enabled
      if (applyWrites) {
        calc.metaTitle = opt.title;
        calc.metaDescription = opt.description;
      }
    }

    if (applyWrites) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`✅ Saved updated SEO meta to: src/data/calculators/${file}`);
    }
  }

  console.log('-'.repeat(80));
  console.log(`Total Calculators Audited:   ${totalCalculators}`);
  console.log(`Unique Title Count:          ${titlesSeen.size} / 144`);
  console.log(`Unique Description Count:    ${descriptionsSeen.size} / 144`);
  console.log(`Title Tag Format Violations: ${titleErrors}`);
  console.log(`Meta Desc Format Violations: ${descErrors}`);
  console.log('='.repeat(80));

  if (titleErrors > 0 || descErrors > 0) {
    throw new Error(`SEO Meta CTR Audit failed with ${titleErrors} title errors and ${descErrors} description errors.`);
  }

  console.log('🎉 100% OF ALL 144 CALCULATORS MEET STRICT CTR ARCHITECTURE (50–62 char titles, 140–158 char descriptions, 0 duplicates)!');
}

// Auto-run if executed directly via node
if (process.argv[1] && process.argv[1].endsWith('optimize-seo-meta.mjs')) {
  const shouldWrite = process.argv.includes('--write');
  runOptimization(shouldWrite);
}
