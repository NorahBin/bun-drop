import React from "react";

function ModalComponent({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Payment Confirmation</h2>
        <p>Your payment has been processed successfully!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ModalComponent;
