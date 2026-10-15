import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-glow"></div>
      <div className="footer-inner">
        <div className="footer-col">
          <a href="#" className="footer-logo">
            <div className="brand-icon">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <span>Product<span className="brand-accent">Mix</span></span>
          </a>
          <p className="footer-desc">
            India's trusted destination for premium products across electronics, fashion, home décor & daily essentials. Shop with confidence — 100% genuine products, free delivery & hassle-free returns.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Shop Categories</h4>
          <ul className="footer-links">
            <li><a href="#products-section" className="footer-link">Beauty & Cosmetics</a></li>
            <li><a href="#products-section" className="footer-link">Electronics & Gadgets</a></li>
            <li><a href="#products-section" className="footer-link">Fashion & Apparel</a></li>
            <li><a href="#products-section" className="footer-link">Home & Kitchen</a></li>
            <li><a href="#products-section" className="footer-link">Sports & Fitness</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Help & Support</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Track Your Order</a></li>
            <li><a href="#" className="footer-link">Shipping & Delivery</a></li>
            <li><a href="#" className="footer-link">Returns & Exchange</a></li>
            <li><a href="#" className="footer-link">FAQs</a></li>
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Stay Connected</h4>
          <p className="footer-desc">Get exclusive deals, offers & product updates delivered to your inbox.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              id="newsletter-email-input"
              aria-label="Email address for newsletter"
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="newsletter-btn" aria-label="Subscribe to newsletter">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} ProductMix India Pvt. Ltd. All Rights Reserved.</span>
        <div className="footer-india-badge">
          <span>🇮🇳</span> Made with Love in India
        </div>
        <div className="payment-icons">
          <i className="fa-brands fa-cc-visa"></i>
          <i className="fa-brands fa-cc-mastercard"></i>
          <i className="fa-brands fa-google-pay"></i>
          <i className="fa-solid fa-money-bill-wave" title="Cash on Delivery"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
