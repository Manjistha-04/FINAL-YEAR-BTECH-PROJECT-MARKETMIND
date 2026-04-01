import { useParams, useNavigate } from "react-router-dom";
import "./ChartPage.css";

export function ChartPage() {
  const { symbol } = useParams();
  const navigate = useNavigate();

  return (
    <div className="chart-root">
      <header className="chart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h2>{symbol} Chart</h2>
      </header>

      <div className="chart-container">
        {/* Placeholder (TradingView / Chart lib later) */}
        <div className="chart-box">
          <p>
            📈 Live chart for <strong>{symbol}</strong>
          </p>
          <p>TradingView / API integration coming soon</p>
        </div>
      </div>
    </div>
  );
}
