import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import ProductDetailModal from "./components/ProductDetailModal";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import ProductProvider from "./context/productContext";
import "./App.css";

function App() {
  return (
    <ProductProvider>
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <Hero />
          <SearchBar />
          <FilterBar />
          <ProductList />
        </main>
        <Footer />
        <CartDrawer />
        <WishlistDrawer />
        <ProductDetailModal />
        <Toast />
      </div>
    </ProductProvider>
  );
}

export default App;