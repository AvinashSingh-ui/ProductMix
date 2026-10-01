import { createContext, useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../data/product";

const ProductContext = createContext();

const USD_TO_INR = 83;

function toINR(usdPrice) {
  return Math.round(usdPrice * USD_TO_INR);
}

function formatINR(amount) {
  return amount.toLocaleString("en-IN");
}

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("pm_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("pm_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("pm_theme") || "light";
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const result = await fetchProducts();
        setProducts(result);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to load products");
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("pm_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("pm_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pm_theme", theme);
  }, [theme]);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [products]);

  const maxAvailablePrice = useMemo(() => {
    if (!products.length) return 500000;
    return Math.ceil(Math.max(...products.map((p) => toINR(p.price))));
  }, [products]);

  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: qty }];
      }
    });
    showToast(`"${product.title}" added to cart!`, "success");
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart", "info");
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart cleared", "info");
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        showToast("Removed from favourites", "info");
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        showToast("Added to favourites! ❤️", "favorite");
        return [...prevWishlist, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + toINR(item.product.price) * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const wishlistCount = wishlist.length;

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSortBy("default");
    setMinRating(0);
    setMaxPrice(maxAvailablePrice);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        search,
        setSearch,
        category,
        setCategory,
        categories,
        sortBy,
        setSortBy,
        minRating,
        setMinRating,
        maxPrice,
        setMaxPrice,
        maxAvailablePrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
        theme,
        toggleTheme,
        toast,
        showToast,
        resetFilters,
        toINR,
        formatINR
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
export { ProductContext };