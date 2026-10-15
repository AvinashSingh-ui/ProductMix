import { useContext, useMemo, useState, useEffect } from "react";
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

  const [visibleCount, setVisibleCount] = useState(20);

  // Reset to 20 when user filters or searches
  useEffect(() => {
    setVisibleCount(20);
  }, [search, category, sortBy, maxPrice]);

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

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section className="products-section-container" id="products-section" aria-label="Product Catalog">
      <div className="products-header-row">
        <div className="products-title-group">
          <h2 className="products-main-title">
            {category === "all" ? "All Products" : category.replace("-", " ")}
          </h2>
          <span className="products-count-badge" aria-live="polite" aria-atomic="true">
            Showing {visibleProducts.length} of {filteredProducts.length} {filteredProducts.length === 1 ? "Item" : "Items"}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="products-grid" role="status" aria-busy="true" aria-label="Loading products">
          <span className="sr-only">Loading products, please wait...</span>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card" aria-hidden="true">
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
        <div className="empty-state-card" role="alert">
          <i className="fa-solid fa-triangle-exclamation empty-icon" style={{ color: "var(--color-red)" }} aria-hidden="true"></i>
          <h3 className="empty-title">Failed to Load Products</h3>
          <p className="empty-text">{error}</p>
          <button className="btn-empty-reset" onClick={() => window.location.reload()} type="button">
            <i className="fa-solid fa-rotate-right" aria-hidden="true"></i> Try Again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state-card" role="status" aria-live="polite">
          <i className="fa-solid fa-box-open empty-icon" aria-hidden="true"></i>
          <h3 className="empty-title">No Matching Products Found</h3>
          <p className="empty-text">
            We couldn't find any products matching your current filters. Try adjusting your search or clearing filters.
          </p>
          <button className="btn-empty-reset" onClick={resetFilters} type="button" aria-label="Clear all active filters">
            <i className="fa-solid fa-filter-circle-xmark" aria-hidden="true"></i> Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="products-grid" role="region" aria-label="Products list">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length > visibleCount && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => setVisibleCount((prev) => prev + 20)}
                aria-label={`Load more products, ${filteredProducts.length - visibleCount} more remaining`}
                style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}
              >
                <i className="fa-solid fa-arrow-down" aria-hidden="true"></i> Load More Products ({filteredProducts.length - visibleCount} more)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default ProductList;