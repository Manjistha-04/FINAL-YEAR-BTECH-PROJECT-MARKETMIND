import "./StockTicker.css";

const stocks = [
  { name: "NIFTY 50", price: 25818.55, change: "-0.16%" },
  { name: "NIFYT BANK", price: 58926.75, change: "-0.18%" },
  { name: "SENSEX", price: 84559.65, change: "-0.14%" },
  { name: "RELIANCE", price: 1544.40, change: "+0.14%" },
  { name: "TATASTEEL", price: 170.34, change: "+0.30%" },
  { name: "HDFCBANK", price: 984.00, change: "-1.03%" },
  { name: "JIOFIN", price: 293.15, change: "-0.71%" },
  { name: "TMPV", price: 346.35, change: "+0.26%" },
  { name: "TMCV", price: 386.90, change: "-0.11%" },
  { name: "ADANIGREEN", price: 1021.25, change: "-0.68%" },
  { name: "ADANIPORTS", price: 1486.30, change: "-0.84%" },
  { name: "ADANIPOWER", price: 143.15, change: "-1.47%" },
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
