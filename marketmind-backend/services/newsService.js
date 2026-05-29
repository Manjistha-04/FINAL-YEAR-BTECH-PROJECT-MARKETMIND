const axios = require("axios");
const News = require("../models/News");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();

/* ======================================================
   🇮🇳 INDIAN STOCK COMPANY LIST
====================================================== */

const companies = [
  {
    name: "Reliance Industries",
    ticker: "RELIANCE",
    keywords: [
      "reliance",
      "reliance industries",
      "jio",
      "reliance retail",
      "ril",
    ],
  },

  {
    name: "TCS",
    ticker: "TCS",
    keywords: [
      "tcs",
      "tata consultancy",
      "tata consultancy services",
    ],
  },

  {
    name: "Infosys",
    ticker: "INFY",
    keywords: ["infosys"],
  },

  {
    name: "HDFC Bank",
    ticker: "HDFCBANK",
    keywords: [
      "hdfc",
      "hdfc bank",
    ],
  },

  {
    name: "ICICI Bank",
    ticker: "ICICIBANK",
    keywords: [
      "icici",
      "icici bank",
    ],
  },

  {
    name: "State Bank of India",
    ticker: "SBIN",
    keywords: [
      "sbi",
      "state bank of india",
    ],
  },

  {
    name: "Axis Bank",
    ticker: "AXISBANK",
    keywords: [
      "axis",
      "axis bank",
    ],
  },

  {
    name: "Kotak Mahindra Bank",
    ticker: "KOTAKBANK",
    keywords: [
      "kotak",
      "kotak bank",
      "kotak mahindra",
    ],
  },

  {
    name: "IDFC First Bank",
    ticker: "IDFCFIRSTB",
    keywords: [
      "idfc",
      "idfc first bank",
    ],
  },

  {
    name: "ITC",
    ticker: "ITC",
    keywords: ["itc"],
  },

  {
    name: "Wipro",
    ticker: "WIPRO",
    keywords: ["wipro"],
  },
  {
  name: "Central Bank of India",
  ticker: "CENTRALBK",
  keywords: [
    "central bank of india",
    "central bank",
    "central bk",
  ],
  },

  {
    name: "Punjab National Bank",
    ticker: "PNB",
    keywords: ["punjab national bank","pnb"],
  },

  {
    name: "Bank of Baroda",
    ticker: "BANKBARODA",
    keywords: [ "bank of baroda", "bob"],
},

  {
    name: "Canara Bank",
    ticker: "CANBK",
    keywords: [
      "canara bank","canara"],
  },

  {
    name: "Indian Bank",
    ticker: "INDIANB",
    keywords: [ "indian bank"],
  },

  {
    name: "Union Bank of India",
    ticker: "UNIONBANK",
    keywords: [
      "union bank",
      "union bank of india",
    ],
  },

  {
    name: "HCLTech",
    ticker: "HCLTECH",
    keywords: [
      "hcl",
      "hcltech",
      "hcl tech",
      "hcl technologies",
    ],
  },
];

/* ======================================================
   📈 POSITIVE / NEGATIVE FINANCIAL WORDS
====================================================== */

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
  deal: 2,
  expansion: 2,
  contract: 2,
};

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
  scrutiny: -3,
  penalty: -3,
  investigation: -3,
  debt: -2,
};

/* ======================================================
   📰 RELEVANCE FILTER
====================================================== */

const financeKeywords = [
  "stock",
  "share",
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
  "financial",
  "economy",
  "technology",
  "bank",
  "loan",
  "insurance",
  "credit",
  "deal",
  "contract",
  "partnership",
  "regulatory",
  "rbi",
  "business",
  "company",
  "q1",
  "q2",
  "q3",
  "q4",
  "results",
  "shareholder",
  "sensex",
  "nifty",
  "ipo",
];

const blockedKeywords = [
  "recipe",
  "fashion",
  "celebrity",
  "movie",
  "music",
  "tv show",
  "football",
  "cricket",
  "wrestling",
  "dating",
  "coupon",
  "discount",
  "sale",
  "guns",
  "murder",
  "crypto",
  "bitcoin",
];

const isRelevantFinanceNews = (text) => {
  const lowerText = text.toLowerCase();

  for (const word of blockedKeywords) {
    if (lowerText.includes(word)) {
      return false;
    }
  }

  for (const company of companies) {
    for (const keyword of company.keywords) {
      if (lowerText.includes(keyword)) {
        return true;
      }
    }
  }

  let score = 0;

  for (const word of financeKeywords) {
    if (lowerText.includes(word)) {
      score++;
    }
  }

  return score >= 1;
};

/* ======================================================
   🏢 COMPANY DETECTION
====================================================== */

const detectCompany = (text) => {
  const lowerText = text.toLowerCase();

  for (const company of companies) {
    for (const keyword of company.keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return {
          name: company.name,
          ticker: company.ticker,
        };
      }
    }
  }

  return {
    name: "Market",
    ticker: "MARKET",
  };
};

/* ======================================================
   📊 FINANCIAL SENTIMENT
====================================================== */

const calculateFinancialScore = (
  text,
  baseScore
) => {
  let score = baseScore;

  const lowerText =
    text.toLowerCase();

  for (const word in positiveKeywords) {
    if (lowerText.includes(word)) {
      score +=
        positiveKeywords[word];
    }
  }

  for (const word in negativeKeywords) {
    if (lowerText.includes(word)) {
      score +=
        negativeKeywords[word];
    }
  }

  return score;
};

/* ======================================================
   🚀 FETCH NEWS
====================================================== */

const fetchNews = async () => {
  try {
    console.log(
      "🔑 API KEY:",
      process.env.NEWS_API_KEY
    );

    const query = `
      (
Reliance OR TCS OR Infosys OR HDFC
OR "ICICI Bank" OR SBI OR Wipro
OR HCLTech OR ITC OR "Axis Bank"
OR "Kotak Mahindra Bank"
OR "IDFC First Bank"
OR "Central Bank of India"
OR "Punjab National Bank"
OR "Bank of Baroda"
OR "Canara Bank"
OR "Indian Bank"
OR "Union Bank of India"
)
AND
(
stock OR market OR shares OR earnings
OR profit OR loss OR business
OR finance OR investment OR quarter
OR merger OR acquisition OR results
OR banking OR economy
)
AND India
      `;

    const response =
      await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&language=en&sortBy=publishedAt&pageSize=50&searchIn=title,description&apiKey=${
          process.env.NEWS_API_KEY
        }`
      );

    const articles =
      response.data.articles || [];

    console.log(
      "📰 Articles fetched:",
      articles.length
    );

    let savedCount = 0;

    for (const article of articles) {
      if (!article.url) continue;

      const existing =
        await News.findOne({
          url: article.url,
        });

      if (existing) {
        console.log(
          "⚠️ Duplicate skipped:",
          article.title
        );
        continue;
      }

      const text = `
        ${article.title || ""}
        ${article.description || ""}
      `;

      if (
        !isRelevantFinanceNews(text)
      ) {
        console.log(
          "⛔ Irrelevant skipped:",
          article.title
        );
        continue;
      }

      const result =
        sentiment.analyze(text);

      const weightedScore =
        calculateFinancialScore(
          text,
          result.score
        );

      let sentimentLabel =
        "neutral";

      let prediction =
        "HOLD";

      let confidence = 55;

      if (weightedScore >= 3) {
        sentimentLabel =
          "positive";
      }

      if (weightedScore <= -3) {
        sentimentLabel =
          "negative";
      }

      if (weightedScore >= 8) {
        prediction =
          "STRONG BUY";
        confidence = 95;
      } else if (
        weightedScore >= 5
      ) {
        prediction = "BUY";
        confidence = 85;
      } else if (
        weightedScore <= -8
      ) {
        prediction =
          "STRONG SELL";
        confidence = 95;
      } else if (
        weightedScore <= -5
      ) {
        prediction = "SELL";
        confidence = 85;
      }

      const company =
        detectCompany(text);

      console.log(
        "🏢 DETECTED:",
        company
      );

      await News.create({
        title:
          article.title ||
          "No title",

        description:
          article.description ||
          "No description",

        source:
          article.source?.name ||
          "Unknown",

        url: article.url,

        publishedAt:
          article.publishedAt,

        sentiment:
          sentimentLabel,

        sentimentScore:
          weightedScore,

        prediction,

        confidence,

        company:
          company.name,

        ticker:
          company.ticker,
      });

      savedCount++;
    }

    console.log(
      "✅ News processing completed"
    );

    console.log(
      "📦 Articles saved:",
      savedCount
    );

    return savedCount;
  } catch (error) {
    console.error(
      "❌ NEWS ERROR:",
      error.response?.data ||
        error.message
    );

    return 0;
  }
};

module.exports = fetchNews;