import React, { useState, useEffect } from "react";
import PayButtonComp from "./PayButtonComp";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function CartComponent({ user }) {
  const navigate = useNavigate();
  const tempUserKey = "tempUser";
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

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCartItems);

    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    const userOrderCarts =
      JSON.parse(localStorage.getItem("userOrderCarts")) || {};

    if (userId) {
      carts[userId] = updatedCartItems;
      userOrderCarts[userId] = updatedCartItems;
    } else {
      carts[tempUserKey] = updatedCartItems;
      userOrderCarts[tempUserKey] = updatedCartItems;
    }

    localStorage.setItem("carts", JSON.stringify(carts));
    localStorage.setItem("userOrderCarts", JSON.stringify(userOrderCarts));
  };

  const handlePayButtonClick = () => {
    navigate("/checkoutpage");
  };

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      <div className="order-container">
        <div className="order-box">
          <h1 className="order-title">Orders</h1>
          <div className="red-line-orders"></div>
          {isCartEmpty ? (
            <div>
              <h1 className="no-items-in-cart">
                You have no items in your cart
              </h1>
              <p className="add-items-to-your-cart">
                Add items to your cart to continue
              </p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="order-item-container">
                <input
                  type="number"
                  className="order-quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value))
                  }
                  min="1"
                />
                <div className="order-price-container">
                  <h1 className="order-name">{item.title}</h1>
                  <h2>{item.name}</h2>
                  <p className="order-price-cart">
                    {(
                      parseFloat(item.price).toFixed(2) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
                <button
                  className="order-delete-button"
                  onClick={() => handleDeleteItem(index)}
                >
                  <MdDelete className="delete-icon" />
                </button>
                <div className="order-grey-line"></div>
              </div>
            ))
          )}
          <div className="cart-total-price-container">
            {!isCartEmpty && (
              <>
                <div className="cart-total-price-title">Total Price:</div>
                <div className="cart-price">{totalPrice}</div>
              </>
            )}
            <PayButtonComp
              onClick={handlePayButtonClick}
              disabled={isCartEmpty}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartComponent;

