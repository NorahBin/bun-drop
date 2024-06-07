import React from 'react';
import { useState, useEffect } from 'react';
function QuantityComponent(item) {
  // Retrieve items from local storage
  const initialCartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // State to hold cart items and their quantities
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Effect to sync cart items with local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to handle quantity change
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <select
      value={item.quantity}
      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
    >
      {[...Array(10).keys()].map((num) => (
        <option key={num + 1} value={num + 1}>
          {num + 1}
        </option>
      ))}
    </select>
  );
}

export default QuantityComponent;