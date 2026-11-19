import fs from 'fs';

const filePath = 'src/data/calculators/wealth-investing.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function countWords(str) {
  return str ? str.trim().split(/\s+/).filter(Boolean).length : 0;
}

const expansions = {
  'stock-average-cost-calculator': {
    4: " Discipline demands establishing hard stop-loss rules or thesis milestones before committing incremental capital to an underwater trade."
  },
  'options-profit-calculator': {
    4: " Traders who lack the cash to accept 100 assigned shares or deliver stock should close positions prior to the 4:00 PM EST final bell."
  },
  'pattern-day-trader-margin-calculator': {
    4: " Traders seeking unlimited day trading with sub-$25k balances often utilize cash accounts, which are bounded solely by the T+1 settlement cycle.",
    5: " Similarly, cash accounts in equities are exempt from the PDT rule, though transactions remain constrained by unsettled funds availability rules."
  },
  'short-selling-margin-call-calculator': {
    3: " The broker is under no legal obligation to notify you before liquidating securities to protect their capital against runaway upside gaps.",
    4: " This violent short-covering dynamic frequently causes intraday upside blow-offs that completely wipe out under-capitalized retail short traders.",
    5: " Because dividends are paid directly out-of-pocket, shorting high-yielding dividend stocks carries substantial ongoing cash-drag costs."
  },
  'dividend-reinvestment-drip-calculator': {
    4: " Investors must verify whether their broker offers fractional share reinvestment to prevent uninvested cash drag in synthetic plans.",
    5: " Rebalancing can be executed tax-efficiently by turning off DRIP on winners and redirecting incoming quarterly cash dividends to underweight holdings."
  },
  'crypto-dca-calculator': {
    1: " By automating purchases regardless of emotional sentiment, investors systematically capture attractive multi-year risk-adjusted entry bases.",
    2: " Using centralized exchange advanced limit order books (paying 0.1% to 0.4% taker fees) rather than simple instant-buy credit card widgets preserves investment capital.",
    4: " Backtesting confirms that weekly or bi-weekly DCA aligned with salary paydays balances compounding benefits with minimal transaction friction.",
    5: " Self-custody investors can execute on-chain DCA using non-custodial smart contracts, though Ethereum mainnet gas fees require batching purchases."
  },
  'impermanent-loss-calculator': {
    2: " If the relative price ratio between the pooled token pair never returns to the deposit baseline, that divergent value loss remains permanent."
  },
  'crypto-mining-profitability-calculator': {
    1: " Securing industrial power purchase agreements under 4 to 5 cents per kWh is essential for sustaining positive cash flow through Bitcoin halving cycles.",
    3: " FPPS stabilizes daily cash flow for miners by eliminating the variance of block discovery luck inherent to decentralized pool participation.",
    4: " Beyond negative financial margins, the intense thermal output (3,000+ watts) and industrial 75-decibel acoustic noise make home ASIC operation completely impractical.",
    5: " Miners must incorporate rising difficulty models when calculating the true payback period of newly deployed ASIC hardware rigs."
  },
  'staking-apy-compound-calculator': {
    1: " When choosing validator nodes, compounding frequency significantly alters forward wealth accumulation over multi-year holding timeframes.",
    2: " Selecting enterprise-grade institutional validators with 99.9% verifiable uptime and slashing insurance protects delegators from principal loss.",
    3: " Investors must track daily token receipt fair market values to establish accurate tax bases for future capital gain reporting.",
    4: " Liquid staking derivatives (LSDs like stETH) circumvent these rigid lockup constraints by issuing yield-bearing liquid wrapper tokens."
  },
  'crypto-liquidation-price-calculator': {
    2: " This safety margin prevents the clearinghouse from taking bad debt during severe flash crashes and market slippage events.",
    3: " By referencing an aggregate median of external spot exchanges, mark pricing protects derivative traders against predatory wicks and scam wicks.",
    4: " Utilizing isolated margin rather than cross-margin limits the potential financial loss strictly to the capital allocated to that specific contract."
  },
  'rsu-vesting-tax-calculator': {
    3: " Most tech professionals prefer Sell-to-Cover because it avoids out-of-pocket cash requirements while automating mandatory tax compliance."
  },
  'espp-discount-profit-calculator': {
    2: " If your employer offers a 15% discount, the maximum payroll deduction you can contribute under IRS rules is $21,250 annually.",
    5: " Funds accumulated prior to your departure cannot be used to purchase shares at the next offering date and revert back to you as standard cash."
  },
  'roth-ira-conversion-calculator': {
    1: " Because conversion taxes are irrevocable once paid, financial planners recommend executing conversions incrementally across multiple tax years.",
    3: " This permanent exemption makes Roth IRAs one of the most powerful estate planning vehicles for passing generational wealth to heirs.",
    4: " Consulting a CPA ensures that large lump-sum conversions do not inadvertently elevate household taxable income into higher IRMAA surtax cliffs.",
    5: " Investors executing backdoor contributions must ensure all pre-tax traditional IRA balances are zero by December 31st of the conversion year."
  },
  'brrrr-method-calculator': {
    1: " This allows real estate investors to extract 100% of their initial invested equity tax-free while retaining full ownership of the cash-flowing asset.",
    3: " Conservative investors protect themselves by maintaining substantial liquidity reserves and securing written contractor bids prior to property acquisition.",
    4: " A DSCR below 1.20 will trigger lender loan reductions, requiring the investor to leave more unrecovered capital in the deal.",
    5: " Commercial underwriting focuses primarily on property net operating income (NOI) and cap rates rather than personal W-2 income verification."
  },
  'rental-property-roi-calculator': {
    1: " Evaluating both metrics ensures an investor does not mistake high leverage for underlying asset operational efficiency.",
    2: " While useful for rapid initial screening, comprehensive underwriting requires itemizing actual municipal taxes, insurance quotes, and utility agreements.",
    4: " Failing to budget for long-term component degradation turns seemingly profitable rental properties into severe cash-flow traps.",
    5: " Upon sale, unrecaptured depreciation is taxed at a maximum 25% rate unless deferred through a Section 1031 like-kind exchange."
  },
  'fha-vs-conventional-mortgage-calculator': {
    3: " Homeowners can also petition for early removal if documented property market appreciation pushes loan-to-value under 80%.",
    4: " Borrowers can subsequently refinance into a conventional loan once their credit score improves and loan balance drops.",
    5: " The rental income from adjacent units can also be factored into borrower qualification ratios to expand borrowing capacity."
  },
  'airbnb-arbitrage-calculator': {
    2: " Setting turnover fees realistically covers laundry, restocking hospitality consumables, and professional turnover inspections.",
    3: " Diversifying across adjacent suburban municipalities or shifting to 30-day medium-term rentals insulates operators against municipal bans.",
    4: " Having an additional $3,000 in working capital reserves covers slow seasonal ramp-ups during initial guest review generation.",
    5: " Many operators transition their portfolio from short-term to medium-term stays to reduce platform operational overhead."
  },
  'gold-silver-melt-value-calculator': {
    3: " Shopping scrap gold across multiple independent assayers and bullion dealers ensures securing bids closest to 95% of live spot.",
    4: " Acid scratch testing and electronic XRF scanners are standard verification methods used by jewelers to confirm authentic 925 composition.",
    5: " Selling rare or certified graded numismatic pieces for raw scrap melt value represents an immediate forfeiture of collector value."
  }
};

let applied = 0;
data.forEach(calc => {
  const calcExpansions = expansions[calc.slug];
  if (calcExpansions) {
    calc.guideContent.faqs.forEach((faq, idx) => {
      const faqNum = idx + 1;
      if (calcExpansions[faqNum]) {
        faq.answer += calcExpansions[faqNum];
        applied++;
      }
    });
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`Applied expansions to ${applied} FAQs in ${filePath}`);
