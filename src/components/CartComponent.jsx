

// import React, { useState, useEffect } from "react";
// import PayButtonComp from "./PayButtonComp";
// import { useNavigate } from "react-router-dom";

// function CartComponent({ user }) {
//   //Nyckel för temporär users caer
//   const tempUserKey = "tempUser";

//   // Hämtar users cart från local storage
//   const userId = user?.id;
//   const initialCartItems = userId
//     ? JSON.parse(localStorage.getItem("carts"))?.[userId] || []
//     : JSON.parse(localStorage.getItem("carts"))?.[tempUserKey] || [];

//   const [cartItems, setCartItems] = useState(initialCartItems);

//   useEffect(() => {
//     if (userId) {
//       const carts = JSON.parse(localStorage.getItem("carts")) || {};
//       const userCart = carts[userId] || [];
//       setCartItems(userCart);
//     }
//   }, [userId]);

//   // Navigation till checkout page
//   const navigate = useNavigate();

//   // Funktion för att hantera kvantitet
//   const handleQuantityChange = (index, newQuantity) => {
//     const updatedCartItems = cartItems.map((item, i) =>
//       i === index ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCartItems);
//   };

//   // Funktion för pay button
//   const handlePayButtonClick = () => {
//     // Navigate to checkout page
//     navigate("/checkoutpage");
//   };

//   //Kalkylerar total price:
//   const totalPrice = cartItems
//     .reduce((total, item) => {
//       return total + item.price * item.quantity;
//     }, 0)
//     .toFixed(2);

//   return (
//     <>
//       <div className="order-container">
//         <div className="order-box">
//           <h1 className="order-title">Orders</h1>
//           <div className="red-line-orders"></div>
//           {cartItems.map((item, index) => (
//             <div key={index} className="order-item-container">
//               <select
//                 value={item.quantity}
//                 onChange={(e) =>
//                   handleQuantityChange(index, parseInt(e.target.value))
//                 }
//               >
//                 {[...Array(10).keys()].map((num) => (
//                   <option key={num + 1} value={num + 1}>
//                     {num + 1}
//                   </option>
//                 ))}
//               </select>
              
//                 <h1 className="order-name">{item.title}</h1>
//                 <h2>{item.name}</h2>
//                 <p>{item.price * item.quantity}</p>
              
//             </div>
//           ))}
//           <div className="total-price-container">
//             <div className="total-price-title">Total Price:</div>
//             <div className="price">{totalPrice}</div>
//             <PayButtonComp onClick={handlePayButtonClick} />
//             {/* <button className="pay-button">Pay</button> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CartComponent;


import React, { useState, useEffect } from "react";
import PayButtonComp from "./PayButtonComp";
import { useNavigate } from "react-router-dom";

function CartComponent({ user }) {
  // Nyckel för temporär users cart
  const tempUserKey = "tempUser";

  // Hämtar users cart från local storage
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
    if (userId) {
      carts[userId] = cartItems;
    } else {
      carts[tempUserKey] = cartItems;
    }
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [cartItems, userId]);

  // Navigation till checkout page
  const navigate = useNavigate();

  // Funktion för att hantera kvantitet
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  // Funktion för pay button
  const handlePayButtonClick = () => {
    // Navigate to checkout page
    navigate("/checkoutpage");
  };

  // Kalkylerar total price:
  const totalPrice = cartItems
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
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
            {/* <button className="pay-button">Pay</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartComponent;
