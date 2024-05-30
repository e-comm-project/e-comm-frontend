import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HomePage />
      <ProductDetails />
      <ProductList />
    </>
  );
}

export default App;
