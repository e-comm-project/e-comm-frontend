import { CartContext } from "../context/cart.context";
import { useContext } from "react";
const Orders = () => {
  const cartcont = useContext(CartContext);

  return (
    <div>
      <h2>Orders</h2>
      {cartcont.cart.length === 0 ? (
        <p>No orders placed yet</p>
      ) : (
        <ul>
          {cartcont.cart.map((order, index) => (
            <li key={index}>
              {order.name} - {order.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
