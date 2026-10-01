import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import "./WishlistDrawer.css";

function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    wishlistCount,
    toINR,
    formatINR
  } = useContext(ProductContext);

  return (
    <div className={`drawer-overlay ${isWishlistOpen ? "active" : ""}`} onClick={() => setIsWishlistOpen(false)}>
      <div className="wishlist-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <i className="fa-solid fa-heart wishlist-header-icon"></i>
            <span>My Favourites</span>
            <span className="badge badge-favorite" style={{ position: "static" }}>{wishlistCount}</span>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsWishlistOpen(false)} type="button">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body">
          {wishlist.length === 0 ? (
            <div className="empty-state-card" style={{ border: "none", padding: "3rem 1rem" }}>
              <i className="fa-solid fa-heart-crack empty-icon" style={{ color: "var(--color-red)" }}></i>
              <h4 className="empty-title">No Favourites Yet</h4>
              <p className="empty-text">Tap the heart icon on any product to save it to your wishlist!</p>
              <button
                className="btn-empty-reset"
                onClick={() => setIsWishlistOpen(false)}
                type="button"
                style={{ backgroundColor: "var(--color-red)", boxShadow: "0 4px 15px rgba(239,68,68,0.3)" }}
              >
                Discover Items
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="wishlist-item-card">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{product.title}</h4>
                  <span className="cart-item-price">₹{formatINR(toINR(product.price))}</span>
                  <div style={{ marginTop: "0.25rem" }}>
                    <button
                      className="btn-move-to-cart"
                      onClick={() => addToCart(product)}
                      type="button"
                    >
                      <i className="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove-btn"
                  onClick={() => toggleWishlist(product)}
                  title="Remove from Favourites"
                  type="button"
                  style={{ color: "var(--color-red)" }}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default WishlistDrawer;
