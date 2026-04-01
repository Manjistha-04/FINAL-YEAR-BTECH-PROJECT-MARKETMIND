/* ===============================
   CENTRAL STOCK & INDEX DATABASE
   =============================== */

export type MarketItem = {
  price: number;
  change: number; // percentage
  sentiment: "Bullish" | "Bearish" | "Neutral";
  bias: string;
};

/* ===== TOP INDICES ===== */
export const INDICES = ["NIFTY 50", "SENSEX", "NIFTYBANK"] as const;

/* ===== STOCK MASTER ===== */
export const STOCKS = [
  "RELIANCE",
  "TCS",
  "INFY",
  "HDFCBANK",
  "ICICIBANK",
  "SBIN",
  "ITC",
  "LT",
  "AXISBANK",
  "MARUTI",
] as const;

/* ===== TOP 5 STOCKS (MARKET OVERVIEW) ===== */
export const TOP_5_STOCKS = [
  "RELIANCE",
  "TCS",
  "INFY",
  "HDFCBANK",
  "ICICIBANK",
] as const;

/* ===== MARKET DATA ===== */
export const MARKET_DATA: Record<string, MarketItem> = {
  /* ---- INDICES ---- */
  "NIFTY 50": {
    price: 26042.3,
    change: -0.22,
    sentiment: "Bearish",
    bias: "↓ Weak momentum",
  },
  SENSEX: {
    price: 85041.45,
    change: -0.14,
    sentiment: "Bearish",
    bias: "↓ Weak momentum",
  },
  NIFTYBANK: {
    price: 59011.35,
    change: -0.18,
    sentiment: "Bearish",
    bias: "↓ Weak momentum",
  },

  /* ---- STOCKS ---- */
  RELIANCE: {
    price: 2458.2,
    change: 0.82,
    sentiment: "Bullish",
    bias: "↑ Volume accumulation",
  },
  TCS: {
    price: 3894.65,
    change: -0.35,
    sentiment: "Neutral",
    bias: "Awaiting AI signal",
  },
  INFY: {
    price: 1622.4,
    change: 0.41,
    sentiment: "Bullish",
    bias: "↑ Trend support",
  },
  HDFCBANK: {
    price: 1684.1,
    change: -0.12,
    sentiment: "Bearish",
    bias: "↓ Supply pressure",
  },
  ICICIBANK: {
    price: 1042.55,
    change: 0.27,
    sentiment: "Bullish",
    bias: "↑ Institutional buying",
  },
  SBIN: {
    price: 734.8,
    change: -0.48,
    sentiment: "Bearish",
    bias: "↓ Profit booking",
  },
  ITC: {
    price: 462.15,
    change: 0.19,
    sentiment: "Bullish",
    bias: "↑ Defensive strength",
  },
  LT: {
    price: 3562.0,
    change: -0.31,
    sentiment: "Neutral",
    bias: "Range bound",
  },
  AXISBANK: {
    price: 1098.75,
    change: -0.22,
    sentiment: "Bearish",
    bias: "↓ Weak RSI",
  },
  MARUTI: {
    price: 12445.3,
    change: 0.56,
    sentiment: "Bullish",
    bias: "↑ Breakout continuation",
  },
};
