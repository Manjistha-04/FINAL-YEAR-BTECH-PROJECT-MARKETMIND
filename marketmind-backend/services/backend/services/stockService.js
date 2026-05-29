const yahooFinance = require("yahoo-finance2").default;

const getStockPrice = async (ticker) => {
  try {
    const result = await yahooFinance.quote(
      `${ticker}.NS`
    );

    return result.regularMarketPrice;
  } catch (error) {
    console.log(
      `Error fetching ${ticker}:`,
      error.message
    );

    return 1000;
  }
};

module.exports = {
  getStockPrice,
};