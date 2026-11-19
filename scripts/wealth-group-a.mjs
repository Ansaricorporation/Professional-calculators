// Group A: Stock Trading & Options (5 Calculators)
export const groupA = [
  {
    slug: "stock-average-cost-calculator",
    title: "Stock Average Cost (Average Down) Calculator & Break-Even Share Price",
    metaTitle: "Stock Average Cost Calculator 2026 | Break-Even Price",
    metaDescription: "Calculate average share cost across buy tranches, blended cost basis, and required rally percentage to break even. Model stock positions instantly.",
    category: "wealth-investing",
    engineType: "markup-margin",
    lastUpdated: "November 2026",
    officialSourceName: "FINRA & SEC Cost Basis Regulations (IRS Publication 550)",
    officialSourceUrl: "https://www.irs.gov/publications/p550",
    defaultInputs: {
      initialShares: 200,
      initialPrice: 65.0,
      secondShares: 300,
      secondPrice: 42.0,
      targetGainPercent: 12.0
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        regulatoryFeePerShare: 0.000166,
        secTransactionFeeRate: 0.0000278,
        standardLotUnits: 100
      }
    },
    guideContent: {
      executiveSummary: "Averaging down in equity markets is one of the most powerful capital allocation tactics used by institutional asset managers and retail swing traders alike, yet executing it without rigorous mathematical modeling exposes portfolios to severe concentration risks. When an equity's market quote declines following an initial acquisition, purchasing secondary tranches at discounted prices compresses the cumulative volume-weighted average price (VWAP) of the entire holding. This reduction dramatically lowers the recovery threshold required to reach break-even liquidity, allowing an investor to exit a distressed position profitably on modest relief rallies rather than waiting for an improbable complete retracement to former all-time highs. However, unhedged averaging down into fundamentally deteriorating companies can cause catastrophic portfolio drawdown. This quantitative calculator computes exact dollar-weighted blended cost bases, total capital outlays, and precise percentage gains necessary to achieve target return hurdles, ensuring systematic position sizing that respects risk limits and IRS lot accounting rules.",
      formulaBreakdown: {
        formulaString: "Blended Average Cost = (Sum of (Shares_i * Price_i)) / Total Shares; Break-Even Rally % = ((Blended Cost - Current Price) / Current Price) * 100; Target Exit Price = Blended Cost * (1 + Target Gain %); Total Invested Capital = Sum of (Shares_i * Price_i) + Brokerage Fees",
        variables: [
          {
            symbol: "Blended Cost Basis (P_avg)",
            meaning: "Volume-weighted average purchase price per individual share across all executed execution tranches."
          },
          {
            symbol: "Cumulative Share Count (N_total)",
            meaning: "Aggregate number of equity units held across the primary entry lot and subsequent secondary accumulative tranches."
          },
          {
            symbol: "Break-Even Price (P_be)",
            meaning: "Exact underlying share price where total liquidated gross proceeds equal aggregate capital expended on purchases."
          },
          {
            symbol: "Required Rally Percentage (%_rally)",
            meaning: "Percentage appreciation from the most recent lower purchase price required for the entire aggregated lot to reach net zero PnL."
          },
          {
            symbol: "Target Profit Threshold (P_target)",
            meaning: "The underlying equity price point necessary to harvest a designated commercial hurdle rate on the complete capital deployment."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "Averaging Down on Tech Equity: 200 Shares at $65.00 Followed by 300 Shares at $42.00",
        narrative: "A growth portfolio manager initiates a position in a mid-cap software enterprise by purchasing 200 shares at $65.00 each for a $13,000 outlay. Following macroeconomic contraction, the stock drops 35.4% to $42.00. Rather than liquidating at a loss, the manager executes a secondary accumulation tranche of 300 shares at $42.00 ($12,600 deployed), seeking to compress the basis and target an overall 12% portfolio profit on the blended holding.",
        stepByStepMath: [
          "Step 1: Compute Initial Capital Outlay: 200 shares * $65.00 initial execution = $13,000.00 invested capital.",
          "Step 2: Compute Secondary Accumulation Outlay: 300 shares * $42.00 lower execution = $12,600.00 capital deployed.",
          "Step 3: Calculate Cumulative Position Metrics: Aggregate shares = 200 + 300 = 500 shares. Total invested outlay = $13,000 + $12,600 = $25,600.00.",
          "Step 4: Derive Blended Volume-Weighted Average Price: $25,600.00 total capital / 500 total shares = $51.20 blended cost basis per share.",
          "Step 5: Calculate Break-Even Relief Rally Requirement: From the $42.00 trough, ($51.20 - $42.00) / $42.00 = $9.20 / $42.00 = 21.90% rally required to break even (compared to 54.76% required from $42.00 back to the original $65.00 entry).",
          "Step 6: Determine 12% Target Profit Exit Price: $51.20 blended cost basis * (1 + 0.12) = $57.34 per share target liquidation price, yielding $3,072.00 in net gross profits."
        ],
        finalTakeaway: "By committing $12,600 at $42.00, the investor collapsed the required recovery threshold from a daunting 54.76% rally to a manageable 21.90% bounce, creating an attainable exit path at $57.34."
      },
      benchmarkTable: {
        title: "Averaging Down Cost Basis Compression & Break-Even Sensitivity",
        headers: ["Accumulation Strategy", "Tranche Ratio (1st : 2nd)", "Blended Cost Basis ($)", "Required Rally to Break Even", "Downside Capital Risk"],
        rows: [
          ["Equal Share Tranches", "100 shares @ $60 : 100 shares @ $40", "$50.00 per share", "+25.0% from $40 trough", "Moderate: 2x capital exposure"],
          ["Aggressive 2x Doubling", "100 shares @ $60 : 200 shares @ $40", "$46.67 per share", "+16.7% from $40 trough", "High: 3x total capital commitment"],
          ["Pyramid 3x Conviction", "100 shares @ $60 : 300 shares @ $40", "$45.00 per share", "+12.5% from $40 trough", "Very High: 4x exposure to single ticker"],
          ["Triple Tranche Scale-In", "100 @ $60 : 100 @ $50 : 200 @ $35", "$45.00 per share", "+28.6% from $35 trough", "High: Staged liquidity deployment"],
          ["Passive Inaction (No Add)", "100 shares @ $60 : 0 shares added", "$60.00 per share", "+50.0% from $40 trough", "Low capital risk, severe time decay"]
        ]
      },
      optimizationLevers: [
        {
          title: "Pre-Calculate Total Portfolio Sizing Ceilings Before Adding Secondary Tranches",
          actionableAdvice: "Never average down impulsively. Establish a strict statutory rule where no single equity ticker may exceed 5% to 8% of overall liquid portfolio value, regardless of how attractive the discounted valuation appears. If your initial buy was 2.5% of assets, your maximum add is capped at 2.5% to 5.5%."
        },
        {
          title: "Utilize Volume-Weighted Support Zones Rather than Arbitrary Percentage Drops",
          actionableAdvice: "Timing secondary entries strictly at round percentage dips (such as every 10% decline) often leads to catching falling knives. Align secondary accumulation orders with high-volume anchored VWAP support levels, historical 200-day moving averages, or major institutional order block demand zones."
        },
        {
          title: "Select Specific Identification Lot Accounting for Tax-Efficient Relief Selling",
          actionableAdvice: "Under IRS rules, brokers default to First-In, First-Out (FIFO) when selling shares. Change your tax election to Specific Identification (Spec ID). When the stock rallies into your blended basis, you can selectively sell the cheaper secondary tranche at short-term capital gains while holding the higher-cost original lot."
        },
        {
          title: "Hedge Downside Exposure via Protective Collar Options During Accumulation",
          actionableAdvice: "When deploying substantial secondary liquidity into a volatile falling equity, finance the purchase of out-of-the-money protective put options by simultaneously selling covered calls against the newly blended share count. This caps upside but eliminates structural wipeout risk if support breaks."
        }
      ],
      faqs: [
        {
          question: "What is the core mathematical benefit of averaging down on a stock?",
          answer: "The primary mathematical benefit of averaging down is the non-linear compression of your break-even threshold. When a stock falls 50% from $100 to $50, an investor who holds without acting requires a 100% gain just to break even. However, by purchasing an identical number of shares at $50, the blended average cost drops to $75, meaning only a 50% rally is required to achieve full capital recovery, significantly accelerating time-to-breakeven."
        },
        {
          question: "How does the IRS calculate capital gains when selling partially averaged positions?",
          answer: "Under IRS Publication 550, unless you specifically instruct your broker prior to trade settlement to use Specific Identification, sales are executed under the default First-In, First-Out (FIFO) method. Under FIFO, your earliest and most expensive shares are deemed sold first, potentially triggering unexpected capital losses or higher tax deductions, whereas Spec ID allows you to choose exactly which cost basis lot to liquidate."
        },
        {
          question: "What is the difference between Dollar-Cost Averaging (DCA) and averaging down?",
          answer: "Dollar-Cost Averaging (DCA) is a disciplined, recurring schedule of investing a fixed dollar sum at predetermined intervals (e.g., $500 on the first of every month) regardless of asset price trends. Averaging down is a discretionary, tactical maneuver executed specifically after an asset has experienced a downward price correction to intentionally reduce the average purchase cost of the holding."
        },
        {
          question: "When does averaging down become financially dangerous for retail traders?",
          answer: "Averaging down becomes catastrophic when applied to speculative assets, unprofitable micro-caps, leveraged exchange-traded products, or companies experiencing fundamental business deterioration such as fraud, technological obsolescence, or impending bankruptcy. In such cases, continued capital injection merely compounds catastrophic losses rather than generating mathematical recovery advantages."
        },
        {
          question: "How does commission and exchange transaction fees affect small averaging tranches?",
          answer: "While major retail brokerages offer zero-commission equity trades on US exchanges, institutional accounts and international brokers still levy regulatory fees (SEC Section 31 fees of $0.0000278 per dollar of sales, FINRA TAF of $0.000166 per share), currency exchange conversion markups, and bid-ask spread slippage. On very small dollar tranches, excessive trading friction can erode the cost-basis compression achieved."
        }
      ]
    },
    relatedSlugs: [
      "options-profit-calculator",
      "pattern-day-trader-margin-calculator",
      "dividend-reinvestment-drip-calculator",
      "capital-gains-tax-calculator"
    ]
  },
  {
    slug: "options-profit-calculator",
    title: "Options Profit Calculator: Call & Put Contract Payoff & Break-Even",
    metaTitle: "Options Profit Calculator 2026 | Call & Put Payoff Math",
    metaDescription: "Calculate option contract payoffs: factor strike prices, premium multipliers (x100), and underlying prices. Model net call and put profits instantly.",
    category: "wealth-investing",
    engineType: "markup-margin",
    lastUpdated: "November 2026",
    officialSourceName: "Options Clearing Corporation (OCC) Contract Specifications",
    officialSourceUrl: "https://www.theocc.com",
    defaultInputs: {
      contractType: "call",
      strikePrice: 110.0,
      premiumPerShare: 4.25,
      contractsCount: 5,
      targetUnderlyingPrice: 128.0
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        sharesPerContract: 100,
        exchangeFeePerContract: 0.65,
        exerciseAssignmentFee: 0.0
      }
    },
    guideContent: {
      executiveSummary: "Option derivatives provide asymmetric leverage and strategic risk containment for equity investors, yet miscalculating intrinsic payoff schedules and extrinsic premium decay remains the primary cause of retail trading losses. Standard equity options represent standardized contracts granting the holder the right—without obligation—to buy (via a Call) or sell (via a Put) 100 shares of underlying stock at a specified Strike Price on or before expiration. Because options trade on per-share premiums, every quote must be multiplied by the standard 100-share multiplier, transforming a seemingly modest $4.25 premium into a $425 capital outlay per contract. To achieve profitability on a long call, the underlying equity must appreciate beyond the strike price by an amount greater than the premium paid, establishing a strict break-even hurdle. This institutional options calculator models terminal payoffs, intrinsic value expansion, maximum loss boundaries, and percentage returns across customized price targets for long calls and long puts.",
      formulaBreakdown: {
        formulaString: "Call Break-Even = Strike Price + Premium Paid; Put Break-Even = Strike Price - Premium Paid; Call Profit = (Max(0, Underlying Price - Strike) - Premium) * Contracts * 100; Put Profit = (Max(0, Strike - Underlying Price) - Premium) * Contracts * 100; Max Loss = Premium Paid * Contracts * 100",
        variables: [
          {
            symbol: "Option Strike Price (K)",
            meaning: "The pre-agreed contractual transaction price at which the underlying equity can be purchased (call) or sold (put)."
          },
          {
            symbol: "Option Premium (C_prem)",
            meaning: "Per-share market price paid to acquire the option contract, consisting of intrinsic value and extrinsic time value."
          },
          {
            symbol: "Contract Multiplier (M)",
            meaning: "Standard deliverable unit per listed equity option contract (fixed at 100 shares per contract under OCC specifications)."
          },
          {
            symbol: "Terminal Underlying Price (S_t)",
            meaning: "The prevailing spot market quote of the underlying stock at position evaluation or contractual expiration."
          },
          {
            symbol: "Net Realized Payoff (Pi_net)",
            meaning: "Net bottom-line dollar return generated after subtracting the initial premium paid and per-contract exchange commissions."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "Long Call Option: 5 Contracts of $110.00 Strike at $4.25 Premium Expiring in 45 Days",
        narrative: "An options trader expects an enterprise software stock currently trading at $104.00 to rally following quarterly earnings. The trader purchases 5 Call contracts with a $110.00 strike price for a premium of $4.25 per share. The underlying stock rallies post-earnings to $128.00 at expiration.",
        stepByStepMath: [
          "Step 1: Compute Total Capital Committed: 5 contracts * 100 shares multiplier * $4.25 premium = $2,125.00 total debit outlay (representing maximum potential loss).",
          "Step 2: Calculate Contract Break-Even Threshold: Strike price ($110.00) + Premium paid ($4.25) = $114.25 break-even underlying price.",
          "Step 3: Determine Gross Intrinsic Value at $128.00 Target: Underlying price ($128.00) - Strike price ($110.00) = $18.00 intrinsic value per share.",
          "Step 4: Compute Total Gross Proceeds: 5 contracts * 100 shares * $18.00 = $9,000.00 gross position liquidation value.",
          "Step 5: Deduct Initial Cost to Derive Net Profit: $9,000.00 gross proceeds - $2,125.00 initial capital cost = $6,875.00 net dollar profit.",
          "Step 6: Calculate Net Return on Investment (ROI): ($6,875.00 net profit / $2,125.00 capital risked) * 100 = 323.53% net return on capital deployed."
        ],
        finalTakeaway: "While the underlying stock appreciated 23.08% from $104.00 to $128.00, the asymmetric leverage of the call contracts generated a 323.53% net cash return on invested capital."
      },
      benchmarkTable: {
        title: "Long Call vs Long Put Payoff & Break-Even Dynamics",
        headers: ["Contract Stance", "Strike & Premium", "Break-Even Price", "Maximum Potential Loss", "Profit Potential Profile"],
        rows: [
          ["Out-of-the-Money Call", "$110 Strike @ $2.50 Prem", "$112.50 (+12.5% to BE)", "$250 per contract", "Unlimited upside beyond $112.50"],
          ["At-the-Money Call", "$100 Strike @ $5.20 Prem", "$105.20 (+5.2% to BE)", "$520 per contract", "Unlimited upside beyond $105.20"],
          ["In-the-Money Call", "$90 Strike @ $12.80 Prem", "$102.80 (+2.8% to BE)", "$1,280 per contract", "High delta (0.80+), unlimited upside"],
          ["At-the-Money Put", "$100 Strike @ $4.80 Prem", "$95.20 (-4.8% to BE)", "$480 per contract", "Substantial downside profit down to $0"],
          ["Out-of-the-Money Put", "$90 Strike @ $2.10 Prem", "$87.90 (-12.1% to BE)", "$210 per contract", "Tail-risk hedge, profit below $87.90"]
        ]
      },
      optimizationLevers: [
        {
          title: "Select Strike Prices with Greater Than 45-60 Days to Expiration (DTE)",
          actionableAdvice: "Extrinsic time decay (Theta) accelerates exponentially inside the final 30 days before expiration. Purchasing options with 45 to 90 days of duration dramatically slows daily theta decay, giving your directional equity thesis sufficient runway to unfold without rapid premium erosion."
        },
        {
          title: "Monitor Implied Volatility (IV) Rank to Avoid Overpaying for Premium",
          actionableAdvice: "Never buy naked options when IV Rank exceeds 70%. When implied volatility collapses following corporate earnings or macroeconomic events (IV Crush), options contract values drop precipitously even if the underlying stock moves in your predicted direction."
        },
        {
          title: "Consider Vertical Debit Spreads to Offset Cost and Lower Break-Even",
          actionableAdvice: "If a long call requires a significant rally to break even, sell a higher-strike call against it (a Bull Call Spread). Selling the out-of-the-money call generates premium that reduces your net cash outlay, limits theta decay, and brings your break-even price much closer to spot."
        },
        {
          title: "Establish Pre-Determined Profit Harvesting Rules at 50% to 100% Gain",
          actionableAdvice: "Options are wasting assets that revert to zero if out of the money at expiration. Formulate mechanical trade management rules: close 50% of your contracts when the position doubles (+100%), which recovers your entire initial capital risk and leaves the remaining lot risk-free."
        }
      ],
      faqs: [
        {
          question: "How do you calculate the exact break-even price for a Call and a Put option?",
          answer: "For a Call option, the break-even price at expiration is calculated as: `Break-Even = Strike Price + Premium Paid per share`. For a Put option, the break-even price is: `Break-Even = Strike Price - Premium Paid per share`. For example, purchasing a $100 strike call for $4.00 requires the underlying equity to trade at $104.00 at expiration to achieve net zero profit after recouping the premium."
        },
        {
          question: "Why do options lose value even when the underlying stock does not move?",
          answer: "Options lose value due to Theta, which measures the rate of extrinsic time value decay. Because options have a fixed expiration date, the probability of the contract finishing in-the-money declines with each passing day. This decay accelerates non-linearly during the last 30 days of the contract's life cycle, eroding market value even if underlying prices remain flat."
        },
        {
          question: "What is the maximum risk when buying long call or put option contracts?",
          answer: "When buying long calls or long puts, your maximum theoretical risk is strictly limited to 100% of the initial premium paid plus broker transaction commissions. Unlike shorting stock or writing uncovered options where risk is theoretically infinite, a long option buyer can never lose more capital than the upfront debit transferred to enter the trade."
        },
        {
          question: "What happens if an option contract expires in-the-money by one cent?",
          answer: "Under Options Clearing Corporation (OCC) rules, any equity option contract that is in-the-money by $0.01 or more at the close of trading on expiration day is automatically exercised on behalf of the holder unless explicit contrary exercise instructions ('Do Not Exercise') are submitted to the clearing broker."
        },
        {
          question: "How does Implied Volatility (IV) crush impact options profitability?",
          answer: "Implied Volatility reflects market expectations of future price swings and is priced into option premiums via the Greek Vega. Prior to high-uncertainty events like quarterly earnings announcements, IV surges, inflating option prices. Once the news is released, IV collapses ('crushes'), causing contract premiums to plummet even if the stock moves favorably."
        }
      ]
    },
    relatedSlugs: [
      "stock-average-cost-calculator",
      "pattern-day-trader-margin-calculator",
      "crypto-liquidation-price-calculator",
      "capital-gains-tax-calculator"
    ]
  },
  {
    slug: "pattern-day-trader-margin-calculator",
    title: "PDT Rule (Pattern Day Trader) $25k Margin Buying Power Calculator",
    metaTitle: "PDT Margin Calculator 2026 | Day Trading Buying Power",
    metaDescription: "Calculate FINRA Pattern Day Trader margin buying power: model 4x intraday leverage, 2x overnight rules, and the $25,000 equity minimum instantly.",
    category: "wealth-investing",
    engineType: "platform-profit",
    lastUpdated: "November 2026",
    officialSourceName: "FINRA Rule 4210 (Margin Requirements & Pattern Day Trader Rule)",
    officialSourceUrl: "https://www.finra.org/rules-guidance/rulebooks/finra-rules/4210",
    defaultInputs: {
      accountTotalEquity: 38500,
      priorDayMarginReq: 12000,
      openPositionsValue: 18000,
      maintenanceMarginPercent: 25.0,
      dayTradesExecuted: 4
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        finraPdtEquityMinimum: 25000,
        intradayBuyingPowerMultiplier: 4.0,
        overnightBuyingPowerMultiplier: 2.0,
        rollingBusinessDaysWindow: 5
      }
    },
    guideContent: {
      executiveSummary: "Operating as an active day trader under United States regulatory oversight requires navigating FINRA Rule 4210 and the statutory Pattern Day Trader (PDT) framework. Under federal regulations, any trader executing four or more day trades within a rolling five-business-day window in a margin account is classified as a Pattern Day Trader. This classification triggers a mandatory requirement to maintain at least $25,000 in net equity at all times. In exchange for satisfying this threshold, brokers extend up to 4x intraday Day Trading Buying Power (DTBP), allowing a trader with $30,000 in equity to control $120,000 in intraday positions. However, holding leveraged positions past market close collapses available leverage to standard 2x Regulation T overnight buying power. Dipping below the $25,000 equity waterline triggers an immediate PDT margin restriction, limiting trading to cash-only liquidations. This institutional margin calculator computes exact intraday and overnight buying power limits, maintenance margin cushion, and equity buffers to safeguard active trading operations.",
      formulaBreakdown: {
        formulaString: "Day Trading Buying Power (DTBP) = 4 * (Prior Day Equity - Prior Day Margin Requirement); Overnight Margin Buying Power = 2 * (Current Equity - Open Position Value * Margin %); Maintenance Equity Cushion = Total Equity - $25,000 Threshold; Minimum Equity Required = Max($25,000, Open Positions * 25%)",
        variables: [
          {
            symbol: "Total Account Equity (E_total)",
            meaning: "Current net liquidation value of cash collateral plus long market value of equities minus short market liability."
          },
          {
            symbol: "Prior Day Margin Requirement (M_prior)",
            meaning: "FINRA maintenance margin obligations carried from the preceding business day's overnight closing positions."
          },
          {
            symbol: "Day Trading Buying Power (DTBP)",
            meaning: "Maximum gross market value of stock that can be opened and closed within a single continuous market trading session (4x excess)."
          },
          {
            symbol: "Overnight Buying Power (Reg T)",
            meaning: "Maximum market value of equity positions permitted to be held overnight past the 4:00 PM EST market close (2x equity)."
          },
          {
            symbol: "PDT Surplus Buffer (B_pdt)",
            meaning: "Dollar cushion remaining in account equity above the statutory $25,000 minimum threshold before restrictions take effect."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "Day Trader Operating with $38,500 Equity and $12,000 Prior Day Margin Obligation",
        narrative: "A full-time equity momentum trader begins the session with $38,500 in total net equity in an interactive broker margin account. Overnight positions generated a prior-day margin requirement of $12,000. During the day, the trader executes 4 round-trip intraday trades on large-cap equities and evaluates purchasing a $100,000 intraday position while managing overnight exposure.",
        stepByStepMath: [
          "Step 1: Check Statutory PDT Equity Compliance: Current equity ($38,500) > $25,000 FINRA minimum threshold. Account holds an active PDT surplus of $13,500.00.",
          "Step 2: Calculate Usable Excess Equity: Prior day equity ($38,500) - Prior day margin obligation ($12,000) = $26,500.00 usable equity.",
          "Step 3: Derive Intraday Day Trading Buying Power (4x): $26,500.00 usable equity * 4.0 leverage multiplier = $106,000.00 maximum intraday buying power.",
          "Step 4: Verify Intraday Position Capacity: The proposed $100,000 position is fully compliant ($100,000 <= $106,000 DTBP), requiring zero specialized day trading margin call.",
          "Step 5: Compute Maximum Permissible Overnight Hold (2x): Total equity ($38,500) * 2.0 Regulation T overnight leverage = $77,000.00 maximum overnight position value.",
          "Step 6: Assess Overnight Transition Risk: If the trader holds the $100,000 position overnight, they exceed overnight buying power ($77,000) by $23,000, triggering an overnight Regulation T federal margin call."
        ],
        finalTakeaway: "The trader can execute up to $106,000 in intraday momentum positions, but must liquidate at least $23,000 before the 4:00 PM closing bell to avoid an overnight federal margin deficit."
      },
      benchmarkTable: {
        title: "FINRA Margin Rules: Account Equity vs Buying Power Tiers",
        headers: ["Account Equity Bracket", "PDT Classification", "Intraday Buying Power", "Overnight Holding Power", "Regulatory Restrictions"],
        rows: [
          ["Under $2,000 Cash", "Cash Account Only", "1.0x (Cash settled only)", "1.0x (No borrowing)", "T+1 settlement rules enforce free-riding bars"],
          ["$2,000 to $24,999 Margin", "Non-PDT Margin", "2.0x intraday power", "2.0x overnight power", "Strict max 3 day trades per 5 rolling days"],
          ["$25,000 to $50,000 Equity", "Active Pattern Day Trader", "4.0x intraday power", "2.0x overnight power", "Unlimited day trades; must stay above $25k"],
          ["$50,000 to $100,000 Equity", "Established Day Trader", "4.0x intraday power", "2.0x overnight power", "Ample buffer against drawdown below $25k"],
          ["$100,000+ Portfolio Margin", "Portfolio Margin Tier", "Up to 6.6x risk-based", "Up to 6.6x risk-based", "TIMS risk-modeling; requires specialized exam"]
        ]
      },
      optimizationLevers: [
        {
          title: "Maintain a $5,000 to $10,000 Equity Cushion Above the $25,000 Baseline",
          actionableAdvice: "Never start trading with exactly $25,000. A single adverse slippage event or normal trading loss of $100 drops equity to $24,900, instantly triggering a PDT margin call and locking trading capability. Target a minimum starting equity base of $30,000 to $35,000 to absorb routine volatility."
        },
        {
          title: "Use Cash Accounts for Smaller Accounts to Avoid PDT Restrictions Entirely",
          actionableAdvice: "If capital is below $25,000, trade via a pure Cash Account rather than a Margin Account. Under T+1 settlement rules active in US equity markets, cash settles on the next business day, allowing you to execute unlimited day trades up to your available settled cash balance each morning."
        },
        {
          title: "Avoid Holding High-Beta Leveraged Intraday Positions Past Market Close",
          actionableAdvice: "Always set an automated script or alarm at 3:45 PM EST to scale down positions that exceed your 2x overnight Regulation T allowance. Overnight margin calls require depositing cash or liquidating assets at fire-sale pre-market prices, creating unnecessary operational stress."
        },
        {
          title: "Request a One-Time PDT Flag Removal if Erroneously Triggered",
          actionableAdvice: "FINRA permits broker-dealers to grant a one-time lifetime waiver to remove an accidental PDT flag from an account if the trader commits in writing not to engage in day trading. Contact your brokerage margin compliance desk immediately if an accidental 4th trade triggers the designation."
        }
      ],
      faqs: [
        {
          question: "What exactly defines a Day Trade under FINRA Rule 4210?",
          answer: "Under FINRA Rule 4210, a day trade is defined as purchasing and subsequently selling—or selling short and subsequently purchasing to cover—the same security within the exact same trading day, including pre-market, regular market, and after-hours sessions. Executing 4 or more day trades within 5 rolling business days triggers the PDT flag."
        },
        {
          question: "What happens if my margin account falls below the $25,000 minimum equity threshold?",
          answer: "If your account is flagged as a Pattern Day Trader and your end-of-day or intraday net equity drops below $25,000, your broker will issue a Day Trading Minimum Equity Call. You will be restricted from executing day trades until you deposit additional cash or marginable securities to restore equity above $25,000."
        },
        {
          question: "How does 4x Day Trading Buying Power work in practice?",
          answer: "Day Trading Buying Power (DTBP) is calculated at the beginning of each trading day as four times your maintenance margin excess (typically 4x of your equity minus overnight margin requirements). This purchasing power is strictly intraday: any securities purchased using 4x leverage must be sold prior to the 4:00 PM EST close."
        },
        {
          question: "Can I trade options freely without triggering the Pattern Day Trader rule?",
          answer: "No. Opening and closing the same options contract (same underlying ticker, expiration, and strike price) within the same calendar day constitutes a day trade. However, options positions themselves require 100% cash premium collateral and cannot be purchased using 4x margin buying power leverage."
        },
        {
          question: "Does the PDT rule apply to cryptocurrency or forex spot trading?",
          answer: "No. FINRA Rule 4210 applies strictly to US-listed equities, exchange-traded funds (ETFs), and options traded in FINRA/SEC-regulated brokerage margin accounts. Spot cryptocurrency markets and retail spot forex operate under different regulatory bodies and do not enforce the $25,000 PDT rule."
        }
      ]
    },
    relatedSlugs: [
      "short-selling-margin-call-calculator",
      "stock-average-cost-calculator",
      "options-profit-calculator",
      "crypto-liquidation-price-calculator"
    ]
  },
  {
    slug: "short-selling-margin-call-calculator",
    title: "Short Selling Margin Call & Maintenance Margin Trigger Price Calculator",
    metaTitle: "Short Selling Margin Call Calculator 2026 | Trigger Math",
    metaDescription: "Calculate short selling margin call trigger prices: model 30% to 40% maintenance margin requirements and borrow fees. Audit short risk instantly.",
    category: "wealth-investing",
    engineType: "platform-profit",
    lastUpdated: "November 2026",
    officialSourceName: "Federal Reserve Regulation T & FINRA Maintenance Margin Standards",
    officialSourceUrl: "https://www.federalreserve.gov/supervisionreg/regt.htm",
    defaultInputs: {
      shortedShares: 400,
      shortSalePrice: 85.0,
      cashCollateralDeposit: 34000,
      maintenanceMarginPercent: 30.0,
      annualBorrowFeeRatePercent: 3.75
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        finraMinimumShortMaintenancePercent: 30.0,
        fedRegTInitialMarginPercent: 50.0,
        lowPricedStockSurchargeThresholdUsd: 5.0
      }
    },
    guideContent: {
      executiveSummary: "Short selling involves borrowing shares from a broker and selling them into the open market with the intention of repurchasing them at a lower price. Because equity prices possess no theoretical ceiling, shorting carries unlimited financial risk. To defend against borrower default, brokerage firms enforce strict regulatory and house maintenance margin requirements governed by FINRA Rule 4210 and Federal Reserve Regulation T. When an equity is shorted, the sale proceeds plus an additional cash collateral deposit (typically 50% under Reg T) are locked in the margin account. If the borrowed stock appreciates substantially, the account equity diminishes relative to the expanding market liability of the borrowed shares. When equity drops below the maintenance threshold (typically 30% to 40% of market value), a Margin Call is issued. If additional collateral is not deposited, the broker forces an immediate market buy-to-cover, locking in catastrophic losses. This calculator computes exact upside margin call trigger prices, liquidation thresholds, and hard-to-borrow financing drag.",
      formulaBreakdown: {
        formulaString: "Margin Call Trigger Price = (Total Cash Collateral + Short Sale Proceeds) / (Shares Short * (1 + Maintenance Margin %)); Account Equity = Total Cash Assets - (Shares Short * Current Market Price); Current Margin % = (Account Equity / Current Market Value of Short) * 100; Annual Borrow Drag = Shares Short * Current Price * Borrow Rate %",
        variables: [
          {
            symbol: "Total Account Collateral (C_total)",
            meaning: "Gross cash balance held in account, equal to short sale gross proceeds plus initial cash margin deposit."
          },
          {
            symbol: "Shorted Unit Volume (N_shares)",
            meaning: "Total quantity of equity units borrowed and sold short in the open marketplace."
          },
          {
            symbol: "Maintenance Margin Percentage (MM%)",
            meaning: "Statutory minimum equity required as a percentage of current short market value (typically 30% to 40%)."
          },
          {
            symbol: "Margin Call Trigger Price (P_call)",
            meaning: "The precise higher stock price at which account equity equals the maintenance requirement, triggering liquidation."
          },
          {
            symbol: "Borrow Fee Rate (%_borrow)",
            meaning: "Annualized percentage interest charged by the broker to locate and borrow hard-to-borrow shares."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "Shorting 400 Shares at $85.00 with $34,000 Cash Deposit and 30% Maintenance Margin",
        narrative: "A hedge fund analyst shorts 400 shares of an overvalued semiconductor stock at $85.00. The broker requires a 100% cash collateral deposit equal to the short value ($34,000) under Regulation T, locking a total account cash balance of $68,000. The broker enforces a 30% maintenance margin requirement and an annual borrow fee of 3.75%.",
        stepByStepMath: [
          "Step 1: Calculate Gross Short Sale Proceeds: 400 shares * $85.00 = $34,000.00 cash generated from the sale.",
          "Step 2: Determine Total Account Cash Assets: $34,000.00 short proceeds + $34,000.00 initial cash deposit = $68,000.00 total cash balance.",
          "Step 3: Establish Maintenance Factor: 1.0 + 30% maintenance margin = 1.30 denominator factor.",
          "Step 4: Compute Margin Call Trigger Price: $68,000.00 total cash / (400 shares * 1.30) = $68,000.00 / 520 = $130.77 per share.",
          "Step 5: Verify Equity at Trigger Price: At $130.77, short liability = 400 * $130.77 = $52,308.00. Account equity = $68,000 - $52,308 = $15,692.00. Maintenance req = $52,308 * 30% = $15,692.40 (Equity perfectly equals margin threshold).",
          "Step 6: Compute Annual Borrow Carrying Cost: 400 shares * $85.00 * 3.75% borrow fee = $1,275.00 annually ($106.25 monthly carry drag)."
        ],
        finalTakeaway: "If the stock rallies from $85.00 to $130.77 (+53.85%), account equity is exhausted to the 30% threshold, triggering a broker margin call demanding cash or executing forced liquidation."
      },
      benchmarkTable: {
        title: "Short Sale Maintenance Margin Tiers & Price Trigger Elasticity",
        headers: ["Short Entry Price", "Initial Equity Deposited", "Maintenance Requirement", "Margin Call Trigger Price", "Rally Buffer % to Call"],
        rows: [
          ["$50.00 per share", "$50.00 cash per share (100%)", "30.0% FINRA standard", "$76.92 per share", "+53.8% rally tolerance"],
          ["$50.00 per share", "$50.00 cash per share (100%)", "40.0% Broker house rate", "$71.43 per share", "+42.9% rally tolerance"],
          ["$100.00 per share", "$100.00 cash per share (100%)", "30.0% FINRA standard", "$153.85 per share", "+53.8% rally tolerance"],
          ["$100.00 per share", "$100.00 cash per share (100%)", "50.0% High-volatility stock", "$133.33 per share", "+33.3% rally tolerance"],
          ["$20.00 per share", "$10.00 cash per share (50% Reg T)", "30.0% FINRA standard", "$23.08 per share", "+15.4% rally tolerance (Fragile)"]
        ]
      },
      optimizationLevers: [
        {
          title: "Implement Hard Catastrophic Stop-Loss Buy-to-Cover Orders",
          actionableAdvice: "Never manage short positions without automated contingent buy-stop market orders. Position your stop loss at least 15% to 20% below your calculated margin call trigger price. This guarantees an orderly exit and prevents broker automated liquidation during volatile pre-market short squeezes."
        },
        {
          title: "Audit Hard-to-Borrow (HTB) Fee Rates Daily via Broker Inventory Feeds",
          actionableAdvice: "Borrow fees on heavily shorted equities can surge from 1% to over 100% annualized overnight if institutional lenders recall their inventory. If a stock's borrow fee spikes above 15% to 20%, the daily carrying cost will rapidly destroy expected profit margins even if the stock declines."
        },
        {
          title: "Maintain 150% Cash Collateral Rather than the Reg T 50% Minimum",
          actionableAdvice: "The statutory 50% Regulation T deposit leaves only a 15.4% upward price buffer before triggering a margin call. Maintaining 100% to 150% surplus cash collateral expands your survival runway beyond +50% rallies, shielding the position from temporary bear-market squeeze spikes."
        },
        {
          title: "Use Long Put Options Instead of Naked Short Selling for Asymmetric Protection",
          actionableAdvice: "When expressing a high-conviction bearish thesis on high-beta growth equities, buying long out-of-the-money puts eliminates margin call mechanics entirely. The maximum loss is strictly capped at the premium paid, while providing identical delta exposure during downward crashes."
        }
      ],
      faqs: [
        {
          question: "How is a short selling margin call price mathematically derived?",
          answer: "The formula for the margin call trigger price is: `Trigger Price = Total Account Collateral / (Shares Short * (1 + Maintenance Margin %))`. Total collateral represents the original short sale proceeds plus all cash margin deposited. When the current market price equals this value, net account equity exactly equals the broker's minimum maintenance threshold."
        },
        {
          question: "What is the difference between Regulation T and FINRA Maintenance Margin?",
          answer: "Regulation T is a Federal Reserve rule governing the initial margin required to open a trade, mandating at least 50% of the trade value in equity. FINRA Rule 4210 governs ongoing maintenance margin, mandating that an investor retain at least 30% (or $5.00 per share, whichever is greater) in ongoing equity to avoid liquidation."
        },
        {
          question: "What happens if a broker issues a margin call and I do not deposit cash?",
          answer: "If a margin call is issued and you fail to wire funds or transfer marginable securities before the deadline (which can be hours rather than days in volatile markets), the brokerage margin department possesses the legal right to execute an unannounced forced buy-to-cover liquidation at prevailing market prices."
        },
        {
          question: "What is a 'Short Squeeze' and how does it accelerate margin calls?",
          answer: "A short squeeze occurs when a heavily shorted stock begins rising rapidly, forcing short sellers to buy shares to cover losses or satisfy margin calls. This concentrated wave of buy orders drives prices exponentially higher, triggering secondary margin calls for other shorts in a cascading upward feedback loop."
        },
        {
          question: "Who receives the dividend when a shorted stock pays a shareholder distribution?",
          answer: "When you hold a short position on a dividend-paying stock through the ex-dividend date, you do not receive the dividend. Instead, you are legally obligated to pay the dividend amount directly out of your brokerage cash balance to the lender from whom the shares were originally borrowed."
        }
      ]
    },
    relatedSlugs: [
      "pattern-day-trader-margin-calculator",
      "options-profit-calculator",
      "crypto-liquidation-price-calculator",
      "stock-average-cost-calculator"
    ]
  },
  {
    slug: "dividend-reinvestment-drip-calculator",
    title: "Dividend Reinvestment Plan (DRIP) Compound Growth & Yield-on-Cost Calculator",
    metaTitle: "Dividend DRIP Calculator 2026 | Compound Yield-on-Cost",
    metaDescription: "Calculate dividend reinvestment growth: model quarterly DRIP compounding, annual dividend growth, and yield-on-cost yields. Audit wealth growth instantly.",
    category: "wealth-investing",
    engineType: "markup-margin",
    lastUpdated: "November 2026",
    officialSourceName: "SEC Office of Investor Education: DRIP Compounding Guidance",
    officialSourceUrl: "https://www.sec.gov/investor/alerts/drip.htm",
    defaultInputs: {
      principalInvestment: 35000,
      initialDividendYieldPercent: 4.1,
      annualDividendGrowthPercent: 6.5,
      annualStockAppreciationPercent: 5.0,
      compoundingYears: 20
    },
    platformRates: {
      baseCurrency: "USD",
      extraParameters: {
        reinvestmentFrequencyPerYear: 4,
        qualifiedDividendTaxRatePercent: 15.0,
        fractionalSharePrecision: 4
      }
    },
    guideContent: {
      executiveSummary: "Dividend Reinvestment Plans (DRIPs) represent one of the most mathematically reliable wealth compounding engines in traditional financial markets. By automatically directing quarterly cash dividend distributions into purchasing fractional shares of the underlying equity—without incurring retail brokerage trading commissions—investors harness exponential compounding across two simultaneous vectors: share unit accumulation and annual dividend per share (DPS) growth. Over decades, this dynamic creates an exponential expansion in 'Yield on Cost' (YOC), where an initial 4% dividend yield on capital deployed can swell to an effective 15% to 25% annual cash yield on original principal. Furthermore, reinvesting through market downturns accumulates greater quantities of discounted shares, which supercharges passive income once valuation multiples recover. This institutional wealth calculator models multi-decade DRIP trajectories, dividend growth curves, qualified tax deductions, and terminal passive income streams.",
      formulaBreakdown: {
        formulaString: "Annual Dividend_t = Shares_t * (DPS_0 * (1 + Dividend Growth %)^t); New Shares Added = Annual Dividend_t / Share Price_t; Share Price_t = Price_0 * (1 + Appreciation %)^t; Yield on Cost (YOC) = (Annual Dividend_t / Initial Capital Invested) * 100",
        variables: [
          {
            symbol: "Initial Capital Outlay (P_0)",
            meaning: "Total baseline dollar sum deployed to acquire the primary dividend-paying equity lot."
          },
          {
            symbol: "Initial Dividend Yield (Y_div)",
            meaning: "Annual cash dividend payout divided by initial share purchase price (expressed as an annual percentage)."
          },
          {
            symbol: "Dividend Growth Rate (g_div)",
            meaning: "Annual percentage rate at which the corporate board of directors raises the dividend payout per share."
          },
          {
            symbol: "Share Capital Appreciation (g_price)",
            meaning: "Annual compounding percentage rate of underlying equity share price capital growth."
          },
          {
            symbol: "Yield on Cost (YOC)",
            meaning: "Current annual cash dividend stream divided by the original initial capital invested, measuring true return on basis."
          }
        ]
      },
      workedExample: {
        scenarioTitle: "$35,000 Initial Investment with 4.1% Starting Yield, 6.5% Dividend Growth & 5.0% Price Growth over 20 Years",
        narrative: "A retirement investor deploys $35,000 into a high-quality dividend aristocrat trading at $100.00 per share (350 initial shares). The company yields 4.1% ($4.10 annual dividend per share) and historically expands its dividend by 6.5% annually, while the stock appreciates at 5.0% per year. The investor enrolls in an automated commission-free DRIP over a 20-year horizon.",
        stepByStepMath: [
          "Step 1: Compute Year 1 Baseline Metrics: 350 shares * $4.10 initial dividend = $1,435.00 cash dividends generated in Year 1.",
          "Step 2: Model Year 1 DRIP Share Accumulation: Reinvesting $1,435.00 at an average $102.50 share price adds 14.00 new fractional shares, bringing Year 2 start to 364.00 shares.",
          "Step 3: Track Compounding at Year 10 Milestone: By Year 10, dividend per share rises from $4.10 to $7.70 (+87.8%). Reinvestment expands share count from 350 to 522.40 shares. Annual passive dividend income reaches $4,022.48 (Yield on Cost: 11.49%).",
          "Step 4: Project Year 20 Cumulative Share Accumulation: Reinvestment expands total share count to 814.20 shares (a 132.6% increase in ownership units without adding new capital).",
          "Step 5: Calculate Year 20 Annual Dividend Income: Year 20 dividend per share = $4.10 * (1.065)^19 = $13.69. Annual passive dividend payout = 814.20 shares * $13.69 = $11,146.40 per year.",
          "Step 6: Compute Final Yield on Cost and Portfolio Value: Yield on Cost = ($11,146.40 annual dividend / $35,000.00 initial capital) * 100 = 31.85% annual cash yield on original basis. Total portfolio value (at $265.33 share price) = $216,031.69."
        ],
        finalTakeaway: "Through 20 years of DRIP compounding, an initial $35,000 capital commitment grew into a $216,031 asset generating $11,146 in yearly passive income—a 31.85% annual yield on cost."
      },
      benchmarkTable: {
        title: "20-Year DRIP Compounding vs Cash Payout Scenarios",
        headers: ["Reinvestment Strategy", "Starting Capital", "Year 20 Portfolio Value", "Year 20 Annual Dividends", "Yield on Cost (YOC)"],
        rows: [
          ["Full DRIP Reinvestment", "$35,000 invested", "$216,032 asset value", "$11,146 / year passive", "31.85% annual yield on cost"],
          ["Cash Dividends (No DRIP)", "$35,000 invested", "$92,865 asset value", "$4,792 / year passive", "13.69% annual yield on cost"],
          ["High-Yield DRIP (6% Yield)", "$35,000 invested", "$284,150 asset value", "$17,617 / year passive", "50.33% annual yield on cost"],
          ["Dividend Growth Aristocrat", "$35,000 invested", "$248,920 asset value", "$14,350 / year passive", "41.00% annual yield on cost"],
          ["Zero Dividend Growth S&P", "$35,000 invested", "$162,400 asset value", "$5,200 / year passive", "14.86% annual yield on cost"]
        ]
      },
      optimizationLevers: [
        {
          title: "Prioritize Dividend Growth Rate Over High Absolute Starting Yield",
          actionableAdvice: "Companies offering unsustainable 8% to 10% dividend yields often lack capital appreciation and face dividend cut risk. A company yielding 3.5% that grows its dividend by 8% to 10% annually will vastly outperform a stagnant 8% yielder in total return and yield on cost over a 15-year horizon."
        },
        {
          title: "Hold High-Yield Dividend Stocks in Tax-Sheltered Accounts (Roth or Traditional IRA)",
          actionableAdvice: "In taxable brokerage accounts, reinvested dividends are still subject to annual federal qualified dividend taxes (0%, 15%, or 20%) in the year received. Holding dividend assets inside an IRA or 401(k) shields distributions from annual taxation, maximizing gross compounding velocity."
        },
        {
          title: "Implement Synthetic DRIPs to Selectively Reinvest into Undervalued Assets",
          actionableAdvice: "Rather than automatically reinvesting dividends back into the same stock regardless of valuation, collect distributions into cash and manually redeploy into whichever portfolio holding is currently trading at the highest margin of safety or lowest historical P/E multiple."
        },
        {
          title: "Verify Free Cash Flow Payout Ratios Below 65% to Guard Against Dividend Cuts",
          actionableAdvice: "A dividend is only as safe as the free cash flow supporting it. Filter candidate dividend stocks to ensure their Free Cash Flow (FCF) payout ratio is below 60% to 65% (or below 80% for capital-intensive utilities and REITs), ensuring dividends survive recessionary contractions."
        }
      ],
      faqs: [
        {
          question: "Are reinvested dividends taxed even if I never withdraw the cash?",
          answer: "Yes. In the United States, if you participate in a DRIP inside a standard taxable brokerage account, reinvested dividends are treated by the IRS as taxable income in the calendar year distributed. You will receive a Form 1099-DIV and must pay taxes (typically at the preferential 15% or 20% qualified dividend rate)."
        },
        {
          question: "How does dividend reinvestment calculate the new cost basis of fractional shares?",
          answer: "Each dividend reinvestment creates a distinct tax lot with its own cost basis equal to the purchase price of the fractional shares on the execution date. When you eventually sell shares, your total cost basis is the sum of your original purchase plus all reinvested dividend amounts, preventing double taxation."
        },
        {
          question: "What is 'Yield on Cost' and why is it an important metric for income investors?",
          answer: "Yield on Cost (YOC) is calculated by dividing your current annual dividend income by your original initial purchase price: `YOC = (Annual Dividends per Share / Purchase Price per Share) * 100`. Unlike current market yield which fluctuates with share prices, YOC reflects the true cash-on-cash return generated on your initial capital."
        },
        {
          question: "What is the difference between a company DRIP and a brokerage synthetic DRIP?",
          answer: "A traditional company-sponsored DRIP is administered directly by the issuing corporation or transfer agent (like Computershare), often offering small share purchase discounts (1% to 5%) with zero commissions. A brokerage synthetic DRIP is executed by your broker buying shares in the open market with zero discounts."
        },
        {
          question: "Can dividend reinvestment cause me to become over-concentrated in a single stock?",
          answer: "Yes. If an individual company experiences exceptional price appreciation and dividend compounding, automatic DRIP execution continuously funnels more capital into that position, expanding its portfolio weight. Periodically reviewing asset allocation and redirecting dividends to other holdings maintains diversification."
        }
      ]
    },
    relatedSlugs: [
      "stock-average-cost-calculator",
      "capital-gains-tax-calculator",
      "roth-ira-conversion-calculator",
      "rental-property-roi-calculator"
    ]
  }
];
