import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentComponent({ user }) {
  const [showSwishInputs, setShowSwishInputs] = useState(false);
  const [showCardInputs, setShowCardInputs] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [inputError, setInputError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardNameError, setCardNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);

  const [swishNumber, setSwishNumber] = useState("");
  const [swishError, setSwishError] = useState(false);

  const navigate = useNavigate();

  const toggleSwishInputs = () => {
    setSelectedPaymentMethod("swish");
    setShowSwishInputs(true);
    setShowCardInputs(false);
    setInputError(false);
    setCardNumberError(false);
    setCardNameError(false);
    setDateError(false);
    setCvvError(false);
    setSwishError(false);
  };

  const toggleCardInputs = () => {
    setSelectedPaymentMethod("card");
    setShowSwishInputs(false);
    setShowCardInputs(true);
    setSwishError(false);
    setInputError(false);
    setCardNumberError(false);
    setCardNameError(false);
    setDateError(false);
    setCvvError(false);
  };

  const validateSwishNumber = () => {
    const isValidSwish = /^\d{10}$/.test(swishNumber);
    setSwishError(!isValidSwish);
    return isValidSwish;
  };

  const handleSwishPayment = () => {
    if (validateSwishNumber()) {
      handlePaymentSuccess();
    }
  };

  const handlePayment = () => {
    setInputError(false);
    setCardNumberError(false);
    setCardNameError(false);
    setDateError(false);
    setCvvError(false);

    let isValid = true;

    if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
      setInputError(true);
      isValid = false;
    }

    if (!/^\d+$/.test(cardNumber)) {
      setCardNumberError(true);
      isValid = false;
    }

    if (!/^[a-zA-Z\s]*$/.test(cardHolderName)) {
      setCardNameError(true);
      isValid = false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setDateError(true);
      isValid = false;
    }

    if (!/^\d{3}$/.test(cvv)) {
      setCvvError(true);
      isValid = false;
    }

    if (isValid) {
      handlePaymentSuccess();
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    navigate("/confirmationpage");
  };

  const clearCart = () => {
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    if (user && user.id) {
      delete carts[user.id];
    } else {
      delete carts["tempUser"];
    }
    localStorage.setItem("carts", JSON.stringify(carts));
  };

  return (
    <div className="pay-checkout-container">
      <h1 className="payment-text payment-margin">Payment</h1>
      <div className="checkout-pay-box">
        <div className="swish-container">
          <button
            className={`checkout-circle-button ${
              selectedPaymentMethod === "swish" ? "selected" : ""
            }`}
            onClick={toggleSwishInputs}
          ></button>
          <h2 className="swish-text">Pay with Swish</h2>
        </div>
        <div className="swish-input-button">
          <input
            className="swish-input"
            type="text"
            value={swishNumber}
            onChange={(e) => setSwishNumber(e.target.value)}
            style={{ display: showSwishInputs ? "block" : "none" }}
          />
          {showSwishInputs && (
            <button className="swish-button" onClick={handleSwishPayment}>
              Pay
            </button>
          )}
        </div>
        {swishError && (
          <p className="swish-error-text">
            Invalid input, please enter exactly 10 digits.
          </p>
        )}
        <div className="checkout-grey-line"></div>
        <div className="checkout-card-container">
          <button
            className={`checkout-circle-button ${
              selectedPaymentMethod === "card" ? "selected" : ""
            }`}
            onClick={toggleCardInputs}
          ></button>
          <h2 className="card-text">Card</h2>
        </div>
        <h2 className="pay-swish-text swish-payment-margin">
          Fill in your card information
        </h2>
        {showCardInputs && (
          <div className="card-payment">
            <div className="input-container">
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Card Number"
                  id="cardNumber"
                  className="card-input"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <input
                  className="cardholder-input"
                  id="cardHolderName"
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                />
              </div>
              <div className="input-row">
                <input
                  className="date-input"
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <input
                  id="cvv"
                  type="text"
                  placeholder="CVV"
                  className="cvv-input"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <button className="card-pay-button" onClick={handlePayment}>
                Pay
              </button>
              <div className="error-text-container">
                {inputError && (
                  <p className="input-error-text">Please fill in all inputs.</p>
                )}
                {cardNumberError && (
                  <p className="card-number-error-text">
                    Invalid input, please type in numbers.
                  </p>
                )}
                {cardNameError && (
                  <p className="card-name-error-text">
                    Invalid input, please type in letters.
                  </p>
                )}
                {dateError && (
                  <p className="date-error-text">
                    Invalid input, please type MM/YY format.
                  </p>
                )}
                {cvvError && (
                  <p className="cvv-error-text">
                    Invalid input, please type CVV format.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentComponent;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function PaymentComponent({ user }) {
//   const [showSwishInputs, setShowSwishInputs] = useState(false);
//   const [showCardInputs, setShowCardInputs] = useState(false);

//   const [cardNumber, setCardNumber] = useState("");
//   const [cardHolderName, setCardHolderName] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [inputError, setInputError] = useState(false);
//   const [cardNumberError, setCardNumberError] = useState(false);
//   const [cardNameError, setCardNameError] = useState(false);
//   const [dateError, setDateError] = useState(false);
//   const [cvvError, setCvvError] = useState(false);

//   const [swishNumber, setSwishNumber] = useState("");
//   const [swishError, setSwishError] = useState(false);

//   const navigate = useNavigate();

//   const toggleSwishInputs = () => {
//     setShowSwishInputs((prev) => {
//       const newState = !prev;
//       if (newState) {
//         setShowCardInputs(false);
//         setInputError(false);
//         setCardNumberError(false);
//         setCardNameError(false);
//         setDateError(false);
//         setCvvError(false);
//       }
//       if (!newState) {
//         setSwishError(false);
//       }
//       return newState;
//     });
//   };

//   const toggleCardInputs = () => {
//     setShowCardInputs((prev) => {
//       const newState = !prev;
//       if (newState) {
//         setShowSwishInputs(false);
//         setSwishError(false);
//       }
//       if (!newState) {
//         setInputError(false);
//         setCardNumberError(false);
//         setCardNameError(false);
//         setDateError(false);
//         setCvvError(false);
//       }
//       return newState;
//     });
//   };

//   const validateSwishNumber = () => {
//     const isValidSwish = /^\d{10}$/.test(swishNumber);
//     setSwishError(!isValidSwish);
//     return isValidSwish;
//   };

//   const handleSwishPayment = () => {
//     if (validateSwishNumber()) {
//       handlePaymentSuccess();
//     }
//   };

//   const handlePayment = () => {
//     setInputError(false);
//     setCardNumberError(false);
//     setCardNameError(false);
//     setDateError(false);
//     setCvvError(false);

//     let isValid = true;

//     if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
//       setInputError(true);
//       isValid = false;
//     }

//     if (!/^\d+$/.test(cardNumber)) {
//       setCardNumberError(true);
//       isValid = false;
//     }

//     if (!/^[a-zA-Z\s]*$/.test(cardHolderName)) {
//       setCardNameError(true);
//       isValid = false;
//     }

//     if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
//       setDateError(true);
//       isValid = false;
//     }

//     if (!/^\d{3}$/.test(cvv)) {
//       setCvvError(true);
//       isValid = false;
//     }

//     if (isValid) {
//       handlePaymentSuccess();
//     }
//   };

//   const handlePaymentSuccess = () => {
//     clearCart();
//     navigate("/confirmationpage");
//   };

//   const clearCart = () => {
//     const carts = JSON.parse(localStorage.getItem("carts")) || {};
//     if (user && user.id) {
//       delete carts[user.id];
//     } else {
//       delete carts["tempUser"];
//     }
//     localStorage.setItem("carts", JSON.stringify(carts));
//   };

//   return (
//     <div className="pay-checkout-container">
//       <h1 className="payment-text payment-margin">Payment</h1>
//       <div className="checkout-pay-box">
//         <div className="swish-container">
//           <button
//             className="checkout-circle-button"
//             onClick={toggleSwishInputs}
//           ></button>
//           <h2 className="swish-text">Pay with Swish</h2>
//         </div>
//         <div className="swish-input-button">
//           <input
//             className="swish-input"
//             type="text"
//             value={swishNumber}
//             onChange={(e) => setSwishNumber(e.target.value)}
//             style={{ display: showSwishInputs ? "block" : "none" }}
//           />
//           {showSwishInputs && (
//             <button className="swish-button" onClick={handleSwishPayment}>
//               Pay
//             </button>
//           )}
//         </div>
//         {swishError && (
//           <p className="swish-error-text">
//             Invalid input, please enter exactly 10 digits.
//           </p>
//         )}
//         <div className="checkout-grey-line"></div>
//         <div className="checkout-card-container">
//           <button
//             className="checkout-circle-button"
//             onClick={toggleCardInputs}
//           ></button>
//           <h2 className="card-text">Card</h2>
//         </div>
//         <h2 className="pay-swish-text swish-payment-margin">
//           Fill in your card information
//         </h2>
//         {showCardInputs && (
//           <div className="card-payment">
//             <div className="input-container">
//               <div className="input-row">
//                 <input
//                   type="text"
//                   placeholder="Card Number"
//                   id="cardNumber"
//                   className="card-input"
//                   value={cardNumber}
//                   onChange={(e) => setCardNumber(e.target.value)}
//                 />
//                 <input
//                   className="cardholder-input"
//                   id="cardHolderName"
//                   type="text"
//                   placeholder="Cardholder Name"
//                   value={cardHolderName}
//                   onChange={(e) => setCardHolderName(e.target.value)}
//                 />
//               </div>
//               <div className="input-row">
//                 <input
//                   className="date-input"
//                   id="expiryDate"
//                   type="text"
//                   placeholder="MM/YY"
//                   value={expiryDate}
//                   onChange={(e) => setExpiryDate(e.target.value)}
//                 />
//                 <input
//                   id="cvv"
//                   type="text"
//                   placeholder="CVV"
//                   className="cvv-input"
//                   value={cvv}
//                   onChange={(e) => setCvv(e.target.value)}
//                 />
//               </div>
//               <button className="card-pay-button" onClick={handlePayment}>
//                 Pay
//               </button>
//               <div className="error-text-container">
//                 {inputError && (
//                   <p className="input-error-text">Please fill in all inputs.</p>
//                 )}
//                 {cardNumberError && (
//                   <p className="card-number-error-text">
//                     Invalid input, please type in numbers.
//                   </p>
//                 )}
//                 {cardNameError && (
//                   <p className="card-name-error-text">
//                     Invalid input, please type in letters.
//                   </p>
//                 )}
//                 {dateError && (
//                   <p className="date-error-text">
//                     Invalid input, please type MM/YY format.
//                   </p>
//                 )}
//                 {cvvError && (
//                   <p className="cvv-error-text">
//                     Invalid input, please type CVV format.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PaymentComponent;
