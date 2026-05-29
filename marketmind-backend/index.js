require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const fetchNews = require("./services/newsService");

const connectDB = require("./config/db");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ FIXED
const adminRoutes = require("./routes/adminRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const holdingRoutes = require("./routes/holdingRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

// 🔥 Connect to MongoDB
connectDB();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trades", tradeRoutes);

// admin
app.use("/api/admin", adminRoutes);
app.use("/api/holdings", holdingRoutes);

// portfolio
app.use("/api/portfolio", portfolioRoutes);

// TEST ROUTES
app.get("/", (req, res) => {
  res.json({ message: "MarketMind Backend Running 🚀" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});

app.get("/api/fetch-news", async (req, res) => {
  try {
    const count = await fetchNews();

    res.json({
      success: true,
      saved: count,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
    });
  }
});

// ⏰ AUTO FETCH NEWS EVERY HOUR
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Running automatic news fetch...");

  try {
    const count = await fetchNews();

    console.log(`✅ Auto news fetch completed: ${count} articles`);
  } catch (err) {
    console.error("❌ Cron fetch failed:", err.message);
  }
});

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("THIS BACKEND FILE IS RUNNING 🚀");
  console.log(`Server running on port ${PORT}`);
});