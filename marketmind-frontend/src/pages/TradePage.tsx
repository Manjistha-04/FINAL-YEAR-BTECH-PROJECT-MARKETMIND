import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import "./TradePage.css";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const API_BASE = import.meta.env.VITE_API_URL;

  /* 🔗 CENTRAL DATA */
import {
  MARKET_DATA,
  STOCKS,
  INDICES,
  TOP_5_STOCKS,
  MarketItem,
} from "../pages/stocklist";

import { availableStocks } from "../data/stocks";

type MarketMap = Record<string, MarketItem>;

const getStorageKeys = (userId: string) => ({
  WATCHLIST_KEY: `marketmind_watchlist_${userId}`,

  HOLDINGS_KEY: `marketmind_holdings_${userId}`,

  BALANCE_KEY: `marketmind_balance_${userId}`,

  ORDERS_KEY: `marketmind_orders_${userId}`,

  ORDERS_DATE_KEY: `marketmind_orders_date_${userId}`,
});

export function TradePage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const USER_ID = storedUser.id;
  const {
    WATCHLIST_KEY,
    HOLDINGS_KEY,
    BALANCE_KEY,
  } = getStorageKeys(USER_ID);

  const [username] = useState(
    storedUser.username || "Trader"
  );

  const [search, setSearch] =
    useState("");
  

  const [selectedStock, setSelectedStock] =
    useState("RELIANCE");

  const [manualQuantity, setManualQuantity] =
    useState(1);

  const [showResults, setShowResults] =
    useState(false);

  /* ✅ ACTIVE TAB */
  const [activeTab, setActiveTab] =
    useState("dashboard");

  /* ⭐ WATCHLIST */
  const [myWatchlist, setMyWatchlist] =
    useState<string[]>(() => {
      const saved =
        localStorage.getItem(
          WATCHLIST_KEY
        );

      return saved
        ? JSON.parse(saved)
        : ["RELIANCE", "TCS"];
    });

  /* 📈 MARKET DATA */
  const [marketData, setMarketData] =
    useState<MarketMap>(MARKET_DATA);

  /* 📰 AI NEWS */
  const [news, setNews] = useState<any[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);
  const [quantity, setQuantity] =
  useState<Record<string, number>>({});
  const [manualEnabled, setManualEnabled] =
    useState<
      Record<
        string,
        {
          buy?: boolean;
          sell?: boolean;
        }
      >
    >({});
  
  

  /* 💰 BALANCE */
  const [balance, setBalance] =
    useState(() => {
      const savedBalance =
        localStorage.getItem(
          BALANCE_KEY
        );

      return savedBalance
        ? Number(savedBalance)
        : storedUser.virtualBalance ||
            100000;
    });

  /* 📦 HOLDINGS */
  const [holdings, setHoldings] =
    useState<any[]>([]);

  /* 📜 ORDERS */
  const [orders, setOrders] =
    useState<any[]>([])
    
    // chart 

  // Portfolio growth demo data
  const portfolioData = [
    { day: "Mon", value: 92000 },
    { day: "Tue", value: 94500 },
    { day: "Wed", value: 97000 },
    { day: "Thu", value: 96000 },
    { day: "Fri", value: balance },
  ];

  // Holdings distribution
  const holdingsData = holdings.map((h) => ({
    name: h.ticker,
    value: h.quantity * h.avgPrice,
  }));

  // ===== PORTFOLIO ANALYTICS =====

  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.quantity * h.avgPrice,
    0
  );

  const currentPortfolioValue = holdings.reduce(
    (sum, h) => {
      const currentPrice =
        marketData[h.ticker]?.price || h.avgPrice;

      return sum + h.quantity * currentPrice;
    },
    0
  );

  const totalPnL =
    currentPortfolioValue - totalInvested;

  const totalPnLPercent =
    totalInvested > 0
      ? ((totalPnL / totalInvested) * 100).toFixed(2)
      : "0";

  // Market trend chart
  const marketTrendData = TOP_5_STOCKS.map(
    (stock) => ({
      name: stock,

      price:
        marketData[stock]
          ?.price || 0,
    })
  );
  // ===== TOP GAINERS / LOSERS =====

  const sortedStocks = Object.entries(marketData)
    .map(([key, value]) => ({
      name: key,
      ...value,
    }))

    .sort((a, b) => b.change - a.change);

  const topGainers = sortedStocks.slice(0, 5);

  const topLosers = [...sortedStocks]
    .sort((a, b) => a.change - b.change)
    .slice(0, 5);

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  

  /* 💾 SAVE WATCHLIST */
  useEffect(() => {
    localStorage.setItem(
      WATCHLIST_KEY,
      JSON.stringify(myWatchlist)
    );
  }, [myWatchlist]);

  /* 💾 SAVE HOLDINGS */
  useEffect(() => {
    localStorage.setItem(
      HOLDINGS_KEY,
      JSON.stringify(holdings)
    );
  }, [holdings]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/auth/user/${USER_ID}`
        );

        const data = await res.json();

        if (data?.virtualBalance !== undefined) {
          setBalance(data.virtualBalance);
        }
      } catch (err) {
        console.error(
          "Balance fetch error:",
          err
        );
      }
    };

    if (USER_ID) {
      fetchBalance();
    }
  }, [USER_ID]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {

        const res = await fetch(
          `${API_BASE}/holdings/${USER_ID}`
        );

        const data = await res.json();

        setHoldings(data);

      } catch (err) {
        console.error(
          "Holdings fetch error:",
          err
        );
      }
    };
    if (USER_ID) {
      fetchHoldings();
    }

  }, [USER_ID]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/trades/user/${USER_ID}`
        );

        const data = await res.json();

        setOrders(data);

      } catch (err) {
        console.error(
          "Orders fetch error:",
          err
        );
      }
    };

    if (USER_ID) {
      fetchOrders();
    }

  }, [USER_ID]);

   

  /* 💾 SAVE BALANCE */
  useEffect(() => {
    localStorage.setItem(
      BALANCE_KEY,
      balance.toString()
    );
  }, [balance]);

 

  /* 🔄 LIVE PRICE */
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => {
        const updated: MarketMap = {};

        Object.keys(prev).forEach(
          (key) => {
            const item = prev[key];

            const randomMove =
              (Math.random() - 0.5) *
              0.4;

            updated[key] = {
              ...item,

              price: +(
                item.price *
                (1 +
                  randomMove / 100)
              ).toFixed(2),

              change: +(
                item.change +
                randomMove
              ).toFixed(2),
            };
          }
        );

        return updated;
      });
    }, 2000);

    return () =>
      clearInterval(interval);
  }, []);

  /* 🔍 SEARCH */
  const filteredStocks =
    STOCKS.filter((s) =>
      s
        .toLowerCase()
        .startsWith(
          search.toLowerCase()
        )
    );

  /* ➕ ADD WATCHLIST */
  const addToWatchlist = (
    stock: string
  ) => {
    if (
      myWatchlist.includes(stock)
    )
      return;

    setMyWatchlist((prev) => [
      ...prev,
      stock,
    ]);

    setSearch("");
    setShowResults(false);
  };

  /* ❌ REMOVE WATCHLIST */
  const removeFromWatchlist = (
    stock: string
  ) => {
    setMyWatchlist((prev) =>
      prev.filter((s) => s !== stock)
    );
  };

  /* 🟢 BUY */
  const handleBuy = async (itemOrTicker: any, manualQuantity?: number) => {
    const item = typeof itemOrTicker === "string" ? {
      ticker: itemOrTicker,

      company: availableStocks.find((s) =>
        s.ticker === itemOrTicker)?.company || itemOrTicker,
    }
    : itemOrTicker;

    if (
  item.ticker === "MARKET" ||
  item.company === "Market"
) {
  alert(
    "Generic market news cannot be traded"
  );
  return;
}

    const price = marketData[item.ticker]?.price || item.price ||1000;
    const tradeQuantity =
      manualQuantity ?? quantity[item._id] ?? 1;

    const totalCost =
      price * tradeQuantity;
      
    if (balance < totalCost) {
      alert(
        "Insufficient balance"
      );

      return;
    }

    const newBalance =
      balance - totalCost;

    setBalance(newBalance);

    fetch(
      `${API_BASE}/auth/update-balance`,
      {
        method: "POST",

        headers: {
          "Content-Type":
          "application/json",
        },

        body: JSON.stringify({
          userId: storedUser.id,
          balance: newBalance,
        }),
      }
    );

    const existing =
      holdings.find(
        (h) =>
          h.ticker ===
          item.ticker
      );

    if (existing) {
      setHoldings((prev) =>
        prev.map((h) =>
          h.ticker === item.ticker
            ? {
                ...h,

                quantity:
                  h.quantity + tradeQuantity,

                avgPrice:
                  (h.avgPrice *
                    h.quantity +
                    totalCost) /
                  (h.quantity + tradeQuantity),
              }
            : h
        )
      );
    } else {
      setHoldings((prev) => [
        ...prev,
        {
          ticker: item.ticker,
          company: item.company,
          quantity: tradeQuantity,
          avgPrice: price,
        },
      ]);
    }

    const updatedHolding = existing
      ? {
        quantity:
          existing.quantity + tradeQuantity,

        avgPrice:
          (existing.avgPrice *
            existing.quantity +
            totalCost) /
          (existing.quantity + tradeQuantity),
        }
      : {
          quantity: tradeQuantity,
          avgPrice: price,
        };

    await fetch(
      `${API_BASE}/holdings/update`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          userId: USER_ID,

          ticker: item.ticker,

          company:
            item.company || "Unknown",

          quantity:
            updatedHolding.quantity,

          avgPrice:
            updatedHolding.avgPrice,
        }),
      }
    );



    /* 📜 SAVE ORDER */
    const newOrder = {
      id: Date.now(),

      type: "BUY",

      ticker: item.ticker,

      company: item.company,

      price,

      tradeQuantity,

      time:
        new Date().toLocaleTimeString(),
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);

    try{
      await fetch(
        `${API_BASE}/trades/add`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: storedUser.id,
            username: storedUser.username,

            ticker: item.ticker || item.company || "UNKNOWN",

            company: item.company || item.ticker || "Unknown",

            type: "BUY",

            quantity: tradeQuantity,

            price,

            total: totalCost,
          }),
        }
      );
    } catch(err){
      console.error(
        "Trade save failed:",
        err
    );
  }
  alert(`${tradeQuantity} ${item.ticker} item bought sucessfully`);

  };

  /* 🔴 SELL */
  const handleSell = async (
    itemOrTicker: any,
    manualQuantity?: number
  ) => {
    const item = typeof itemOrTicker === "string"
      ? {
        ticker: itemOrTicker,
        company: availableStocks.find(
          (s) => s.ticker === itemOrTicker)?.company || itemOrTicker,
        }
      : itemOrTicker;

      if (
        item.ticker === "MARKET" ||
        item.company === "Market"
      ) {
      alert(
        "Generic market news cannot be traded"
      );
      return;
      }
    const price =
      marketData[item.ticker]
        ?.price ||

      item.price ||
      1000;
    const tradeQuantity = manualQuantity ?? quantity[item._id] ?? 1;

    const totalSell =
      price * tradeQuantity;

    const existing =
      holdings.find(
        (h) =>
          h.ticker ===
          item.ticker
      );

    if (
  !existing || existing.quantity < tradeQuantity) {
      alert(
        "You don't own this stock"
      );

      return;
    }

    const newBalance =
      balance + totalSell;
    setBalance(newBalance);
    fetch(
      `${API_BASE}/auth/update-balance`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          userId: storedUser.id,
          balance: newBalance,
        }),
      }
    );

    const updatedQuantity = existing.quantity - tradeQuantity;

    if (updatedQuantity <= 0) {
      setHoldings((prev) =>
        prev.filter(
          (h) => h.ticker !== item.ticker
        )
      );
    } else {
      setHoldings((prev) =>
        prev.map((h) =>
          h.ticker === item.ticker
            ? {
                ...h,
                quantity: updatedQuantity,
              }
            : h
        )
      );
    }


    if (updatedQuantity <= 0) {

      await fetch(
        `${API_BASE}/holdings/delete`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId: USER_ID,
            ticker: item.ticker,
          }),
        }
      );
  
    } else {

      await fetch(
        `${API_BASE}/holdings/update`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId: USER_ID,

            ticker: item.ticker,

            company:
              item.company || "Unknown",

            quantity: updatedQuantity,

            avgPrice:
              existing.avgPrice,
          }),
        }
      );
    }

    /* 📜 SAVE ORDER */
    const newOrder = {
      id: Date.now(),

      type: "SELL",

      ticker: item.ticker,

      company: item.company,

      avgPrice:price,

      quantity: tradeQuantity,

      time:
        new Date().toLocaleTimeString(),
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);

    try{
      await fetch(
        `${API_BASE}/trades/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: storedUser.id,
            username: storedUser.username,

            ticker: item.ticker || "UNKNOWN",

            company: item.company || "Unknown",

            type: "SELL",

            quantity: tradeQuantity,

            price,

            total: totalSell,
          }),
        }
      );
    } catch (err){
      console.error(
        "Trade save failed:",
        err
      );
  }
  alert(`${tradeQuantity} ${item.ticker} item sold successfully`);
};

  /* 🔥 FETCH AI NEWS */
  useEffect(() => {
    const fetchNews =
      async () => {
        try {
          const res = await fetch(
            `${API_BASE}/news`
          );

          const data =
            await res.json();

          console.log(
            "TradePage News:",
            data
          );

          setNews(data);
        } catch (err) {
          console.error(
            "News fetch error:",
            err
          );
        } finally {
          setLoading(false);
        }
      };

    fetchNews();
  }, []);

  return (
    <div className="trade-root">
      {/* ===== LIVE TICKER ===== */}
      <div className="trade-ticker">
        {INDICES.map((idx) => {
  const d = marketData[idx];

  return (
    <div
      key={idx}
      className={`watch-item ${
        d.change >= 0
          ? "up"
          : "down"
      }`}
      onClick={() =>
        navigate(`/chart/${idx}`)
      }
      style={{
        cursor: "pointer",
      }}
    >
      <span>{idx}</span>

      <small>
        {d.price.toFixed(2)}{" "}
        {d.change >= 0
          ? "▲"
          : "▼"}
      </small>
    </div>
  );
})}
      </div>

      {/* ===== NAVBAR ===== */}
      <header className="trade-topbar">
        <img
          src={logo}
          className="trade-logo-img"
          alt="MarketMind"
        />

        <div className="trade-center">
          <nav className="trade-nav">
            {storedUser.role === "admin" && (
              <span
                onClick={() => navigate("/admin")}
              >
                Admin Panel
              </span>
            )}
            <span
              className={
                activeTab ===
                "dashboard"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab(
                  "dashboard"
                )
              }
            >
              Dashboard
            </span>

            <span
              className={
                activeTab ===
                "orders"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab(
                  "orders"
                )
              }
            >
              Orders
            </span>

            <span
              className={
                activeTab ===
                "positions"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab(
                  "positions"
                )
              }
            >
              Positions
            </span>

            <span>
              AI Insights
            </span>
          </nav>

          <div className="trade-disclaimer">
  <span>⚠️</span>

  <span>
    <strong>Demo Platform:</strong> Educational trading only. No real-money
    trading or financial advice.
  </span>
</div>
          {/* ===== SEARCH ===== */}
          <div className="trade-search">
            <input
              placeholder="Search stocks..."
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );

                setShowResults(true);
              }}
              onBlur={() =>
                setTimeout(
                  () =>
                    setShowResults(
                      false
                    ),
                  150
                )
              }
            />

            {showResults &&
              search && (
                <div className="search-dropdown">
                  {filteredStocks.map(
                    (stock) => (
                      <div
                        key={stock}
                        className="search-item"
                      >
                        <span>
                          {stock}
                        </span>

                        <button
                          className="add-btn"
                          onMouseDown={() =>
                            addToWatchlist(
                              stock
                            )
                          }
                        >
                          + Add
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
        </div>

        {/* ===== USER ===== */}
        <div className="trade-user-section">
          <div className="trade-user-info">
            <span className="trade-username">
              Welcome,{" "}
              {username}
            </span>

            <span className="trade-balance">
              ₹{" "}
              {balance.toLocaleString()}
            </span>
          </div>

          <button
            className="trade-logout-btn"
            onClick={() => {
              localStorage.removeItem(
                "token"
              );

              localStorage.removeItem(
                "user"
              );

              localStorage.removeItem(
                "isLoggedIn"
              );

              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ===== BODY ===== */}
      <div className="trade-body">
        {/* ===== SIDEBAR ===== */}
        <aside className="trade-watchlist">
          <div className="watchlist-title">
            Top Indices
          </div>

          {INDICES.map((idx) => {
            const d =
              marketData[idx];

            return (
              <div
                key={idx}
                className={`watch-item ${
                  d.change >= 0
                    ? "up"
                    : "down"

                }`}
                onClick={() =>
                  navigate(`/chart/${idx}`)
                }
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{idx}</span>

                <small>
                  {d.price.toFixed(
                    2
                  )}{" "}
                  {d.change >= 0
                    ? "▲"
                    : "▼"}
                </small>
              </div>
            );
          })}

          <div
            className="watchlist-title"
            style={{
              marginTop: 16,
            }}
          >
            My Watchlist
          </div>

          {myWatchlist.map(
            (stock) => {
              const d =
                marketData[
                  stock
                ];

              return (
                <div
                  key={stock}
                  className={`watch-item ${
                    d.change >= 0
                      ? "up"
                      : "down"
                  }`}
                >
                  <span>
                    {stock}
                  </span>

                  <small>
                    {d.price.toFixed(
                      2
                    )}{" "}
                    {d.change >= 0
                      ? "▲"
                      : "▼"}

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromWatchlist(
                          stock
                        )
                      }
                    >
                      ✕
                    </button>
                  </small>
                </div>
              );
            }
          )}
        </aside>

        {/* ===== MAIN ===== */}
        <main className="trade-content">
          {/* ===== DASHBOARD ===== */}
          {activeTab ===
            "dashboard" && (
            <>
              <h2>
                Market Overview
                (Top 5 Stocks)
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                <div className="modern-card">
                  <h3>Total Portfolio</h3>

                  <h1>
                    ₹
                    {currentPortfolioValue.toLocaleString()}
                  </h1>
                </div>
                <div className="modern-card">
                  <h3>Total Invested</h3>
                  <h1>
                    ₹
                    {totalInvested.toLocaleString()}
                  </h1>
                </div>
                <div className="modern-card">
                  <h3>Total P/L</h3>

                  <h1
                    style={{
                      color:
                        totalPnL >= 0
                          ? "#22c55e"
                          : "#ef4444",
                    }}
                  >
                    {totalPnL >= 0 ? "+" : ""}
                    {totalPnLPercent}%
                  </h1>
                </div>
                <div className="modern-card">
                  <h3>P/L %</h3>

                  <h1
                    style={{
                      color:
                        totalPnL >= 0
                          ? "#22c55e"
                          : "#ef4444",
                    }}
                  >
                    {totalPnL >= 0 ? "+" : ""}
                    ₹{totalPnLPercent}%
                  </h1>
                </div>



              </div>

              <div className="trade-table">
                <div className="table-head">
                  <span>
                    Instrument
                  </span>

                  <span>
                    Sentiment
                  </span>

                  <span>
                    AI Bias
                  </span>
                </div>

                {TOP_5_STOCKS.map(
                  (stock) => {
                    const d =
                      marketData[
                        stock
                      ];

                    return (
                      <div
                        key={
                          stock
                        }
                        className="table-row"
                      >
                        <span>
                          {stock}
                        </span>

                        <span
                          className={
                            d.change >=
                            0
                              ? "bull"
                              : "bear"
                          }
                        >
                          {
                            d.sentiment
                          }
                        </span>

                        <span>
                          {d.bias}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="modern-card"
                style={{
                  marginBottom: "30px",
                  padding: "20px",
                }}
              >
                <h2>Trade Any Stock</h2>

                <p
                  style={{
                    opacity: 0.7,
                    marginBottom: "16px",
                  }}
                >
                  Buy or sell any Indian stock manually
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {/* STOCK SELECT */}
                  <select
                    value={selectedStock}
                    onChange={(e) =>
                      setSelectedStock(
                        e.target.value
                      )
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    {availableStocks.map(
                      (stock) => (
                        <option
                          key={stock.ticker}
                          value={stock.ticker}
                        >
                          {stock.company} (
                          {stock.ticker})
                        </option>
                      )
                    )}
                  </select>

                  {/* QUANTITY */}
                  <input
                    type="number"
                    min="1"
                    value={manualQuantity}
                    onChange={(e) =>
                      setManualQuantity(
                        Number(e.target.value)
                      )
                    }
                    style={{
                      width: "100px",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  />

                  {/* BUY */}
                  <button
                    className="buy-btn"
                    onClick={() =>
                      handleBuy(
                        selectedStock,
                        manualQuantity
                      )
                    }
                  >
                    Buy Stock
                  </button>

                  {/* SELL */}   
                  <button
                    className="sell-btn"
                    onClick={() =>
                      handleSell(
                        selectedStock,
                        manualQuantity
                      )
                    }
                  >
                    Sell Stock
                  </button>
                </div>
              </div>
        
              {/* ===== AI NEWS ===== */}
              <h2
                style={{
                  marginTop: "30px",
                }}
              >
                AI News Trading
              </h2>
              
              <div className="ai-news-section">

                {loading ? (
                  <p>
                    Loading AI
                    market
                    analysis...
                  </p>
                ) : (
                  news
                    .slice(0, 20)
                    .map(
                      (
                        item,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="ai-news-card"
                        >
                          <h4>
                            {
                              item.title
                            }
                          </h4>

                          <p>
                            <b>
                              {
                                item.company
                              }
                            </b>{" "}
                            (
                            {
                              item.ticker
                            }
                            )
                          </p>

                          <p
                            style={{
                              color:
                                item.sentiment ===
                                "positive"
                                  ? "green"
                                  : item.sentiment ===
                                    "negative"
                                  ? "red"
                                  : "gray",
                            }}
                          >
                            Sentiment:
                            {" "}
                            {
                              item.sentiment
                            }
                          </p>

                          <p
                            style={{
                              fontSize:
                                "13px",

                              opacity:
                                0.7,
                            }}
                          >
                            Sentiment
                            Score:
                            {" "}
                            {
                              item.sentimentScore
                            }
                          </p>

                          <p
                            style={{
                              color:
                                item.prediction ===
                                "BUY"
                                  ? "#22c55e"
                                  : item.prediction ===
                                    "SELL"
                                  ? "#ef4444"
                                  : "#f59e0b",

                              fontWeight:
                                "bold",
                            }}
                          >
                            Prediction:
                            {" "}
                            {
                              item.prediction
                            }
                          </p>

                          <p
                            style={{
                              marginTop:
                                "6px",

                              fontSize:
                                "14px",

                              color:
                                "#9ca3af",
                            }}
                          >
                            AI
                            Confidence:
                            {" "}
                            {
                              item.confidence
                            }
                            %
                          </p>

                          <p
                            style={{
                              marginTop:
                                "6px",

                              fontSize:
                                "12px",

                              opacity:
                                0.6,
                            }}
                          >
                            Updated:
                            {" "}
                            {new Date(
                              item.publishedAt
                            ).toLocaleTimeString()}
                          </p>

                          <div
                            style={{
                              marginTop: "10px",
                              display: "flex",
                              gap: "10px",
                              flexWrap: "wrap",
                            }}
                          >
                          <div className="quantity-box">
                            <button
                              onClick={() =>
                                setQuantity((prev) => ({
                                  ...prev,
                                  [item._id]: Math.max(
                                    1,
                                    (prev[item._id] || 1) - 1
                                  ),
                                }))
                              }
                            >
                              -
                            </button>

                            <input
                              type="number"
                              min="1"
                              value={quantity[item._id] || 1}
                              onChange={(e) =>
                                setQuantity((prev) => ({
                                  ...prev,
                                  [item._id]:
                                    Number(e.target.value) || 1,
                                }))
                              }
                            />

                            <button
                              onClick={() =>
                                setQuantity((prev) => ({
                                  ...prev,
                                  [item._id]:
                                    (prev[item._id] || 1) + 1,
                                }))
                              }
                            >
                              +
                            </button>
                          </div>

                            {/* BUY BUTTON */}
                            <button
                              className={`buy-btn ${
                                (
                                  (
                                    item.prediction === "SELL" ||
                                    item.prediction === "STRONG SELL" ||
                                    item.prediction === "HOLD"
                                  ) &&
                                  !manualEnabled[item._id]?.buy
                                )
                                  ? "disabled-btn"
                                  : ""
                              }`}
                              disabled={
                                (
                                  item.prediction === "SELL" ||
                                  item.prediction === "STRONG SELL" ||
                                  item.prediction === "HOLD"
                                ) &&
                                !manualEnabled[item._id]?.buy
                              }
                              onClick={() => handleBuy(item)}
                            >
                            BUY
                            </button>

                            {/* SELL BUTTON */}
                            <button
                              className={`sell-btn ${
                                (
                                  (
                                    item.prediction === "BUY" ||
                                    item.prediction === "STRONG BUY" ||
                                    item.prediction === "HOLD"
                                  ) &&
                                  !manualEnabled[item._id]?.sell
                                )
                                  ? "disabled-btn"
                                  : ""
                              }`}
                              disabled={
                                (
                                  item.prediction === "BUY" ||
                                  item.prediction === "STRONG BUY" ||
                                  item.prediction === "HOLD"
                                ) &&
                                !manualEnabled[item._id]?.sell
                              }
                              onClick={() => handleSell(item)}
                            >
                            SELL
                            </button>

                            {/* HOLD MODE */}
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                marginTop: "8px",
                                flexWrap: "wrap",
                              }}
                            >
                              <button
                                className="manual-btn"
                                onClick={() =>
                                  setManualEnabled((prev) => ({
                                    ...prev,
                                    [item._id]: {
                                      ...prev[item._id],
                                      buy: true,
                                    },
                                  }))
                                }
                              >
                                Enable BUY
                              </button>

                              <button
                                className="manual-btn"
                                onClick={() =>
                                  setManualEnabled((prev) => ({
                                    ...prev,
                                    [item._id]: {
                                      ...prev[item._id],
                                      sell: true,
                                    },
                                  }))
                                }
                              >
                                Enable SELL
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    )
                )}
              </div>
              {/* ===== CHARTS ===== */}

              <div
                style={{
                  marginTop: "40px",
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "20px",
                }}
              >
              {/* PORTFOLIO CHART */}
              <div className="modern-card">
                <h3
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  Portfolio Growth
                </h3>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <LineChart
                    data={portfolioData}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#22c55e"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* ===== TOP MOVERS ===== */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "20px",
                  marginTop: "30px",
                }}
              >
              {/* TOP GAINERS */}
              <div className="modern-card">
                <h2
                  style={{
                    marginBottom: "20px",
                    color: "#22c55e",
                  }}
                >
                  🚀 Top Gainers
                </h2>

                {topGainers.map((stock) => (
                  <div
                    key={stock.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div>
                      <strong>{stock.name}</strong>

                      <p
                        style={{
                          fontSize: "12px",
                          opacity: 0.7,
                        }}
                      >
                        ₹{stock.price.toFixed(2)}
                      </p>
                    </div>

                    <div
                      style={{
                        color: "#22c55e",
                        fontWeight: "bold",
                      }}
                    >
                      +{stock.change.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>

              {/* TOP LOSERS */}
              <div className="modern-card">
                <h2
                  style={{
                    marginBottom: "20px",
                    color: "#ef4444",
                  }}
                >
                  📉 Top Losers
                </h2>

                {topLosers.map((stock) => (
                  <div
                    key={stock.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom:
                        "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div>
                      <strong>{stock.name}</strong>

                      <p
                        style={{
                          fontSize: "12px",
                          opacity: 0.7,
                        }}
                      >
                        ₹{stock.price.toFixed(2)}
                      </p>
                    </div>

                    <div
                      style={{
                        color: "#ef4444",
                        fontWeight: "bold",
                      }}
                    >
                      {stock.change.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>




              {/* HOLDINGS PIE */}
              <div className="modern-card">
                <h3
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  Portfolio Distribution
                </h3>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                <PieChart>
                  <Pie
                    data={holdingsData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {holdingsData.map(
                      (
                        _,
                        index
                      ) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* MARKET TREND */}
            <div className="modern-card">
              <h3
                style={{
                  marginBottom: "20px",
                }}
              >
                Market Trend
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
              <LineChart
                data={
                  marketTrendData
                }
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
               
            </>
          )}

                    {/* ===== ORDERS ===== */}
          {activeTab ===
            "orders" && (
            <div className="modern-section">
              <div className="section-header">
                <div>
                  <h2>
                    Orders
                  </h2>

                  <p>
                    Track all your
                    trades
                  </p>
                </div>

                <div className="section-badge">
                  {orders.length}
                  {" "}
                  Orders
                </div>
              </div>

              {orders.length ===
              0 ? (
                <div className="empty-state">
                  <h3>
                    No Orders Yet
                  </h3>

                  <p>
                    Buy/Sell
                    orders will
                    appear here.
                  </p>
                </div>
              ) : (
                <div className="modern-grid">
                  {orders.map(
                    (
                      order
                    ) => (
                      <div
                        key={order._id || order.id}
                        className="modern-card"
                      >
                        <div className="card-top">
                          <div>
                            <h3>
                              {
                                order.ticker
                              }
                            </h3>

                            <p>
                              {
                                order.company
                              }
                            </p>
                          </div>

                          <div
                            className={`trade-type ${
                              order.type ===
                              "BUY"
                                ? "buy"
                                : "sell"
                            }`}
                          >
                            {
                              order.type
                            }
                          </div>
                        </div>

                        <div className="card-divider"></div>

                        <div className="trade-info">
                          <div>
                            <span>
                              Price
                            </span>

                            <strong>
                              ₹
                              {Number(
                                order.price
                              ).toFixed(
                                2
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Qty
                            </span>

                            <strong>
                              {
                                order.quantity
                              }
                            </strong>
                          </div>

                          <div>
                            <span>
                              Time
                            </span>

                            <strong>
                              {
                                order.time || (order.createdAt ? new Date(order.createdAt).toLocaleTimeString(): "--")
                              }
                            </strong>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          {/* ===== POSITIONS ===== */}
          {activeTab ===
            "positions" && (
            <div className="modern-section">
              <div className="section-header">
                <div>
                  <h2>
                    Positions
                  </h2>

                  <p>
                    Your live
                    portfolio
                  </p>
                </div>

                <div className="section-badge green">
                  {holdings.length}
                  {" "}
                  Holdings
                </div>
              </div>

              {holdings.length ===
              0 ? (
                <div className="empty-state">
                  <h3>
                    No Positions
                  </h3>

                  <p>
                    Buy stocks to
                    create your
                    portfolio.
                  </p>
                </div>
              ) : (
                <div className="modern-grid">
                  {holdings.map(
                    (
                      holding,
                      index
                    ) => {
                      const currentPrice =
                        marketData[
                          holding
                            .ticker
                        ]?.price ||
                        holding.avgPrice;

                      const invested =
                        holding.quantity *
                        holding.avgPrice;

                      const current =
                        holding.quantity *
                        currentPrice;

                      const pnl =
                        current -
                        invested;

                      const pnlPercent =
                        invested > 0 ? ((pnl/invested) * 100).toFixed(2): "0.00";

                      return (
                        <div
                          key={
                            index
                          }
                          className="modern-card"
                        >
                          <div className="card-top">
                            <div>
                              <h3>
                                {
                                  holding.ticker
                                }
                              </h3>

                              <p>
                                {
                                  holding.company
                                }
                              </p>
                            </div>

                            <div
                              className={`pnl-badge ${
                                pnl >= 0
                                  ? "profit"
                                  : "loss"
                              }`}
                            >
                              {pnl >=
                              0
                                ? "+"
                                : ""}
                              {
                                pnlPercent
                              }
                              %
                            </div>
                          </div>

                          <div className="card-divider"></div>

                          <div className="position-stats">
                            <div>
                              <span>
                                Qty
                              </span>

                              <strong>
                                {
                                  holding.quantity
                                }
                              </strong>
                            </div>

                            <div>
                              <span>
                                Avg
                              </span>

                              <strong>
                                ₹
                                {holding.avgPrice.toFixed(
                                  2
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>
                                Current
                              </span>

                              <strong>
                                ₹
                                {currentPrice.toFixed(
                                  2
                                )}
                              </strong>
                            </div>
                          </div>

                          <div className="investment-box">
                            <div>
                              <span>
                                Invested
                              </span>

                              <strong>
                                ₹
                                {invested.toLocaleString()}
                              </strong>
                            </div>

                            <div>
                              <span>
                                Current
                                Value
                              </span>

                              <strong>
                                ₹
                                {current.toLocaleString()}
                              </strong>
                            </div>
                          </div>

                          <div
                            className={`pnl-section ${
                              pnl >= 0
                                ? "profit"
                                : "loss"
                            }`}
                          >
                            P/L: ₹
                            {pnl.toFixed(
                              2
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}