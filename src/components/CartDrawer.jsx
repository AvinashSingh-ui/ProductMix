import { useContext, useEffect } from "react";
import { ProductContext } from "../context/productContext";
import "./CartDrawer.css";

function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    showToast,
    toINR,
    formatINR
  } = useContext(ProductContext);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    showToast("Order placed! Thank you for shopping with us.", "success");
    clearCart();
    setIsCartOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  return (
    <div
      className={`drawer-overlay ${isCartOpen ? "active" : ""}`}
      onClick={() => setIsCartOpen(false)}
      role="presentation"
    >
      <div
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="drawer-header">
          <div className="drawer-title-group">
            <i className="fa-solid fa-bag-shopping drawer-title-icon"></i>
            <span id="cart-drawer-title">Your Cart</span>
            <span className="products-count-badge">{cartItemCount}</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            type="button"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-state-card" style={{ border: "none", padding: "3rem 1rem" }}>
              <i className="fa-solid fa-cart-arrow-down empty-icon" style={{ color: "var(--color-blue)" }}></i>
              <h4 className="empty-title">Your Cart is Empty</h4>
              <p className="empty-text">Start shopping to add items to your cart!</p>
              <button
                className="btn-empty-reset"
                onClick={() => setIsCartOpen(false)}
                type="button"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item-card">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="cart-item-img"
                  loading="lazy"
                  width="70"
                  height="70"
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{product.title}</h4>
                  <span className="cart-item-price">₹{formatINR(toINR(product.price) * quantity)}</span>
                  <div className="cart-qty-row">
                    <button
                      className="qty-btn"
                      onClick={() => updateCartQuantity(product.id, -1)}
                      aria-label={`Decrease quantity of ${product.title}`}
                      type="button"
                    >
                      -
                    </button>
                    <span className="qty-num">{quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateCartQuantity(product.id, 1)}
                      aria-label={`Increase quantity of ${product.title}`}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove-btn"
                  onClick={() => removeFromCart(product.id)}
                  title="Remove Item"
                  aria-label={`Remove ${product.title} from cart`}
                  type="button"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{formatINR(cartTotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span style={{ color: "var(--color-yellow-dark)", fontWeight: "700" }}>FREE</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total Amount</span>
              <span className="summary-total-val">₹{formatINR(cartTotal)}</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout} type="button">
              <i className="fa-solid fa-credit-card"></i> Place Order • ₹{formatINR(cartTotal)}
            </button>
            <button className="btn-clear-cart" onClick={clearCart} type="button">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
