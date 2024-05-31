import React from "react";
import { useOrders } from "../context/order.context";

const Orders = () => {
  const { orders } = useOrders();
  console.log("Orders:", orders);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders ? (
          orders.map((order, index) => <li key={index}>{order.name}</li>)
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
};

export default Orders;
