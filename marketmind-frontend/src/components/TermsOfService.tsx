import "./TermsOfService.css";

export function TermsOfService() {
  return (
    <section className="terms-section">
      <div className="terms-container">
        <h2 className="terms-title">Terms of Service</h2>
        <p className="terms-updated">Last updated: January 2025</p>

        <div className="terms-block">
          <h3>1. Introduction</h3>
          <p>
            Welcome to <strong>MarketMind</strong>. By accessing or using this
            platform, you agree to be bound by these Terms of Service. If you do
            not agree with any part of these terms, please discontinue use of
            the platform.
          </p>
        </div>

        <div className="terms-block">
          <h3>2. Purpose of the Platform</h3>
          <p>
            MarketMind is an educational and research-focused platform designed
            to analyze financial news using artificial intelligence. It provides
            sentiment-based insights strictly for learning and informational
            purposes and does not offer financial, investment, or trading advice.
          </p>
        </div>

        <div className="terms-block">
          <h3>3. Regulatory Disclaimer (SEBI, NSE & BSE)</h3>
          <p>
            MarketMind is <strong>not registered with the Securities and Exchange
            Board of India (SEBI)</strong> and does not act as a SEBI-registered
            investment advisor, research analyst, or broker.
          </p>
          <p>
            MarketMind is <strong>not affiliated, associated, authorized, or
            endorsed</strong> by the National Stock Exchange of India (NSE),
            Bombay Stock Exchange (BSE), or any other stock exchange or
            regulatory authority.
          </p>
          <p>
            Any references to stocks, indices, sectors, or market movements are
            purely for educational analysis based on publicly available news
            and data.
          </p>
        </div>

        <div className="terms-block">
          <h3>4. No Financial Advice</h3>
          <p>
            All information provided by MarketMind is for informational and
            educational purposes only. You acknowledge that any investment,
            trading, or financial decisions you make are solely at your own
            risk.
          </p>
        </div>

        <div className="terms-block">
          <h3>5. User Responsibilities</h3>
          <ul>
            <li>You agree not to misuse or attempt to exploit the platform.</li>
            <li>
              You will not rely on MarketMind for real-money trading or
              investment decisions.
            </li>
            <li>
              You are responsible for ensuring compliance with SEBI guidelines
              and applicable local laws.
            </li>
          </ul>
        </div>

        <div className="terms-block">
          <h3>6. Intellectual Property</h3>
          <p>
            All content, branding, algorithms, designs, software, and AI models
            used in MarketMind are the intellectual property of the platform
            owner and may not be copied, reproduced, or redistributed without
            prior written permission.
          </p>
        </div>

        <div className="terms-block">
          <h3>7. Limitation of Liability</h3>
          <p>
            MarketMind shall not be held liable for any direct, indirect,
            incidental, or consequential losses or damages arising from the use
            or inability to use the platform, including but not limited to
            financial or trading losses.
          </p>
        </div>

        <div className="terms-block">
          <h3>8. Account Termination</h3>
          <p>
            We reserve the right to suspend or terminate access to the platform
            at our sole discretion if a user violates these Terms, engages in
            misuse, or attempts to compromise the security, integrity, or
            compliance status of the platform.
          </p>
        </div>

        <div className="terms-block">
          <h3>9. Governing Law</h3>
          <p>
            These Terms of Service shall be governed by and interpreted in
            accordance with the laws of India. Any disputes arising under these
            terms shall be subject to the exclusive jurisdiction of Indian
            courts.
          </p>
        </div>

        <div className="terms-block">
          <h3>10. Changes to These Terms</h3>
          <p>
            We reserve the right to update or modify these Terms of Service at
            any time. Continued use of the platform after changes indicates
            acceptance of the revised terms.
          </p>
        </div>

        <div className="terms-block">
          <h3>11. Contact Information</h3>
          <p>
            If you have any questions regarding these Terms of Service, please
            contact us through the Contact section of the platform.
          </p>
        </div>
      </div>
    </section>
  );
}
