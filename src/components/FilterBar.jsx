import { useContext, useRef } from "react";
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

  const pillsRowRef = useRef(null);

  const allCategoryList = ["all", ...categories];

  const handlePillKeyDown = (e, index) => {
    let targetIndex = -1;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      targetIndex = (index + 1) % allCategoryList.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      targetIndex = (index - 1 + allCategoryList.length) % allCategoryList.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = allCategoryList.length - 1;
    }

    if (targetIndex !== -1) {
      const selectedCat = allCategoryList[targetIndex];
      setCategory(selectedCat);
      const targetPill = pillsRowRef.current?.querySelector(`[data-cat="${selectedCat}"]`);
      targetPill?.focus();
    }
  };

  return (
    <section className="filter-container" aria-label="Product filters and sorting">
      <div className="filter-card">
        <div className="filter-top-row">
          <div className="filter-group">
            <div className="filter-control">
              <label className="filter-label" htmlFor="filter-category-select">
                <i className="fa-solid fa-list-check" aria-hidden="true"></i> Category
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
                <i className="fa-solid fa-arrow-down-short-wide" aria-hidden="true"></i> Sort By
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
                <i className="fa-solid fa-indian-rupee-sign" aria-hidden="true"></i> Max:
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
                aria-valuemin={0}
                aria-valuemax={maxAvailablePrice}
                aria-valuenow={maxPrice}
                aria-valuetext={`₹${formatINR(maxPrice)}`}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <span className="price-val" aria-hidden="true">₹{formatINR(maxPrice)}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-reset-filters"
            onClick={resetFilters}
            title="Reset all filters"
            aria-label="Reset all product filters"
          >
            <i className="fa-solid fa-rotate-left" aria-hidden="true"></i> Reset
          </button>
        </div>

        <div
          ref={pillsRowRef}
          className="category-pills-row"
          role="tablist"
          aria-label="Product categories"
        >
          {allCategoryList.map((cat, idx) => {
            const isSelected = category === cat;
            const displayName = cat === "all" ? "All Products" : cat.replace("-", " ");
            return (
              <button
                key={cat}
                type="button"
                data-cat={cat}
                role="tab"
                id={`category-tab-${cat}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={`category-pill ${isSelected ? "active" : ""}`}
                onClick={() => setCategory(cat)}
                onKeyDown={(e) => handlePillKeyDown(e, idx)}
                aria-label={`Filter by ${displayName}`}
              >
                {displayName}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FilterBar;