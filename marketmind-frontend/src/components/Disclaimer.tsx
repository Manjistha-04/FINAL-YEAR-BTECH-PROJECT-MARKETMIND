import "./Disclaimer.css";

export function Disclaimer() {
  return (
    <section className="disclaimer-section">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Home <span>›</span> Disclaimer
      </div>

      <div className="disclaimer-layout">
        {/* TOC */}
        <aside className="toc">
          <p className="toc-title">On this page</p>
          <ul>
            <li><a href="#purpose">Purpose</a></li>
            <li><a href="#no-advice">No Investment Advice</a></li>
            <li><a href="#risk">Market Risk</a></li>
            <li><a href="#simulation">Simulation Only</a></li>
            <li><a href="#acceptance">Acceptance</a></li>
          </ul>
        </aside>

        {/* Content */}
        <div className="disclaimer-content">
          <h2>Disclaimer</h2>

          <h3 id="purpose">Purpose</h3>
          <p>
            MarketMind is an AI-driven financial intelligence and educational
            platform designed to analyze publicly available financial news and
            present sentiment-based insights for learning and research purposes only.
          </p>

          <h3 id="no-advice">No Investment Advice</h3>
          <p>
            MarketMind does not provide investment advice, trading recommendations,
            or financial advisory services. All information shown should not be
            considered financial advice.
          </p>

          <h3 id="risk">Market Risk</h3>
          <p>
            Financial markets involve risk, and AI-generated insights do not
            guarantee future performance. Users are responsible for their own
            financial decisions.
          </p>

          <h3 id="simulation">Simulation Only</h3>
          <p>
            MarketMind does not execute trades, connect to brokers, or handle real
            money. All trading features are strictly simulation-based.
          </p>

          <h3 id="acceptance">Acceptance</h3>
          <p className="final-line">
            By using MarketMind, you acknowledge and agree to this disclaimer.
          </p>
        </div>
      </div>
    </section>
  );
}
