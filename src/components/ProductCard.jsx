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
    <article className="product-card" aria-labelledby={`product-title-${product.id}`}>
      <div
        className="product-image-area"
        onClick={() => setSelectedProduct(product)}
      >
        {discount && discount > 0 && (
          <span className="badge-discount" aria-label={`${discount}% discount`}>{discount}% OFF</span>
        )}

        <button
          type="button"
          className={`favorite-btn-overlay ${favorited ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={favorited ? "Remove from Favourites" : "Add to Favourites"}
          aria-label={favorited ? `Remove ${product.title} from favourites` : `Add ${product.title} to favourites`}
          aria-pressed={favorited}
        >
          <i className={favorited ? "fa-solid fa-heart" : "fa-regular fa-heart"} aria-hidden="true"></i>
        </button>

        <img
          src={product.thumbnail || product.images?.[0]}
          alt=""
          aria-hidden="true"
          className="product-img"
          loading="lazy"
          decoding="async"
          width="240"
          height="240"
        />

        <button
          type="button"
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          aria-label={`Quick view details for ${product.title}`}
        >
          <i className="fa-regular fa-eye" aria-hidden="true"></i> Quick View
        </button>
      </div>

      <div className="product-info">
        <span className="product-category-text">
          {product.category ? product.category.replace("-", " ") : "General"}
        </span>

        <h3 className="product-title-text" id={`product-title-${product.id}`}>
          <button
            type="button"
            className="product-title-btn"
            onClick={() => setSelectedProduct(product)}
            title={product.title}
            aria-label={`View details for ${product.title}`}
          >
            {product.title}
          </button>
        </h3>

        <div className="product-rating-row" aria-label={`Rating: ${product.rating ? product.rating.toFixed(1) : "4.5"} out of 5 stars`}>
          <div className="star-rating" aria-hidden="true">
            <i className="fa-solid fa-star"></i>
            <span>{product.rating ? product.rating.toFixed(1) : "4.5"}</span>
          </div>
          <span className="rating-count">
            ({product.reviews?.length || product.stock || 24} reviews)
          </span>
        </div>

        <div className="product-bottom-row">
          <div className="product-price">
            <span className="price-current" aria-label={`Price: ₹${formatINR(priceINR)}`}>₹{formatINR(priceINR)}</span>
            {originalPriceINR && (
              <span className="price-original" aria-label={`Original price: ₹${formatINR(originalPriceINR)}`}>₹{formatINR(originalPriceINR)}</span>
            )}
          </div>

          <button
            type="button"
            className="add-cart-btn"
            onClick={() => addToCart(product)}
            title="Add to Cart"
            aria-label={`Add ${product.title} to cart`}
          >
            <i className="fa-solid fa-cart-plus" aria-hidden="true"></i> Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

