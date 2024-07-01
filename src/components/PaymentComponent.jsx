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

  //Delivery state variabler
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");

  // Statevaiabler för error messages
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [addressErrorMessage, setAddressErrorMessage] = useState("");
  const [houseNumberErrorMessage, setHouseNumberErrorMessage] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState("");

  const navigate = useNavigate();

  //Funktion för att toggla swish inputs och reset:a errors
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

  //State variabler för att toggla card inputs och resetta errors
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

  // Funktion för att validera swish nummer
  const validateSwishNumber = () => {
    if (/^\d{10}$/.test(swishNumber)) {
      setSwishError(false);
      return true;
    } 
    else {
      setSwishError(true);
      return false;
    }
  };


  const handleSwishPayment = () => {
    let isValid = true;

    // Validate delivery details
    if (name === "") {
      setNameErrorMessage("Please fill in the name.");
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
      setNameErrorMessage("Invalid format. Please type in letters.");
      isValid = false;
    } else {
      setNameErrorMessage("");
    }

    if (address === "") {
      setAddressErrorMessage("Please fill in the address.");
      isValid = false;
    } else {
      setAddressErrorMessage("");
    }

    if (houseNumber === "") {
      setHouseNumberErrorMessage("Please fill in the house number.");
      isValid = false;
    } else if (!/^\d+$/.test(houseNumber)) {
      setHouseNumberErrorMessage("Invalid format, please type in numbers.");
      isValid = false;
    } else {
      setHouseNumberErrorMessage("");
    }

    if (city === "") {
      setCityErrorMessage("Please fill in the city.");
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(city)) {
      setCityErrorMessage("Invalid format for city. Please type in letters.");
      isValid = false;
    } else {
      setCityErrorMessage("");
    }

    // Validate:a swish nummer
    if (!validateSwishNumber()) {
      isValid = false;
    }

    // Om alla inputs e valid, gå till conformation page
    if (isValid) {
      handlePaymentSuccess();
    }
  };

  //Funktion för att hantera card payment
  const handlePayment = () => {
    let isValid = true;

    // Validate name, address, houseNumber, city
    if (name === "") {
      setNameErrorMessage("Please fill in the name.");
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
      setNameErrorMessage("Invalid format. Please type in letters.");
      isValid = false;
    } else {
      setNameErrorMessage("");
    }

    if (address === "") {
      setAddressErrorMessage("Please fill in the address.");
      isValid = false;
    } else {
      setAddressErrorMessage("");
    }

    if (houseNumber === "") {
      setHouseNumberErrorMessage("Please fill in the house number.");
      isValid = false;
    } else if (!/^\d+$/.test(houseNumber)) {
      setHouseNumberErrorMessage("Invalid format, please type in numbers.");
      isValid = false;
    } else {
      setHouseNumberErrorMessage("");
    }

    if (city === "") {
      setCityErrorMessage("Please fill in the city.");
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(city)) {
      setCityErrorMessage("Invalid format for city. Please type in letters.");
      isValid = false;
    } else {
      setCityErrorMessage("");
    }

    // Validerar card information
    if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
      setInputError(true);
      isValid = false;
    }

    if (!/^\d+$/.test(cardNumber)) {
      setCardNumberError(true);
      isValid = false;
    } else {
      setCardNumberError(false);
    }

    if (!/^[a-zA-Z\s]*$/.test(cardHolderName)) {
      setCardNameError(true);
      isValid = false;
    } else {
      setCardNameError(false);
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setDateError(true);
      isValid = false;
    } else {
      setDateError(false);
    }

    if (!/^\d{3}$/.test(cvv)) {
      setCvvError(true);
      isValid = false;
    } else {
      setCvvError(false);
    }

    // Om alla inputs är valid, navigera till conformation page
    if (isValid) {
      handlePaymentSuccess();
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    navigate("/conformationpage");
  };

  //Metod för att ta bort cart från local storage
  const clearCart = () => {
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    if (user && user.id) {
      delete carts[user.id];
    } 
    else {
      delete carts["tempUser"];
    }
    localStorage.setItem("carts", JSON.stringify(carts));
  };

  return (
    <div className="pay-checkout-container">
      <h1 className="payment-text payment-margin">Payment</h1>
      <div className="checkout-pay-box">
        <div className="delivery-container">
          <div className="delivery-input-row">
            <div className="delivery-name-input">
              <h2 className="delivery-name-text">Name</h2>
              <input
                className="name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameErrorMessage && (
                <p className="delivery-input-error-text">{nameErrorMessage}</p>
              )}
            </div>
            <div className="delivery-name-input">
              <h2 className="delivery-address-text">Address</h2>
              <input
                className="adress-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {addressErrorMessage && (
                <p className="delivery-input-error-text">
                  {addressErrorMessage}
                </p>
              )}
            </div>
          </div>
          <div className="delivery-input-row">
            <div className="delivery-name-input">
              <h2 className="delivery-house-number-text">House Number</h2>
              <input
                className="house-number-input"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
              {houseNumberErrorMessage && (
                <p className="delivery-input-error-text">
                  {houseNumberErrorMessage}
                </p>
              )}
            </div>
            <div className="delivery-name-input">
              <h2 className="delivery-city-text">City</h2>
              <input
                className="city-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              {cityErrorMessage && (
                <p className="delivery-input-error-text">{cityErrorMessage}</p>
              )}
            </div>
          </div>

          <div className="delivery-grey-line"></div>
        </div>

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
            <div className="checkout-input-container">
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Card Number"
                  id="cardNumber"
                  className="card-input"
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                    setCardNumberError(false);
                  }}
                />
                <input
                  className="cardholder-input"
                  id="cardHolderName"
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardHolderName}
                  onChange={(e) => {
                    setCardHolderName(e.target.value);
                    setCardNameError(false);
                  }}
                />
              </div>
              <div className="input-row">
                <input
                  className="date-input"
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => {
                    setExpiryDate(e.target.value);
                    setDateError(false);
                  }}
                />
                <input
                  id="cvv"
                  type="text"
                  placeholder="CVV"
                  className="cvv-input"
                  value={cvv}
                  onChange={(e) => {
                    setCvv(e.target.value);
                    setCvvError(false);
                  }}
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

