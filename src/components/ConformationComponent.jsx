import React, { useState, useEffect } from "react";

function ConfirmationComponent({ user }) {
  //Key för att spara temporary user data
  const tempUserKey = "tempUser";

  //Kollar om user finns och hämtar user id
  const userId = user?.id;

  //Hämtar userOrderCarts från local storage, eller skapa ett nytt objekt
  const userOrderCarts =
    JSON.parse(localStorage.getItem("userOrderCarts")) || {};
  //Hämtar cart items för current user om user id finns, annars hämta tempuser key, annars skapa en tom array
  const initialCartItems = userId
    ? userOrderCarts[userId] || []
    : userOrderCarts[tempUserKey] || [];

  //Representerar items i user cart
  const [cartItems, setCartItems] = useState(initialCartItems);

  const [deliveryTime, setDeliveryTime] = useState(null);

  useEffect(() => {
    // Genererar ett random tal mellan 20 och 45.
    const minMinutes = 20;
    const maxMinutes = 45;
    const randomDeliveryTime = Math.floor(
      Math.random() * (maxMinutes - minMinutes + 1) + minMinutes
    );
    setDeliveryTime(randomDeliveryTime); //Sätter deliveryTime state
  }, []);

  // Function to calculate total price
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="confirmation-container">
      <div className="confirmation-items-container">
        <h1 className="order-confirmation-text">Order Confirmation</h1>
        <div className="confirmation-red-line"></div>

        <h1 className="order-details-text">Order Details</h1>
        <h2 className="thank-you-text">Thanks for ordering!</h2>

        {cartItems.map((item, index) => (
          <div className="confirmation-item-container" key={index}>
            <div className="confirmation-quantity">
              {item.name} {item.quantity}x
            </div>
            <div className="confirmation-price-name-container">
              <div className="confirmation-item-name">
                {item.name} {item.title}
              </div>
              <p className="confirmation-price">
                {(parseFloat(item.price).toFixed(2) * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="confirmation-grey-line"></div>
          </div>
        ))}
        <div className="confirmation-total-price-container">
          <div className="confirmation-total-price-title">Total:</div>
          <div className="conformation-price-text">{totalPrice}</div>
        </div>

        {deliveryTime && (
          <div className="delivery-time-message">
            Estimated delivery time: {deliveryTime} minutes.
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfirmationComponent;
