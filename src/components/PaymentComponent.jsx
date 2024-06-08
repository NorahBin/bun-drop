import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function PaymentComponent() {
  // State for managing the visibility of Swish inputs
  const [showSwishInputs, setShowSwishInputs] = useState(false);

  // State for managing the visibility of Card inputs
  const [showCardInputs, setShowCardInputs] = useState(false);


  // Function to toggle visibility of Swish inputs
  const toggleSwishInputs = () => {
    setShowSwishInputs(!showSwishInputs);
    // You can add any additional logic here
  };

  // Function to toggle visibility of Card inputs
  const toggleCardInputs = () => {
    setShowCardInputs(!showCardInputs);
    // You can add any additional logic here
  };

  const handlePayment = () => {


    // Navigate to the confirmation page
    navigate("/conformationpage");
  };

  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="checkout-pay-container">
      <div className="checkout-pay-box">
        <h1>Payment</h1>

        <button
          className="checkout-circle-button"
          onClick={toggleSwishInputs}
        ></button>
        <input
          type="text"
          style={{ display: showSwishInputs ? "block" : "none" }}
        />

        <div className="checkout-grey-line"></div>

        <h2>Card</h2>

        <button
          className="checkout-circle-button"
          onClick={toggleCardInputs}
        ></button>
        {showCardInputs && (
          <div className="card-payment">
            <div className="input-container">
              <h3>Card number:</h3>

              <input
                type="text"
                placeholder="Card Number"
                id="cardNumber" // Add an id to the input for accessing it later
              />
            

              <h3>Expiry date:</h3>

              <input type="text" placeholder="Expiry Date" />

              <h3>CVV:</h3>

              <input type="text" placeholder="CVV"  />

              <h3>Card holder name:</h3>

              <input type="text" placeholder="Cardholder Name" />
              <button onClick={handlePayment} >Pay</button>
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentComponent;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// function PaymentComponent() {
//   // State for managing the visibility of Swish inputs
//   const [showSwishInputs, setShowSwishInputs] = useState(false);

//   // State for managing the visibility of Card inputs
//   const [showCardInputs, setShowCardInputs] = useState(false);
//   // State for managing the invalid input message
//   const [invalidInputMessage, setInvalidInputMessage] = useState("");

//   // Function to toggle visibility of Swish inputs
//   const toggleSwishInputs = () => {
//     setShowSwishInputs(!showSwishInputs);
//     // You can add any additional logic here
//   };

//   // Function to toggle visibility of Card inputs
//   const toggleCardInputs = () => {
//     setShowCardInputs(!showCardInputs);
//     // You can add any additional logic here
//   };

//   const handlePayment = () => {
//     // Perform any necessary payment logic here...
//     // Check if the card number input has exactly 15 characters
//     const cardNumberInput = document.getElementById("cardNumber");
//     if (cardNumberInput.value.length !== 15) {
//       setInvalidInputMessage(
//         "Invalid input: Card number must be exactly 15 characters."
//       );
//       return; // Do not proceed with payment if input is invalid
//     }

//     // Check if the CVV input has more than 3 characters
//     const cvvInput = document.getElementById("cvv");
//     if (cvvInput.value.length > 3) {
//       setInvalidInputMessage("Invalid input: CVV must be maximum 3 numbers.");
//       return; // Do not proceed with payment if input is invalid
//     }

//     // Clear any previous invalid input message
//     setInvalidInputMessage("");

//     // Navigate to the confirmation page
//     navigate("/confirmationpage");
//   };

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   return (
//     <div className="checkout-pay-container">
//       <div className="checkout-pay-box">
//         <h1>Payment</h1>

//         <button
//           className="checkout-circle-button"
//           onClick={toggleSwishInputs}
//         ></button>
//         <input
//           type="text"
//           style={{ display: showSwishInputs ? "block" : "none" }}
//         />

//         <div className="checkout-grey-line"></div>

//         <h2>Card</h2>

//         <button
//           className="checkout-circle-button"
//           onClick={toggleCardInputs}
//         ></button>
//         {showCardInputs && (
//           <div className="card-payment">
//             <div className="input-container">
//               <h3>Card number:</h3>

//               <input
//                 type="text"
//                 placeholder="Card Number"
//                 id="cardNumber" // Add an id to the input for accessing it later
//               />
//               {invalidInputMessage && (
//                 <p className="invalid-input">{invalidInputMessage}</p>
//               )}

//               <h3>Expiry date:</h3>

//               <input type="text" placeholder="Expiry Date" />

//               <h3>CVV:</h3>

//               <input type="text" placeholder="CVV" id="cvv" />

//               <h3>Card holder name:</h3>

//               <input type="text" placeholder="Cardholder Name" />
//               <button onClick={handlePayment}>Pay</button>
//               {/* Display invalid input message */}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PaymentComponent;
