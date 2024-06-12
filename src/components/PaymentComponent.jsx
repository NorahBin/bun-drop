
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
    // // Retrieve input values
    // const cardNumber = document.getElementById("cardNumber").value;
    // const expiryDate = document.getElementById("expiryDate").value;
    // const cvv = document.getElementById("cvv").value;
    // const cardHolderName = document.getElementById("cardHolderName").value;

    // // Define regex patterns for validation
    // const cardNumberPattern = /^[0-9]{16}$/; // 16 digits
    // const expiryDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
    // const cvvPattern = /^[0-9]{3}$/; // 3 digits
    // const namePattern = /^[a-zA-Z\s]*$/; // Letters and spaces

    // // Validate inputs
    // if (!cardNumberPattern.test(cardNumber)) {
    //   alert("Invalid card number. It must be 16 digits.");
    //   return;
    // }
    // if (!expiryDatePattern.test(expiryDate)) {
    //   alert("Invalid expiry date. Use MM/YY format.");
    //   return;
    // }
    // if (!cvvPattern.test(cvv)) {
    //   alert("Invalid CVV. It must be 3 digits.");
    //   return;
    // }
    // if (!namePattern.test(cardHolderName)) {
    //   alert("Invalid cardholder name. Only letters and spaces are allowed.");
    //   return;
    // }

    // If all validations pass, navigate to the confirmation page
    navigate("/conformationpage");
  };

  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <>
      <div className="checkout-pay-container">
        <h1 className="payment-text payment-margin">Payment</h1>

        <div className="checkout-pay-box">
          <div className="swish-container">
            <button
              className="checkout-circle-button"
              onClick={toggleSwishInputs}
            ></button>
            <h2 className="swish-text">Pay with Swish</h2>

            <input
              className="swish-input"
              type="text"
              style={{ display: showSwishInputs ? "block" : "none" }}
            />
          </div>

          <div className="checkout-grey-line"></div>
          <div className="checkout-card-container">
            <button
              className="checkout-circle-button"
              onClick={toggleCardInputs}
            ></button>
            <h2 className="card-text">Card</h2>
          </div>
          {showCardInputs && (
            <div className="card-payment">
              <div className="input-container">
                <h3>Card number:</h3>

                <input type="text" placeholder="Card Number" id="cardNumber" />

                <h3>Expiry date:</h3>

                <input id="expiryDate" type="text" placeholder="MM/YY" />

                <h3>CVV:</h3>

                <input id="cvv" type="text" placeholder="CVV" />

                <h3>Card holder name:</h3>

                <input
                  id="cardHolderName"
                  type="text"
                  placeholder="Cardholder Name"
                />
                <button onClick={handlePayment}>Pay</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PaymentComponent;
