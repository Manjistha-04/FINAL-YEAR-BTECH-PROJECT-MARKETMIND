const axios = require("axios");
const News = require("../models/News");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();

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
      if (!article.url) continue;

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

      let sentimentLabel = "neutral";
      if (result.score >= 2) sentimentLabel = "positive";
      else if (result.score <= -2) sentimentLabel = "negative";

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
        sentimentScore: result.score,
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