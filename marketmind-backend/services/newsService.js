const axios = require("axios");
const News = require("../models/News");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();
const COMPANY_TICKER_MAP = require("../utils/tickerMap");

// 📈 Financial positive keywords
const positiveKeywords = {
  profit: 3,
  growth: 2,
  surge: 3,
  bullish: 4,
  acquisition: 2,
  partnership: 2,
  breakthrough: 4,
  record: 3,
  strong: 2,
  upgrade: 2,
  beat: 3,
  rally: 3,
};

// 📉 Financial negative keywords
const negativeKeywords = {
  fraud: -5,
  lawsuit: -4,
  crash: -5,
  layoffs: -3,
  decline: -2,
  bearish: -4,
  downgrade: -3,
  weak: -2,
  loss: -3,
  recession: -5,
  fall: -2,
  risk: -2,
};

// irrilevence filtering
const financeKeywords = [
  "stock",
  "shares",
  "market",
  "earnings",
  "revenue",
  "profit",
  "loss",
  "investment",
  "investor",
  "trading",
  "acquisition",
  "merger",
  "growth",
  "forecast",
  "quarter",
  "financial",
  "economy",
  "nasdaq",
  "wall street",
  "bullish",
  "bearish",
  "ai",
  "technology",
];

// 👇 ADD HERE
const isRelevantFinanceNews = (text) => {
  const lowerText = text.toLowerCase();

  // ❌ Block spam/shopping/news junk
  const blockedKeywords = [
    "coupon",
    "discount",
    "sale",
    "shipping",
    "deal",
    "giveaway",
    "grill",
    "controller",
    "gaming",
    "iphone case",
    "usb-c",
    "headphones",
    "recipe",
    "fashion",
    "celebrity",
    "sports",
    "movie",
    "music",
    "netflix",
    "tv show",
    "iphone charger",
    "keyboard",
    "mouse",
    "murder",
    "shooter",
    "shooting",
    "guns",
    "ammunition",
    "arrest",
    "police",
    "crime",
    "court",
    "killed",
    "death",
    "football",
    "cricket",
    "wrestling",
  ];

  for (const word of blockedKeywords) {
    if (lowerText.includes(word)) {
      return false;
    }
  }

  // ✅ Must contain finance/business relevance
  let financeScore = 0;

  for (const word of financeKeywords) {
    if (lowerText.includes(word)) {
      financeScore++;
    }
  }

// ✅ Require stronger finance relevance
  return financeScore >= 1;

  return false;
};

//  Company list
const companies = [
  {
    name: "Tesla",
    ticker: "TSLA",
    keywords: ["tesla", "elon musk", "cybertruck"],
  },

  {
    name: "Apple",
    ticker: "AAPL",
    keywords: ["apple", "iphone", "ipad", "macbook"],
  },

  {
    name: "Amazon",
    ticker: "AMZN",
    keywords: ["amazon", "aws", "prime"],
  },

  {
    name: "Microsoft",
    ticker: "MSFT",
    keywords: [
      "microsoft",
      "openai",
      "chatgpt",
      "sam altman",
      "azure",
      "github copilot",
    ],
  },

  {
    name: "Google",
    ticker: "GOOGL",
    keywords: ["google", "alphabet", "youtube", "gemini"],
  },

  {
    name: "Meta",
    ticker: "META",
    keywords: ["meta", "facebook", "instagram", "whatsapp"],
  },

  {
    name: "Reliance",
    ticker: "RELIANCE",
    keywords: ["reliance", "jio"],
  },

  {
    name: "TCS",
    ticker: "TCS",
    keywords: ["tcs", "tata consultancy"],
  },

  {
    name: "Infosys",
    ticker: "INFY",
    keywords: ["infosys"],
  },

  {
    name: "HDFC",
    ticker: "HDFC",
    keywords: ["hdfc", "hdfc bank"],
  },
];
const detectCompany = (text) => {
  const lowerText = text.toLowerCase();

  // ❌ Ignore shopping/deal spam
  const blockedWords = [
    "buy now",
    "discount",
    "coupon",
    "sale",
    "shipping",
    "available on amazon",
    "amazon.com",
    "grill",
  ];

  for (const word of blockedWords) {
    if (lowerText.includes(word)) {
      return {
        name: "Unknown",
        ticker: null,
      };
    }
  }

  // ✅ First check company mapping
  for (const companyName in COMPANY_TICKER_MAP) {
    const regex = new RegExp(`\\b${companyName}\\b`, "i");

    if (regex.test(text)) {
      return {
        name: companyName,
        ticker: COMPANY_TICKER_MAP[companyName],
      };
    }
  }

  // ✅ Fallback keyword detection
  for (const comp of companies) {
    for (const keyword of comp.keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "i");

      if (regex.test(text)) {
        return {
          name: comp.name,
          ticker: comp.ticker,
        };
      }
    }
  }

  return {
    name: "Unknown",
    ticker: null,
  };
};

const extractTickerFromTitle = (text) => {
  const tickerRegex = /\(([A-Z]{2,10})\)/;

  const match = text.match(tickerRegex);

  if (match) {
    return match[1];
  }

  return null;
};

// 🧠 Advanced financial sentiment scoring
const calculateFinancialScore = (text, baseScore) => {
  let score = baseScore;

  const lowerText = text.toLowerCase();

  // ✅ Positive keyword boosts
  for (const word in positiveKeywords) {
    if (lowerText.includes(word)) {
      score += positiveKeywords[word];
    }
  }

  // ✅ Negative keyword penalties
  for (const word in negativeKeywords) {
    if (lowerText.includes(word)) {
      score += negativeKeywords[word];
    }
  }

  return score;
};

// 🚀 Fetch + Process News
const fetchNews = async () => {
  try {
    console.log("🔑 API KEY:", process.env.NEWS_API_KEY);

    const query = `
    Tesla OR Apple OR Microsoft OR Amazon OR Google OR Meta
    OR Reliance OR TCS OR Infosys OR HDFC
    `;

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
);

    const articles = response.data.articles || [];
    console.log("📰 Articles fetched:", articles.length);

    let savedCount = 0;

    for (const article of articles) {
      // ❌ Skip invalid data
      if (!article.url || article.url.includes("consent.yahoo")) {
        continue;
      }

      // ❌ Skip duplicates
      const existing = await News.findOne({ url: article.url });
      if (existing) {
        console.log("⚠️ Duplicate skipped:", article.title);
        continue;
      }

      console.log("💾 Saving:", article.title);

      // 🧠 Combine text
      const text = `${article.title || ""} ${article.description || ""}`;
        if (!isRelevantFinanceNews(text)) {
          console.log("⛔ Irrelevant news skipped:", article.title);
          continue;
        }
      // 📊 Sentiment analysis
      const result = sentiment.analyze(text);
      const weightedScore = calculateFinancialScore(
        text,
        result.score
      );

      let sentimentLabel = "neutral";
      let prediction = "HOLD";
      let confidence = 50;

      // ✅ Sentiment label
      if (weightedScore >= 3) {
        sentimentLabel = "positive";
      } else if (weightedScore <= -3) {
        sentimentLabel = "negative";
      }

      // ✅ Prediction logic
      if (weightedScore >= 8) {
        prediction = "STRONG BUY";
        confidence = 95;

      } else if (weightedScore >= 5) {
        prediction = "BUY";
        confidence = 85;

      } else if (weightedScore >= 2) {
        prediction = "HOLD";
        confidence = 65;

      } else if (weightedScore <= -8) {
        prediction = "STRONG SELL";
        confidence = 95;

      } else if (weightedScore <= -5) {
        prediction = "SELL";
        confidence = 85;

      } else {
        prediction = "HOLD";
        confidence = 55;
      }
      
      // 🏢 Company detection
      const companyData = detectCompany(text);

      const extractedTicker = extractTickerFromTitle(article.title || "");

      if (
        companyData.name === "Unknown" &&
        extractedTicker
      ) {
        companyData.name = extractedTicker;
        companyData.ticker = extractedTicker;
      }
      
      if (!companyData.ticker) {
        console.log("⛔ Unknown company skipped:", article.title);
        continue;
      }

      // 💾 Save to DB
      await News.create({
        title: article.title,
        description: article.description,
        source: article.source?.name || "Unknown",
        url: article.url,
        publishedAt: article.publishedAt,

        sentiment: sentimentLabel,
        sentimentScore: weightedScore,

        prediction,
        confidence,

        company: companyData.name,
        ticker: companyData.ticker,
      });

      savedCount++;
    }

    console.log("✅ News processing completed");
    console.log("📦 Articles saved:", savedCount);

    return savedCount;

  } catch (error) {
    console.error("❌ FULL ERROR:", error.response?.data || error.message);
    return 0;
  }
};

module.exports = fetchNews;