import React from "react";

function PayButtonComp({ onClick }) {
  return (
    <button className="pay-button" onClick={onClick}>
      Checkout
    </button>
  );
}

export default PayButtonComp;

