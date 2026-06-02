import "./StockTicker.css";

const stocks = [
 { name: "NIFTY 50", price: 23483.55, change: "+0.43%" },
  { name: "NIFTY BANK", price: 53714.65, change: "+0.13%" },
  { name: "SENSEX", price: 74649.84, change: "+0.52%" },
  { name: "RELIANCE", price: 1314.60, change: "-0.40%" },
  { name: "TATASTEEL", price: 210.60, change: "+0.01%" },
  { name: "HDFCBANK", price: 748.25, change: "+0.74%" },
  { name: "JIOFIN", price: 237.64, change: "+1.14%" },
  { name: "TMPV", price: 390.20, change: "+1.37%" },
  { name: "TMCV", price: 370.55, change: "-0.98%" },
  { name: "ADANIGREEN", price: 1449.40, change: "+0.17%" },
  { name: "ADANIPORTS", price: 1814.50, change: "+1.73%" },
  { name: "ADANIPOWER", price: 235.93, change: "+1.56%" },
];

export function StockTicker() {
  return (
    <div className="ticker-wrapper">
      <div className="ticker">
        {stocks.concat(stocks).map((stock, index) => (
          <div className="ticker-item" key={index}>
            <span className="stock-name">{stock.name}</span>
            <span className="stock-price">{stock.price}</span>
            <span
              className={
                stock.change.startsWith("+")
                  ? "stock-change positive"
                  : "stock-change negative"
              }
            >
              {stock.change.startsWith("+") ? "▲" : "▼"} {stock.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
