import { lazy, Suspense, useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ProductList from "./components/ProductList";
import Toast from "./components/Toast";
import ErrorFallback from "./components/ErrorFallback";
import ProductProvider, { ProductContext } from "./context/productContext";
import "./App.css";

// Code splitting: Lazy-load non-critical components to reduce initial bundle size
const CartDrawer = lazy(() => import("./components/CartDrawer"));
const WishlistDrawer = lazy(() => import("./components/WishlistDrawer"));
const ProductDetailModal = lazy(() => import("./components/ProductDetailModal"));
const Footer = lazy(() => import("./components/Footer"));

function MainLayout() {
  const { isCartOpen, isWishlistOpen, selectedProduct } = useContext(ProductContext);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Hero />
        <SearchBar />
        <FilterBar />
        {/* Section-level ErrorBoundary from react-error-boundary library */}
        <ErrorBoundary
          FallbackComponent={(props) => (
            <ErrorFallback {...props} title="Products Unavailable" />
          )}
        >
          <ProductList />
        </ErrorBoundary>
      </main>

      {/* Avoiding fallbacks: fallback={null} prevents UI flickering during background lazy-loading */}
      <Suspense fallback={null}>
        <Footer />
        {/* On-demand rendering ensures secondary modals/drawers are only downloaded when opened */}
        {isCartOpen && <CartDrawer />}
        {isWishlistOpen && <WishlistDrawer />}
        {selectedProduct && <ProductDetailModal />}
      </Suspense>

      <Toast />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => (
        <ErrorFallback {...props} title="Store Unavailable" />
      )}
    >
      <ProductProvider>
        <MainLayout />
      </ProductProvider>
    </ErrorBoundary>
  );
}

export default App;