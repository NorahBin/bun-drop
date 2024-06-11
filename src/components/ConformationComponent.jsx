
import React, { useState, useEffect } from "react";

function ConformationComponent({ user }) {
  // variabel för tempUser vart
  const tempUserKey = "tempUser";

  // Hämtar users cart från local storage
  const userId = user?.id;
  const initialCartItems = userId
    ? JSON.parse(localStorage.getItem("carts"))?.[userId] || []
    : JSON.parse(localStorage.getItem("carts"))?.[tempUserKey] || [];

  // State to hold cart items
  const [cartItems, setCartItems] = useState(initialCartItems);

  return (
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
         
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConformationComponent;






