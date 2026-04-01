// src/components/Features.tsx
import "./Features.css";

export function Features() {
  return (
    <section id="features" className="features-section">
      <h2 className="features-title">
        Powerful AI Features for Smarter Market Decisions
      </h2>

      <p className="features-subtitle">
        MarketMind uses explainable AI to analyze financial news, detect sentiment,
        and provide sector-level intelligence — all in real time.
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <h3>🧠 AI News Sentiment Engine</h3>
          <p>
            Analyzes global & domestic financial news using NLP models to classify
            sentiment as Bullish, Bearish, or Neutral with confidence scoring.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Sector-Based Intelligence</h3>
          <p>
            Groups sentiment by sectors like Banking, IT, Energy, and Pharma to
            identify momentum and sector rotation opportunities.
          </p>
        </div>

        <div className="feature-card">
          <h3>📰 Multi-News Impact Analysis</h3>
          <p>
            Evaluates multiple news events affecting the same stock and generates
            a weighted final sentiment instead of relying on single headlines.
          </p>
        </div>

        <div className="feature-card">
          <h3>🎯 Confidence-Driven Predictions</h3>
          <p>
            Every AI prediction includes a confidence percentage, helping users
            understand reliability and uncertainty — no blind signals.
          </p>
        </div>
      </div>
    </section>
  );
}
