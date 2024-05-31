import React from "react";
import { useCart } from "../context/cart.context";

const Cart = () => {
  const { cart, removeItem, updateQuantity } = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 && <p>Your cart is empty</p>}
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.price}</span>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                updateQuantity(product.id, parseInt(e.target.value))
              }
            />
            <button onClick={() => removeItem(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
