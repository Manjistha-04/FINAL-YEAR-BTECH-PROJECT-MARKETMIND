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

/* ================= COUNT-UP COMPONENT ================= */
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
  /* ================= FEATURES SCROLL ================= */
  useEffect(() => {
    if (showFeatures && featuresRef.current) {
      const y =
        featuresRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showFeatures]);

  /* ================= AI-ANALYSE SCROLL ================= */
  useEffect(() => {
    if (showAI && aiRef.current) {
      const y =
        aiRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showAI]);

  /* ================= ABOUT SCROLL ================= */
  useEffect(() => {
    if (showAbout && aboutRef.current) {
      const y =
        aboutRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showAbout]);

  /* ================= CONTACT SCROLL ================= */
  useEffect(() => {
    if (showContact && contactRef.current) {
      const y =
        contactRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showContact]);

  /* ================= FAQ SCROLL ================= */
  useEffect(() => {
    if (showFAQ && faqRef.current) {
      const y =
        faqRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showFAQ]);

  /* ================= TERMS SCROLL ================= */
  useEffect(() => {
    if (showTerms && termsRef.current) {
      const y =
        termsRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showTerms]);

  /* ================= PRIVACY SCROLL ================= */
  useEffect(() => {
    if (showPrivacy && privacyRef.current) {
      const y =
        privacyRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showPrivacy]);

  /* ================= RISK DISCLOSURE SCROLL ================= */
  useEffect(() => {
    if (showRisk && riskRef.current) {
      const y =
        riskRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showRisk]);
  /* ================= DISCLAIMER SCROLL ================= */
  useEffect(() => {
    if (showDisclaimer && disclaimerRef.current) {
      const y =
        disclaimerRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showDisclaimer]);
  /* ================= MARKETSENTIMENT SCROLL ================= */
  useEffect(() => {
    if (showMarketSentiment && marketSentimentRef.current) {
      const y =
        marketSentimentRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showMarketSentiment]);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="homepage-bg">
        <video autoPlay muted loop playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="homepage-overlay"></div>

        <img src={logo} alt="MarketMind Logo" className="homepage-logo" />

        {/* ================= NAVBAR ================= */}
        <nav className="homepage-navbar">
          <span className="nav-link">Home</span>

          <span
            className={`nav-link ${showFeatures ? "active" : ""}`}
            onClick={() => {
              setShowFeatures(prev => !prev);
              setShowAI(false);
              setShowAbout(false);
              setShowContact(false);
              setShowFAQ(false);
              setShowTerms(false);
              setShowPrivacy(false);
              setShowRisk(false);
              setShowDisclaimer(false);
            }}
          >
            Features
          </span>

          <span
            className={`nav-link ai-link ${showAI ? "active" : ""}`}
            onClick={() => {
              setShowAI(prev => !prev);
              setShowFeatures(false);
              setShowAbout(false);
              setShowContact(false);
              setShowFAQ(false);
              setShowTerms(false);
              setShowPrivacy(false);
              setShowRisk(false);
              setShowDisclaimer(false);
            }}
          >
            AI-Analyse
          </span>

          <span
            className={`nav-link ${showAbout ? "active" : ""}`}
            onClick={() => {
              setShowAbout(prev => !prev);
              setShowAI(false);
              setShowFeatures(false);
              setShowContact(false);
              setShowFAQ(false);
              setShowTerms(false);
              setShowPrivacy(false);
              setShowRisk(false);
              setShowDisclaimer(false);
            }}
          >
            About
          </span>

          <span
            className={`nav-link ${showContact ? "active" : ""}`}
            onClick={() => {
              setShowContact(prev => !prev);
              setShowAI(false);
              setShowFeatures(false);
              setShowAbout(false);
              setShowFAQ(false);
              setShowTerms(false);
              setShowPrivacy(false);
              setShowRisk(false);
              setShowDisclaimer(false);
            }}
          >
            Contact
          </span>

          <span
            className={`nav-link ${showFAQ ? "active" : ""}`}
            onClick={() => {
              setShowFAQ(prev => !prev);
              setShowAI(false);
              setShowFeatures(false);
              setShowAbout(false);
              setShowContact(false);
              setShowTerms(false);
              setShowPrivacy(false);
              setShowRisk(false);
              setShowDisclaimer(false);
            }}
          >
            FAQ
          </span>

          <span
            className="nav-link login-btn"
            onClick={() => {
              setShowAI(false);
              setShowFeatures(false);
              setShowAbout(false);
              setShowContact(false);
              setShowFAQ(false);
              setShowTerms(false);
              setShowPrivacy(false);
              setShowRisk(false);
              setShowDisclaimer(false);
              navigate("/login");
            }}
          >
            Login
          </span>
        </nav>

        {/* ================= HERO LAYOUT ================= */}
        <div className="hero-layout">
          <div className="hero-content">
            <h1 className="hero-title">MarketMind</h1>

            <p className="hero-subtitle">
              AI-Driven News Intelligence for Smarter Stock Market Insights
            </p>

            <p className="hero-subtitle hero-secondary">
              Global financial news analysis • Sentiment-based stock prediction •
              Virtual trading simulation
            </p>

            {/* ================= AI DATA PULSE ================= */}
            <div className="ai-data-pulse">
              <div className="pulse-item">
                <span className="pulse-value">
                  <CountUp end={128} />+
                </span>
                <span className="pulse-label">News Analyzed Today</span>
              </div>

              <div className="pulse-item">
                <span className="pulse-value">
                  <CountUp end={6} />
                </span>
                <span className="pulse-label">AI Models Active</span>
              </div>

              <div className="pulse-item">
                <span className="pulse-value">
                  <CountUp end={42} />
                </span>
                <span className="pulse-label">Predictions Generated</span>
              </div>

              <div className="pulse-item">
                <span className="pulse-value">
                  <CountUp end={78} />%
                </span>
                <span className="pulse-label">Avg Confidence</span>
              </div>
            </div>

            {showAI && (
              <div ref={aiRef} className="sentiment-wrapper">
                <SentimentBar />
              </div>
            )}
          </div>

          {/* ================= AI LIVE INSIGHTS ================= */}
          <div className="ai-insights-panel animate-in">
            <div className="ai-insights-header">
              <h3>AI Live Insights</h3>
              <span className="preview-badge">PREVIEW</span>
            </div>

            <div className="news-impact">
              <span>RBI Policy Update</span>
              <strong className="bullish">Banking • Bullish</strong>
            </div>

            <div className="news-impact">
              <span>IT Export Outlook</span>
              <strong className="positive">IT • Positive</strong>
            </div>

            <div className="news-impact">
              <span>Crude Oil Volatility</span>
              <strong className="bearish">Energy • Bearish</strong>
            </div>

            <div className="confidence-section">
              <div className="confidence-header">
                <span>Prediction Confidence</span>
                <strong>78%</strong>
              </div>

              <div className="confidence-bar">
                <div className="confidence-fill" style={{ width: "78%" }} />
              </div>
            </div>

            <div className="ai-insight-item muted">
              Last updated: 08:45 AM
            </div>
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="cta-wrapper">
          <button className="cta-fixed" onClick={() => navigate("/trade")}>Start Trading Now <span className="cta-arrow">→</span></button>
        </div>
      </div>

      {/* ================= FEATURES ================= */}
      {showFeatures && (
        <div ref={featuresRef}>
          <Features />
        </div>
      )}

      {/* ================= ABOUT ================= */}
      {showAbout && (
        <div ref={aboutRef}>
          <About />
        </div>
      )}

      {/* ================= CONTACT ================= */}
      {showContact && (
        <div ref={contactRef}>
          <Contact />
        </div>
      )}

      {/* ================= FAQ ================= */}
      {showFAQ && (
        <div ref={faqRef}>
          <FAQ />
        </div>
      )}

      {/* ================= TERMS ================= */}
      {showTerms && (
        <div ref={termsRef}>
          <TermsOfService />
        </div>
      )}

      {/* ================= PRIVACY ================= */}
      {showPrivacy && (
        <div ref={privacyRef}>
          <PrivacyPolicy />
        </div>
      )}

      {/* ================= RISK DISCLOSURE ================= */}
      {showRisk && (
        <div ref={riskRef}>
          <RiskDisclosure />
        </div>
      )}
      {/* ================= DISCLAIMER ================= */}
      {showDisclaimer && (
        <div ref={disclaimerRef}>
          <Disclaimer />
        </div>
      )}
      {/* ================= DISCLAIMER ================= */}
      {showMarketSentiment && (
        <div ref={marketSentimentRef}>
          <MarketSentiment />
        </div>
      )}

      {/* ================= BOTTOM DARK SECTION ================= */}
      <section className="bottom-dark-section">
        <div className="trust-bar-inline">
          <div className="trust-item">🔍 Interpretable AI Predictions</div>
          <div className="trust-item">📰 Structured Financial News Processing</div>
          <div className="trust-item">🎓 Simulation-Based Market Learning</div>
          <div className="trust-item">🛡️ Non-Transactional Analytical System</div>
        </div>

        <Footer
          onFeaturesClick={() => setShowFeatures(prev => !prev)}
          onAIClick={() => setShowAI(prev => !prev)}
          onAboutClick={() => setShowAbout(prev => !prev)}
          onContactClick={() => setShowContact(prev => !prev)}
          onFAQClick={() => setShowFAQ(prev => !prev)}
          onTermsClick={() => setShowTerms(prev => !prev)}
          onPrivacyClick={() => setShowPrivacy(prev => !prev)}
          onRiskClick={() => setShowRisk(prev => !prev)}
          onDisclaimerClick={() => setShowDisclaimer(prev => !prev)}
          onMarketSentimentClick={() => setShowMarketSentiment(prev => !prev)}
          
          activeFeatures={showFeatures}
          activeAI={showAI}
          activeAbout={showAbout}
          activeContact={showContact}
          activeFAQ={showFAQ}
          activeTerms={showTerms}
          activePrivacy={showPrivacy}
          activeRisk={showRisk}
          activeDisclaimer={showDisclaimer}
          activeMarketSentiment={showMarketSentiment}
        />
      </section>
    </>
  );
}