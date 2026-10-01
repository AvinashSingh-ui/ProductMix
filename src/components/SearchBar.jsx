import { useEffect, useRef, useContext } from "react";
import { ProductContext } from "../context/productContext";
import "./SearchBar.css";

function SearchBar() {
  const inputRef = useRef(null);
  const { search, setSearch } = useContext(ProductContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClear = () => {
    setSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section className="search-container">
      <div className="search-box-wrapper">
        <i className="fa-solid fa-magnifying-glass search-icon-left"></i>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search products by title, category, description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            title="Clear search"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
    </section>
  );
}

export default SearchBar;