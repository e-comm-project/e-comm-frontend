import React from "react";
import { useCart } from "../context/cart.context";
import { useOrders } from "../context/order.context";

const Cart = () => {
  const { cart, removeItem, updateQuantity } = useCart();
  const { addOrder } = useOrders();

  const handleAddToOrders = (product) => {
    addOrder(product); // Add to orders
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 && <p>Your cart is empty </p>}
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            <span>{product.name} </span>
            <span> {product.price}</span>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                updateQuantity(product.id, parseInt(e.target.value))
              }
            />
            <button onClick={() => removeItem(product.id)}>Remove</button>
            <button onClick={() => handleAddToOrders(product)}>
              Add to Orders
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
