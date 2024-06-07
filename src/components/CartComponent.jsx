import React, { useState, useEffect } from "react";
import QuantityComponent from "./QuantityComponent";

function CartComponent() {
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


//Kalkylerar total price:
  const totalPrice = cartItems
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);;

  return (
    <>
      <div className="order-container">
        <div className="order-box">
          <h1 className="order-title">Orders</h1>
          <div className="red-line-orders"></div>
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
              <h1 className="order-name">{item.title}</h1>
              <h2>{item.name}</h2>
              <p>{item.price * item.quantity}</p>
            </div>
          ))}
          <div>Total Price: {totalPrice}</div>
        </div>
      </div>
    </>
  );
}

export default CartComponent;
