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

export function TradePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  /* ⭐ WATCHLIST (PERSISTENT) */
  const [myWatchlist, setMyWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(WATCHLIST_KEY);
    return saved ? JSON.parse(saved) : ["RELIANCE", "TCS"];
  });

  /* 📈 LIVE MARKET DATA */
  const [marketData, setMarketData] = useState<MarketMap>(MARKET_DATA);


  /* ✅ NEW: AI NEWS STATE */
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [username] = useState(storedUser.username || "Trader");

  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem(BALANCE_KEY);

    return savedBalance
      ? Number(savedBalance)
      : storedUser.virtualBalance || 100000;
  });

  const [holdings, setHoldings] = useState<any[]>(() => {
    const saved = localStorage.getItem(HOLDINGS_KEY);
    return saved ? JSON.parse(saved) : [];
  });


  /* 💾 SAVE WATCHLIST */
  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(myWatchlist));
  }, [myWatchlist]);

  useEffect(() => {
    localStorage.setItem(HOLDINGS_KEY, JSON.stringify(holdings));
  }, [holdings]);

  useEffect(() => {
    localStorage.setItem(
      BALANCE_KEY,
      balance.toString()
    );
  }, [balance]);

  /* 🔄 LIVE PRICE SIMULATION */
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => {
        const updated: MarketMap = {};

        Object.keys(prev).forEach((key) => {
          const item = prev[key];
          const randomMove = (Math.random() - 0.5) * 0.4;

          updated[key] = {
            ...item,
            price: +(item.price * (1 + randomMove / 100)).toFixed(2),
            change: +(item.change + randomMove).toFixed(2),
          };
        });

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /* 🔍 SEARCH */
  const filteredStocks = STOCKS.filter((s) =>
    s.toLowerCase().startsWith(search.toLowerCase())
  );

  /* ➕ ADD */
  const addToWatchlist = (stock: string) => {
    if (myWatchlist.includes(stock)) return;
    setMyWatchlist((prev) => [...prev, stock]);
    setSearch("");
    setShowResults(false);
  };

  /* ❌ REMOVE */
  const removeFromWatchlist = (stock: string) => {
    setMyWatchlist((prev) => prev.filter((s) => s !== stock));
  };

  const handleBuy = (item: any) => {
    const price =
      marketData[item.ticker]?.price || item.price || 1000;

    if (balance < price) {
      alert("Insufficient balance");
      return;
    }

    setBalance((prev: number) => prev - price);

    const existing = holdings.find((h) => h.ticker === item.ticker);

    if (existing) {
    // update average price
      setHoldings((prev) =>
        prev.map((h) =>
          h.ticker === item.ticker
            ? {
                ...h,
                quantity: h.quantity + 1,
                avgPrice:
                  (h.avgPrice * h.quantity + price) / 
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
    alert(`Bought ${item.ticker} @ ₹${price}`);
    console.log(item);
  };


  const handleSell = (item: any) => {
    const price =
      marketData[item.ticker]?.price || item.price || 1000;

    const existing = holdings.find((h) => h.ticker === item.ticker);

    if (!existing) {
      alert("You don't own this stock");
      return;
    }
    

    setBalance((prev: number) => prev + price);

    if (existing.quantity === 1) {
      setHoldings((prev) =>
        prev.filter((h) => h.ticker !== item.ticker)
      );
    } else {
      setHoldings((prev) =>
        prev.map((h) =>
          h.ticker === item.ticker
            ? {
                ...h,
                quantity: h.quantity - 1,
              }
            : h
        )
      );
    }

    alert(`Sold ${item.ticker} @ ₹${price}`);
  };



  // 🔥 FETCH AI NEWS FROM BACKEND
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/news`);
        const data = await res.json();
        console.log("TradePage News:", data);
        setNews(data);
        setLoading(false);
      } catch (err) {
        console.error("News fetch error:", err);
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
            <span key={idx}>
              {idx} {d.price.toFixed(2)}{" "}
              <span className={d.change >= 0 ? "bull" : "bear"}>
                {d.change >= 0 ? "▲" : "▼"} {Math.abs(d.change)}%
              </span>
            </span>
          );
        })}
      </div>

      {/* ===== NAVBAR ===== */}
      <header className="trade-topbar">
        <img src={logo} className="trade-logo-img" alt="MarketMind" />

        <div className="trade-center">
          <nav className="trade-nav">
            <span className="active">Dashboard</span>
            <span>Orders</span>
            <span>Positions</span>
            <span>AI Insights</span>
          </nav>

          {/* SEARCH */}
          <div className="trade-search">
            <input
              placeholder="Search stocks..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowResults(true);
              }}
              onBlur={() => setTimeout(() => setShowResults(false), 150)}
            />

            {showResults && search && (
              <div className="search-dropdown">
                {filteredStocks.map((stock) => (
                  <div key={stock} className="search-item">
                    <span>{stock}</span>
                    <button
                      className="add-btn"
                      onMouseDown={() => addToWatchlist(stock)}
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      <div className="trade-user-section"> 
        <div className="trade-user-info">
          <span className="trade-username">
            Welcome, {username}
          </span>

          <span className="trade-balance">
            ₹ {balance.toLocaleString()}
          </span>
        </div>

        <button
          className="trade-logout-btn"
          onClick={() => {
            // Clear auth data
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isLoggedIn");

            // Redirect to login
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    
      </header>

      {/* ===== BODY ===== */}
      <div className="trade-body">
        {/* WATCHLIST */}
        <aside className="trade-watchlist">
          <div className="watchlist-title">Top Indices</div>

          {INDICES.map((idx) => {
            const d = marketData[idx];
            return (
              <div
                key={idx}
                className={`watch-item ${d.change >= 0 ? "up" : "down"}`}
                onClick={() => navigate(`/chart/${idx}`)}
              >
                <span>{idx}</span>
                <small>
                  {d.price.toFixed(2)} {d.change >= 0 ? "▲" : "▼"}
                </small>
              </div>
            );
          })}

          <div className="watchlist-title" style={{ marginTop: 16 }}>
            My Watchlist
          </div>

          {myWatchlist.map((stock) => {
            const d = marketData[stock];
            return (
              <div
                key={stock}
                className={`watch-item ${d.change >= 0 ? "up" : "down"}`}
                onClick={() => navigate(`/chart/${stock}`)}
              >
                <span>{stock}</span>
                <small>
                  {d.price.toFixed(2)} {d.change >= 0 ? "▲" : "▼"}
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWatchlist(stock);
                    }}
                  >
                    ✕
                  </button>
                </small>
              </div>
            );
          })}
        </aside>

        {/* MARKET OVERVIEW */}
        <main className="trade-content">
          <h2>Market Overview (Top 5 Stocks)</h2>

          <div className="trade-table">
            <div className="table-head">
              <span>Instrument</span>
              <span>Sentiment</span>
              <span>AI Bias</span>
            </div>

            {TOP_5_STOCKS.map((stock) => {
              const d = marketData[stock];
              return (
                <div
                  key={stock}
                  className="table-row"
                  onClick={() => navigate(`/chart/${stock}`)}
                  style={{ cursor: "pointer" }}
                >
                  <span>{stock}</span>
                  <span className={d.change >= 0 ? "bull" : "bear"}>
                    {d.sentiment}
                  </span>
                  <span>{d.bias}</span>
                </div>
              );
            })}
          </div>

          {/* ✅ NEW: AI NEWS TRADING SECTION */}
          <h2 style={{ marginTop: "30px" }}>AI News Trading</h2>

          <div className="ai-news-section">

            {loading ? (
              <p>Loading AI market analysis...</p>
            ) : (
              news.slice(0, 5).map((item, index) => (
                <div key={index} className="ai-news-card">
                  <h4>{item.title}</h4>

                  <p>
                    <b>{item.company}</b> ({item.ticker})
                  </p>

                  <p
                    style={{
                      color:
                        item.sentiment === "positive"
                          ? "green"
                          : item.sentiment === "negative"
                          ? "red"
                          : "gray",
                    }}
                  >
                    Sentiment: {item.sentiment}
                  </p>

                  <p
                    style={{
                      fontSize: "13px",
                      opacity: 0.7,
                    }}
                  >
                    Sentiment Score: {item.sentimentScore}
                  </p>

                  <p
                    style={{
                      color:
                        item.prediction === "BUY"
                          ? "#22c55e"
                          : item.prediction === "SELL"
                          ? "#ef4444"
                          : "#f59e0b",
                      fontWeight: "bold",
                    }}
                  >
                    Prediction: {item.prediction}
                  </p>

                  <p
                    style={{
                    marginTop: "6px",
                    fontSize: "14px",
                    color: "#9ca3af",
                    }}
                  >
                    AI Confidence: {item.confidence}%
                  </p>

                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "12px",
                      opacity: 0.6,
                    }}
                  >
                    Updated:
                    {" "}
                    {new Date(item.publishedAt).toLocaleTimeString()}
                  </p>

                  <div style={{ marginTop: "10px" }}>
                    <button
                      className="buy-btn"
                      onClick={() => handleBuy(item)}
                    >
                      BUY
                    </button>

                    <button
                      className="sell-btn"
                      onClick={() => handleSell(item)}
                    >
                      SELL
                    </button>
                  </div>
                </div>
              ))
           )}
         </div>


          <div className="portfolio-section">
            <h2>YOUR PORTFOLIO</h2>

            {holdings.length === 0 ? (
              <p>No holding yet</p>
            ) : (
              <div className="portfolio-list">
                {holdings.map((holding,index) => (
                  <div key={index} className="portfolio-card">
                    <h3>{holding.ticker}</h3>
                    <p>{holding.company}</p>
                    <p>
                      Quantity: <b>{holding.quantity}</b>
                    </p>
                    <p>
                      Avg Price: ₹{(holding.avgPrice || 0).toFixed(2)}

                    </p>

                    <p>
                      Invested: ₹
                      {(holding.quantity * (holding.avgPrice || 0)).toLocaleString()}
                    </p>
                    <p>
                      Current: ₹
                      {(
                        holding.quantity *
                        (marketData[holding.ticker]?.price || holding.avgPrice)
                      ).toLocaleString()}
                    </p>

                    <p
                      style={{
                        color:
                          (marketData[holding.ticker]?.price || 0) >= (holding.avgPrice || 0)
                            ? "#22c55e"
                            : "#ef4444",
                        fontWeight: "bold",
                      }}
                    >
                      P/L: ₹
                      {(
                        holding.quantity *
                        ((marketData[holding.ticker]?.price || holding.avgPrice) -
                          holding.avgPrice)
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
              
          </div>
        </main>
      </div>
    </div>
  );
}