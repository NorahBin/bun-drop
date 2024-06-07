

import React, { useState } from "react";

function Quantity() {
  const [value, setValue] = useState(1);

  const increment = () => {
    setValue(prevValue => prevValue + 1);
  };

  const decrement = () => {
    setValue(prevValue => (prevValue > 0 ? prevValue - 1 : 0));
  };

  return (
    <div>
      <div className="quantity-input">
        <button
          className="quantity-input__modifier quantity-input__modifier--left"
          onClick={decrement}
        >
          &mdash;
        </button>
        <input
          className="quantity-input__screen"
          type="text"
          value={value}
          readOnly
        />
        <button
          className="quantity-input__modifier quantity-input__modifier--right"
          onClick={increment}
        >
          &#xff0b;
        </button>
      </div>
    </div>
  );
}

export default Quantity;
