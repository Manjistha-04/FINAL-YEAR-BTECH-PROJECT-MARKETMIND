import { useParams } from "react-router-dom";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import "./ChartPage.css";

export default function ChartPage() {
  const { symbol } = useParams();

  const getTradingViewSymbol = (
    sym?: string
  ) => {
    switch (sym) {
      case "NIFTY50":
        return "NSE:NIFTY";

      case "NIFTYBANK":
        return "NSE:BANKNIFTY";

      case "SENSEX":
        return "BSE:SENSEX";

      case "RELIANCE":
        return "NSE:RELIANCE";

      case "TCS":
        return "NSE:TCS";

      case "INFY":
        return "NSE:INFY";

      case "HDFCBANK":
        return "NSE:HDFCBANK";

      case "ICICIBANK":
        return "NSE:ICICIBANK";

      default:
        return "NSE:NIFTY";
    }
  };

  return (
    <div className="chart-page">
      <div className="chart-header">
        <h1>
          {symbol} Live Chart
        </h1>
      </div>

      <div className="chart-container">
        <AdvancedRealTimeChart
          symbol={getTradingViewSymbol(
            symbol
          )}
          theme="dark"
          locale="en"
          autosize
          interval="15"
        />
      </div>
    </div>
  );
}