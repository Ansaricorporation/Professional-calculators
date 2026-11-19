// Group B: Crypto & Web3 Finance (5 Calculators)
export const groupB = [
  {
    slug: "crypto-dca-calculator",
    title: "Crypto Dollar Cost Averaging (DCA) ROI & Average Entry Calculator",
    metaTitle: "Crypto DCA Calculator 2026 | Dollar Cost Average ROI",
    metaDescription: "Model recurring crypto dollar-cost averaging: compare fixed periodic BTC/ETH buys against lump-sum entry, exchange fees, and net ROI returns instantly.",
    category: "wealth-investing",
    engineType: "markup-margin",
    lastUpdated: "November 2026",
    officialSourceName: "Coinbase Pro & Kraken Institutional Tiered Spot Fee Schedules",
    officialSourceUrl: "https://www.kraken.com/features/fee-schedule",
    defaultInputs: {
      periodicInvestmentUsd: 250,
      contributionFrequency: "weekly",
      accumulationMonths: 36,
      exchangeFeeRatePercent: 0.45,
      currentMarketPrice: 62500
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        networkGasFeeEstimateUsd: 2.50,
        standardTakerFeePercent: 0.45,
        coldStorageWithdrawalFeeUsd: 1.20
      }
    },
    guideContent: {
      executiveSummary: "Dollar-Cost Averaging (DCA) into cryptocurrency assets is the premier risk-mitigation framework for managing the extreme volatility of digital asset markets. By committing a fixed fiat dollar allocation at systematic recurring intervals—such as $250 every week—an investor mathematically bypasses the cognitive hazards of market timing and emotional capitulation during severe cyclical drawdowns. Because a fixed fiat allocation automatically acquires more digital tokens when spot prices crash and fewer units when markets become frothy, the volume-weighted average acquisition price is consistently compressed below the arithmetic mean price of the asset over the accumulation timeframe. When combined with long-term macroeconomic adoption curves, systematic DCA transforms multi-year bear market consolidations into powerful wealth-building accumulation phases. This calculator computes total satoshi or token accumulation, volume-weighted blended cost basis, net cash outlays, exchange taker fee drag, and terminal return on investment across customizable historical and projected market cycles.",
      formulaBreakdown: {
        formulaString: "Total Capital Invested = Periodic Fiat Sum * Total Execution Intervals; Tokens Acquired_i = (Periodic Sum * (1 - Exchange Fee %)) / Spot Price_i; Cumulative Tokens = Sum of Tokens Acquired_i; Blended Average Cost = Total Capital Invested / Cumulative Tokens; Portfolio Valuation = Cumulative Tokens * Current Spot Price; Net ROI % = ((Portfolio Valuation - Total Capital) / Total Capital) * 100",
        variables: [
          {
            symbol: "Periodic Fiat Allocation (F_period)",
            meaning: "Fixed dollar or fiat currency denomination deployed into the target cryptocurrency at each scheduled interval."
          },
          {
            symbol: "Execution Frequency (N_intervals)",
            meaning: "Total count of automated recurring purchases completed across the designated investment horizon (e.g., 156 weekly buys in 3 years)."
          },
          {
            symbol: "Exchange Taker Fee (%_fee)",
            meaning: "Percentage commission deducted by the spot cryptocurrency exchange on recurring market order executions."
          },
          {
            symbol: "Blended Satoshi Cost Basis (P_avg)",
            meaning: "Effective volume-weighted average price paid per complete coin or token across all market cycles."
          },
          {
            symbol: "Net Portfolio Return (ROI_net)",
            meaning: "Percentage capital growth achieved on cumulative fiat cash deployed, factoring exchange trading fees."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "36-Month Weekly Bitcoin DCA: $250.00 Weekly Contribution ($39,000 Total Capital Deployed)",
        narrative: "A digital asset allocator initiates an automated recurring weekly buy of $250.00 in Bitcoin across a 36-month period (156 weeks). The investor pays an institutional exchange taker fee of 0.45%. Over the cycle, Bitcoin fluctuates between cyclical lows of $26,000 and bull market peaks of $73,000, establishing an average purchase price of $41,200. The current spot price at evaluation is $62,500.",
        stepByStepMath: [
          "Step 1: Compute Total Fiat Capital Deployed: 156 weekly buys * $250.00 per execution = $39,000.00 total gross cash invested.",
          "Step 2: Factor Spot Exchange Taker Fees: $39,000.00 total capital * 0.45% exchange fee = $175.50 cumulative commission drag (Net deployed into BTC: $38,824.50).",
          "Step 3: Calculate Cumulative Token Accumulation: Across varying price regimes, the volume-weighted purchases accumulate exactly 0.94234 Bitcoin (BTC).",
          "Step 4: Determine Effective Blended Cost Basis: $39,000.00 total fiat invested / 0.94234 BTC = $41,386.34 blended cost basis per whole Bitcoin.",
          "Step 5: Compute Current Portfolio Valuation at $62,500 Spot: 0.94234 BTC * $62,500.00 current market price = $58,896.25 total portfolio asset value.",
          "Step 6: Calculate Net Dollar Profit and ROI: $58,896.25 valuation - $39,000.00 invested capital = $19,896.25 net cash gain. Net ROI = ($19,896.25 / $39,000.00) * 100 = 51.02% total return."
        ],
        finalTakeaway: "By systematically averaging across the 3-year cycle, the investor accumulated 0.942 BTC at a $41,386 blended basis, generating a 51.02% net gain ($19,896 profit) with zero market timing stress."
      },
      benchmarkTable: {
        title: "Crypto DCA Frequency vs Lump-Sum Performance Comparisons",
        headers: ["Accumulation Strategy", "Execution Interval", "Volatility Drag Exposure", "Average Cost Compression", "Typical 3-Year Cycle ROI"],
        rows: [
          ["Daily Micro-DCA", "Every 24 hours ($35/day)", "Ultra-Low: Maximum smoothing", "Optimal: Captures flash crashes", "+48% to +65% net return"],
          ["Weekly Standard DCA", "Every Monday ($250/wk)", "Low: Highly practical cadence", "Superior: Balanced fee efficiency", "+45% to +62% net return"],
          ["Bi-Weekly Paycheck DCA", "Every 14 days ($500/bi-wk)", "Moderate: Matches payroll cycle", "Strong: Reliable basis reduction", "+42% to +58% net return"],
          ["Monthly Lump-Sum", "1st of month ($1,000/mo)", "Moderate-High: Timing sensitivity", "Good: Low transaction friction", "+38% to +52% net return"],
          ["Single All-In Lump Sum", "Day 1 ($36,000 100% buy)", "Extreme: High drawdown risk", "None: Locked at single entry price", "-30% to +120% (High variance)"]
        ]
      },
      optimizationLevers: [
        {
          title: "Utilize Advanced Limit Orders or Maker APIs to Reduce Taker Fees",
          actionableAdvice: "Standard retail recurring-buy features on apps like Coinbase often charge exorbitant convenience fees of 1.5% to 3.0%. Instead, use automated limit order bots connected via API to Kraken Pro or Coinbase Advanced Trade to pay low maker fees (0.15% to 0.25%), saving thousands over multi-year horizons."
        },
        {
          title: "Implement 'Dynamic Value DCA' by Scaling Buys During 200-Week MA Dips",
          actionableAdvice: "While static DCA invests identical sums, Dynamic DCA doubles your allocation (e.g., $500 instead of $250) when the asset drops below its historical 200-week simple moving average or MVRV Z-score support, drastically accelerating cost basis compression during generational accumulation windows."
        },
        {
          title: "Sweep Accumulated Balances to Non-Custodial Hardware Cold Storage Periodically",
          actionableAdvice: "Never leave large multi-year DCA accumulations on centralized exchanges subject to counterparty insolvency or regulatory freezes. Establish a routine rule: once accumulated exchange balances reach $2,000 or 0.05 BTC, initiate an on-chain withdrawal to a self-custodied hardware wallet."
        },
        {
          title: "Track Discrete Tax Lots via Spec ID to Optimize Capital Gains Harvesting",
          actionableAdvice: "Cryptocurrency is treated as property by the IRS. Using automated portfolio tracking software to log every individual DCA purchase lot allows you to utilize HIFO (Highest-In, First-Out) or Specific Identification when taking profits, significantly minimizing realized taxable capital gains."
        }
      ],
      faqs: [
        {
          question: "Why does DCA mathematically outperform lump-sum investing in volatile crypto markets?",
          answer: "While lump-sum investing theoretically outperforms in continuously appreciating equity markets, crypto assets endure 70% to 85% multi-year drawdown cycles. A lump-sum investor entering near a market peak may face years of underwater equity, whereas a DCA strategy acquires exponentially more tokens during bottoms, drastically lowering the break-even threshold."
        },
        {
          question: "How do transaction fees and network gas impact small recurring crypto purchases?",
          answer: "Executing frequent micro-purchases (e.g., $10 daily) on standard retail brokerages can generate devastating fee drag if flat transaction fees apply (e.g., $0.99 minimum per trade equals a 9.9% fee). Additionally, withdrawing small balances to self-custody triggers on-chain network gas fees that can consume a substantial percentage of small holdings."
        },
        {
          question: "How does the IRS tax cryptocurrency accumulated through a DCA strategy?",
          answer: "Under IRS Notice 2014-21, purchasing cryptocurrency with fiat currency is not a taxable event. However, every DCA purchase establishes a separate, discrete tax lot with its own cost basis and acquisition date. A taxable event occurs only when you dispose of, sell, trade for another token, or spend the crypto."
        },
        {
          question: "What is the optimal purchase frequency for a Bitcoin or Ethereum DCA strategy?",
          answer: "Backtested data across multiple 4-year halving cycles indicates that weekly and bi-weekly DCA schedules offer the optimal balance between cost-basis volatility smoothing and operational fee efficiency. Daily purchases provide marginal additional volatility dampening but complicate tax reporting records."
        },
        {
          question: "Can I automate a crypto DCA strategy without custodial exchange risk?",
          answer: "Yes. Advanced Web3 protocols and non-custodial automated services allow users to dollar-cost average directly from decentralized smart contracts or bank transfers into non-custodial multi-signature vaults or hardware wallets, eliminating third-party exchange counterparty bankruptcy risks."
        }
      ]
    },
    relatedSlugs: [
      "stock-average-cost-calculator",
      "staking-apy-compound-calculator",
      "crypto-mining-profitability-calculator",
      "impermanent-loss-calculator"
    ]
  },
  {
    slug: "impermanent-loss-calculator",
    title: "DeFi Liquidity Pool Impermanent Loss Calculator (Uniswap 50/50 AMM)",
    metaTitle: "Impermanent Loss Calculator 2026 | DeFi AMM Staking Math",
    metaDescription: "Calculate AMM 50/50 liquidity pool impermanent loss: model token price divergence (2x, 3x, 5x) vs swap fee APY returns. Audit DeFi LP yields instantly.",
    category: "wealth-investing",
    engineType: "platform-vs-platform",
    lastUpdated: "November 2026",
    officialSourceName: "Uniswap v2 & v3 Automated Market Maker Whitepaper",
    officialSourceUrl: "https://uniswap.org/whitepaper-v3.pdf",
    defaultInputs: {
      initialPoolDepositUsd: 15000,
      tokenAPriceRatioChange: 2.25,
      tokenBPriceRatioChange: 1.0,
      annualizedFeeApyPercent: 24.5,
      liquidityDurationDays: 180
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        uniswapStandardFeeTierPercent: 0.30,
        constantProductFormula: "x * y = k",
        poolWeightingRatio: "50/50"
      }
    },
    guideContent: {
      executiveSummary: "Providing liquidity to Decentralized Finance (DeFi) Automated Market Makers (AMMs) like Uniswap, SushiSwap, or Curve allows crypto asset holders to earn passive yield generated from trading swap fees. However, this yield is continuously offset by Impermanent Loss (IL)—one of the most complex mathematical dynamics in Web3 finance. In a standard 50/50 constant-product AMM (`x * y = k`), the pool algorithm automatically rebalances reserves as market prices fluctuate, selling the appreciating asset for the depreciating asset to maintain equal value parity. When the relative price ratio between the two deposited tokens diverges from the entry point, the net dollar value of the liquidity pool holding drops below the value of simply holding ('HODLing') the original tokens in an offline wallet. The loss is termed 'impermanent' because if token prices retrace to their exact entry ratio, the loss vanishes; however, withdrawing liquidity locks this divergence into a permanent capital loss. This calculator computes exact impermanent loss percentages, comparative HODL values, net fee yields, and net profitability hurdles.",
      formulaBreakdown: {
        formulaString: "Price Ratio Change (k) = (PriceA_new / PriceA_old) / (PriceB_new / PriceB_old); Impermanent Loss % = (2 * sqrt(k) / (1 + k)) - 1; Pool Value = HODL Value * (1 + IL %); Fee Yield Earned = Initial Deposit * (Fee APY % * (Days / 365)); Net Profit/Loss = (Pool Value + Fee Yield) - HODL Value",
        variables: [
          {
            symbol: "Price Ratio Divergence (k)",
            meaning: "Relative price change multiplier of Token A versus Token B from initial pool deposit to current evaluation."
          },
          {
            symbol: "Impermanent Loss Percentage (IL%)",
            meaning: "Theoretical percentage deficit incurred by the AMM holding relative to an un-staked static wallet holding."
          },
          {
            symbol: "Static HODL Valuation (V_hodl)",
            meaning: "Current aggregate fiat market value of the initial deposited token quantities if kept untouched in self-custody."
          },
          {
            symbol: "Accrued Swap Fee Yield (Y_fees)",
            meaning: "Gross dollar earnings distributed from protocol liquidity pool swap fees (e.g., 0.30% fee tier) over the staking duration."
          },
          {
            symbol: "Net Yield Differential (Delta_pnl)",
            meaning: "Net economic gain or loss of the LP strategy compared to passive HODLing after reconciling fee revenue against impermanent loss."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "$15,000 ETH/USDC Liquidity Pool Deposit with 2.25x ETH Price Appreciation over 180 Days",
        narrative: "A DeFi liquidity provider deposits $15,000 into a Uniswap 50/50 ETH/USDC pool ($7,500 in ETH and $7,500 in USDC stablecoin) when ETH is trading at $2,000. Over 180 days, ETH rallies 2.25x to $4,500 while USDC remains pegged at $1.00. The pool generates an annualized trading fee yield (APY) of 24.50%.",
        stepByStepMath: [
          "Step 1: Compute Static HODL Benchmark Valuation: 3.75 ETH ($16,875 at $4,500) + 7,500 USDC ($7,500) = $24,375.00 static HODL value.",
          "Step 2: Calculate Relative Price Ratio Divergence: k = 2.25 / 1.0 = 2.25.",
          "Step 3: Derive Exact Impermanent Loss Percentage: IL% = (2 * sqrt(2.25) / (1 + 2.25)) - 1 = (2 * 1.50 / 3.25) - 1 = (3.0 / 3.25) - 1 = 0.92308 - 1 = -7.69% impermanent loss.",
          "Step 4: Calculate Current Liquidity Pool Valuation: $24,375.00 HODL value * (1 - 0.07692) = $22,500.00 current pool asset value.",
          "Step 5: Compute Accrued Swap Fee Earnings over 180 Days: $15,000.00 principal * 24.50% APY * (180 days / 365 days) = $1,812.33 fee revenue earned.",
          "Step 6: Determine Net Economic Performance vs HODL: Total LP package = $22,500 (pool value) + $1,812.33 (fees) = $24,312.33. Net vs HODL = $24,312.33 - $24,375.00 = -$62.67 net deficit (Fee yield was slightly insufficient to overcome the 7.69% divergence loss)."
        ],
        finalTakeaway: "Despite earning $1,812 in fees (24.5% APY), the 2.25x ETH rally created an impermanent loss of $1,875, resulting in a net $62.67 underperformance compared to simply holding ETH in a cold wallet."
      },
      benchmarkTable: {
        title: "Constant-Product AMM (50/50) Impermanent Loss Sensitivity Matrix",
        headers: ["Token Price Ratio Multiplier", "Directional Movement", "Impermanent Loss %", "HODL Value of $10,000", "Pool Value (Before Fees)"],
        rows: [
          ["1.25x (+25% Divergence)", "Moderate appreciation", "-0.60% Impermanent Loss", "$11,250.00", "$11,182.50"],
          ["1.50x (+50% Divergence)", "Substantial expansion", "-2.02% Impermanent Loss", "$12,500.00", "$12,247.50"],
          ["2.00x (+100% Divergence)", "Full doubling of Token A", "-5.72% Impermanent Loss", "$15,000.00", "$14,142.00"],
          ["3.00x (+200% Divergence)", "Strong bull market rally", "-13.40% Impermanent Loss", "$20,000.00", "$17,320.50"],
          ["5.00x (+400% Divergence)", "Parabolic altcoin run", "-25.46% Impermanent Loss", "$30,000.00", "$22,360.70"]
        ]
      },
      optimizationLevers: [
        {
          title: "Provide Liquidity to Correlated Asset Pairs to Eliminate Divergence",
          actionableAdvice: "The most effective method to eliminate impermanent loss is pairing highly correlated assets—such as stablecoin-to-stablecoin pools (USDC/USDT) or liquid staking derivative pairs (stETH/ETH). Because price divergence between correlated pairs rarely exceeds 0.5%, IL is negligible while fee yields compound safely."
        },
        {
          title: "Utilize Concentrated Liquidity Ranges in Uniswap v3 with Strict Range Limits",
          actionableAdvice: "Uniswap v3 allows liquidity providers to concentrate capital within custom price bounds (e.g., ETH between $2,200 and $2,800). This dramatically increases fee generation efficiency (up to 50x-100x), allowing high swap fee revenues to outpace and overcome widening impermanent loss."
        },
        {
          title: "Audit Historical Volume-to-Liquidity (V/L) Ratios Before Depositing",
          actionableAdvice: "A pool offering a 50% APY is unprofitable if the volume is insufficient to generate real fees. Calculate the daily Volume-to-TVL ratio: pools with high turnover (V/TVL > 0.50) generate sufficient fee velocity to consistently compensate for volatile price swings."
        },
        {
          title: "Hedge Delta Exposure via Perpetual Short Contracts on Derivative Exchanges",
          actionableAdvice: "Institutional market makers eliminate directional price risk in volatile AMM pools by opening an equal short position in perpetual futures (e.g., shorting 50% of the pool's ETH exposure). This delta-neutral architecture isolates the high LP fee yield while neutralizing token price swings."
        }
      ],
      faqs: [
        {
          question: "Why is Impermanent Loss called 'impermanent' if it results in actual loss?",
          answer: "It is termed 'impermanent' because the loss exists strictly as an unrealized accounting deficit relative to holding the original tokens outside the pool. If the market prices of the two paired assets return to their original ratio before you remove liquidity, the impermanent loss completely disappears, leaving you with 100% of accrued swap fees."
        },
        {
          question: "When does an impermanent loss become a permanent realized loss?",
          answer: "Impermanent loss becomes permanent and irreversible the moment you initiate a transaction to withdraw your liquidity tokens from the smart contract pool. Upon withdrawal, you receive a rebalanced token basket containing fewer of the appreciated tokens and more of the depreciated tokens."
        },
        {
          question: "How does Uniswap v3 concentrated liquidity affect impermanent loss?",
          answer: "In Uniswap v3, concentrating liquidity within a narrow price range amplifies capital efficiency and fee earnings, but also exponentially accelerates impermanent loss if the price moves toward the boundaries. If the market price breaks completely outside your designated range, your position is 100% converted into the lower-performing asset and stops earning fees."
        },
        {
          question: "Can swap fee earnings fully compensate for severe impermanent loss?",
          answer: "Yes, but only if pool trading volume is sufficiently high relative to total liquidity. If a pool generates a 60% annualized fee yield and the tokens experience a 2x price divergence (which triggers a 5.72% impermanent loss), the fee yield vastly exceeds the divergence cost, resulting in substantial net outperformance versus HODLing."
        },
        {
          question: "Do stablecoin liquidity pools experience impermanent loss?",
          answer: "Under normal market conditions, stablecoin pools (like USDC/USDT or DAI/USDC) experience negligible impermanent loss (typically under 0.05%) because both assets are pegged to $1.00 USD. However, if one stablecoin experiences a systemic depegging event (such as UST in 2022), LPs suffer catastrophic permanent loss as the pool rebalances 100% into the worthless token."
        }
      ]
    },
    relatedSlugs: [
      "crypto-dca-calculator",
      "staking-apy-compound-calculator",
      "crypto-liquidation-price-calculator",
      "crypto-mining-profitability-calculator"
    ]
  },
  {
    slug: "crypto-mining-profitability-calculator",
    title: "ASIC & GPU Crypto Mining Profitability & Electricity kWh Cost Calculator",
    metaTitle: "Crypto Mining Profitability Calculator 2026 | ASIC Tool",
    metaDescription: "Calculate crypto mining profit margins: deduct hardware wattage, electricity $/kWh tariffs, and 1% to 2% mining pool fees. Audit net cash flow instantly.",
    category: "wealth-investing",
    engineType: "platform-profit",
    lastUpdated: "November 2026",
    officialSourceName: "Cambridge Centre for Alternative Finance: Bitcoin Mining Index",
    officialSourceUrl: "https://ccaf.io/cbeci/index",
    defaultInputs: {
      miningHashrateTh: 140,
      powerConsumptionWatts: 3450,
      electricityPricePerKwh: 0.068,
      miningPoolFeePercent: 1.75,
      monthlyGrossRewardUsd: 580
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        networkDifficultyGrowthAnnualPercent: 12.0,
        asicDepreciationYears: 3.0,
        facilityHostingOverheadPerMonthUsd: 15.0
      }
    },
    guideContent: {
      executiveSummary: "Operating specialized Proof-of-Work (PoW) cryptocurrency mining hardware—such as modern Application-Specific Integrated Circuit (ASIC) rigs for SHA-256 (Bitcoin) or high-density GPU clusters—requires rigorous thermodynamic and financial modeling. In commercial cryptocurrency mining, gross coin output is governed entirely by the miner's hashrate relative to global network difficulty and post-halving block subsidy schedules. However, gross revenue is constantly eroded by continuous operational expenses (OpEx), dominated by baseload electrical consumption measured in kilowatt-hours (kWh) and continuous 24/7 cooling loads. An ASIC rig consuming 3,450 watts consumes 82.8 kWh daily; at residential utility rates ($0.16/kWh), power costs alone can exceed gross coin output, plunging operations into immediate cash deficits. To remain profitable, professional miners establish facilities in low-cost energy jurisdictions ($0.03 to $0.07/kWh) and optimize mining pool commission structures. This calculator computes net mining cash flow, operational break-even electricity thresholds, hardware payback horizons, and thermodynamic efficiency metrics.",
      formulaBreakdown: {
        formulaString: "Daily Power Consumption (kWh) = (Watts * 24) / 1000; Monthly Electricity Cost = Daily kWh * 30.416 * Rate per kWh; Net Monthly Revenue = Gross Rewards * (1 - Pool Fee %) - Monthly Electricity - Facility Hosting; Operational Break-Even Rate ($/kWh) = (Gross Rewards * (1 - Pool Fee %)) / (Daily kWh * 30.416); Hardware Payback (Months) = Rig Purchase Price / Net Monthly Revenue",
        variables: [
          {
            symbol: "Mining Hashrate (TH/s)",
            meaning: "Computational hash throughput delivered by the hardware unit per second (e.g., 140 Terahashes/sec on an Antminer S19 Pro)."
          },
          {
            symbol: "Power Consumption (W)",
            meaning: "Continuous electrical wattage drawn from the wall outlet by the mining power supply unit and high-RPM cooling fans."
          },
          {
            symbol: "Utility Tariff ($/kWh)",
            meaning: "Direct electrical rate charged by the municipal or commercial industrial power provider per kilowatt-hour."
          },
          {
            symbol: "Mining Pool Fee (%_pool)",
            meaning: "Commission percentage deducted by collaborative mining pools (e.g., Foundry, Antpool, F2Pool) using FPPS or PPLNS payout schemes."
          },
          {
            symbol: "Net Operational Cash Flow (CF_net)",
            meaning: "Spendable monthly net fiat profit remaining after fully funding electrical utility overhead and pool commissions."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "Commercial Bitcoin ASIC: 140 TH/s Rig Consuming 3,450W at $0.068/kWh with 1.75% Pool Fee",
        narrative: "A cryptocurrency mining operator deploys a 140 TH/s ASIC miner purchased for $2,800. The machine draws 3,450 watts continuously and operates in a hosted industrial facility with a contracted electrical tariff of $0.068 per kWh. The machine generates $580.00 per month in gross Bitcoin block rewards and connects to a pool charging a 1.75% FPPS fee.",
        stepByStepMath: [
          "Step 1: Calculate Daily Kilowatt-Hour Consumption: (3,450 watts * 24 hours) / 1,000 = 82.80 kWh consumed per day.",
          "Step 2: Determine Monthly Power Usage: 82.80 kWh * 30.416 average days per month = 2,518.44 kWh monthly power draw.",
          "Step 3: Compute Monthly Electrical Utility Bill: 2,518.44 kWh * $0.068 per kWh = $171.25 direct power expense per month.",
          "Step 4: Deduct Mining Pool Commission: $580.00 gross rewards * 1.75% pool fee = $10.15 pool deduction (Net reward: $569.85).",
          "Step 5: Compute Net Monthly Operating Profit: $569.85 net rewards - $171.25 electricity bill = $398.60 net monthly cash flow.",
          "Step 6: Calculate Hardware Payback Period: $2,800.00 initial rig cost / $398.60 net monthly profit = 7.02 months capital recovery horizon."
        ],
        finalTakeaway: "At a competitive $0.068/kWh power rate, the 140 TH/s miner generates $398.60 in monthly net profit (68.7% net margin), recovering its $2,800 hardware investment in 7.0 months."
      },
      benchmarkTable: {
        title: "Mining Hardware Efficiency & Electricity Cost Thresholds",
        headers: ["Hardware Class", "Hashrate & Power", "Electricity Tariff", "Monthly Power Expense", "Net Monthly Operating Cash Flow"],
        rows: [
          ["Next-Gen ASIC (Air)", "200 TH/s @ 3,500W", "$0.045/kWh (Hydro industrial)", "$114.97 / month", "+$715.00 net monthly profit"],
          ["Standard ASIC (Air)", "140 TH/s @ 3,450W", "$0.068/kWh (Hosted facility)", "$171.25 / month", "+$398.60 net monthly profit"],
          ["Legacy ASIC (Air)", "100 TH/s @ 3,250W", "$0.085/kWh (Commercial grid)", "$209.68 / month", "+$195.30 net monthly profit"],
          ["Subsidized Green Mining", "140 TH/s @ 3,450W", "$0.025/kWh (Flared gas / Solar)", "$62.96 / month", "+$506.89 net monthly profit"],
          ["Residential Hobbyist", "140 TH/s @ 3,450W", "$0.160/kWh (US residential grid)", "$402.95 / month", "+$166.90 net profit (High risk)"]
        ]
      },
      optimizationLevers: [
        {
          title: "Install Custom Firmware (e.g., Braiins OS+) to Optimize Joules per Terahash",
          actionableAdvice: "Replacing stock manufacturer firmware with auto-tuning dynamic firmware allows per-chip frequency and voltage calibration. This can improve hardware thermodynamic efficiency by 15% to 25%, dropping power consumption from 31 J/TH down to 24 J/TH and vastly improving margins."
        },
        {
          title: "Negotiate Industrial Power Purchase Agreements (PPAs) with Curtailment Credits",
          actionableAdvice: "Commercial mining data centers participate in grid demand-response programs. By agreeing to automatically power down rigs during peak municipal demand spikes (curtailment), operators receive wholesale electricity subsidies that drop baseline power costs to $0.03-$0.04/kWh."
        },
        {
          title: "Implement Hydro or Immersion Cooling to Extend Hardware Lifespan",
          actionableAdvice: "Submerging ASIC rigs in dielectric fluid (immersion cooling) eliminates fan power draw (saving 8% to 12% in parasitic electrical loads), dampens acoustic noise completely, and prevents dust accumulation and thermal fatigue, extending the economic operating life of rigs by 2 to 4 years."
        },
        {
          title: "Utilize Mining Pools with FPPS Payout Models to Eliminate Luck Variance",
          actionableAdvice: "Solo mining carries extreme reward variance where an operator may wait months to mine a block. Connecting to top-tier pools using Full Pay-Per-Share (FPPS) payouts ensures predictable daily cash flow based purely on hash submissions, fully capturing both block subsidies and network transaction fees."
        }
      ],
      faqs: [
        {
          question: "What is the single most critical financial factor in crypto mining profitability?",
          answer: "The price of electricity per kilowatt-hour ($/kWh) is the dominant factor determining mining survival. Because hardware efficiency and global network difficulty are universal across competitors worldwide, miners with power costs above $0.08/kWh become unprofitable during market corrections, while operators with $0.03/kWh power remain cash-flow positive."
        },
        {
          question: "How does the Bitcoin Halving affect mining revenue and hardware payback?",
          answer: "Every 210,000 blocks (roughly every 4 years), the Bitcoin block reward cuts by 50% (dropping from 6.25 BTC to 3.125 BTC in 2024, and 1.5625 BTC in 2028). Unless the fiat spot price of Bitcoin doubles or transaction fee velocity surges, gross mining revenue per Terahash drops by approximately 50% immediately post-halving."
        },
        {
          question: "What is the difference between FPPS and PPLNS mining pool payout models?",
          answer: "FPPS (Full Pay-Per-Share) pays miners a deterministic reward based mathematically on contributed hashrate plus an estimate of transaction fees, eliminating pool block luck variance. PPLNS (Pay-Per-Last-N-Shares) pays only when the pool actually finds a block, introducing short-term variance but offering slightly lower pool fee deductions."
        },
        {
          question: "Can I profitably mine Bitcoin at home using standard residential electricity?",
          answer: "Generally, no. US and European residential electricity rates average $0.14 to $0.30 per kWh, which makes powering energy-intensive 3,000W+ ASIC miners financially unviable. Additionally, commercial ASICs produce extreme industrial heat (equivalent to two space heaters) and deafening acoustic noise (75 to 85 decibels)."
        },
        {
          question: "How does network difficulty adjustment impact projected mining profitability?",
          answer: "Bitcoin network difficulty adjusts automatically every 2,016 blocks (roughly every two weeks) to ensure blocks are minted every 10 minutes. If global hashrate expands as competitors deploy new rigs, difficulty rises, reducing the exact satoshi payout generated per Terahash of hashing power."
        }
      ]
    },
    relatedSlugs: [
      "crypto-dca-calculator",
      "staking-apy-compound-calculator",
      "equipment-financing-vs-cash-calculator",
      "break-even-roas-calculator"
    ]
  },
  {
    slug: "staking-apy-compound-calculator",
    title: "Crypto Staking APY, Validator Commission & Auto-Compounding Calculator",
    metaTitle: "Crypto Staking APY Calculator 2026 | Compound Validator",
    metaDescription: "Calculate Proof-of-Stake rewards: deduct 5% to 10% validator commissions and model daily/weekly auto-compounding yields. Audit net staking APY instantly.",
    category: "wealth-investing",
    engineType: "markup-margin",
    lastUpdated: "November 2026",
    officialSourceName: "Ethereum Foundation PoS Consensus & Validator Specifications",
    officialSourceUrl: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/",
    defaultInputs: {
      stakedPrincipalUsd: 45000,
      nominalNetworkApyPercent: 8.4,
      validatorCommissionRatePercent: 8.0,
      compoundingIntervalsPerYear: 365,
      slashingReserveBufferPercent: 1.0
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        standardValidatorCommissionPercent: 8.0,
        consensusLayerIssuanceRate: 0.038,
        executionLayerPriorityFeeShare: 0.046
      }
    },
    guideContent: {
      executiveSummary: "Proof-of-Stake (PoS) consensus mechanisms have established staking as the foundational yield instrument of Web3 sovereign financial infrastructure. By bonding native cryptographic assets—such as Ethereum (ETH), Solana (SOL), Cosmos (ATOM), or Avalanche (AVAX)—to validate transactions and secure decentralized networks, token holders earn programmatic protocol inflation rewards plus priority execution tips (MEV). However, retail delegators frequently misunderstand the critical mathematical distinction between nominal network Annual Percentage Rate (APR) and real compounding Annual Percentage Yield (APY). Furthermore, node operators and validation services charge institutional commissions ranging from 5% to 15% on gross staking yield, while network token inflation simultaneously dilutes non-staked holdings. By implementing frequent automated re-staking (auto-compounding), delegators trigger exponential growth in token units, optimizing net returns while mitigating slashing risks. This calculator computes effective net APY, validator commission deductions, compounding velocity, and terminal token yields across variable holding horizons.",
      formulaBreakdown: {
        formulaString: "Net APR % = Nominal Network APR % * (1 - Validator Commission %); Effective APY % = ((1 + (Net APR / n))^n - 1) * 100; Terminal Staked Balance = Principal * (1 + (Net APR / n))^(n * t); Gross Rewards Earned = Terminal Balance - Principal; Commission Paid to Validator = Gross Rewards / (1 - Commission %) * Commission %",
        variables: [
          {
            symbol: "Staked Capital Principal (P_stake)",
            meaning: "Gross dollar valuation or native token quantity bonded to network validator smart contracts."
          },
          {
            symbol: "Nominal Network APR (APR_nom)",
            meaning: "Baseline annual protocol yield generated by block production, attestation consensus, and transaction priority tips."
          },
          {
            symbol: "Validator Commission Cut (%_comm)",
            meaning: "Percentage fee deducted directly by the node operator from gross staking distributions before delegator payout."
          },
          {
            symbol: "Compounding Cadence (n)",
            meaning: "Frequency of automated restaking executed per year (e.g., n=365 for daily, n=52 for weekly, n=12 for monthly)."
          },
          {
            symbol: "Effective Net APY (APY_net)",
            meaning: "True compounding annual yield realized by the delegator after accounting for validator commissions and restaking cadence."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "$45,000 Delegated Staking Deployment with 8.40% Network Yield and 8.0% Validator Fee over 3 Years",
        narrative: "An institutional crypto treasury stakes $45,000 worth of native Layer-1 tokens to an audited non-custodial validator node. The network distributes an 8.40% nominal APR. The validator charges an 8.0% performance commission, and rewards are auto-compounded on a daily schedule (n=365) over a 3-year investment horizon.",
        stepByStepMath: [
          "Step 1: Compute Net Annual Percentage Rate (APR): 8.40% nominal network yield * (1 - 0.08 validator fee) = 7.728% net APR after commission.",
          "Step 2: Calculate Effective Annual Percentage Yield (APY) with Daily Compounding: APY = ((1 + (0.07728 / 365))^365 - 1) * 100 = ((1.0002117)^365 - 1) * 100 = 8.034% effective APY.",
          "Step 3: Determine 3-Year Compounding Factor: Total periods = 365 * 3 = 1,095 days. Multiplier = (1 + (0.07728 / 365))^1095 = (1.0002117)^1095 = 1.26084.",
          "Step 4: Compute Terminal Portfolio Balance: $45,000.00 principal * 1.26084 = $56,737.80 terminal portfolio value (in token purchasing power).",
          "Step 5: Calculate Net Rewards Generated: $56,737.80 terminal balance - $45,000.00 initial deposit = $11,737.80 net staking rewards accumulated.",
          "Step 6: Determine Validator Commission Received: Gross reward generated was $11,737.80 / (1 - 0.08) = $12,758.48. Total commission paid to node operator = $1,020.68."
        ],
        finalTakeaway: "Daily auto-compounding elevated the net yield from 7.73% APR to 8.03% APY, generating $11,737.80 in net rewards on a $45,000 stake while funding $1,020 in validator infrastructure fees."
      },
      benchmarkTable: {
        title: "Proof-of-Stake Network Yields & Validator Commission Tiers",
        headers: ["PoS Network Asset", "Nominal Network Yield", "Standard Validator Fee", "Effective Net APY (Daily)", "Slashing / Lockup Profile"],
        rows: [
          ["Ethereum (ETH Native)", "3.80% Consensus + Tips", "8.0% Node operator cut", "3.56% Net APY", "Dynamic exit queue; rare slashing risk"],
          ["Solana (SOL Native)", "7.20% Inflation + Priority", "5.0% Validator cut", "7.10% Net APY", "Warm-up / cool-down epochs (2-3 days)"],
          ["Cosmos Hub (ATOM)", "14.50% Network issuance", "5.0% Standard fee", "14.75% Net APY (High)", "Strict 21-day unbonding lockup period"],
          ["Polkadot (DOT)", "11.80% Inflationary model", "10.0% Public pool fee", "11.20% Net APY", "28-day unbonding period; era payouts"],
          ["Liquid Staking (LSDs)", "4.10% Blended protocol", "10.0% DAO protocol fee", "3.75% Net APY", "Instant secondary market liquidity"]
        ]
      },
      optimizationLevers: [
        {
          title: "Select Distributed Non-Zero-Commission Validators to Prevent Centralization",
          actionableAdvice: "Avoid 0% commission validators that engage in predatory pricing to capture voting power, as they frequently hike fees to 20% unannounced. Select community-aligned validators charging 3% to 5% with high uptime (>99.9%) and active infrastructure redundancy to maximize reliable yield."
        },
        {
          title: "Utilize Liquid Staking Derivatives (LSDs) to Maintain Capital Liquidity",
          actionableAdvice: "Direct native staking locks assets in multi-week unbonding queues (such as 21 days on Cosmos or 28 days on Polkadot). Using liquid staking protocols (like Lido or Marinade) issues liquid receipt tokens (stETH, mSOL) that can be deployed in DeFi while earning underlying staking yield."
        },
        {
          title: "Automate Daily Compounding via Non-Custodial Staking Contracts",
          actionableAdvice: "On chains where rewards must be manually claimed and re-delegated, transaction gas fees can destroy compound interest for smaller accounts. Utilize protocols supporting automated restaking (such as REStake for Cosmos) where validators sponsor gas to restake your rewards daily."
        },
        {
          title: "Monitor Maximum Validator Concentration to Protect Against Slashing Events",
          actionableAdvice: "Delegating to an offline or misconfigured validator can result in inactivity leaks or slashing penalties that destroy a portion of your principal. Diversify your stake across 3 to 5 independent node operators with verified multi-cloud setups and historical slashing-free track records."
        }
      ],
      faqs: [
        {
          question: "What is the difference between Staking APR and Staking APY?",
          answer: "APR (Annual Percentage Rate) reflects the simple, uncompounded interest earned over one year without reinvesting rewards. APY (Annual Percentage Yield) takes compound interest into account, reflecting the total return earned when staking rewards are continuously re-bonded and added to the principal balance."
        },
        {
          question: "How does 'Slashing' work and can I lose my staked principal?",
          answer: "Slashing is a protocol-enforced penalty where a validator's bonded tokens are permanently burned due to malicious behavior, such as double-signing blocks, or extended offline downtime. Delegators who stake with a slashed validator share proportionally in the loss, making validator reliability critical."
        },
        {
          question: "How are crypto staking rewards taxed in the United States?",
          answer: "Under IRS Revenue Ruling 2023-14, cryptocurrency staking rewards are treated as gross taxable income at their fair market value on the exact day and time the taxpayer gains dominion and control over the tokens. When those reward tokens are later sold, a secondary capital gains tax applies."
        },
        {
          question: "What is an unbonding or lockup period in Proof-of-Stake protocols?",
          answer: "An unbonding period is a mandatory waiting timeframe enforced by PoS consensus rules after you request to unstake your tokens. During this window (e.g., 21 days for Cosmos, 7 days for Avalanche), your tokens are completely frozen, cannot be transferred or sold, and do not earn staking rewards."
        },
        {
          question: "Does nominal staking yield protect against underlying token price crashes?",
          answer: "No. Staking yield is denominated in native cryptocurrency tokens, not fiat dollars. If a network pays a 10% staking yield in tokens, but the token's market price declines by 40% against the US Dollar over the year, the investor suffers a substantial net fiat loss despite accumulating 10% more tokens."
        }
      ]
    },
    relatedSlugs: [
      "crypto-dca-calculator",
      "impermanent-loss-calculator",
      "dividend-reinvestment-drip-calculator",
      "crypto-liquidation-price-calculator"
    ]
  },
  {
    slug: "crypto-liquidation-price-calculator",
    title: "Crypto Futures Leverage & Liquidation Price Calculator (Isolated vs. Cross)",
    metaTitle: "Crypto Liquidation Calculator 2026 | Futures Leverage",
    metaDescription: "Calculate crypto perpetual futures liquidation prices: model 5x to 50x leverage, maintenance margins, and taker fees. Audit long and short risk instantly.",
    category: "wealth-investing",
    engineType: "platform-profit",
    lastUpdated: "November 2026",
    officialSourceName: "Binance Futures & Bybit Perpetual Contract Specifications",
    officialSourceUrl: "https://www.binance.com/en/fee/futureFee",
    defaultInputs: {
      entryPricePerUnit: 58000,
      positionType: "long",
      leverageMultiplier: 10,
      collateralDepositedUsd: 10000,
      maintenanceMarginRatePercent: 0.5
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        standardTakerFeePercent: 0.05,
        liquidationClearanceFeePercent: 1.5,
        defaultMaintenanceMarginPercent: 0.5
      }
    },
    guideContent: {
      executiveSummary: "Trading cryptocurrency perpetual futures contracts on centralized exchanges (such as Binance, Bybit, or OKX) or decentralized protocols (like dYdX and GMX) provides capital-efficient exposure through high leverage (ranging from 2x up to 125x). However, leverage operates as a symmetric mathematical amplifier: while a 10x leveraged position doubles initial capital on a 10% favorable move, an adverse 10% market correction completely wipes out account collateral, triggering immediate liquidation. Derivatives engines enforce an automated risk threshold governed by Maintenance Margin Rates (MMR). When an adverse price move pushes remaining position margin below the maintenance requirement, the exchange liquidation engine seizes the position, liquidating collateral into the order book and levying liquidation penalty fees. Crucially, liquidation mechanisms differ significantly between Isolated Margin (where risk is restricted to dedicated collateral) and Cross Margin (where the engine consumes your entire account balance to prevent liquidation). This calculator models precise long and short liquidation price triggers, maintenance margin thresholds, and bankruptcy buffers.",
      formulaBreakdown: {
        formulaString: "Long Liquidation Price = Entry Price * (1 - (1 / Leverage) + Maintenance Margin Rate %); Short Liquidation Price = Entry Price * (1 + (1 / Leverage) - Maintenance Margin Rate %); Position Notional Value = Collateral Deposited * Leverage; Maintenance Margin Required = Position Notional * MMR %; Bankruptcy Price = Entry Price * (1 - (1 / Leverage))",
        variables: [
          {
            symbol: "Entry Execution Price (P_entry)",
            meaning: "Average execution price per contract at which the leveraged long or short position was opened."
          },
          {
            symbol: "Leverage Multiplier (L)",
            meaning: "Leverage factor applied to margin collateral (e.g., 10x multiplier implies a 10% initial margin requirement)."
          },
          {
            symbol: "Maintenance Margin Rate (MMR%)",
            meaning: "Exchange-mandated minimum collateral percentage required to keep the leveraged position active (typically 0.4% to 1.0%)."
          },
          {
            symbol: "Liquidation Trigger Price (P_liq)",
            meaning: "The exact underlying index or mark price that activates the exchange liquidation engine to seize the trade."
          },
          {
            symbol: "Bankruptcy Price (P_bank)",
            meaning: "The theoretical price point where position equity drops to absolute zero, depleting 100% of initial margin."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "10x Long Bitcoin Perpetual Position: $10,000 Collateral ($100,000 Notional) Entered at $58,000 with 0.5% MMR",
        narrative: "A derivatives trader opens an isolated 10x leveraged Long position on Bitcoin perpetual futures at an entry price of $58,000. The trader deposits $10,000 in USDT collateral, controlling a total notional position value of $100,000 (1.7241 BTC). The exchange enforces an institutional 0.50% Maintenance Margin Rate.",
        stepByStepMath: [
          "Step 1: Compute Position Notional Exposure: $10,000.00 collateral * 10x leverage = $100,000.00 total position notional value.",
          "Step 2: Calculate Total Contract Bitcoin Volume: $100,000.00 notional / $58,000.00 entry price = 1.724138 BTC controlled.",
          "Step 3: Determine Initial Margin Percentage: 1 / 10 leverage = 10.0% initial margin buffer.",
          "Step 4: Incorporate Maintenance Margin Rate: Effective allowable loss percentage = Initial margin (10.0%) - Maintenance margin (0.50%) = 9.50% maximum drawdown.",
          "Step 5: Calculate Long Liquidation Trigger Price: $58,000.00 entry price * (1 - 0.095) = $58,000.00 * 0.905 = $52,490.00 liquidation price.",
          "Step 6: Compute Dollar Loss at Liquidation: A drop from $58,000 to $52,490 is a $5,510 drop per BTC. Total loss = 1.724138 BTC * $5,510.00 = $9,500.00 lost margin ($500 remaining collateral seized as liquidation clearance fees)."
        ],
        finalTakeaway: "On 10x leverage, an adverse price drop of only 9.50% (from $58,000 down to $52,490) triggers immediate liquidation, seizing $9,500 in capital and liquidating the contract."
      },
      benchmarkTable: {
        title: "Leverage Multipliers vs Liquidation Distance & Risk Parameters",
        headers: ["Leverage Multiplier", "Initial Margin %", "Drawdown to Liquidation", "Long Liq Price on $50k Entry", "Short Liq Price on $50k Entry"],
        rows: [
          ["2x Leverage", "50.0% Initial Margin", "-49.50% Adverse move", "$25,250 per BTC", "$74,750 per BTC"],
          ["5x Leverage", "20.0% Initial Margin", "-19.50% Adverse move", "$40,250 per BTC", "$59,750 per BTC"],
          ["10x Leverage", "10.0% Initial Margin", "-9.50% Adverse move", "$45,250 per BTC", "$54,750 per BTC"],
          ["20x Leverage", "5.0% Initial Margin", "-4.50% Adverse move", "$47,750 per BTC", "$52,250 per BTC"],
          ["50x Leverage", "2.0% Initial Margin", "-1.50% Adverse move", "$49,250 per BTC", "$50,750 per BTC (Extreme risk)"]
        ]
      },
      optimizationLevers: [
        {
          title: "Utilize Hard Stop-Loss Orders Positioned Well Above the Liquidation Price",
          actionableAdvice: "Never allow the exchange liquidation engine to close your position. Exchange liquidations incur severe penalty fees (often 1.5% to 2.5% of notional value) transferred to the insurance fund. Always place an independent stop-loss order at a 3% to 5% loss limit to exit gracefully and preserve capital."
        },
        {
          title: "Default to Isolated Margin Mode to Protect Total Account Balances",
          actionableAdvice: "Cross Margin mode uses all available cash across your entire account balance to prevent liquidation. In a flash crash or black swan gap, a Cross Margin position can drain your entire account balance to zero. Using Isolated Margin strictly limits your maximum potential loss to the dedicated trade collateral."
        },
        {
          title: "Limit Leverage Multipliers to 3x-5x on Volatile Cryptocurrency Assets",
          actionableAdvice: "Cryptocurrency assets routinely experience normal intra-day price swings of 5% to 8%. Operating at 20x or 50x leverage makes liquidation mathematically inevitable during routine volatility wicks. Capping leverage at 3x to 5x provides a wide 19% to 32% buffer, allowing positions to survive temporary corrections."
        },
        {
          title: "Monitor the 'Mark Price' Rather than the Last Traded Price for Risk Calculations",
          actionableAdvice: "Perpetual futures exchanges trigger liquidations based on the Mark Price (an aggregated index price from multiple spot exchanges) rather than the Last Traded Price on the order book. This prevents predatory market manipulation wicks on a single exchange from triggering false liquidations."
        }
      ],
      faqs: [
        {
          question: "What is the difference between Isolated Margin and Cross Margin?",
          answer: "In Isolated Margin mode, the risk of the position is strictly confined to the specific initial collateral allocated to that trade; if liquidated, your other account funds remain untouched. In Cross Margin mode, all available collateral across your entire account is pooled to support open trades, meaning a cascading liquidation can drain 100% of your account balance."
        },
        {
          question: "Why is the liquidation price higher than the bankruptcy price for a long position?",
          answer: "The bankruptcy price is where position equity is completely exhausted to zero. However, exchanges liquidate positions before reaching bankruptcy (at the Maintenance Margin Price) to ensure the position can be closed in the market without incurring an account deficit that threatens the exchange's solvency."
        },
        {
          question: "What is the 'Mark Price' and why do exchanges use it for liquidations?",
          answer: "The Mark Price is an index price calculated by aggregating real-time spot prices from several major global spot exchanges, adjusted for funding rate baselines. Exchanges use Mark Price rather than the latest local contract trade price to protect traders from localized order book manipulation and flash-crash liquidations."
        },
        {
          question: "What happens to the remaining margin when a position is liquidated?",
          answer: "When a position is liquidated, any remaining collateral between the liquidation price and the bankruptcy price is transferred into the exchange's Insurance Fund. This fund exists to absorb losses if volatile market slippage causes a liquidated position to be closed beyond its bankruptcy price."
        },
        {
          question: "How do perpetual futures funding rates affect liquidation risk?",
          answer: "Perpetual contracts do not expire; instead, longs pay shorts (or vice versa) a periodic Funding Fee (typically every 8 hours) to anchor contract prices to spot. If funding rates are heavily positive (e.g., 0.10% per 8 hours), holding a long position continuously drains collateral margin, slowly bringing your liquidation price closer to spot."
        }
      ]
    },
    relatedSlugs: [
      "short-selling-margin-call-calculator",
      "pattern-day-trader-margin-calculator",
      "options-profit-calculator",
      "impermanent-loss-calculator"
    ]
  }
];
