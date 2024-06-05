import { Routes, Route, useMatch, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import AdminDashboard from "./pages/AdminDashboard";
import { CartProvider } from "./context/cart.context";
import Orders from "./pages/Orders";

import IsAdmin from "./components/IsAdmin";

function App() {
  const location = useLocation();

  const isNotFoundPage =
    location.pathname !== "/" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/login" &&
    location.pathname !== "/profile" &&
    location.pathname !== "/admin" &&
    location.pathname !== "/products" &&
    !location.pathname.startsWith("/product/") &&
    location.pathname !== "/orders" &&
    location.pathname !== "/about" &&
    location.pathname !== "/contact";
  return (
    <CartProvider>
      {!isNotFoundPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin"
          element={
            <IsAdmin>
              <AdminDashboard />
            </IsAdmin>
          }
        />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isNotFoundPage && <Footer />}
    </CartProvider>
  );
}

export default App;
