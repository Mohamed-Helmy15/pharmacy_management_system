import React, { useState } from "react";

function CountButton(props) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count < props.limit) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const handleClear = () => {
    if (count > 0) {
      setCount(0);
    }
  };

  return (
    <div className="quantity-counter">
      <p>Price: {props.price * count}</p>
      <div className="inputs">
        <p>Quantity: {count}</p>
        <p>Available: {props.limit}</p>
        <button
          className="get"
          style={{
            marginRight: "5px",
          }}
          onClick={handleIncrement}
        >
          +
        </button>
        <button
          className="get"
          style={{
            marginRight: "5px",
          }}
          onClick={handleDecrement}
        >
          -
        </button>
        <button className="get" onClick={handleClear}>
          clear
        </button>
      </div>
    </div>
  );
}

export default CountButton;
