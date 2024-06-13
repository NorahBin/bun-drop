import React, { useState, useEffect } from "react";
import PayButtonComp from "./PayButtonComp";
import { useNavigate } from "react-router-dom";

function CartComponent({ user }) {
  // Key for temporary user's cart
  const tempUserKey = "tempUser";

  // Fetch user's cart from local storage
  const userId = user?.id;
  const initialCartItems = userId
    ? JSON.parse(localStorage.getItem("carts"))?.[userId] || []
    : JSON.parse(localStorage.getItem("carts"))?.[tempUserKey] || [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    if (userId) {
      const carts = JSON.parse(localStorage.getItem("carts")) || {};
      const userCart = carts[userId] || [];
      setCartItems(userCart);
    }
  }, [userId]);

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    const userOrderCarts =
      JSON.parse(localStorage.getItem("userOrderCarts")) || {};

    if (userId) {
      carts[userId] = cartItems;
      userOrderCarts[userId] = cartItems;
    } else {
      carts[tempUserKey] = cartItems;
      userOrderCarts[tempUserKey] = cartItems;
    }

    localStorage.setItem("carts", JSON.stringify(carts));
    localStorage.setItem("userOrderCarts", JSON.stringify(userOrderCarts));
  }, [cartItems, userId]);

  // Navigation to checkout page
  const navigate = useNavigate();

  // Function to handle quantity
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function for pay button
  const handlePayButtonClick = () => {
    // Navigate to checkout page
    navigate("/checkoutpage");
  };

  // Calculate total price:
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

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
          <div className="total-price-container">
            <div className="total-price-title">Total Price:</div>
            <div className="price">{totalPrice}</div>
            <PayButtonComp onClick={handlePayButtonClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartComponent;

