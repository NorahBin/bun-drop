import React, { useState, useEffect } from "react";
import PaymentComponent from "./PaymentComponent";

function CheckoutComponent({ user }) {
  // Variabel för inte inloggad user
  const tempUserKey = "tempUser";

  // Hämtar items från local storage
  const userId = user?.id;
  const initialCartItems = userId
    ? JSON.parse(localStorage.getItem("carts"))?.[userId] || []
    : JSON.parse(localStorage.getItem("carts"))?.[tempUserKey] || [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  // Funktion för att hantera kvantitet
  const handleQuantityChange = (index, quantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
  };

  // Funktion för att kalkylera priset
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="checkout-container">
      <div className="checkout-items-container">
        <h1 className="checkout-text">Checkout</h1>
        <div className="redline-checkout"></div>
        {cartItems.map((item, index) => (
          <div key={index} className="checkout-item-container">
            <input
              type="text"
              value={`${item.quantity}x`}
              readOnly
              className="checkout-quantity quantity-margin"
            />
            <div className="checkout-name-price-container">
              <h1 className="checkout-name">{item.title}</h1>
              <h2>{item.name}</h2>
              <p className="checkout-price">{item.price * item.quantity}</p>
            </div>
            <div className="checkout-first-grey-line"></div>
          </div>
        ))}
        <div className="checkout-total-price-container">
          <div className="total-price-title">Total:</div>
          <div className="price">{totalPrice}</div>
        </div>
        <div className="checkout-pay-container">
          <PaymentComponent />
        </div>
      </div>
    </div>
  );
}

export default CheckoutComponent;

