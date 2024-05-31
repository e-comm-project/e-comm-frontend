import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [prevCart, setPrevCart] = useState([]);

  const addItem = (item) => {
    setPrevCart(cart);
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItem = (itemId) => {
    setPrevCart(cart);
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setPrevCart(cart);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setPrevCart(cart);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, prevCart, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
