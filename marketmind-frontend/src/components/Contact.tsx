import "./Contact.css";

export function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-container">

        {/* ================= HEADER ================= */}
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>
            Have questions about MarketMind, AI analysis, or simulations?
            We’d love to hear from you.
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="contact-content">

          {/* LEFT INFO */}
          <div className="contact-info">
            <h3>Get in Touch</h3>

            <p>
              📍 India <br />
              📧 marketmind@gmail.com <br />
              🕒 Mon – Fri, 9:00 AM – 5:00 PM
            </p>

            <div className="contact-note">
              Educational & research-focused platform.  
              No real-money trading supported.
            </div>
          </div>

          {/* RIGHT FORM */}
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent successfully!");
            }}
          >
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows={5} required />

            <button type="submit">Send Message</button>
          </form>

        </div>
      </div>
    </section>
  );
}
