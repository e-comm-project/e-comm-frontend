import React, { useState } from "react";
import UserTab from "./UserTab";
import ProductsTab from "./ProductsTab";
import "./AdminDashboard.css"; // Import CSS file for styling

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
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
      {activeTab === "users" && <UserTab />}
      {activeTab === "products" && <ProductsTab />}
    </div>
  );
};

export default AdminDashboard;
