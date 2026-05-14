import bgVideo from "../assets/Simple_Attractive_Video_Design.mp4";
import "./HomePage.css";
import logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { SentimentBar } from "../components/SentimentBar";
import { Footer } from "../components/Footer";
import { Features } from "../components/Features";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { FAQ } from "../components/FAQ";
import { TermsOfService } from "../components/TermsOfService";
import { PrivacyPolicy } from "../components/PrivacyPolicy";
import { RiskDisclosure } from "../components/RiskDisclosure";
import { Disclaimer } from "../components/Disclaimer";
import { MarketSentiment } from "../components/MarketSentiment";
import { useNavigate } from "react-router-dom";

/* ================= COUNT UP ================= */
function CountUp({ end, duration = 1200 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{value}</>;
}

/* ================= HOME PAGE ================= */
export function HomePage() {
  const navigate = useNavigate();

  // ✅ API + STATE
  const API_BASE = "http://localhost:5000/api";
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ FETCH NEWS (ONLY ONE)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/news`);
        const data = await res.json();

        console.log("Frontend News API:", data);

        setNews(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  /* ================= UI STATES ================= */
  const [showAI, setShowAI] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showRisk, setShowRisk] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showMarketSentiment, setShowMarketSentiment] = useState(false);

  /* ================= REFS ================= */
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const aiRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);
  const termsRef = useRef<HTMLDivElement | null>(null);
  const privacyRef = useRef<HTMLDivElement | null>(null);
  const riskRef = useRef<HTMLDivElement | null>(null);
  const disclaimerRef = useRef<HTMLDivElement | null>(null);
  const marketSentimentRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="homepage-bg">
        <video autoPlay muted loop playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="homepage-overlay"></div>
        <img src={logo} alt="MarketMind Logo" className="homepage-logo" />

        {/* NAVBAR */}
        <nav className="homepage-navbar">
          <span className="nav-link">Home</span>
          <span className="nav-link" onClick={() => setShowFeatures(p => !p)}>Features</span>
          <span className="nav-link ai-link" onClick={() => setShowAI(p => !p)}>AI-Analyse</span>
          <span className="nav-link login-btn" onClick={() => navigate("/login")}>Login</span>
        </nav>

        {/* HERO CONTENT */}
        <div className="hero-layout">
          <div className="hero-content">
            <h1 className="hero-title">MarketMind</h1>

            <p className="hero-subtitle">
              AI-Driven News Intelligence for Smarter Stock Market Insights
            </p>

            {/* STATS */}
            <div className="ai-data-pulse">
              <div className="pulse-item">
                <span className="pulse-value"><CountUp end={128} />+</span>
                <span className="pulse-label">News Analyzed Today</span>
              </div>

              <div className="pulse-item">
                <span className="pulse-value"><CountUp end={6} /></span>
                <span className="pulse-label">AI Models Active</span>
              </div>
            </div>

            {/* DEBUG NEWS */}
            {loading && <p>Loading news...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading &&
              news.slice(0, 3).map((item, i) => (
                <div key={i}>
                  <b>{item.title}</b>
                  <p>{item.sentiment}</p>
                </div>
              ))}
          </div>

          {/* RIGHT PANEL */}
          <div className="ai-insights-panel">
            <h3>AI Live Insights</h3>

            {news.slice(0, 3).map((n, i) => (
              <div key={i} className="news-impact">
                <span>{n.company}</span>
                <strong>{n.sentiment}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-wrapper">
          <button className="cta-fixed" onClick={() => navigate("/trade")}>
            Start Trading Now →
          </button>
        </div>
      </div>

      {/* ✅ NEWS SECTION (PERFECTLY PLACED) */}
      <div className="news-section">
        <h2>Latest Market News</h2>

        {loading && <p>Loading news...</p>}
        {error && <p>{error}</p>}

        {news.slice(0, 10).map((item, index) => (
          <div key={index} className="news-card">
            <h3>{item.title}</h3>
            <p>{item.source}</p>

            <p
              style={{
                color:
                  item.sentiment === "positive"
                    ? "green"
                    : item.sentiment === "negative"
                    ? "red"
                    : "gray",
              }}
            >
              Sentiment: {item.sentiment}
            </p>
          </div>
        ))}
      </div>

      {/* OTHER SECTIONS (UNCHANGED) */}
      {showFeatures && <div ref={featuresRef}><Features /></div>}
      {showAbout && <div ref={aboutRef}><About /></div>}
      {showContact && <div ref={contactRef}><Contact /></div>}
      {showFAQ && <div ref={faqRef}><FAQ /></div>}
      {showTerms && <div ref={termsRef}><TermsOfService /></div>}
      {showPrivacy && <div ref={privacyRef}><PrivacyPolicy /></div>}
      {showRisk && <div ref={riskRef}><RiskDisclosure /></div>}
      {showDisclaimer && <div ref={disclaimerRef}><Disclaimer /></div>}
      {showMarketSentiment && <div ref={marketSentimentRef}><MarketSentiment /></div>}

      <Footer
        onFeaturesClick={() => setShowFeatures(p => !p)}
        onAIClick={() => setShowAI(p => !p)}
        onAboutClick={() => setShowAbout(p => !p)}
        onContactClick={() => setShowContact(p => !p)}
        onFAQClick={() => setShowFAQ(p => !p)}
        onTermsClick={() => setShowTerms(p => !p)}
        onPrivacyClick={() => setShowPrivacy(p => !p)}
        onRiskClick={() => setShowRisk(p => !p)}
        onDisclaimerClick={() => setShowDisclaimer(p => !p)}
        onMarketSentimentClick={() => setShowMarketSentiment(p => !p)}
      />
    </>
  );
}