
import React from "react";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
function ConformationComponent() {
  //Hämta items från local storage
  const initialCartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // State för att hålla kundvagnsartiklar och deras kvantiteter  const [cartItems, setCartItems] = useState(initialCartItems);
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Effect to sync cart items with local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Navigation
  const navigate = useNavigate();

  // Function för quantity change
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <div className="conformation-container">
        <div className="conformation-box">
          <div className="order-conformation-title">
            <h1>Order Confirmation</h1>
            <p>
              Thank you for your order! Your order has been successfully placed.
            </p>
          </div>
          <h1>Order Details</h1>

          {cartItems.map((item, index) => (
            <div key={index}>
              {item.name} x{item.quantity}
              {item.name} {item.title}
              {item.name} {item.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ConformationComponent;


