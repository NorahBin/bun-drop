import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentComponent() {
  // State hooks för att hantera visning av Swish och kortinmatningsfält.
  const [showSwishInputs, setShowSwishInputs] = useState(false);
  const [showCardInputs, setShowCardInputs] = useState(false);

  // State hooks för kortinformation.
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [inputError, setInputError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardNameError, setCardNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);

  const navigate = useNavigate();

  // Funktion för att växla Swish-inmatningsfält.
  const toggleSwishInputs = () => {
    setShowSwishInputs(!showSwishInputs);
  };

  // Funktion för att växla kortinmatningsfält.
  const toggleCardInputs = () => {
    setShowCardInputs(!showCardInputs);
  };

  const handlePayment = () => {
    // Återställ alla errormeddelande.
    setInputError(false);
    setCardNumberError(false);
    setCardNameError(false);
    setDateError(false);
    setCvvError(false);

    let isValid = true;

    // Kontrollera om alla fält är ifyllda.

    if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
      setInputError(true);
      isValid = false;
    }

    //Validera regex för kort nummer
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
      navigate("/conformationpage");
    }
  };

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

          <h2 className="pay-swish-text swish-payment-margin">
            Fill in your card information
          </h2>

          {showCardInputs && (
            <div className="card-payment">
              <div className="input-container">
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

                <button className="card-pay-button" onClick={handlePayment}>
                  Pay
                </button>

                <div className="error-text-container">
                  {inputError && (
                    <p className="input-error-text">
                      Please fill in all inputs.
                    </p>
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
    </>
  );
}

export default PaymentComponent;

