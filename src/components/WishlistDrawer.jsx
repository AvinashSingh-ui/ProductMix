import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import { useFocusTrap } from "../hooks/useFocusTrap";
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

  const drawerRef = useFocusTrap(isWishlistOpen, () => setIsWishlistOpen(false));

  return (
    <div
      className={`drawer-overlay ${isWishlistOpen ? "active" : ""}`}
      onClick={() => setIsWishlistOpen(false)}
      role="presentation"
    >
      <aside
        ref={drawerRef}
        className="wishlist-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-drawer-title"
        tabIndex={-1}
      >
        <div className="drawer-header">
          <div className="drawer-title-group">
            <i className="fa-solid fa-heart wishlist-header-icon" aria-hidden="true"></i>
            <h2 id="wishlist-drawer-title" style={{ fontSize: "inherit", fontWeight: "inherit", margin: 0 }}>My Favourites</h2>
            <span className="badge badge-favorite" style={{ position: "static" }} aria-label={`${wishlistCount} favourite items`}>{wishlistCount}</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close favourites drawer"
            type="button"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <div className="drawer-body" tabIndex={0} aria-label="Favourites list">
          {wishlist.length === 0 ? (
            <div className="empty-state-card" style={{ border: "none", padding: "3rem 1rem" }}>
              <i className="fa-solid fa-heart-crack empty-icon" style={{ color: "var(--color-red)" }} aria-hidden="true"></i>
              <h3 className="empty-title">No Favourites Yet</h3>
              <p className="empty-text">Tap the heart icon on any product to save it to your wishlist!</p>
              <button
                className="btn-empty-reset"
                onClick={() => setIsWishlistOpen(false)}
                type="button"
                style={{ backgroundColor: "var(--color-red)", boxShadow: "0 4px 15px rgba(239,68,68,0.3)" }}
                aria-label="Discover items"
              >
                Discover Items
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="wishlist-item-card">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt=""
                  aria-hidden="true"
                  className="cart-item-img"
                  loading="lazy"
                  width="70"
                  height="70"
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{product.title}</h4>
                  <span className="cart-item-price">₹{formatINR(toINR(product.price))}</span>
                  <div style={{ marginTop: "0.25rem" }}>
                    <button
                      className="btn-move-to-cart"
                      onClick={() => addToCart(product)}
                      aria-label={`Add ${product.title} to cart`}
                      type="button"
                    >
                      <i className="fa-solid fa-cart-plus" aria-hidden="true"></i> Add to Cart
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove-btn"
                  onClick={() => toggleWishlist(product)}
                  title="Remove from Favourites"
                  aria-label={`Remove ${product.title} from favourites`}
                  type="button"
                  style={{ color: "var(--color-red)" }}
                >
                  <i className="fa-solid fa-heart" aria-hidden="true"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}

export default WishlistDrawer;

