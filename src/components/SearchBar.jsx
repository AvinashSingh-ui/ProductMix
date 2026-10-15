import { useEffect, useRef, useContext } from "react";
import { ProductContext } from "../context/productContext";
import "./SearchBar.css";

function SearchBar() {
  const inputRef = useRef(null);
  const { search, setSearch } = useContext(ProductContext);

  // Global keyboard shortcut: Press '/' anywhere to focus search
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName) &&
        !document.activeElement?.isContentEditable
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const handleClear = () => {
    setSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Escape") {
      if (search) {
        setSearch("");
      } else {
        inputRef.current?.blur();
      }
    }
  };

  return (
    <section className="search-container" role="search" aria-label="Product Search">
      <div className="search-box-wrapper">
        <i className="fa-solid fa-magnifying-glass search-icon-left" aria-hidden="true"></i>
        <input
          ref={inputRef}
          id="product-search-input"
          type="search"
          role="searchbox"
          aria-label="Search products by title, category, or description"
          aria-keyshortcuts="/"
          aria-controls="products-section"
          className="search-input"
          placeholder="Search products by title, category, description... (Press '/' to focus)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        {search ? (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            title="Clear search (Esc)"
            aria-label="Clear search query"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        ) : (
          <kbd className="search-kbd-hint" title="Press / to focus search" aria-hidden="true">
            /
          </kbd>
        )}
      </div>
    </section>
  );
}

export default SearchBar;