import React, { useState, useEffect } from "react";

function ConfirmationComponent({ user }) {
  const tempUserKey = "tempUser";
  const userId = user?.id;
  const userOrderCarts =
    JSON.parse(localStorage.getItem("userOrderCarts")) || {};
  const initialCartItems = userId
    ? userOrderCarts[userId] || []
    : userOrderCarts[tempUserKey] || [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <div className="order-confirmation-title">
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

export default ConfirmationComponent;

