import React, { useState } from "react";

function CountButton(props) {
  const [count, setCount] = useState(0);
  const [obj, setObj] = useState();
  const [final, setFinal] = useState();

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
    <div className="med-cont">
      <div className="quantity-counter">
        <div className="inputs">
          <p>Medicine Name: {props.marketName}</p>
          <p>Price: {props.price}</p>
          <p>Available: {props.limit}</p>
          <p>Quantity: {count}</p>
          <p>total price: {props.price * count}</p>
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
          <button
            className="get"
            style={{
              marginRight: "5px",
            }}
            onClick={handleClear}
          >
            clear
          </button>
          <button
            className="get"
            onClick={() => {
              setObj((pre) => [
                { ...pre },
                { medicine: props.marketName, count },
              ]);
            }}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountButton;
