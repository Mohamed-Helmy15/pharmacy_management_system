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

  return (
    <div className="quantity-counter">
      <h3>{count}</h3>
      <button
        className="get"
        style={{
          marginRight: "5px",
        }}
        onClick={handleIncrement}
      >
        +
      </button>
      <button className="get" onClick={handleDecrement}>
        -
      </button>
    </div>
  );
}

export default CountButton;
