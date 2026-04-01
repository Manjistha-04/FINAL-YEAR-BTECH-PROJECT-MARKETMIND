import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./TradePage.css";
import { useEffect, useState } from "react";

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

  /* 💾 SAVE WATCHLIST */
  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(myWatchlist));
  }, [myWatchlist]);

  /* 🔄 LIVE PRICE SIMULATION */
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => {
        const updated: MarketMap = {};

        Object.keys(prev).forEach((key) => {
          const item = prev[key];
          const randomMove = (Math.random() - 0.5) * 0.4; // ±0.2%

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

        <button
          className="trade-logout-btn"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            navigate("/login");
          }}
        >
          Logout
        </button>
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
        </main>
      </div>
    </div>
  );
}
