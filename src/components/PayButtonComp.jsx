import React from "react";

function PayButtonComp({ onClick }) {
  return (
    <button className="pay-button" onClick={onClick}>
      Pay
    </button>
  );
}

export default PayButtonComp;

// import React from 'react';
// function PayButtonComp() {
//     return <button className="pay-button">Pay</button>;
// }

// export default PayButtonComp;
