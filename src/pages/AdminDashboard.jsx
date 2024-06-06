import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTab from "./UserTab";
import ProductsTab from "./ProductsTab";
import "./AdminDashboard.css"; // Import CSS file for styling
import { Spinner, Alert, AlertIcon, useToast } from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/admin/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
    fetchProducts();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
      toast({
        title: "User deleted.",
        description: "The user has been successfully deleted.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error deleting user.",
        description: `There was an error deleting the user: ${
          error.response?.data?.message || error.message
        }`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/admin/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== productId));
      toast({
        title: "Product deleted.",
        description: "The product has been successfully deleted.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error deleting product.",
        description: `There was an error deleting the product: ${
          error.response?.data?.message || error.message
        }`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (productId, updatedProduct) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${API_URL}/admin/products/${productId}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(
        products.map((product) =>
          product._id === productId ? response.data : product
        )
      );
      toast({
        title: "Product updated.",
        description: "The product has been successfully updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error updating product.",
        description: `There was an error updating the product: ${
          error.response?.data?.message || error.message
        }`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <div className="admin-dashboard">
      <nav className="tab-nav">
        <ul>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => handleTabClick("users")}
          >
            Users
          </li>
          <li
            className={activeTab === "products" ? "active" : ""}
            onClick={() => handleTabClick("products")}
          >
            Products
          </li>
        </ul>
      </nav>
      <div className="tab-content">
        {activeTab === "users" && (
          <UserTab users={users} onDeleteUser={handleDeleteUser} />
        )}
        {activeTab === "products" && (
          <ProductsTab
            products={products}
            setProducts={setProducts}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
