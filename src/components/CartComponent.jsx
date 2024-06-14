import React, { useState, useEffect } from "react";
import PayButtonComp from "./PayButtonComp";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";


function CartComponent({ user }) {
  const navigate = useNavigate();

  // Nyckel för användarens temporära kundvagn
  const tempUserKey = "tempUser";

  // Hämta användarens kundvagn från local storage
  const userId = user?.id;
  const initialCartItems = userId
    ? JSON.parse(localStorage.getItem("carts"))?.[userId] || []
    : JSON.parse(localStorage.getItem("carts"))?.[tempUserKey] || [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    if (userId) {
      // Hämta alla kundvagnar från local storage
      const carts = JSON.parse(localStorage.getItem("carts")) || {};
      // Hämta den specifika kundvagnen för den inloggade användaren
      const userCart = carts[userId] || [];
      // Uppdatera cartItems state med användarens kundvagn
      setCartItems(userCart);
    }
  }, [userId]); // Dependency array inkluderar userId för att köra effekten på nytt när userId ändras

  useEffect(() => {
    // Denna effekt uppdaterar bara local storage när cartItems eller userId ändras
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
  }, [cartItems, userId]); // Dependency array inkluderar cartItems och userId för att köra effekten på nytt när de ändras

  // Funktion för att hantera kvantitetsändring av kundvagnsobjekt
  const handleQuantityChange = (index, newQuantity) => {
    // Gå igenom cartItems och uppdatera kvantiteten för objektet vid den angivna indexen
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    // Uppdatera cartItems state med de uppdaterade kundvagnsobjekten
    setCartItems(updatedCartItems);
  };

  // Ny funktion för att hantera borttagning av objekt och uppdatera local storage direkt
  const handleDeleteItem = (index) => {
    // Skapa en ny array utan objektet vid den angivna indexen
    const updatedCartItems = cartItems.filter((item, i) => i !== index);

    // Uppdatera cartItems state
    setCartItems(updatedCartItems);

    // Uppdatera localStorage för carts och userOrderCarts
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

  // Funktion för betalknappen
  const handlePayButtonClick = () => {
    // Navigera till betalningssidan
    navigate("/checkoutpage");
  };

  // Beräkna det totala priset för objekten i kundvagnen
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2); // Fixera totalpriset till 2 decimaler

  return (
    <>
      <div className="order-container">
        <div className="order-box">
          <h1 className="order-title">Orders</h1>
          <div className="red-line-orders"></div>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item-container">
              <select
                className="order-quantity"
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
              <div className="order-price-container">
                <h1 className="order-name">{item.title}</h1>
                <h2>{item.name}</h2>
                <p>{item.price * item.quantity}</p>
              </div>
              <button
                className="order-delete-button"
                onClick={() => handleDeleteItem(index)}
              >
                <MdDelete className="delete-icon" />
              </button>
              <div className="order-grey-line"></div>
            </div>
          ))}
          <div className="cart-total-price-container">
            <div className="cart-total-price-title">Total Price:</div>
            <div className="cart-price">{totalPrice}</div>
            <PayButtonComp onClick={handlePayButtonClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartComponent;

