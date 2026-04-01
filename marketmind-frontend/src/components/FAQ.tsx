import { useState, useEffect, useRef } from "react";
import "./FAQ.css";

/* ================= FAQ DATA ================= */
const faqData = [
  {
    question: "What is MarketMind?",
    answer:
      "MarketMind is an AI-driven market intelligence platform that analyzes global financial news to generate sentiment-based insights for learning and research purposes.",
  },
  {
    question: "Does MarketMind support real-money trading?",
    answer:
      "No. MarketMind is strictly an educational and analytical platform. It does not support or facilitate real-money trading.",
  },
  {
    question: "How accurate are the AI predictions?",
    answer:
      "Predictions are based on sentiment analysis models trained on large-scale financial news data. Accuracy varies by market conditions and should not be treated as financial advice.",
  },
  {
    question: "Which markets are covered?",
    answer:
      "MarketMind covers equities, indices, commodities, and crypto-related financial news across global and domestic markets.",
  },
  {
    question: "Is MarketMind free to use?",
    answer:
      "Yes. Core features are available for free for learning and academic use. Advanced features may be introduced later.",
  },
  {
  question: "Is MarketMind suitable for beginners?",
  answer:
    "Yes. MarketMind is designed for students, beginners, and researchers who want to understand market sentiment using AI."
},
{
  question: "Can I use MarketMind for live trading decisions?",
  answer:
    "No. MarketMind is for learning and analysis only and should not be used as a sole decision-making tool for live trading."
}

];

/* ================= FAQ COMPONENT ================= */
export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  /* ================= SCROLL-IN ANIMATION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("faq-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="faq-section">
      {/* ===== Floating Glass Particles ===== */}
      <div className="faq-particles"></div>

      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Everything you need to know about MarketMind
        </p>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
