import React, { useState, useEffect } from "react";
import PayButtonComp from "./PayButtonComp"; 
import { useNavigate } from "react-router-dom"; //Importerar usenavigatehook från react-router-dom
import { MdDelete } from "react-icons/md";

function CartComponent({ user }) {
  const navigate = useNavigate();

  //Skapar key för temporary user
  const tempUserKey = "tempUser";

  //Hämtar user id om det finns
  const userId = user?.id;

  //Initialiserar cart items från local storage baserat på user id
  const initialCartItems = userId
    ? JSON.parse(localStorage.getItem("carts"))?.[userId] || []
    : JSON.parse(localStorage.getItem("carts"))?.[tempUserKey] || [];

    //State variabel för cart items
  const [cartItems, setCartItems] = useState(initialCartItems);

  
  //Använder useffect för att uppdatera cart items när user id ändras
  useEffect(() => {
    if (userId) {
      const carts = JSON.parse(localStorage.getItem("carts")) || {}; //Hämtar carts från local storaggr
      const userCart = carts[userId] || []; //hämtar userns cart items
      setCartItems(userCart); //Uppdaterar state med userns cart items
    }
  }, [userId]); //Denna effekten körs när userId ändras

   
  //Använder useEffect för att uppdatera cart tems i local storage när cart item ändras
  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    const userOrderCarts =
      JSON.parse(localStorage.getItem("userOrderCarts")) || {};


      //Uppdaterar userns cart och user cart i local storage
    if (userId) {
      carts[userId] = cartItems;
      userOrderCarts[userId] = cartItems;
    } else {
      carts[tempUserKey] = cartItems;
      userOrderCarts[tempUserKey] = cartItems;
    }

    //Sparar uppdaterad carts och usercarts tillbaka till localstorage
    localStorage.setItem("carts", JSON.stringify(carts));
    localStorage.setItem("userOrderCarts", JSON.stringify(userOrderCarts));
  }, [cartItems, userId]); //Denna effekt körs när cartItems eller userId ändras


  //Funktion för att hantera ändring av item kvantitet
  const handleQuantityChange = (index, newQuantity) => {

    //Skapar en ny array med uppdaterad kvantitet för det specificerade itemet
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );

    //Uppdaterar state med nya cart items array
    setCartItems(updatedCartItems);
  };


  //Funktion för att ta bort item från cart
  const handleDeleteItem = (index) => {
    //Skapar en ny array utan itemet
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    //Uppdaterar state med det nya cart items array
    setCartItems(updatedCartItems);

    //Hämtar carts och userOderCarts från local storage
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    const userOrderCarts =
      JSON.parse(localStorage.getItem("userOrderCarts")) || {};


      //Uppdaterar de
    if (userId) {
      carts[userId] = updatedCartItems;
      userOrderCarts[userId] = updatedCartItems;
    } else {
      carts[tempUserKey] = updatedCartItems;
      userOrderCarts[tempUserKey] = updatedCartItems;
    }

    //Sparar uppdaterad cart och userordercarts i local storage
    localStorage.setItem("carts", JSON.stringify(carts));
    localStorage.setItem("userOrderCarts", JSON.stringify(userOrderCarts));
  };

  const handlePayButtonClick = () => {
    navigate("/checkoutpage");
  };


  //Kalkylerar det totala priset i cart
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);


    //Kollar om cart är empty
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
              disabled={isCartEmpty} //Disablar button om cart är empty
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartComponent;

