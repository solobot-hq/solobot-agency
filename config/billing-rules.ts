/**
 * SoloBotAgency - Structural Billing & Safety Configuration
 * Enforces: Standard £ GBP Pricing, 10% First-Year Yearly Discount, and Daily Limits.
 */

export const PRICING_MODEL = {
  CURRENCY: "GBP",
  SYMBOL: "£",
  YEAR_ONE_DISCOUNT: 0.10, // Strict 10% first-year incentive
  RENEWAL_PERIOD_MONTHS: 12, // Pricing reverts to standard after 12 months
  
  PLANS: {
    STARTER: {
      id: "starter",
      name: "Starter",
      monthlyBase: 29,
      yearlyYearOne: 312, // £26/mo equivalent
      yearlyRenewal: 348, // £29/mo full price
      limits: {
        dailyRuns: 20, //
        concurrency: 1, //
        background: false, //
        approval: "ALWAYS" //
      }
    },
    PRO: {
      id: "pro_agency",
      name: "Pro Agency",
      monthlyBase: 99,
      yearlyYearOne: 1068, // £89/mo equivalent
      yearlyRenewal: 1188, // £99/mo full price
      limits: {
        dailyRuns: 150, //
        concurrency: 3, //
        background: true, //
        approval: "SEMI_AUTONOMOUS" //
      }
    },
    PRO_MAX: {
      id: "pro_max",
      name: "Pro Max",
      monthlyBase: 249,
      yearlyYearOne: 2688, // £224/mo equivalent
      yearlyRenewal: 2988, // £249/mo full price
      limits: {
        dailyRuns: 600, //
        concurrency: 10, //
        background: true, //
        approval: "FULL_AUTONOMY" //
      }
    }
  }
};