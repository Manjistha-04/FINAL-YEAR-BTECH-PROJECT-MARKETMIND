const Holding = require("../models/Holding");

const getPortfolioSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const holdings = await Holding.find({ userId });

    let totalInvested = 0;
    let totalCurrentValue = 0;

    const {
      getStockPrice,
    } = require("../services/stockService");

    const updatedHoldings = await Promise.all(holdings.map(async (holding) => { 
        holding.quantity * holding.avgPrice;

      // TEMP current price logic
      // Replace later with live stock price
      const currentPrice = await getStockPrice(holding.ticker);
      const currentValue =
        holding.quantity * currentPrice;

      const profitLoss =
        currentValue - invested;

      totalInvested += invested;
      totalCurrentValue += currentValue;

      return {
        ...holding._doc,
        invested,
        currentPrice,
        currentValue,
        profitLoss,
      };
    })
    );

    const totalProfitLoss =
      totalCurrentValue - totalInvested;

    const profitLossPercentage =
      totalInvested > 0
        ? (totalProfitLoss / totalInvested) * 100
        : 0;

    res.status(200).json({
      holdings: updatedHoldings,
      totalInvested,
      totalCurrentValue,
      totalProfitLoss,
      profitLossPercentage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching portfolio summary",
    });
  }
};

module.exports = {
  getPortfolioSummary,
};