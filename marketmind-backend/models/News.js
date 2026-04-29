const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    source: String,
    url: {
      type: String,
      unique: true, // 🔥 prevents duplicates
    },
    publishedAt: Date,

    sentiment: {
      type: String,
      default: "neutral",
    },

    sentimentScore: Number, // 🔥 numeric value

    company: String, // 🔥 detected company
    ticker: String,  // 🔥 optional

    prediction: {
      type: String,
      enum: ["BUY", "SELL", "HOLD"],
      default: "HOLD",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);