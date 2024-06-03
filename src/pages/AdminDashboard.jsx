import React, { useState } from "react";
import UserTab from "./UserTab"; // Fixed import statement
import ProductsTab from "./ProductsTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => handleTabClick("users")}>Users</li>
          <li onClick={() => handleTabClick("products")}>Products</li>
        </ul>
      </nav>
      {activeTab === "users" && <UserTab />}{" "}
      {/* Render UsersTab when activeTab is "users" */}
      {activeTab === "products" && <ProductsTab />}
    </div>
  );
};

export default AdminDashboard;
