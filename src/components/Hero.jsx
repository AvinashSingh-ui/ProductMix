import "./Hero.css";

function Hero() {
  return (
    <section className="hero-container" aria-label="Featured Promotion">
      <div className="hero-card">
        <div className="hero-glow-1" aria-hidden="true"></div>
        <div className="hero-glow-2" aria-hidden="true"></div>
        <div className="hero-glow-3" aria-hidden="true"></div>

        <div className="hero-content">
          <div className="hero-badge">
            <i className="fa-solid fa-bolt" aria-hidden="true"></i> 🇮🇳 Grand Indian Sale • Up to 50% Off
          </div>
          <h1 className="hero-title">
            Shop Premium <br />
            <span className="hero-highlight-yellow">Products</span> at Best <span className="hero-highlight-blue">Prices</span>
          </h1>
          <p className="hero-description">
            India's favourite destination for premium products across electronics, fashion, home & more. Free delivery across India. 100% authentic guarantee. COD available.
          </p>
          <div className="hero-cta-group">
            <a href="#products-section" className="btn-hero-primary" aria-label="Shop our full product collection now">
              <i className="fa-solid fa-bag-shopping" aria-hidden="true"></i> Shop Now
            </a>
            <a href="#products-section" className="btn-hero-secondary" aria-label="Explore trending hot deals">
              <i className="fa-solid fa-fire" aria-hidden="true"></i> Trending Deals
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Store highlights">
          <div className="hero-stats-card" role="list">
            <div className="stat-item" role="listitem">
              <span className="stat-num">50L+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item" role="listitem">
              <span className="stat-num">100%</span>
              <span className="stat-label">Genuine Products</span>
            </div>
            <div className="stat-item" role="listitem">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Customer Support</span>
            </div>
            <div className="stat-item" role="listitem">
              <span className="stat-num">₹0</span>
              <span className="stat-label">Delivery Charges</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

