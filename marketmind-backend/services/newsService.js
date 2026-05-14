const axios = require("axios");
const News = require("../models/News");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();

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


// 🔥 Company list
const companies = [
  { name: "Tesla", ticker: "TSLA" },
  { name: "Apple", ticker: "AAPL" },
  { name: "Amazon", ticker: "AMZN" },
  { name: "Microsoft", ticker: "MSFT" },
  { name: "Google", ticker: "GOOGL" },
  { name: "Meta", ticker: "META" },
  { name: "Reliance", ticker: "RELIANCE" },
  { name: "TCS", ticker: "TCS" },
  { name: "Infosys", ticker: "INFY" },
  { name: "HDFC", ticker: "HDFC" }
];

// 🔍 Detect company
const detectCompany = (text) => {
  const lowerText = text.toLowerCase();

  for (let comp of companies) {
    if (lowerText.includes(comp.name.toLowerCase())) {
      return comp;
    }
  }

  return { name: "Unknown", ticker: null };
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

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=tesla&apiKey=${process.env.NEWS_API_KEY}`
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