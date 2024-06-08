
import React, { useState, useEffect } from "react";
import PaymentComponent from "./PaymentComponent";

function CheckoutComponent() {
  // Retrieve items from local storage
  const initialCartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // State to hold cart items and their quantities
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to handle quantity change
  const handleQuantityChange = (index, quantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
  };

  // Calculate total price
  const totalPrice = cartItems
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className="checkout-container">
      <div className="checkout-items-container">
        <h1 className="checkout-text">Checkout</h1>
        <div className="redline-checkout"></div>
        {cartItems.map((item, index) => (
          <div key={index} className="order-item-container">
            <select
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(index, parseInt(e.target.value))
              }
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>

            <div className="item-details">
              <div className="order-name-price-container">
                <h1 className="order-name">{item.title}</h1>
                <h2>{item.name}</h2>
                <p>{item.price * item.quantity}</p>
              </div>
              <div className="grey-line"></div>
            </div>
          </div>
        ))}
        <div className="total-price-container">
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
