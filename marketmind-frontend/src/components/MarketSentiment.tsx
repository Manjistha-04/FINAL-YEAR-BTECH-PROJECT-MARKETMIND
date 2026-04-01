import "./MarketSentiment.css";
import { useNavigate } from "react-router-dom";

export function MarketSentiment() {
  const navigate = useNavigate();

  // 🔒 user not logged in → preview mode
  const isPreview = true;

  return (
    <section className="market-sentiment-section">
      <div className="market-header">
        <h2>Market Sentiment</h2>
        {isPreview && <span className="preview-badge">PREVIEW</span>}
      </div>

      <p className="subtitle">
        Aggregated market mood based on technical and sentiment indicators
      </p>

      {/* ================= CHART ================= */}
      <div className={`sentiment-chart ${isPreview ? "blurred" : ""}`}>
        <div className="sentiment-row">
          <span>Bullish</span>
          <div className="bar">
            <div className="fill bullish" style={{ width: "64%" }} />
          </div>
          <strong>64%</strong>
        </div>

        <div className="sentiment-row">
          <span>Neutral</span>
          <div className="bar">
            <div className="fill neutral" style={{ width: "22%" }} />
          </div>
          <strong>22%</strong>
        </div>

        <div className="sentiment-row">
          <span>Bearish</span>
          <div className="bar">
            <div className="fill bearish" style={{ width: "14%" }} />
          </div>
          <strong>14%</strong>
        </div>
      </div>

      {/* ================= PREVIEW OVERLAY ================= */}
      {isPreview && (
        <div className="preview-overlay">
          <p>
            Full market sentiment insights are available for registered users.
          </p>

          <button
            className="unlock-btn"
            onClick={() => navigate("/login")}
          >
            Login to Unlock →
          </button>
        </div>
      )}
    </section>
  );
}
