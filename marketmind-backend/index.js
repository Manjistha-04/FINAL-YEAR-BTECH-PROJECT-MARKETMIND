require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

// 🔥 Connect to MongoDB
connectDB();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "MarketMind Backend Running 🚀" });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("THIS BACKEND FILE IS RUNNING 🚀");
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});

