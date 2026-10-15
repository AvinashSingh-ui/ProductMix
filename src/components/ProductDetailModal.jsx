import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/productContext";
import { useFocusTrap } from "../hooks/useFocusTrap";
import "./ProductDetailModal.css";

function ProductDetailModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    toINR,
    formatINR
  } = useContext(ProductContext);

  const [activeImg, setActiveImg] = useState("");
  const [qty, setQty] = useState(1);

  const modalRef = useFocusTrap(!!selectedProduct, () => setSelectedProduct(null));

  useEffect(() => {
    if (selectedProduct) {
      setActiveImg(selectedProduct.thumbnail || selectedProduct.images?.[0] || "");
      setQty(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const favorited = isWishlisted(selectedProduct.id);
  const priceINR = toINR(selectedProduct.price);
  const images = selectedProduct.images || (selectedProduct.thumbnail ? [selectedProduct.thumbnail] : []);

  const handleThumbKeyDown = (e, index) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % images.length;
      setActiveImg(images[nextIndex]);
      const nextThumb = document.getElementById(`modal-thumb-${nextIndex}`);
      nextThumb?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + images.length) % images.length;
      setActiveImg(images[prevIndex]);
      const prevThumb = document.getElementById(`modal-thumb-${prevIndex}`);
      prevThumb?.focus();
    }
  };

  return (
    <div
      className={`modal-backdrop ${selectedProduct ? "active" : ""}`}
      onClick={() => setSelectedProduct(null)}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        tabIndex={-1}
      >
        <button
          className="modal-close-btn"
          onClick={() => setSelectedProduct(null)}
          type="button"
          title="Close details dialog"
          aria-label="Close product details dialog"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>

        <div className="modal-gallery-area">
          <div className="modal-main-img-box">
            {selectedProduct.discountPercentage && (
              <span className="badge-discount">{Math.round(selectedProduct.discountPercentage)}% OFF</span>
            )}
            <img
              id="modal-main-display-img"
              src={activeImg}
              alt={selectedProduct.title}
              className="modal-main-img"
              width="400"
              height="400"
            />
          </div>

          {images.length > 1 && (
            <div className="modal-thumbs-row" role="tablist" aria-label="Product image gallery">
              {images.map((img, i) => (
                <button
                  key={i}
                  id={`modal-thumb-${i}`}
                  role="tab"
                  aria-selected={activeImg === img}
                  aria-controls="modal-main-display-img"
                  tabIndex={activeImg === img ? 0 : -1}
                  type="button"
                  className={`modal-thumb-btn ${activeImg === img ? "active" : ""}`}
                  onClick={() => setActiveImg(img)}
                  onKeyDown={(e) => handleThumbKeyDown(e, i)}
                  aria-label={`Product image ${i + 1} of ${images.length}`}
                  style={{
                    background: "none",
                    border: activeImg === img ? "2px solid var(--color-blue)" : "2px solid transparent",
                    padding: 0,
                    borderRadius: "var(--radius-sm, 6px)",
                    cursor: "pointer",
                    display: "inline-flex"
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    aria-hidden="true"
                    className="modal-thumb"
                    width="60"
                    height="60"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-info-area">
          <span className="modal-category">
            {selectedProduct.category ? selectedProduct.category.replace("-", " ") : "Category"}
          </span>

          <h2 className="modal-title" id="modal-product-title">{selectedProduct.title}</h2>

          <div className="product-rating-row" aria-label={`Rating: ${selectedProduct.rating?.toFixed(1) || "4.8"} out of 5 stars`}>
            <div className="star-rating" aria-hidden="true">
              <i className="fa-solid fa-star"></i>
              <span>{selectedProduct.rating?.toFixed(1) || "4.8"}</span>
            </div>
            <span className="rating-count">({selectedProduct.stock || 45} in stock)</span>
          </div>

          <div className="product-price" style={{ margin: "0.5rem 0" }}>
            <span className="price-current" style={{ fontSize: "1.8rem" }} aria-label={`Price: ₹${formatINR(priceINR)}`}>
              ₹{formatINR(priceINR)}
            </span>
          </div>

          <p className="modal-desc">{selectedProduct.description}</p>

          <div className="modal-meta-grid" role="list" aria-label="Product features and guarantees">
            <div className="modal-meta-item" role="listitem">
              <i className="fa-solid fa-truck-fast" aria-hidden="true"></i>
              <span>{selectedProduct.shippingInformation || "Free Delivery Across India"}</span>
            </div>
            <div className="modal-meta-item" role="listitem">
              <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
              <span>{selectedProduct.warrantyInformation || "1 Year Warranty"}</span>
            </div>
            <div className="modal-meta-item" role="listitem">
              <i className="fa-solid fa-arrow-rotate-left" aria-hidden="true"></i>
              <span>{selectedProduct.returnPolicy || "30 Days Return"}</span>
            </div>
            <div className="modal-meta-item" role="listitem">
              <i className="fa-solid fa-money-bill-wave" aria-hidden="true"></i>
              <span>COD Available</span>
            </div>
          </div>

          <div className="modal-actions-row">
            <div className="cart-qty-row" role="group" aria-label="Adjust product quantity" style={{ transform: "scale(1.1)" }}>
              <button
                className="qty-btn"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
                type="button"
              >
                -
              </button>
              <span className="qty-num" aria-live="polite" aria-atomic="true">{qty}</span>
              <button
                className="qty-btn"
                onClick={() => setQty(qty + 1)}
                aria-label="Increase quantity"
                type="button"
              >
                +
              </button>
            </div>

            <button
              className="add-cart-btn"
              style={{ flex: 1, padding: "0.8rem 1.5rem", fontSize: "1rem", justifyContent: "center" }}
              onClick={() => {
                addToCart(selectedProduct, qty);
                setSelectedProduct(null);
              }}
              aria-label={`Add ${qty} of ${selectedProduct.title} to cart`}
              type="button"
            >
              <i className="fa-solid fa-bag-shopping" aria-hidden="true"></i> Add {qty} to Cart
            </button>

            <button
              className={`favorite-btn-overlay ${favorited ? "active" : ""}`}
              style={{ position: "static", width: "48px", height: "48px" }}
              onClick={() => toggleWishlist(selectedProduct)}
              type="button"
              title={favorited ? "Remove from favourites" : "Add to favourites"}
              aria-label={favorited ? "Remove from favourites" : "Add to favourites"}
              aria-pressed={favorited}
            >
              <i className={favorited ? "fa-solid fa-heart" : "fa-regular fa-heart"} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;

