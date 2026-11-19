// Group C: Tax & Equity Compensation (5 Calculators)
export const groupC = [
  {
    slug: "capital-gains-tax-calculator",
    title: "Short-Term vs. Long-Term Capital Gains Tax Calculator (2026 Brackets)",
    metaTitle: "Capital Gains Tax Calculator 2026 | Short vs Long-Term",
    metaDescription: "Compare ordinary rates (10% to 37%) against 0%, 15%, 20% long-term capital gains brackets plus 3.8% NIIT surtax. Calculate net tax liabilities instantly.",
    category: "wealth-investing",
    engineType: "platform-vs-platform",
    lastUpdated: "November 2026",
    officialSourceName: "IRS Revenue Procedure 2025-32 & 2026 Federal Tax Rate Schedules",
    officialSourceUrl: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2025",
    defaultInputs: {
      realizedCapitalGain: 75000,
      ordinaryIncomeBase: 145000,
      assetHoldingMonths: 16,
      taxpayerFilingStatus: "married-joint",
      stateCapitalGainsRatePercent: 5.75
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        niitThresholdSingle: 200000,
        niitThresholdMarriedJoint: 250000,
        niitSurtaxRatePercent: 3.8,
        longTermRate0CapMarried: 96700,
        longTermRate15CapMarried: 600050
      }
    },
    guideContent: {
      executiveSummary: "Capital gains taxation represents one of the most critical determinants of net investment performance for taxable retail accounts. Under United States federal tax law, the internal revenue code enforces a fundamental bifurcation between Short-Term Capital Gains (assets held for 365 days or fewer) and Long-Term Capital Gains (assets held for greater than one year). Short-term gains enjoy zero preferential treatment and are taxed as ordinary income at progressive federal marginal rates ranging from 10% up to 37%. In contrast, long-term gains receive substantial tax relief under statutory preferential brackets of 0%, 15%, and 20%, depending on total household taxable income. High-income investors must also account for the Net Investment Income Tax (NIIT)—a 3.8% surtax levied on investment earnings exceeding statutory Modified Adjusted Gross Income thresholds ($200,000 for single filers, $250,000 for married couples filing jointly). This institutional tax model compares short-term versus long-term liabilities, NIIT exposure, state tax loads, and net retained proceeds.",
      formulaBreakdown: {
        formulaString: "Short-Term Tax = Realized Gain * Federal Ordinary Marginal Rate % + State Tax; Long-Term Tax = (Gain in 0% Bracket * 0%) + (Gain in 15% Bracket * 15%) + (Gain in 20% Bracket * 20%) + NIIT Tax + State Tax; NIIT Tax = Max(0, Min(Realized Gain, Total MAGI - NIIT Threshold)) * 3.8%; Tax Savings = Short-Term Tax Liability - Long-Term Tax Liability",
        variables: [
          {
            symbol: "Realized Capital Gain (G_realized)",
            meaning: "Net taxable profit generated upon asset disposition, equal to gross sales proceeds minus adjusted cost basis."
          },
          {
            symbol: "Holding Period (T_months)",
            meaning: "Elapsed duration between trade execution date of acquisition and trade execution date of liquidation."
          },
          {
            symbol: "Ordinary Income Baseline (Y_ord)",
            meaning: "Taxpayer's standard taxable income derived from wages, salaries, business profits, and interest prior to capital gains."
          },
          {
            symbol: "Net Investment Income Tax (NIIT)",
            meaning: "A 3.8% statutory federal surtax applied under IRC Section 1411 to investment income above statutory MAGI thresholds."
          },
          {
            symbol: "State Capital Gains Tax (T_state)",
            meaning: "State-level income tax levied on recognized capital gains, which typically treat capital profits as ordinary income."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "$75,000 Realized Capital Gain with $145,000 Ordinary Income (Married Filing Jointly, 16-Month Hold)",
        narrative: "A married couple filing jointly realizes a $75,000 capital gain on an equity position. Their base taxable ordinary income is $145,000, placing them in the 22% federal ordinary income bracket. Because they held the stock for 16 months (>1 year), the gain qualifies for long-term rates. Their total MAGI is $220,000 ($145k + $75k). They reside in a state with a flat 5.75% capital gains tax rate.",
        stepByStepMath: [
          "Step 1: Determine Holding Period Classification: 16 months > 12 months, qualifying the entire $75,000 gain for preferential Long-Term Capital Gains treatment.",
          "Step 2: Model Long-Term Federal Brackets: For married joint filers, the 15% bracket applies between $96,700 and $600,050. Total income ($220,000) falls entirely within the 15% bracket. Federal long-term tax = $75,000 * 15.0% = $11,250.00.",
          "Step 3: Evaluate Net Investment Income Tax (NIIT) Liability: Total MAGI ($220,000) is below the $250,000 threshold for married joint filers. NIIT liability = $0.00.",
          "Step 4: Compute State Capital Gains Tax: $75,000 gain * 5.75% state tax rate = $4,312.50 state tax obligation.",
          "Step 5: Total Long-Term Tax Liability: $11,250.00 federal + $4,312.50 state = $15,562.50 total taxes paid (Effective rate: 20.75%). Net proceeds retained: $59,437.50.",
          "Step 6: Comparative Short-Term Tax Scenario: If sold before 12 months, the gain would be taxed at ordinary rates (22% federal + 5.75% state = 27.75%). Short-term tax = $75,000 * 27.75% = $20,812.50. Holding for >1 year saved $5,250.00 in direct tax cash."
        ],
        finalTakeaway: "Holding the asset past the 12-month mark to qualify for long-term rates saved the couple $5,250 in cash taxes, reducing their total tax burden from $20,812 down to $15,562."
      },
      benchmarkTable: {
        title: "Federal Capital Gains Tax Brackets & Surtax Thresholds (2026)",
        headers: ["Filing Status", "0% Long-Term Bracket", "15% Long-Term Bracket", "20% Long-Term Bracket", "3.8% NIIT MAGI Threshold"],
        rows: [
          ["Single Filer", "Taxable income up to $48,350", "$48,351 to $533,400", "Taxable income over $533,400", "MAGI exceeding $200,000"],
          ["Married Filing Jointly", "Taxable income up to $96,700", "$96,701 to $600,050", "Taxable income over $600,050", "MAGI exceeding $250,000"],
          ["Head of Household", "Taxable income up to $64,750", "$64,751 to $566,700", "Taxable income over $566,700", "MAGI exceeding $200,000"],
          ["Married Filing Separately", "Taxable income up to $48,350", "$48,351 to $300,025", "Taxable income over $300,025", "MAGI exceeding $125,000"],
          ["Short-Term (All Statuses)", "None: Taxed as ordinary", "None: Progressive brackets", "Top bracket reaches 37.0%", "Applies to net investment gain"]
        ]
      },
      optimizationLevers: [
        {
          title: "Delay Asset Sales by Days or Weeks to Cross the 365-Day Threshold",
          actionableAdvice: "Audit your trade lot acquisition dates meticulously. Liquidating an asset on day 364 triggers full ordinary income taxation (up to 37%), whereas waiting just two days to day 366 cuts your federal tax rate to 15% or 20%, generating an immediate 10% to 17% net return on tax savings alone."
        },
        {
          title: "Execute Year-End Tax-Loss Harvesting to Offset Realized Capital Gains",
          actionableAdvice: "Review unrealized losses in your portfolio before December 31st. Realized capital losses offset capital gains dollar-for-dollar without limit. If losses exceed gains, you can offset up to $3,000 of ordinary wage income per tax year, rolling forward excess losses indefinitely."
        },
        {
          title: "Utilize Specific Identification (Spec ID) When Liquidating Partial Holdings",
          actionableAdvice: "Instruct your brokerage to execute sales under the 'Highest-In, First-Out' (HIFO) or Specific Identification methodology. Selling high-cost lots first minimizes your taxable capital gain, allowing lower-cost baseline lots to continue compounding unrealized in tax deferral."
        },
        {
          title: "Donate Appreciated Long-Term Shares to Charity or Donor-Advised Funds (DAF)",
          actionableAdvice: "Donating appreciated equities held over one year directly to a 501(c)(3) charity or DAF allows you to deduct 100% of the fair market value from your ordinary income while paying 0% in capital gains tax on the built-in appreciation."
        }
      ],
      faqs: [
        {
          question: "What is the exact holding period required to qualify for long-term capital gains?",
          answer: "To qualify for long-term capital gains tax rates, the security must be held for more than one year (at least 366 days, or 367 days in a leap year). The holding period begins on the day after you acquire the asset (the trade date, not settlement date) and includes the day you sell it."
        },
        {
          question: "How does the Net Investment Income Tax (NIIT) 3.8% surtax apply?",
          answer: "The Net Investment Income Tax is a 3.8% surtax enacted under IRC Section 1411. It applies to the lesser of: (1) your net investment income (which includes capital gains, dividends, interest, and rental income), or (2) the amount by which your Modified Adjusted Gross Income (MAGI) exceeds statutory thresholds ($200,000 single, $250,000 married joint)."
        },
        {
          question: "Can capital losses be used to offset ordinary salary income?",
          answer: "Yes, but with strict statutory limits. Capital losses must first offset capital gains of the same type (short-term against short-term, long-term against long-term). If you have an overall net capital loss for the year, you can deduct up to $3,000 ($1,500 if married filing separately) against ordinary wage income, carrying forward the remainder."
        },
        {
          question: "Do state income taxes apply to capital gains, and are there state deductions?",
          answer: "Most US states tax capital gains as standard ordinary income at their standard state income tax rates (e.g., California up to 13.3%, New York up to 10.9%), offering zero preferential rates for long-term holding. A few states (like Washington) levy specialized excise taxes on high-value capital gains, while states like Florida, Texas, and Nevada charge 0%."
        },
        {
          question: "What is the 0% long-term capital gains tax bracket and who qualifies?",
          answer: "Under federal tax law, taxpayers with taxable income below statutory ceilings ($48,350 for single filers, $96,700 for married joint filers in 2026) pay exactly 0% federal tax on realized long-term capital gains that fall within that income threshold. This allows low-income or early-retired investors to harvest substantial investment gains completely tax-free."
        }
      ]
    },
    relatedSlugs: [
      "self-employment-tax-calculator",
      "rsu-vesting-tax-calculator",
      "wash-sale-rule-calculator",
      "roth-ira-conversion-calculator"
    ]
  },
  {
    slug: "rsu-vesting-tax-calculator",
    title: "RSU Vesting Tax Withholding (22% Sell-to-Cover) & Net Shares Calculator",
    metaTitle: "RSU Vesting Tax Calculator 2026 | Sell-to-Cover Shares",
    metaDescription: "Calculate net vested RSU shares after statutory 22% federal supplemental withholding, FICA, and state income tax cuts. Model equity compensation instantly.",
    category: "wealth-investing",
    engineType: "markup-margin",
    lastUpdated: "November 2026",
    officialSourceName: "IRS Publication 15 (Employer Tax Guide for Supplemental Wages)",
    officialSourceUrl: "https://www.irs.gov/publications/p15",
    defaultInputs: {
      grossSharesVesting: 650,
      shareMarketValueAtVest: 195.0,
      supplementalFederalRatePercent: 22.0,
      stateSupplementalTaxRatePercent: 9.3,
      ficaMedicareSurtaxPercent: 7.65
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        federalSupplementalThresholdUsd: 1000000,
        federalSupplementalHighRatePercent: 37.0,
        medicareAdditionalSurtaxThresholdSingle: 200000
      }
    },
    guideContent: {
      executiveSummary: "Restricted Stock Units (RSUs) constitute a cornerstone of modern compensation for technology executives, engineers, and corporate leadership. Unlike stock options which require exercising capital, RSUs represent an outright grant of equity that becomes taxable ordinary income upon the exact day the shares vest. Under IRS regulations, the entire Fair Market Value (FMV) of the vesting shares is treated as supplemental wage income, triggering mandatory statutory withholding for federal income tax (defaulting to 22% for supplemental wages under $1 million), Social Security (6.2% up to wage limits), Medicare (1.45% plus 0.9% additional surtax for high earners), and state income taxes. To satisfy this mandatory tax obligation without requiring employees to wire out-of-pocket cash, corporate equity administration plans execute an automatic 'Sell-to-Cover' transaction, liquidating a substantial portion (typically 35% to 50%) of the vesting shares. However, because statutory 22% federal withholding is frequently lower than an engineer's actual 32% to 37% marginal tax bracket, under-withholding traps often result in massive unexpected tax bills come April. This calculator computes exact sell-to-cover share liquidation, net deliverable shares, and true year-end tax gap liabilities.",
      formulaBreakdown: {
        formulaString: "Gross Vesting Value = Shares Vesting * Fair Market Value (FMV); Mandatory Withholding % = Federal Supplemental % (22% or 37%) + State Tax % + FICA/Medicare %; Total Tax Liability = Gross Vesting Value * Mandatory Withholding %; Shares Sold to Cover = Ceiling(Total Tax Liability / FMV); Net Shares Deposited = Shares Vesting - Shares Sold to Cover; True Tax Liability = Gross Vesting Value * Actual Marginal Bracket %; Under-Withholding Tax Gap = True Tax Liability - Total Tax Withheld",
        variables: [
          {
            symbol: "Gross Shares Vesting (N_vest)",
            meaning: "Total quantity of equity compensation units unlocking on the scheduled contractual vesting date."
          },
          {
            symbol: "Fair Market Value (FMV)",
            meaning: "Official closing share price or volume-weighted price of the stock on the public exchange on the vest date."
          },
          {
            symbol: "Sell-to-Cover Volume (N_sold)",
            meaning: "Calculated count of shares automatically liquidated by the stock plan administrator to satisfy payroll tax withholding."
          },
          {
            symbol: "Net Retained Shares (N_net)",
            meaning: "Actual quantity of whole equity units transferred into the employee's personal brokerage account."
          },
          {
            symbol: "Tax Under-Withholding Deficit (Gap_tax)",
            meaning: "The difference between the statutory 22% supplemental withholding and the employee's actual higher marginal bracket."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "Tech Engineer: 650 RSUs Vesting at $195.00 FMV with Actual 35% Federal Bracket in California",
        narrative: "A software architect has 650 RSUs vest when the company's stock is trading at $195.00 per share ($126,750 gross value). The corporate equity broker applies statutory supplemental withholding: 22.0% federal, 9.3% California state tax, and 2.35% Medicare/FICA (Social Security cap already reached). The architect's true federal marginal tax bracket is 35.0%, creating a significant under-withholding variance.",
        stepByStepMath: [
          "Step 1: Compute Gross Vesting Value: 650 shares * $195.00 FMV = $126,750.00 gross supplemental wage income.",
          "Step 2: Determine Mandatory Payroll Withholding Rate: 22.0% (federal) + 9.3% (California) + 2.35% (Medicare/FICA) = 33.65% total statutory withholding.",
          "Step 3: Calculate Total Mandatory Tax Withheld: $126,750.00 * 33.65% = $42,651.38 total tax obligation due on vest day.",
          "Step 4: Calculate Shares Sold-to-Cover: $42,651.38 / $195.00 share price = 218.72 shares. Rounding up to whole shares = 219 shares sold to cover ($42,705.00 withheld; $53.62 cash refunded).",
          "Step 5: Compute Net Shares Deposited to Employee: 650 gross shares - 219 shares sold = 431 net whole shares deposited into brokerage account.",
          "Step 6: Calculate True Year-End Tax Gap: True federal liability is 35.0% (13.0% higher than the 22% statutory withheld). Tax gap deficit = $126,750 * (35.0% - 22.0%) = $16,477.50 owed on Form 1040 in April."
        ],
        finalTakeaway: "While 219 shares were sold to cover $42,705 in statutory taxes (depositing 431 net shares), the engineer faces an additional $16,477 under-withholding tax bill at tax time due to the 22% supplemental rate gap."
      },
      benchmarkTable: {
        title: "RSU Vesting Withholding Rates vs Actual Marginal Tax Brackets",
        headers: ["Total Annual Household Compensation", "Statutory Federal Withholding", "Actual Federal Marginal Bracket", "Withholding Deficit Gap", "Action Required"],
        rows: [
          ["$100k to $150k Single / Married", "22.0% Statutory rate", "22.0% to 24.0% Marginal", "~0% to 2% (Balanced)", "Minimal tax gap; minor adjustment"],
          ["$200k to $350k Tech Professionals", "22.0% Statutory rate", "32.0% to 35.0% Marginal", "10.0% to 13.0% Deficit", "Severe under-withholding; quarterly prepay"],
          ["$400k to $750k Senior Leadership", "22.0% Statutory rate", "35.0% to 37.0% Marginal", "13.0% to 15.0% Deficit", "Urgent: Make estimated 1040-ES payments"],
          ["$1,000,000+ Executive Tranche", "37.0% Mandatory top rate", "37.0% Marginal top rate", "0.0% (Fully withheld)", "Statutory rate jumps to 37% past $1M"],
          ["Low-Income / Early-Career Grant", "22.0% Statutory rate", "10.0% to 12.0% Marginal", "+10.0% to +12% Overwithheld", "Large tax refund expected upon filing"]
        ]
      },
      optimizationLevers: [
        {
          title: "Elect Voluntary Supplemental Withholding Rate Increases if Supported",
          actionableAdvice: "Top equity administration platforms (like E*TRADE Corporate or Shareworks) allow employees to elect voluntary supplemental withholding increases from 22% up to 37%. Electing your actual 35% or 37% bracket eliminates the dreaded year-end tax gap and avoids IRS underpayment penalty interest."
        },
        {
          title: "Make Quarterly Estimated Tax Payments (Form 1040-ES) to Avoid Penalties",
          actionableAdvice: "If your employer cannot adjust withholding above 22%, immediately transfer a portion of cash from your salary into a high-yield savings account or make quarterly estimated payments via IRS Direct Pay to fulfill safe-harbor rules (paying 110% of prior-year liability)."
        },
        {
          title: "Sell Vested Shares Immediately to Diversify and Eliminate Concentration Risk",
          actionableAdvice: "Treat vested RSUs mentally as a cash bonus: if given $80,000 in cash, would you spend 100% of it purchasing stock in your single employer? Selling vested shares immediately eliminates capital gains taxes (since cost basis equals vest FMV) and allows diversification into broad index funds."
        },
        {
          title: "Audit Form 1099-B Cost Basis Reporting to Prevent Double Taxation",
          actionableAdvice: "Brokers are prohibited by IRS rules from including compensation income in the cost basis reported on Box 1e of Form 1099-B, frequently leaving it at $0. Always adjust your cost basis on Form 8949 using your employer's Form W-2 or stock plan statement to ensure you do not pay income tax twice."
        }
      ],
      faqs: [
        {
          question: "Why do employers default to 22% federal withholding on RSU vestings?",
          answer: "Under IRS Publication 15, RSUs are classified as supplemental wages. The Internal Revenue Code mandates that employers apply a flat statutory supplemental wage withholding rate of 22% for cumulative supplemental payments under $1 million within a calendar year (and 37% for amounts exceeding $1 million), regardless of the employee's true marginal bracket."
        },
        {
          question: "What is the cost basis of shares received from an RSU vesting?",
          answer: "The cost basis of your net deliverable RSU shares is exactly equal to the Fair Market Value (FMV) per share on the date of vesting. Because you paid ordinary income tax on this entire value at vest, you only owe capital gains tax on subsequent price appreciation above that vest FMV price when you eventually sell."
        },
        {
          question: "What is the difference between Sell-to-Cover, Same-Day Sale, and Cash Transfer?",
          answer: "Sell-to-Cover automatically liquidates just enough shares to satisfy payroll withholding, depositing the remaining net shares into your account. Same-Day Sale liquidates 100% of the vesting shares, delivering pure cash. Cash Transfer requires you to wire out-of-pocket cash to cover taxes, keeping 100% of the gross vested shares."
        },
        {
          question: "Can RSU vestings push me into a higher federal income tax bracket?",
          answer: "Yes. The entire gross fair market value of vesting RSUs is added directly to your Box 1 taxable wages on Form W-2. Large vesting cliffs can substantially elevate your Adjusted Gross Income (AGI), potentially phasing out deductions, triggering the 3.8% NIIT, and pushing income into the 35% or 37% marginal brackets."
        },
        {
          question: "What happens if the stock price drops immediately after my RSUs vest?",
          answer: "You are still legally liable for ordinary income tax based on the higher FMV on the exact day of vesting. If the stock subsequently declines, you hold shares at a lower market price than the basis on which you paid taxes. If sold at a loss, you incur a capital loss, which can only offset $3,000 of ordinary income per year."
        }
      ]
    },
    relatedSlugs: [
      "capital-gains-tax-calculator",
      "espp-discount-profit-calculator",
      "self-employment-tax-calculator",
      "s-corp-vs-llc-self-employment-tax-calculator"
    ]
  },
  {
    slug: "espp-discount-profit-calculator",
    title: "ESPP 15% Discount & Lookback Provision Guaranteed ROI Calculator",
    metaTitle: "ESPP Discount Profit Calculator 2026 | 15% Lookback ROI",
    metaDescription: "Calculate Employee Stock Purchase Plan returns: model 15% statutory discounts with 6-month lookback provisions. Audit immediate-sale profit gains instantly.",
    category: "wealth-investing",
    engineType: "platform-profit",
    lastUpdated: "November 2026",
    officialSourceName: "IRS Section 423 Qualified Employee Stock Purchase Plans",
    officialSourceUrl: "https://www.irs.gov/businesses/corporations/statutory-stock-options",
    defaultInputs: {
      accumulatedPayrollContributions: 10000,
      offeringPeriodStartPrice: 115.0,
      purchaseDateMarketPrice: 140.0,
      statutoryDiscountPercentage: 15.0,
      ordinaryIncomeTaxBracketPercent: 24.0
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        irsMaximumAnnualContributionLimit: 25000,
        standardOfferingPeriodMonths: 6,
        qualifiedHoldingPeriodMonths: 24
      }
    },
    guideContent: {
      executiveSummary: "An Employee Stock Purchase Plan (ESPP) qualified under Section 423 of the Internal Revenue Code represents one of the highest-returning, lowest-risk employee equity incentives available in corporate America. Under an IRS-qualified ESPP, employees allocate payroll deductions (up to the federal limit of $25,000 worth of stock per calendar year) to purchase company equity at a mandatory discount of up to 15%. However, the true mathematical superpower of an elite ESPP lies in the 'Lookback Provision.' A lookback provision applies the 15% discount to the lower of two prices: the stock price on the first day of the offering period (Grant Date) or the stock price on the purchase date (Exercise Date). When the stock appreciates over the 6-month window, the effective discount expands dramatically beyond 15%, generating guaranteed gross annualized returns exceeding 90% when shares are liquidated immediately upon receipt. This calculator models purchase prices, lookback mechanics, immediate-sale cash returns, qualifying versus disqualifying dispositions, and after-tax net profit yields.",
      formulaBreakdown: {
        formulaString: "Lookback Benchmark Price = Min(Offering Start Price, Purchase Date Price); Discounted Purchase Price = Lookback Benchmark Price * (1 - Discount %); Shares Purchased = Floor(Payroll Contributions / Discounted Purchase Price); Market Value of Shares = Shares Purchased * Purchase Date Market Price; Pre-Tax Cash Profit = Market Value of Shares - Payroll Contributions; Effective Instant ROI % = (Pre-Tax Cash Profit / Payroll Contributions) * 100",
        variables: [
          {
            symbol: "Cumulative Payroll Deductions (D_payroll)",
            meaning: "Total after-tax cash accumulated from salary deductions across the standard 6-month ESPP accumulation period."
          },
          {
            symbol: "Offering Start Price (P_grant)",
            meaning: "Official closing market price of the corporate stock on the opening day of the multi-month offering period."
          },
          {
            symbol: "Purchase Date Market Price (P_purchase)",
            meaning: "Prevailing fair market value of the stock on the final purchase execution date."
          },
          {
            symbol: "Discounted Execution Price (P_disc)",
            meaning: "Final purchase price paid per share after applying the 15% discount to the lower lookback benchmark price."
          },
          {
            symbol: "Pre-Tax Instant Cash Profit (Pi_gross)",
            meaning: "Gross dollar profit realized by immediately selling 100% of the acquired shares on the open market upon delivery."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "$10,000 Contribution with $115.00 Offering Price and $140.00 Purchase Price (15% Lookback Plan)",
        narrative: "A corporate technology employee contributes $10,000 into a 6-month qualified ESPP. On the offering period start date, the stock is trading at $115.00. Over the 6-month period, the company stock rallies 21.7% to $140.00 on the purchase date. The plan features a standard 15% discount and a lookback provision. The employee plans an immediate disqualifying sale upon receipt and is in the 24% tax bracket.",
        stepByStepMath: [
          "Step 1: Determine Lookback Benchmark Price: Min($115.00 offering price, $140.00 purchase price) = $115.00 benchmark price selected.",
          "Step 2: Calculate Discounted Purchase Price: $115.00 lookback price * (1 - 0.15 discount) = $97.75 purchase price per share.",
          "Step 3: Calculate Shares Acquired: $10,000.00 contributions / $97.75 discounted price = 102.30 shares. Floor = 102 whole shares ($9,970.50 deployed, $29.50 cash refunded).",
          "Step 4: Compute Immediate Market Value at $140.00: 102 shares * $140.00 current market price = $14,280.00 gross market value.",
          "Step 5: Determine Pre-Tax Cash Profit: $14,280.00 market value - $9,970.50 purchase cost = $4,309.50 gross cash profit (an instant 43.22% return on capital).",
          "Step 6: Compute After-Tax Net Return: Under disqualifying disposition, the $4,309.50 gain is taxed as ordinary income at 24% = $1,034.28 tax. Net profit after taxes = $3,275.22 net cash retained (32.85% after-tax ROI over 6 months)."
        ],
        finalTakeaway: "Due to the lookback provision, the effective discount expanded from 15% to 30.18%, turning a $10,000 payroll contribution into a guaranteed $4,309 pre-tax cash profit ($3,275 after tax) on day one."
      },
      benchmarkTable: {
        title: "ESPP Lookback Provision Performance across Market Scenarios",
        headers: ["Stock Price Trajectory (6 Months)", "Offering / Purchase Price", "Discounted Purchase Price", "Instant Pre-Tax ROI %", "Annualized Return Potential"],
        rows: [
          ["Flat Stock Movement ($0 Change)", "$100.00 / $100.00", "$85.00 per share (15% off)", "+17.65% Instant ROI", "~38.5% Annualized Return"],
          ["Bull Market Rally (+25% Gain)", "$100.00 / $125.00", "$85.00 per share (32% off)", "+47.06% Instant ROI", "~116.2% Annualized Return"],
          ["Parabolic Surge (+50% Gain)", "$100.00 / $150.00", "$85.00 per share (43% off)", "+76.47% Instant ROI", "~211.4% Annualized Return"],
          ["Bear Market Drop (-20% Drop)", "$100.00 / $80.00", "$68.00 per share (Lookback)", "+17.65% Instant ROI", "~38.5% Annualized (Protected!)"],
          ["Severe Crash (-50% Plunge)", "$100.00 / $50.00", "$42.50 per share (Lookback)", "+17.65% Instant ROI", "~38.5% Annualized (Protected!)"]
        ]
      },
      optimizationLevers: [
        {
          title: "Maximize Contributions to the Full IRS Statutory Ceiling ($25,000/Year)",
          actionableAdvice: "An ESPP with a lookback provision provides a guaranteed minimum return of 17.65% (even if the stock crashes or remains flat). Maximize contributions up to the federal $25,000 limit before funding taxable investment accounts, as virtually no other risk-free financial vehicle matches this yield."
        },
        {
          title: "Adopt an Immediate-Sale Strategy to Eliminate Downside Single-Stock Risk",
          actionableAdvice: "Holding ESPP shares exposes your wealth to extreme single-company concentration (both your salary and savings depend on the same firm). Selling 100% of shares on purchase day locks in the 17.65%+ arbitrage profit immediately, which can then be deployed into diversified S&P 500 index funds."
        },
        {
          title: "Understand the Tax Difference Between Qualifying and Disqualifying Dispositions",
          actionableAdvice: "Selling immediately is a 'Disqualifying Disposition' (discount taxed as ordinary income). A 'Qualifying Disposition' requires holding shares for 2 years from grant date and 1 year from purchase, allowing excess gains to qualify for long-term capital gains rates—though holding exposes you to substantial downside risk."
        },
        {
          title: "Bridge Cash Flow Constraints via Liquidity Buffers to Ensure Max Contributions",
          actionableAdvice: "Because ESPP contributions are deducted from salary across 6 months, take-home pay decreases noticeably. Build a 3-month living expense cash buffer in a high-yield savings account to subsidize daily living expenses, allowing you to maximize payroll deductions without debt."
        }
      ],
      faqs: [
        {
          question: "How does the ESPP 'Lookback Provision' mathematically guarantee a minimum return?",
          answer: "The lookback provision calculates the 15% discount from the lower of the opening stock price or the closing purchase price. If the stock falls, you get 15% off the lower price. If the stock rises, you get 15% off the original lower start price. The minimum mathematical pre-tax return is always `15% / (100% - 15%) = 15 / 85 = 17.65%`, even if the stock declines."
        },
        {
          question: "What is the statutory annual limit for an IRS Section 423 ESPP?",
          answer: "Under Internal Revenue Code Section 423, an employee cannot purchase more than $25,000 worth of stock (based on the undiscounted Fair Market Value of the stock on the offering start date) in any single calendar year across all qualified ESPP plans sponsored by the employer."
        },
        {
          question: "How are taxes handled on an immediate sale (Disqualifying Disposition)?",
          answer: "When you sell ESPP shares immediately upon purchase, the discount (the difference between the purchase date market price and the price you actually paid) is reported as taxable ordinary wage income on your Form W-2. Any additional gain or loss between the purchase price and final sale price is short-term capital gain or loss."
        },
        {
          question: "Can an employee lose money in an ESPP with a lookback provision?",
          answer: "If you sell your shares immediately on the purchase date, you virtually cannot lose money, as the 15% discount provides a guaranteed pricing cushion. A loss is possible only if you hold the shares post-purchase and the market price crashes by more than your total discount before you execute a sale."
        },
        {
          question: "What happens to accumulated ESPP payroll deductions if I leave the company?",
          answer: "If you separate from your employer (via resignation or termination) before the designated purchase date, you are disqualified from the upcoming purchase. Under IRS rules, 100% of your accumulated payroll deductions are refunded back to you in full as cash via standard payroll."
        }
      ]
    },
    relatedSlugs: [
      "rsu-vesting-tax-calculator",
      "capital-gains-tax-calculator",
      "stock-average-cost-calculator",
      "roth-ira-conversion-calculator"
    ]
  },
  {
    slug: "wash-sale-rule-calculator",
    title: "IRS 30-Day Wash Sale Disallowed Loss & Adjusted Cost Basis Calculator",
    metaTitle: "Wash Sale Rule Calculator 2026 | Disallowed Tax Loss",
    metaDescription: "Calculate IRS 30-day wash sale adjustments: add disallowed capital losses to replacement share basis. Audit deferred tax deductions accurately instantly.",
    category: "wealth-investing",
    engineType: "platform-profit",
    lastUpdated: "November 2026",
    officialSourceName: "IRS Publication 550: Investment Income & Wash Sales (IRC Section 1091)",
    officialSourceUrl: "https://www.irs.gov/publications/p550#en_US_2023_publink100010601",
    defaultInputs: {
      disposedLotShares: 300,
      originalCostBasisPerShare: 92.0,
      saleRealizedPricePerShare: 64.0,
      replacementSharesAcquired: 300,
      replacementCostBasisPerShare: 67.5
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        washSaleWindowDays: 61,
        backwardWindowDays: 30,
        forwardWindowDays: 30
      }
    },
    guideContent: {
      executiveSummary: "Tax-loss harvesting is a premier wealth-preservation strategy, but executing it carelessly triggers the punitive mechanics of Internal Revenue Code Section 1091: The Wash Sale Rule. Enacted to prevent investors from manufacturing artificial tax deductions while maintaining an uninterrupted economic position in an asset, the rule dictates that if an investor sells a security at a loss and acquires 'substantially identical' stock, options, or contracts within a 61-day window (30 days before the sale, the day of the sale, and 30 days after the sale), the realized loss is legally disallowed for immediate tax deduction. However, the disallowed tax loss is not permanently erased; rather, the IRS requires that the disallowed loss be added directly to the cost basis of the newly acquired replacement shares. This upward basis adjustment defers the tax benefit into the future while also transferring the holding period of the original lot to the replacement lot. This calculator computes disallowed loss totals, adjusted replacement cost bases, effective break-even prices, and 61-day calendar compliance windows.",
      formulaBreakdown: {
        formulaString: "Realized Loss = (Sale Price - Original Basis) * Shares; Disallowed Loss = Abs(Realized Loss) * Min(1, Replacement Shares / Disposed Shares); Adjusted Replacement Basis per Share = Replacement Purchase Price + (Disallowed Loss / Replacement Shares); Total Adjusted Basis = Replacement Shares * Adjusted Basis per Share; Deferred Tax Deduction = Disallowed Loss * Marginal Tax Rate %",
        variables: [
          {
            symbol: "Original Cost Basis (B_orig)",
            meaning: "Purchase price per share plus commissions paid for the initial lot subsequently liquidated at a capital loss."
          },
          {
            symbol: "Realized Sale Price (P_sale)",
            meaning: "Gross execution price per share realized upon selling the original equity lot at a loss."
          },
          {
            symbol: "Disallowed Loss (L_disallow)",
            meaning: "Dollar volume of realized capital loss prohibited from being deducted against capital gains on the current year's tax return."
          },
          {
            symbol: "Replacement Purchase Price (P_replace)",
            meaning: "The market price paid per share to purchase the replacement substantially identical shares within the 61-day window."
          },
          {
            symbol: "Adjusted Cost Basis (B_adj)",
            meaning: "The new official IRS cost basis per share of the replacement holding after absorbing the disallowed tax loss."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "Selling 300 Shares at a $28.00/Share Loss and Re-Purchasing 300 Replacement Shares at $67.50 within 14 Days",
        narrative: "An active trader buys 300 shares of a semiconductor stock at $92.00 per share ($27,600 basis). The stock drops to $64.00, and the trader sells the entire 300-share lot on November 10th to claim an $8,400 tax loss. However, on November 24th (14 days later, inside the 30-day window), the trader re-purchases 300 replacement shares of the same stock at $67.50 ($20,250 outlay), triggering a full wash sale.",
        stepByStepMath: [
          "Step 1: Compute Realized Capital Loss: ($64.00 sale price - $92.00 original basis) * 300 shares = -$28.00 per share = -$8,400.00 realized gross loss.",
          "Step 2: Determine Wash Sale Window Status: Replacement shares were purchased 14 days after the sale, which falls within the statutory 30-day post-sale window.",
          "Step 3: Calculate Disallowed Loss: Because the replacement lot (300 shares) matches the disposed lot (300 shares), 100% of the loss is disallowed: $8,400.00 disallowed deduction for current tax year.",
          "Step 4: Compute Loss Adjustment per Replacement Share: $8,400.00 disallowed loss / 300 replacement shares = +$28.00 basis addition per share.",
          "Step 5: Calculate Adjusted Replacement Cost Basis: $67.50 replacement purchase price + $28.00 disallowed loss adjustment = $95.50 new adjusted cost basis per share.",
          "Step 6: Total Adjusted Basis Valuation: 300 replacement shares * $95.50 adjusted basis = $28,650.00 total basis. The $8,400 loss is deferred into the new position, meaning selling the replacement shares in the future at $95.50 yields $0 taxable gain."
        ],
        finalTakeaway: "The $8,400 tax deduction is disallowed on the current tax return, but is preserved by elevating the replacement shares' cost basis from $67.50 to $95.50, deferring the tax shield."
      },
      benchmarkTable: {
        title: "Wash Sale Rule Scenarios & Cost Basis Adjustments",
        headers: ["Disposed Lot vs Replacement Lot", "Realized Capital Loss", "Wash Sale Status", "Disallowed Tax Loss", "Cost Basis Outcome"],
        rows: [
          ["Sell 100 shares, Re-buy 100 (Full)", "$3,000 realized loss", "Full Wash Sale (100% trigger)", "$3,000 deduction disallowed", "Basis adjusted up by +$30.00/share"],
          ["Sell 100 shares, Re-buy 50 (Partial)", "$3,000 realized loss", "Partial Wash Sale (50% trigger)", "$1,500 disallowed; $1,500 allowed", "50 shares basis adjusted by +$30/sh"],
          ["Sell 100 shares, Re-buy on Day 31", "$3,000 realized loss", "Fully Compliant (No wash sale)", "$0 disallowed; $3,000 allowed", "Fresh basis at new purchase price"],
          ["Sell in Taxable, Buy in Roth IRA", "$3,000 realized loss", "Severe Permanent Wash Sale", "$3,000 permanently erased!", "Loss cannot be added to IRA basis!"],
          ["Sell Stock, Buy Put Option", "$3,000 realized loss", "Wash Sale (Substantially identical)", "$3,000 deduction disallowed", "Loss added to option premium basis"]
        ]
      },
      optimizationLevers: [
        {
          title: "Substitute Correlated Non-Identical ETFs to Maintain Market Exposure Safely",
          actionableAdvice: "To harvest tax losses without sitting in cash for 31 days, sell your losing asset and immediately purchase a correlated but non-substantially identical instrument. For example, harvest losses in Vanguard S&P 500 (VOO) and instantly purchase Vanguard Large-Cap (VV) or Schwab US Large-Cap (SCHX)."
        },
        {
          title: "Never Trigger a Wash Sale Across Taxable and IRA Accounts",
          actionableAdvice: "Under IRS Revenue Ruling 2008-5, selling a security at a loss in a taxable account and repurchasing it within 30 days inside an IRA triggers a catastrophic wash sale: the loss is disallowed, but CANNOT be added to the IRA basis, permanently destroying the tax deduction forever."
        },
        {
          title: "Wait 31 Full Calendar Days Before Re-Acquiring Disposed Tickers",
          actionableAdvice: "The wash sale window spans 61 continuous days: 30 days before, the day of sale, and 30 full days after. Mark your calendar carefully: if you sell on June 1st, do not execute a repurchase order until July 3rd (Day 32) to ensure the loss is 100% deductible on Form 8949."
        },
        {
          title: "Audit Mutual Fund and Dividend Reinvestment (DRIP) Automated Buys",
          actionableAdvice: "Automated monthly DRIP purchases can inadvertently trigger partial wash sales if an automated dividend reinvestment buys shares within 30 days of a tax-loss harvesting sale. Temporarily disable automatic dividend reinvestment for that specific ticker during harvesting windows."
        }
      ],
      faqs: [
        {
          question: "What is the exact 61-day calendar window for the IRS Wash Sale Rule?",
          answer: "The wash sale window encompasses a total of 61 calendar days: the 30 calendar days immediately preceding the sale date, the exact date of the sale itself, and the 30 calendar days immediately following the sale date. Acquiring substantially identical stock or options anytime within this window triggers the rule."
        },
        {
          question: "Is a disallowed wash sale loss permanently lost for tax purposes?",
          answer: "No, in standard taxable accounts the loss is not permanently lost; it is deferred. Under IRC Section 1091, the disallowed dollar loss is added directly to the cost basis of the replacement shares. This elevates your cost basis, which will reduce your future taxable capital gain (or expand your capital loss) when you eventually sell the replacement shares."
        },
        {
          question: "What constitutes 'substantially identical' securities under IRS guidelines?",
          answer: "Common stock of the same corporation, voting vs non-voting shares of the same company, and call options on the stock are considered substantially identical. However, stocks in competing companies in the same industry (e.g., selling Ford to buy GM) or index funds tracking different benchmarks (e.g., S&P 500 vs Total Stock Market) are not substantially identical."
        },
        {
          question: "Can selling cryptocurrency trigger the IRS Wash Sale Rule?",
          answer: "Historically, the wash sale rule applied only to securities and commodities under IRC Section 1091. Because the IRS classifies cryptocurrency as property, crypto transactions have enjoyed exemption from the wash sale rule. However, traders should monitor ongoing federal legislation, as proposals repeatedly seek to extend the wash sale rule to digital assets."
        },
        {
          question: "How does the holding period transfer in a wash sale adjustment?",
          answer: "When a wash sale occurs, the holding period of the original disposed shares is added to the holding period of the replacement shares. For example, if you held the original stock for 8 months before selling at a loss, your new replacement shares immediately start with 8 months of holding time, accelerating the path to long-term status."
        }
      ]
    },
    relatedSlugs: [
      "capital-gains-tax-calculator",
      "stock-average-cost-calculator",
      "options-profit-calculator",
      "rsu-vesting-tax-calculator"
    ]
  },
  {
    slug: "roth-ira-conversion-calculator",
    title: "Traditional to Roth IRA Conversion Tax & Break-Even Rate Calculator",
    metaTitle: "Roth IRA Conversion Calculator 2026 | Tax Break-Even",
    metaDescription: "Compare upfront conversion taxes against decades of tax-free Roth compound growth. Audit marginal tax brackets and break-even retirement rates instantly.",
    category: "wealth-investing",
    engineType: "platform-vs-platform",
    lastUpdated: "November 2026",
    officialSourceName: "IRS Publication 590-A: Contributions to Individual Retirement Arrangements",
    officialSourceUrl: "https://www.irs.gov/publications/p590a",
    defaultInputs: {
      iraConversionSum: 75000,
      currentMarginalTaxRatePercent: 24.0,
      compoundingHorizonYears: 25,
      annualPortfolioReturnPercent: 7.2,
      projectedRetirementMarginalRatePercent: 18.0
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        rmdStartingAge: 75,
        fiveYearRothAgingRuleYears: 5,
        standardFederalTopBracket: 37.0
      }
    },
    guideContent: {
      executiveSummary: "Converting pre-tax retirement capital from a Traditional IRA (or rollover 401(k)) into an after-tax Roth IRA is one of the most powerful tax arbitrage strategies in wealth management. A Roth conversion requires paying ordinary income tax on the converted sum in the tax year of execution. In exchange, the converted capital is permanently sheltered from all future federal and state income taxes: all future capital gains, dividend yields, and retirement withdrawals are 100% tax-free. Furthermore, Roth IRAs are completely exempt from IRS Required Minimum Distributions (RMDs) during the owner's lifetime, allowing capital to compound untouched for generations. The core mathematical decision hinges on tax rate arbitrage: if an investor converts while in a lower marginal tax bracket today (e.g., during a career transition, early retirement sabbatical, or business loss year) than their expected retirement withdrawal bracket, the conversion delivers substantial wealth expansion. This calculator models upfront conversion tax costs, break-even retirement tax hurdles, multi-decade compounding trajectories, and terminal after-tax wealth comparisons.",
      formulaBreakdown: {
        formulaString: "Upfront Conversion Tax = Converted Sum * Current Marginal Tax Rate %; Roth Future Value = Converted Sum * (1 + Return %)^Years; Traditional Future Value Pre-Tax = Converted Sum * (1 + Return %)^Years; Traditional After-Tax Value = Traditional FV * (1 - Retirement Tax Rate %); Outside Cash Compounded = Upfront Tax * (1 + Return % * (1 - Capital Gains %))^Years; Net Roth Wealth Advantage = Roth FV - (Traditional After-Tax Value + Outside Cash Compounded)",
        variables: [
          {
            symbol: "Conversion Principal (P_convert)",
            meaning: "Total pre-tax dollar sum transferred from the Traditional IRA into the destination Roth IRA."
          },
          {
            symbol: "Current Marginal Tax Rate (T_current)",
            meaning: "Top federal plus state marginal income tax bracket applied to the taxable conversion sum in the execution year."
          },
          {
            symbol: "Retirement Marginal Tax Rate (T_retire)",
            meaning: "Projected effective marginal tax rate anticipated during future retirement distributions and RMD withdrawals."
          },
          {
            symbol: "Compounding Duration (T_years)",
            meaning: "Total elapsed time in years between conversion execution date and ultimate retirement withdrawal liquidation."
          },
          {
            symbol: "Net After-Tax Wealth Advantage (Delta_wealth)",
            meaning: "The net dollar advantage in spendable retirement wealth generated by executing the Roth conversion."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "$75,000 Conversion at 24% Current Marginal Tax vs 18% Projected Retirement Tax over 25 Years at 7.2% Return",
        narrative: "A 40-year-old saver converts $75,000 from a Traditional IRA into a Roth IRA. The saver is currently in the 24% federal tax bracket and pays the $18,000 conversion tax out of separate taxable cash reserves. The portfolio compounds at 7.2% annually for 25 years until retirement at age 65. The saver evaluates this against leaving funds in the Traditional IRA with a projected 18% retirement tax rate.",
        stepByStepMath: [
          "Step 1: Compute Upfront Tax Due on Conversion: $75,000.00 converted * 24.0% current marginal rate = $18,000.00 cash tax liability paid from outside savings.",
          "Step 2: Project Roth IRA Compounding over 25 Years: $75,000.00 * (1 + 0.072)^25 = $75,000 * 5.6925 = $426,938.48 100% tax-free Roth balance.",
          "Step 3: Project Traditional IRA Growth over 25 Years: $75,000.00 * (1 + 0.072)^25 = $426,938.48 pre-tax Traditional IRA balance.",
          "Step 4: Compute After-Tax Traditional IRA Value at 18% Retirement Tax: $426,938.48 * (1 - 0.18 retirement tax) = $350,089.55 net spendable retirement cash.",
          "Step 5: Account for Opportunity Cost of Outside Tax Cash: If the $18,000 tax paid remained in a taxable account earning 7.2% with a 15% annual tax drag (6.12% net), it would grow to $18,000 * (1 + 0.0612)^25 = $79,521.80.",
          "Step 6: Determine Net Wealth Differential: Total Traditional + Cash scenario = $350,089.55 + $79,521.80 = $429,611.35. Roth total = $426,938.48. Because current tax (24%) exceeded retirement tax (18%), the conversion had a slight -$2,672 disadvantage unless future tax brackets rise."
        ],
        finalTakeaway: "Because the saver's current tax rate (24%) exceeded their projected retirement rate (18%), the conversion was mathematically neutral; however, if tax brackets increase past 24% or RMDs elevate retirement brackets, the Roth becomes decisively superior."
      },
      benchmarkTable: {
        title: "Roth Conversion Tax Arbitrage Matrix (25-Year Horizon)",
        headers: ["Current Tax Bracket", "Projected Retirement Tax", "Tax Arbitrage Outcome", "RMD Impact", "Strategic Recommendation"],
        rows: [
          ["12% Bracket Today", "22% Bracket in Retirement", "+10.0% Positive Arbitrage", "Eliminates high future RMDs", "Aggressively convert to the top of 12%"],
          ["22% Bracket Today", "24% Bracket in Retirement", "+2.0% Positive Arbitrage", "Prevents Social Security taxation", "Convert systematically in tranches"],
          ["24% Bracket Today", "24% Equal Bracket", "0.0% Pure Parity", "Roth wins if paid from outside cash", "Convert if outside cash is available"],
          ["32% Bracket Today", "22% Bracket in Retirement", "-10.0% Negative Arbitrage", "Inefficient tax prepayment", "Keep in Traditional; convert in low years"],
          ["37% Top Bracket Today", "28% Bracket in Retirement", "-9.0% Negative Arbitrage", "Severe prepayment penalty", "Avoid converting; maximize pre-tax deferral"]
        ]
      },
      optimizationLevers: [
        {
          title: "Pay Conversion Taxes Exclusively from Outside Non-Retirement Cash",
          actionableAdvice: "Never allow taxes to be withheld directly from the IRA conversion sum. If $10,000 of taxes are withheld from a $50,000 conversion, only $40,000 reaches the Roth, and the $10,000 withheld is treated as an early distribution subject to a 10% penalty if under age 59½."
        },
        {
          title: "Execute Multi-Year Bracket-Topping Conversions Up to Bracket Ceilings",
          actionableAdvice: "Rather than converting a massive lump-sum that pushes your income into higher 32% or 35% tax brackets, convert in controlled annual tranches. Convert just enough each December to fill the remainder of your current 12%, 22%, or 24% bracket without spilling into higher tiers."
        },
        {
          title: "Convert During Sabbaticals, Career Breaks, or Business Downturn Years",
          actionableAdvice: "Opportunistically target low-income years—such as early retirement windows between stopping work and claiming Social Security at age 70. Converting when ordinary income is minimal allows you to convert at the rock-bottom 10% and 12% federal tax brackets."
        },
        {
          title: "Satisfy the 5-Year Aging Rule to Ensure Penalty-Free Principal Withdrawals",
          actionableAdvice: "Each converted amount is subject to its own 5-year holding period under IRS rules if you are under age 59½. Withdrawing converted principal before 5 years elapse triggers a 10% early withdrawal penalty. Maintain detailed records of conversion dates and amounts."
        }
      ],
      faqs: [
        {
          question: "Can I undo or reverse a Roth IRA conversion if market prices fall?",
          answer: "No. Under the Tax Cuts and Jobs Act (TCJA), the ability to 'recharacterize' or undo a Roth IRA conversion was permanently eliminated. Once an IRA conversion is executed, it is irrevocable, and the taxable income must be recognized on your federal tax return for that year."
        },
        {
          question: "What is the 5-Year Rule for Roth IRA conversions?",
          answer: "Under IRS Publication 590-B, each separate Roth conversion has its own 5-year waiting period for penalty-free withdrawal of the converted principal if you are under age 59½. If you withdraw converted funds before 5 tax years have elapsed, you are subject to a 10% early distribution penalty on the converted amount."
        },
        {
          question: "Do Roth IRAs have Required Minimum Distributions (RMDs)?",
          answer: "No. Original owners of Roth IRAs are completely exempt from Required Minimum Distributions (RMDs) throughout their entire lifetime. Unlike Traditional IRAs which mandate withdrawals starting at age 73 or 75, Roth IRAs can remain 100% invested and compound tax-free indefinitely."
        },
        {
          question: "How does a Roth conversion affect Medicare Part B and D premiums (IRMAA)?",
          answer: "Because a Roth conversion adds directly to your Adjusted Gross Income (AGI), a large conversion can trigger Income-Related Monthly Adjustment Amount (IRMAA) surcharges two years later. This substantially increases Medicare Part B and Part D monthly premiums for higher-income seniors."
        },
        {
          question: "What is a 'Backdoor Roth IRA' and is it affected by the pro-rata rule?",
          answer: "A Backdoor Roth is a two-step strategy where high earners make a non-deductible contribution to a Traditional IRA and immediately convert it to a Roth. However, under the IRS Pro-Rata Rule, if you hold other pre-tax IRA balances, the conversion is taxed proportionally across all your IRA assets."
        }
      ]
    },
    relatedSlugs: [
      "capital-gains-tax-calculator",
      "dividend-reinvestment-drip-calculator",
      "self-employment-tax-calculator",
      "rental-property-roi-calculator"
    ]
  }
];
