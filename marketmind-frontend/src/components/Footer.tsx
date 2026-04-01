import "./Footer.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  onFeaturesClick: () => void;
  onAIClick: () => void;
  onMarketSentimentClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  onFAQClick: () => void;
  onTermsClick: () => void;
  onPrivacyClick: () => void;
  onRiskClick: () => void;
  onDisclaimerClick: () => void;

  activeFeatures: boolean;
  activeAI: boolean;
  activeMarketSentiment: boolean;
  activeAbout: boolean;
  activeContact: boolean;
  activeFAQ: boolean;
  activeTerms: boolean;
  activePrivacy: boolean;
  activeRisk: boolean;
  activeDisclaimer: boolean;
}

export function Footer({
  onFeaturesClick,
  onAIClick,
  onMarketSentimentClick,
  onAboutClick,
  onContactClick,
  onFAQClick,
  onTermsClick,
  onPrivacyClick,
  onRiskClick,
  onDisclaimerClick,

  activeFeatures,
  activeAI,
  activeMarketSentiment,
  activeAbout,
  activeContact,
  activeFAQ,
  activeTerms,
  activePrivacy,
  activeRisk,
  activeDisclaimer,
}: FooterProps) {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ================= BRAND ================= */}
        <div className="footer-brand">
          <img src={logo} alt="MarketMind Logo" />
          <p>
            MarketMind is an AI-driven market intelligence platform designed
            for educational financial analysis and sentiment insights.
          </p>
        </div>

        {/* ================= COMPANY ================= */}
        <div className="footer-column">
          <h4>Company</h4>

          <a
            onClick={onAboutClick}
            className={`footer-link ${activeAbout ? "active" : ""}`}
          >
            About Us
          </a>

          <a
            onClick={onFeaturesClick}
            className={`footer-link ${activeFeatures ? "active" : ""}`}
          >
            Features
          </a>

          <a
            onClick={onContactClick}
            className={`footer-link ${activeContact ? "active" : ""}`}
          >
            Contact
          </a>

          <a
            onClick={onFAQClick}
            className={`footer-link ${activeFAQ ? "active" : ""}`}
          >
            FAQ
          </a>
        </div>

        {/* ================= LEGAL ================= */}
        <div className="footer-column">
          <h4>Legal</h4>

          <a
            onClick={onTermsClick}
            className={`footer-link ${activeTerms ? "active" : ""}`}
          >
            Terms of Service
          </a>

          <a
            onClick={onPrivacyClick}
            className={`footer-link ${activePrivacy ? "active" : ""}`}
          >
            Privacy Policy
          </a>

          <a
            onClick={onRiskClick}
            className={`footer-link ${activeRisk ? "active" : ""}`}
          >
            Risk Disclosure
          </a>

          <a
            onClick={onDisclaimerClick}
            className={`footer-link ${activeDisclaimer ? "active" : ""}`}
          >
            Disclaimer
          </a>
        </div>

        {/* ================= TRADING ================= */}
        <div className="footer-column">
          <h4>Trading</h4>

          <a
            onClick={onAIClick}
            className={`footer-link ${activeAI ? "active" : ""}`}
          >
            AI Analyse
          </a>

          {/* ✅ DIFFERENT CHART SECTION */}
          <a
            onClick={onMarketSentimentClick}
            className={`footer-link ${activeMarketSentiment ? "active" : ""}`}
          >
            Market Sentiment
          </a>

          <a
            className="footer-link"
            onClick={() => navigate("/login")}
          >
            Login
          </a>

          <a
            className="footer-link"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </a>
        </div>
      </div>

      {/* ================= DIVIDER ================= */}
      <div className="footer-divider"></div>

      {/* ================= BOTTOM ================= */}
      <div className="footer-bottom">
        <p>© 2025 MarketMind. All rights reserved.</p>
        <p className="risk-text">
          Educational use only. No financial advice.
        </p>
      </div>
    </footer>
  );
}
