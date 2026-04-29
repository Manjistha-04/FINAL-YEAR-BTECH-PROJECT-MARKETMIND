const express = require("express");
const router = express.Router();
const News = require("../models/News");
const fetchNews = require("../services/newsService");

// ✅ Fetch news (MUST BE BEFORE :company)
router.get("/fetch", async (req, res) => {
  try {
    const count = await fetchNews();
    console.log("COUNT RECEIVED:", count);

    res.json({
      message: "News fetched and stored",
      articlesProcessed: count,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Predictions
router.get("/predictions/all", async (req, res) => {
  try {
    const data = await News.find({}, "title company prediction sentiment");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ All news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }).limit(50);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❗ ALWAYS LAST
router.get("/:company", async (req, res) => {
  try {
    const company = req.params.company;

    const news = await News.find({
      company: { $regex: company, $options: "i" },
    }).sort({ publishedAt: -1 });

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;