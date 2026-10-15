import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import "./FilterBar.css";

function FilterBar() {
  const {
    category,
    setCategory,
    categories,
    sortBy,
    setSortBy,
    maxPrice,
    setMaxPrice,
    maxAvailablePrice,
    resetFilters,
    formatINR
  } = useContext(ProductContext);

  return (
    <section className="filter-container">
      <div className="filter-card">
        <div className="filter-top-row">
          <div className="filter-group">
            <div className="filter-control">
              <label className="filter-label" htmlFor="filter-category-select">
                <i className="fa-solid fa-list-check"></i> Category
              </label>
              <select
                id="filter-category-select"
                aria-label="Filter by product category"
                className="filter-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-control">
              <label className="filter-label" htmlFor="filter-sort-select">
                <i className="fa-solid fa-arrow-down-short-wide"></i> Sort By
              </label>
              <select
                id="filter-sort-select"
                aria-label="Sort products by criteria"
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating-high">Rating: High to Low</option>
                <option value="title-az">Name: A to Z</option>
              </select>
            </div>

            <div className="price-range-control">
              <label className="filter-label" htmlFor="filter-price-slider">
                <i className="fa-solid fa-indian-rupee-sign"></i> Max:
              </label>
              <input
                id="filter-price-slider"
                aria-label="Filter by maximum price"
                type="range"
                className="price-range-slider"
                min="0"
                max={maxAvailablePrice}
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <span className="price-val">₹{formatINR(maxPrice)}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-reset-filters"
            onClick={resetFilters}
            title="Reset all filters"
            aria-label="Reset all product filters"
          >
            <i className="fa-solid fa-rotate-left"></i> Reset
          </button>
        </div>

        <div className="category-pills-row">
          <button
            className={`category-pill ${category === "all" ? "active" : ""}`}
            onClick={() => setCategory("all")}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FilterBar;