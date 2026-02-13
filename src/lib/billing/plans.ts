export const AVAILABLE_PLANS = [
  {
    id: "STARTER",
    name: "Starter",
    // 🟢 ADD THIS NESTED OBJECT
    pricing: {
      monthly: 29,
      yearly: 24, // Optional: for the yearly calc on line 109
    },
    currency: "GBP",
    features: ["20 daily runs", "1 concurrent thread", "Human-reviewed execution"]
  },
  {
    id: "PRO",
    name: "Pro",
    pricing: {
      monthly: 99,
      yearly: 79,
    },
    currency: "GBP",
    isPopular: true,
    features: ["150 daily runs", "3 concurrent threads", "Semi-autonomous operation"]
  },
  {
    id: "PRO_MAX",
    name: "Pro Max",
    pricing: {
      monthly: 249,
      yearly: 199,
    },
    currency: "GBP",
    features: ["600 daily runs", "10 concurrent threads", "Full operational autonomy"]
  }
];