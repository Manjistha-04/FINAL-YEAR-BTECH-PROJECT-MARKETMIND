export function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">About MarketMind</h2>

        <p className="about-description">
          MarketMind is an AI-powered market intelligence platform designed to
          analyze global and domestic financial news and transform it into
          actionable sentiment insights.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h4>🧠 AI-Driven Analysis</h4>
            <p>
              Advanced NLP models analyze news sentiment, sector impact, and
              market relevance in real time.
            </p>
          </div>

          <div className="about-card">
            <h4>📊 Sector Intelligence</h4>
            <p>
              Identify bullish and bearish trends across Banking, IT, Energy,
              and other sectors instantly.
            </p>
          </div>

          <div className="about-card">
            <h4>🎯 Built for Learning</h4>
            <p>
              Designed as a simulation-based platform for traders, students,
              and researchers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
