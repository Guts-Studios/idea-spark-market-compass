
// Market trends data
export const marketTrendsData = {
  trendOverTime: [
    { month: "Jan", searches: 4000, interest: 2400 },
    { month: "Feb", searches: 3000, interest: 1398 },
    { month: "Mar", searches: 2000, interest: 9800 },
    { month: "Apr", searches: 2780, interest: 3908 },
    { month: "May", searches: 1890, interest: 4800 },
    { month: "Jun", searches: 2390, interest: 3800 },
    { month: "Jul", searches: 3490, interest: 4300 },
    { month: "Aug", searches: 3490, interest: 4300 },
    { month: "Sep", searches: 4000, interest: 2400 },
    { month: "Oct", searches: 3000, interest: 1398 },
    { month: "Nov", searches: 2000, interest: 9800 },
    { month: "Dec", searches: 2780, interest: 3908 },
  ],
  relatedKeywords: [
    { keyword: "eco-friendly water bottle", volume: 12500, difficulty: "Medium", cpc: 1.25 },
    { keyword: "reusable water bottle", volume: 27800, difficulty: "High", cpc: 2.15 },
    { keyword: "insulated water bottle", volume: 18900, difficulty: "Medium", cpc: 1.75 },
    { keyword: "stainless steel water bottle", volume: 15600, difficulty: "Medium", cpc: 1.55 },
    { keyword: "glass water bottle", volume: 9200, difficulty: "Low", cpc: 0.95 },
  ],
  marketSize: {
    global: "$ 8.38 Billion",
    cagr: "11.2%",
    forecast2025: "$ 10.19 Billion",
  },
  seasonality: [
    { month: "Jan", index: 82 },
    { month: "Feb", index: 85 },
    { month: "Mar", index: 95 },
    { month: "Apr", index: 110 },
    { month: "May", index: 120 },
    { month: "Jun", index: 130 },
    { month: "Jul", index: 135 },
    { month: "Aug", index: 125 },
    { month: "Sep", index: 110 },
    { month: "Oct", index: 100 },
    { month: "Nov", index: 90 },
    { month: "Dec", index: 95 },
  ],
};

// Competitor data
export const competitorsData = [
  {
    id: 1,
    name: "HydroFlask",
    logo: "https://placeholder.com/150",
    website: "https://www.hydroflask.com",
    foundedYear: 2009,
    priceRange: "$30 - $50",
    marketShare: 23,
    strengths: ["Strong brand recognition", "Premium quality", "Wide product range"],
    weaknesses: ["Higher price point", "Limited customization"],
    productRating: 4.7,
    reviews: {
      positive: 85,
      neutral: 10,
      negative: 5,
    },
  },
  {
    id: 2,
    name: "S'well",
    logo: "https://placeholder.com/150",
    website: "https://www.swell.com",
    foundedYear: 2010,
    priceRange: "$25 - $45",
    marketShare: 18,
    strengths: ["Stylish designs", "Good insulation", "Charitable initiatives"],
    weaknesses: ["Limited size options", "Less durable than competitors"],
    productRating: 4.5,
    reviews: {
      positive: 80,
      neutral: 12,
      negative: 8,
    },
  },
  {
    id: 3,
    name: "Contigo",
    logo: "https://placeholder.com/150",
    website: "https://www.gocontigo.com",
    foundedYear: 2004,
    priceRange: "$15 - $35",
    marketShare: 15,
    strengths: ["Affordable", "Innovative lid designs", "Widely available"],
    weaknesses: ["Less premium feel", "Mixed durability reviews"],
    productRating: 4.2,
    reviews: {
      positive: 75,
      neutral: 15,
      negative: 10,
    },
  },
  {
    id: 4,
    name: "Yeti",
    logo: "https://placeholder.com/150",
    website: "https://www.yeti.com",
    foundedYear: 2006,
    priceRange: "$35 - $55",
    marketShare: 20,
    strengths: ["Extremely durable", "Strong brand loyalty", "Superior insulation"],
    weaknesses: ["Expensive", "Heavy"],
    productRating: 4.8,
    reviews: {
      positive: 90,
      neutral: 7,
      negative: 3,
    },
  },
];

// Sentiment analysis data
export const sentimentData = {
  overall: {
    positive: 72,
    neutral: 18,
    negative: 10,
  },
  byPlatform: {
    twitter: { positive: 65, neutral: 20, negative: 15 },
    amazon: { positive: 78, neutral: 14, negative: 8 },
    reddit: { positive: 62, neutral: 25, negative: 13 },
    facebook: { positive: 70, neutral: 20, negative: 10 },
  },
  commonPhrases: {
    positive: [
      { phrase: "keeps drinks cold", count: 245 },
      { phrase: "durable design", count: 198 },
      { phrase: "worth the price", count: 176 },
      { phrase: "love the colors", count: 152 },
      { phrase: "no leaking", count: 134 },
    ],
    negative: [
      { phrase: "too expensive", count: 87 },
      { phrase: "difficult to clean", count: 65 },
      { phrase: "dents easily", count: 54 },
      { phrase: "lid broke", count: 42 },
      { phrase: "paint chipped", count: 38 },
    ],
  },
  reviewTrend: [
    { month: "Jan", sentiment: 68 },
    { month: "Feb", sentiment: 70 },
    { month: "Mar", sentiment: 65 },
    { month: "Apr", sentiment: 72 },
    { month: "May", sentiment: 74 },
    { month: "Jun", sentiment: 78 },
    { month: "Jul", sentiment: 76 },
    { month: "Aug", sentiment: 75 },
    { month: "Sep", sentiment: 80 },
    { month: "Oct", sentiment: 82 },
    { month: "Nov", sentiment: 79 },
    { month: "Dec", sentiment: 77 },
  ],
};

// Dashboard summary data
export const dashboardSummary = {
  ideaViability: 78,
  marketGrowth: "11.2%",
  competitionLevel: "Medium",
  consumerSentiment: "Favorable",
  estimatedTAM: "$8.38B",
  entryBarriers: "Moderate",
  topOpportunities: [
    "Eco-friendly materials",
    "Smart features integration",
    "Customization options",
    "Subscription models",
  ],
  topChallenges: [
    "Saturated market",
    "Price sensitivity",
    "Supply chain costs",
    "Brand differentiation",
  ],
};
