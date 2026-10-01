import { useContext, useMemo } from "react";
import { ProductContext } from "../context/productContext";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList() {
  const {
    products,
    loading,
    error,
    search,
    category,
    sortBy,
    maxPrice,
    resetFilters,
    toINR
  } = useContext(ProductContext);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          (p.category && p.category.toLowerCase().includes(query)) ||
          (p.description && p.description.toLowerCase().includes(query))
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (maxPrice) {
      result = result.filter((p) => toINR(p.price) <= maxPrice);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-high") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "title-az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, search, category, sortBy, maxPrice, toINR]);

  return (
    <section className="products-section-container" id="products-section">
      <div className="products-header-row">
        <div className="products-title-group">
          <h2 className="products-main-title">
            {category === "all" ? "All Products" : category.replace("-", " ")}
          </h2>
          <span className="products-count-badge">
            {filteredProducts.length} {filteredProducts.length === 1 ? "Item" : "Items"}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="products-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-box skeleton-img"></div>
              <div className="skeleton-body">
                <div className="skeleton-box skeleton-line-short"></div>
                <div className="skeleton-box skeleton-line"></div>
                <div className="skeleton-box skeleton-btn"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="empty-state-card">
          <i className="fa-solid fa-triangle-exclamation empty-icon" style={{ color: "var(--color-red)" }}></i>
          <h3 className="empty-title">Failed to Load Products</h3>
          <p className="empty-text">{error}</p>
          <button className="btn-empty-reset" onClick={() => window.location.reload()}>
            <i className="fa-solid fa-rotate-right"></i> Try Again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state-card">
          <i className="fa-solid fa-box-open empty-icon"></i>
          <h3 className="empty-title">No Matching Products Found</h3>
          <p className="empty-text">
            We couldn't find any products matching your current filters. Try adjusting your search or clearing filters.
          </p>
          <button className="btn-empty-reset" onClick={resetFilters}>
            <i className="fa-solid fa-filter-circle-xmark"></i> Clear Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;