function PayButtonComp({ onClick, disabled }) {
  return (
    <button className="cart-pay-button" onClick={onClick} disabled={disabled}>
      Checkout
    </button>
  );
}

export default PayButtonComp;

// import React from "react";

// function PayButtonComp({ onClick }) {
//   return (
//     <button className="cart-pay-button" onClick={onClick}>
//       Checkout
//     </button>
//   );
// }

// export default PayButtonComp;
