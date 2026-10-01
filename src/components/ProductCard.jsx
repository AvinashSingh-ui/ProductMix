import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSelectedProduct,
    toINR,
    formatINR
  } = useContext(ProductContext);

  const favorited = isWishlisted(product.id);

  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : null;

  const priceINR = toINR(product.price);
  const originalPriceINR = discount
    ? Math.round(priceINR / (1 - discount / 100))
    : null;

  return (
    <article className="product-card">
      <div className="product-image-area" onClick={() => setSelectedProduct(product)}>
        {discount && discount > 0 && (
          <span className="badge-discount">{discount}% OFF</span>
        )}

        <button
          type="button"
          className={`favorite-btn-overlay ${favorited ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={favorited ? "Remove from Favourites" : "Add to Favourites"}
        >
          <i className={favorited ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
        </button>

        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="product-img"
          loading="lazy"
        />

        <button
          type="button"
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
        >
          <i className="fa-regular fa-eye"></i> Quick View
        </button>
      </div>

      <div className="product-info">
        <span className="product-category-text">
          {product.category ? product.category.replace("-", " ") : "General"}
        </span>

        <h3 className="product-title-text" title={product.title}>
          {product.title}
        </h3>

        <div className="product-rating-row">
          <div className="star-rating">
            <i className="fa-solid fa-star"></i>
            <span>{product.rating ? product.rating.toFixed(1) : "4.5"}</span>
          </div>
          <span className="rating-count">
            ({product.reviews?.length || product.stock || 24} reviews)
          </span>
        </div>

        <div className="product-bottom-row">
          <div className="product-price">
            <span className="price-current">₹{formatINR(priceINR)}</span>
            {originalPriceINR && (
              <span className="price-original">₹{formatINR(originalPriceINR)}</span>
            )}
          </div>

          <button
            type="button"
            className="add-cart-btn"
            onClick={() => addToCart(product)}
            title="Add to Cart"
          >
            <i className="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
