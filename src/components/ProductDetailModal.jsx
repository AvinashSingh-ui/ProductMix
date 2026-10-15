import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/productContext";
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

  useEffect(() => {
    if (selectedProduct) {
      setActiveImg(selectedProduct.thumbnail || selectedProduct.images?.[0] || "");
      setQty(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const favorited = isWishlisted(selectedProduct.id);
  const priceINR = toINR(selectedProduct.price);

  return (
    <div className={`modal-backdrop ${selectedProduct ? "active" : ""}`} onClick={() => setSelectedProduct(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => setSelectedProduct(null)}
          type="button"
          title="Close"
          aria-label="Close product details modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-gallery-area">
          <div className="modal-main-img-box">
            {selectedProduct.discountPercentage && (
              <span className="badge-discount">{Math.round(selectedProduct.discountPercentage)}% OFF</span>
            )}
            <img src={activeImg} alt={selectedProduct.title} className="modal-main-img" width="400" height="400" />
          </div>

          {selectedProduct.images?.length > 1 && (
            <div className="modal-thumbs-row">
              {selectedProduct.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${selectedProduct.title} preview ${i + 1}`}
                  className={`modal-thumb ${activeImg === img ? "active" : ""}`}
                  onClick={() => setActiveImg(img)}
                  width="60"
                  height="60"
                />
              ))}
            </div>
          )}
        </div>

        <div className="modal-info-area">
          <span className="modal-category">
            {selectedProduct.category ? selectedProduct.category.replace("-", " ") : "Category"}
          </span>

          <h2 className="modal-title">{selectedProduct.title}</h2>

          <div className="product-rating-row">
            <div className="star-rating">
              <i className="fa-solid fa-star"></i>
              <span>{selectedProduct.rating?.toFixed(1) || "4.8"}</span>
            </div>
            <span className="rating-count">({selectedProduct.stock || 45} in stock)</span>
          </div>

          <div className="product-price" style={{ margin: "0.5rem 0" }}>
            <span className="price-current" style={{ fontSize: "1.8rem" }}>
              ₹{formatINR(priceINR)}
            </span>
          </div>

          <p className="modal-desc">{selectedProduct.description}</p>

          <div className="modal-meta-grid">
            <div className="modal-meta-item">
              <i className="fa-solid fa-truck-fast"></i>
              <span>{selectedProduct.shippingInformation || "Free Delivery Across India"}</span>
            </div>
            <div className="modal-meta-item">
              <i className="fa-solid fa-shield-halved"></i>
              <span>{selectedProduct.warrantyInformation || "1 Year Warranty"}</span>
            </div>
            <div className="modal-meta-item">
              <i className="fa-solid fa-arrow-rotate-left"></i>
              <span>{selectedProduct.returnPolicy || "30 Days Return"}</span>
            </div>
            <div className="modal-meta-item">
              <i className="fa-solid fa-money-bill-wave"></i>
              <span>COD Available</span>
            </div>
          </div>

          <div className="modal-actions-row">
            <div className="cart-qty-row" style={{ transform: "scale(1.1)" }}>
              <button
                className="qty-btn"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
                type="button"
              >
                -
              </button>
              <span className="qty-num">{qty}</span>
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
              aria-label={`Add ${qty} items of ${selectedProduct.title} to cart`}
              type="button"
            >
              <i className="fa-solid fa-bag-shopping"></i> Add {qty} to Cart
            </button>

            <button
              className={`favorite-btn-overlay ${favorited ? "active" : ""}`}
              style={{ position: "static", width: "48px", height: "48px" }}
              onClick={() => toggleWishlist(selectedProduct)}
              type="button"
              title="Add to Favourites"
              aria-label={favorited ? "Remove from favourites" : "Add to favourites"}
            >
              <i className={favorited ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
