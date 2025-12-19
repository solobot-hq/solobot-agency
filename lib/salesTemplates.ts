export const salesTemplates = {
  // --- Cold Outreach ---
  "cold-short-punchy": {
    label: "Cold Outreach – Short & Punchy",
    companyName: "",
    targetAudience: "Busy Executives",
    productDetails: "Automated expense reporting software.",
    painPoints: "Wasting hours on manual receipts.",
    tone: "Direct",
    length: "Short"
  },
  "cold-value-first": {
    label: "Cold Outreach – Value First",
    companyName: "",
    targetAudience: "Marketing Directors",
    productDetails: "SEO content tool.",
    painPoints: "Low organic traffic growth.",
    tone: "Persuasive",
    length: "Medium"
  },
  "cold-pain-first": {
    label: "Cold Outreach – Pain First (PAS)",
    companyName: "",
    targetAudience: "SaaS Founders",
    productDetails: "Churn reduction platform.",
    painPoints: "Losing customers after month 3.",
    tone: "Empathetic",
    length: "Medium"
  },
  "cold-permission": {
    label: "Cold Outreach – Permission to Pitch",
    companyName: "",
    targetAudience: "Consultants",
    productDetails: "Lead generation database.",
    painPoints: "Empty pipeline.",
    tone: "Humble",
    length: "Short"
  },
  "cold-one-sentence": {
    label: "Cold Outreach – One Sentence",
    companyName: "",
    targetAudience: "CTOs",
    productDetails: "Cloud security audit.",
    painPoints: "Data breach risks.",
    tone: "Direct",
    length: "Short"
  },
  "cold-case-study": {
    label: "Cold Outreach – Case Study",
    companyName: "",
    targetAudience: "E-commerce Owners",
    productDetails: "Conversion rate optimization agency.",
    painPoints: "High ad spend, low ROAS.",
    tone: "Professional",
    length: "Long"
  },
  "cold-credibility": {
    label: "Cold Outreach – Credibility/Authority",
    companyName: "",
    targetAudience: "Enterprise VPs",
    productDetails: "Cybersecurity consulting.",
    painPoints: "Compliance headaches.",
    tone: "Professional",
    length: "Medium"
  },
  "cold-recent-news": {
    label: "Cold Outreach – Recent News Trigger",
    companyName: "",
    targetAudience: "Companies hiring aggressively",
    productDetails: "Recruitment automation.",
    painPoints: "Slow hiring process.",
    tone: "Conversational",
    length: "Medium"
  },

  // --- Follow-Ups ---
  "follow-bump": {
    label: "Follow-Up – Quick Bump",
    companyName: "",
    targetAudience: "Previous Prospect",
    productDetails: "N/A",
    painPoints: "N/A",
    tone: "Casual",
    length: "Short"
  },
  "follow-value-add": {
    label: "Follow-Up – Value Add (Asset)",
    companyName: "",
    targetAudience: "Warm Lead",
    productDetails: "Whitepaper on industry trends.",
    painPoints: "Lack of market insights.",
    tone: "Helpful",
    length: "Medium"
  },
  "follow-soft-cta": {
    label: "Follow-Up – Soft CTA",
    companyName: "",
    targetAudience: "Hesitant Lead",
    productDetails: "Free trial access.",
    painPoints: "Commitment phobia.",
    tone: "Low Pressure",
    length: "Short"
  },
  "follow-hard-cta": {
    label: "Follow-Up – Hard CTA (Urgency)",
    companyName: "",
    targetAudience: "End of Quarter Prospect",
    productDetails: "Discount expiring soon.",
    painPoints: "Missing budget cycle.",
    tone: "Urgent",
    length: "Short"
  },
  "follow-breakup": {
    label: "Follow-Up – Breakup Email",
    companyName: "",
    targetAudience: "Unresponsive Lead",
    productDetails: "Closing the file.",
    painPoints: "Inbox clutter.",
    tone: "Professional",
    length: "Short"
  },
  "follow-humor-breakup": {
    label: "Follow-Up – Humorous Breakup",
    companyName: "",
    targetAudience: "Startups/Creative",
    productDetails: "N/A",
    painPoints: "Ghosting.",
    tone: "Witty",
    length: "Short"
  },

  // --- Industry Specific ---
  "industry-saas": {
    label: "Industry – SaaS Sales",
    companyName: "",
    targetAudience: "Product Managers",
    productDetails: "User onboarding tool.",
    painPoints: "Low activation rates.",
    tone: "Tech-savvy",
    length: "Medium"
  },
  "industry-real-estate": {
    label: "Industry – Real Estate Listing",
    companyName: "",
    targetAudience: "Homeowners",
    productDetails: "Market valuation report.",
    painPoints: "Selling below market value.",
    tone: "Professional",
    length: "Medium"
  },
  "industry-agency": {
    label: "Industry – Agency Lead Gen",
    companyName: "",
    targetAudience: "Local Businesses",
    productDetails: "Facebook Ads management.",
    painPoints: "Invisible online.",
    tone: "Confident",
    length: "Medium"
  },
  "industry-coach": {
    label: "Industry – Coaching/Consulting",
    companyName: "",
    targetAudience: "Burned out professionals",
    productDetails: "Executive coaching program.",
    painPoints: "Career stagnation.",
    tone: "Inspirational",
    length: "Long"
  },
  "industry-local": {
    label: "Industry – Local Services (HVAC/Plumbing)",
    companyName: "",
    targetAudience: "Property Managers",
    productDetails: "Maintenance contracts.",
    painPoints: "Emergency repair costs.",
    tone: "Reliable",
    length: "Short"
  },
  "industry-ecommerce": {
    label: "Industry – E-commerce Wholesale",
    companyName: "",
    targetAudience: "Boutique Owners",
    productDetails: "Handmade accessories.",
    painPoints: "Finding unique inventory.",
    tone: "Friendly",
    length: "Medium"
  }
};

export type TemplateKey = keyof typeof salesTemplates;