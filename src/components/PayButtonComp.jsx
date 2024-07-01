function PayButtonComp({ onClick, disabled }) {
  return (
    <button className="cart-pay-button" onClick={onClick} disabled={disabled}>
      Checkout
    </button>
  );
}

export default PayButtonComp;


