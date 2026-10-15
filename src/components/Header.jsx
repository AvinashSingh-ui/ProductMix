import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import "./Header.css";

function Header() {
  const {
    cartItemCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    theme,
    toggleTheme
  } = useContext(ProductContext);

  return (
    <header className="header-container">
      <div className="header-inner">
        <a href="#" className="header-brand">
          <div className="brand-icon">
            <i className="fa-solid fa-layer-group"></i>
          </div>
          <span>Product<span className="brand-accent">Mix</span></span>
        </a>

        <nav className="header-nav">
          <a href="#" className="nav-link active">Home</a>
          <a href="#products-section" className="nav-link">Shop</a>
          <a href="#products-section" className="nav-link">Categories</a>
          <a href="#products-section" className="nav-link">Deals</a>
        </nav>

        <div className="header-actions">

          <button
            className="action-btn theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            type="button"
          >
            <i className={theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
          </button>

          <button
            className="action-btn favorite-btn"
            onClick={() => setIsWishlistOpen(true)}
            title="Favourites"
            aria-label={`View Favourites (${wishlistCount} items)`}
            type="button"
          >
            <i className="fa-solid fa-heart" style={{ color: wishlistCount > 0 ? "var(--color-red)" : "inherit" }}></i>
            {wishlistCount > 0 && (
              <span className="badge badge-favorite">{wishlistCount}</span>
            )}
          </button>

          <button
            className="action-btn cart-btn"
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart"
            aria-label={`View Shopping Cart (${cartItemCount} items)`}
            type="button"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            {cartItemCount > 0 && (
              <span className="badge badge-cart">{cartItemCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
