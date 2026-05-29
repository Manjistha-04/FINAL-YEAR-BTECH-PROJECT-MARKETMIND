const express = require("express");
const router = express.Router();

const {
  getPortfolioSummary,
} = require("../controllers/portfolioController");

router.get("/summary/:userId", getPortfolioSummary);

module.exports = router;