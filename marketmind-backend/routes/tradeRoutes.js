const express = require("express");
const router = express.Router();

const Trade = require("../models/Trade");


// ================= SAVE TRADE =================
router.post("/add", async (req, res) => {
  try {
    const {
      userId,
      username,
      ticker,
      company,
      type,
      quantity,
      price,
      total,
    } = req.body;

    const newTrade = new Trade({
      userId,
      username,
      ticker,
      company,
      type,
      quantity,
      price,
      total,
    });

    await newTrade.save();

    res.status(201).json({
      message: "Trade saved successfully",
      trade: newTrade,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ================= GET ALL TRADES (ADMIN) =================
router.get("/all", async (req, res) => {
  try {
    const trades = await Trade.find()
      .sort({ createdAt: -1 });

    res.status(200).json(trades);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ================= GET USER TRADES =================
router.get("/user/:userId", async (req, res) => {
  try {

    const trades = await Trade.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(trades);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});




module.exports = router;