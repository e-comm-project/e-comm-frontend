// ProductsTab.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsTab = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/admin/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {/* Add CRUD functionality for products here */}
    </div>
  );
};

export default ProductsTab;
