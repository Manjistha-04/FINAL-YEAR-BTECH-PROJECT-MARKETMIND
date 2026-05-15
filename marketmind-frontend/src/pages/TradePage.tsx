import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import "./TradePage.css";
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

/* 🔗 CENTRAL DATA */
import {
  MARKET_DATA,
  STOCKS,
  INDICES,
  TOP_5_STOCKS,
  MarketItem,
} from "../pages/stocklist";

type MarketMap = Record<string, MarketItem>;

const WATCHLIST_KEY = "marketmind_watchlist";
const HOLDINGS_KEY = "marketmind_holdings";
const BALANCE_KEY = "marketmind_balance";

const ORDERS_KEY = "marketmind_orders";
const ORDERS_DATE_KEY =
  "marketmind_orders_date";

export function TradePage() {
  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

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

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [username] = useState(
    storedUser.username || "Trader"
  );

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
    useState<any[]>(() => {
      const saved =
        localStorage.getItem(
          HOLDINGS_KEY
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  /* 📜 ORDERS */
  const [orders, setOrders] =
    useState<any[]>(() => {
      const savedOrders =
        localStorage.getItem(
          ORDERS_KEY
        );

      const savedDate =
        localStorage.getItem(
          ORDERS_DATE_KEY
        );

      const today =
        new Date().toDateString();

      /* 🔄 RESET DAILY */
      if (savedDate !== today) {
        localStorage.removeItem(
          ORDERS_KEY
        );

        localStorage.setItem(
          ORDERS_DATE_KEY,
          today
        );

        return [];
      }

      return savedOrders
        ? JSON.parse(savedOrders)
        : [];
    });

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

  /* 💾 SAVE BALANCE */
  useEffect(() => {
    localStorage.setItem(
      BALANCE_KEY,
      balance.toString()
    );
  }, [balance]);

  /* 💾 SAVE ORDERS */
  useEffect(() => {
    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(orders)
    );
  }, [orders]);

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
  const handleBuy = (item: any) => {
    const price =
      marketData[item.ticker]
        ?.price ||
      item.price ||
      1000;

    if (balance < price) {
      alert(
        "Insufficient balance"
      );

      return;
    }

    setBalance(
      (prev: number) =>
        prev - price
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
                  h.quantity + 1,

                avgPrice:
                  (h.avgPrice *
                    h.quantity +
                    price) /
                  (h.quantity + 1),
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
          quantity: 1,
          avgPrice: price,
        },
      ]);
    }

    /* 📜 SAVE ORDER */
    const newOrder = {
      id: Date.now(),

      type: "BUY",

      ticker: item.ticker,

      company: item.company,

      price,

      quantity: 1,

      time:
        new Date().toLocaleTimeString(),
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);

    alert(
      `Bought ${item.ticker} @ ₹${price}`
    );
  };

  /* 🔴 SELL */
  const handleSell = (
    item: any
  ) => {
    const price =
      marketData[item.ticker]
        ?.price ||
      item.price ||
      1000;

    const existing =
      holdings.find(
        (h) =>
          h.ticker ===
          item.ticker
      );

    if (!existing) {
      alert(
        "You don't own this stock"
      );

      return;
    }

    setBalance(
      (prev: number) =>
        prev + price
    );

    if (
      existing.quantity === 1
    ) {
      setHoldings((prev) =>
        prev.filter(
          (h) =>
            h.ticker !==
            item.ticker
        )
      );
    } else {
      setHoldings((prev) =>
        prev.map((h) =>
          h.ticker === item.ticker
            ? {
                ...h,

                quantity:
                  h.quantity - 1,
              }
            : h
        )
      );
    }

    /* 📜 SAVE ORDER */
    const newOrder = {
      id: Date.now(),

      type: "SELL",

      ticker: item.ticker,

      company: item.company,

      price,

      quantity: 1,

      time:
        new Date().toLocaleTimeString(),
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);

    alert(
      `Sold ${item.ticker} @ ₹${price}`
    );
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
          const d =
            marketData[idx];

          return (
            <span key={idx}>
              {idx}{" "}
              {d.price.toFixed(2)}{" "}
              <span
                className={
                  d.change >= 0
                    ? "bull"
                    : "bear"
                }
              >
                {d.change >= 0
                  ? "▲"
                  : "▼"}{" "}
                {Math.abs(d.change)}
                %
              </span>
            </span>
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

              {/* ===== AI NEWS ===== */}
              <h2
                style={{
                  marginTop:
                    "30px",
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
                    .slice(0, 5)
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
                              marginTop:
                                "10px",
                            }}
                          >
                            <button
                              className="buy-btn"
                              onClick={() =>
                                handleBuy(
                                  item
                                )
                              }
                            >
                              BUY
                            </button>

                            <button
                              className="sell-btn"
                              onClick={() =>
                                handleSell(
                                  item
                                )
                              }
                            >
                              SELL
                            </button>
                          </div>
                        </div>
                      )
                    )
                )}
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
                        key={
                          order.id
                        }
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
                                order.time
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
                        (
                          (pnl /
                            invested) *
                          100
                        ).toFixed(
                          2
                        );

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