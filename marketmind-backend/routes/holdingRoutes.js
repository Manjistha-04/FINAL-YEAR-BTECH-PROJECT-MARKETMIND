const express = require("express");

const router = express.Router();

const Holding = require("../models/Holding");


// ================= GET USER HOLDINGS =================
router.get("/:userId", async (req, res) => {
  try {
    const holdings = await Holding.find({
      userId: req.params.userId,
    });

    res.status(200).json(holdings);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ================= CREATE / UPDATE HOLDING =================
router.post("/update", async (req, res) => {
  try {
    const {
      userId,
      ticker,
      company,
      quantity,
      avgPrice,
    } = req.body;

    const existingHolding =
      await Holding.findOne({
        userId,
        ticker,
      });

    // ✅ UPDATE EXISTING
    if (existingHolding) {

      existingHolding.quantity =
        quantity;

      existingHolding.avgPrice =
        avgPrice;

      await existingHolding.save();

      return res.status(200).json({
        message: "Holding updated",
        holding: existingHolding,
      });
    }

    // ✅ CREATE NEW
    const newHolding =
      await Holding.create({
        userId,
        ticker,
        company,
        quantity,
        avgPrice,
      });

    res.status(201).json({
      message: "Holding created",
      holding: newHolding,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ================= DELETE HOLDING =================
router.delete(
  "/:userId/:ticker",
  async (req, res) => {
    try {

      await Holding.findOneAndDelete({
        userId: req.params.userId,
        ticker: req.params.ticker,
      });

      res.status(200).json({
        message: "Holding removed",
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

router.post("/delete", async (req, res) => {
  try {

    const { userId, ticker } = req.body;

    await Holding.findOneAndDelete({
      userId,
      ticker,
    });

    res.status(200).json({
      message: "Holding deleted",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;