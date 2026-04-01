import { useEffect } from "react";
import "./RiskDisclosure.css";

export function RiskDisclosure() {
  /* ================= CURSOR-REACTIVE AI GLOW ================= */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".risk-block");

    const handleMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--x", `${x}%`);
      card.style.setProperty("--y", `${y}%`);
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMove);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMove);
      });
    };
  }, []);

  /* ================= UI ================= */
  return (
    <section className="risk-section">
      <div className="risk-container">
        <h2 className="risk-title">Risk Disclosure</h2>
        <p className="risk-updated">Last updated: January 2025</p>

        <div className="risk-block">
          <h3>1. General Risk Warning</h3>
          <p>
            Trading and investing in financial markets involves substantial risk
            and may not be suitable for all individuals. You may lose part or all
            of your invested capital, and no trading strategy can guarantee
            profits.
          </p>
        </div>

        <div className="risk-block">
          <h3>2. Educational Purpose Only</h3>
          <p>
            MarketMind is an educational and research-focused platform. All
            insights, simulations, visualizations, and sentiment analyses are
            provided strictly for learning and informational purposes only.
          </p>
        </div>

        <div className="risk-block">
          <h3>3. Market Volatility</h3>
          <p>
            Financial markets are highly volatile and can be influenced by
            economic conditions, political events, global news, and unforeseen
            factors. Past performance does not guarantee future results.
          </p>
        </div>

        <div className="risk-block">
          <h3>4. No Investment or Trading Advice</h3>
          <p>
            MarketMind does not provide personalized investment advice,
            trading recommendations, or guarantees of profit. Any decisions
            made based on the platform’s content are taken at the user’s
            sole discretion and risk.
          </p>
        </div>

        <div className="risk-block">
          <h3>5. AI-Based Analysis Limitations</h3>
          <p>
            MarketMind utilizes artificial intelligence models and publicly
            available data sources to generate insights. These outputs may be
            incomplete, delayed, inaccurate, or subject to interpretation.
            AI-generated analysis should not be treated as definitive or
            predictive guarantees.
          </p>
        </div>

        <div className="risk-block">
          <h3>6. User Responsibility</h3>
          <p>
            You are solely responsible for evaluating the risks associated with
            any financial decisions you make. Always conduct your own research
            and consider consulting a qualified financial advisor before
            engaging in trading or investment activities.
          </p>
        </div>

        <div className="risk-block">
          <h3>7. Regulatory Disclaimer (SEBI, NSE & BSE)</h3>
          <p>
            MarketMind is not registered with the Securities and Exchange Board
            of India (SEBI) and does not act as a SEBI-registered investment
            advisor, research analyst, broker, or intermediary.
          </p>
          <p>
            MarketMind is not affiliated with, endorsed by, or associated with
            the National Stock Exchange of India (NSE), the Bombay Stock Exchange
            (BSE), or any other financial exchange or regulatory authority.
          </p>
        </div>

        <div className="risk-block">
          <h3>8. Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, MarketMind shall not be held
            liable for any direct, indirect, incidental, or consequential
            losses or damages arising from the use of, or reliance on, the
            platform or its content.
          </p>
        </div>
      </div>
    </section>
  );
}
