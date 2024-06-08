import React, { useState, useEffect } from "react";

function CheckoutComponent() {
  // Retrieve items from local storage
  const initialCartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // State to hold cart items and their quantities
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Effect to sync cart items with local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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
          <div className="checkout-pay-box">
            <h1>Payment</h1>
            <div className="swish-container">
              <div className=" checkout-circle"></div>
              <input type="text" />
            </div>
            <div className="checkout-grey-line"></div>

            <h2>Card</h2>

            <div className="swish-container">
              <div className=" checkout-circle"></div>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComponent;

// import React from "react";

// import { useState, useEffect } from "react";
// function CheckoutComponent() {
//   // Retrieve items from local storage
//   const initialCartItems = JSON.parse(localStorage.getItem("cart")) || [];

//   // State to hold cart items and their quantities
//   const [cartItems, setCartItems] = useState(initialCartItems);

//   // Effect to sync cart items with local storage
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   //Kalkylerar total price:
//   const totalPrice = cartItems
//     .reduce((total, item) => {
//       return total + item.price * item.quantity;
//     }, 0)
//     .toFixed(2);

//   return (
//     <>
//       <div className="checkout-container">
//         <div className="checkout-items-container">
//           <h1 className="checkout-text">Checkout</h1>
//           <div className="redline-checkout"></div>
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
//               <h1 className="order-name">{item.title}</h1>
//               <h2>{item.name}</h2>
//               <p>{item.price * item.quantity}</p>
//               <div className="grey-line"></div>
//             </div>
//           ))}
//           <div className="total-price-container">
//             <div className="total-price-title">Total Price:</div>
//             <div className="price">{totalPrice}</div>

//           </div>
//         </div>
//       </div>
//     </>

//     // <>
//     //   <div className="order-container">
//     //     <div className="order-box">
//     //       <h1 className="order-title">Orders</h1>
//     //       <div className="red-line-orders"></div>
//     //       {cartItems.map((item, index) => (
//     //         <div key={index} className="order-item-container">
//     //           <select
//     //             value={item.quantity}
//     //             onChange={(e) =>
//     //               handleQuantityChange(index, parseInt(e.target.value))
//     //             }
//     //           >
//     //             {[...Array(10).keys()].map((num) => (
//     //               <option key={num + 1} value={num + 1}>
//     //                 {num + 1}
//     //               </option>
//     //             ))}
//     //           </select>
//     //           <h1 className="order-name">{item.title}</h1>
//     //           <h2>{item.name}</h2>
//     //           <p>{item.price * item.quantity}</p>
//     //         </div>
//     //       ))}
//     //       <div className="total-price-container">
//     //         <div className="total-price-title">Total Price:</div>
//     //         <div className="price">{totalPrice}</div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </>
//   );
// }

// export default CheckoutComponent;
