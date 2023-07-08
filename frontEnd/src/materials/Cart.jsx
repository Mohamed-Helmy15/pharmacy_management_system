import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
const Cart = (props) => {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {props.medicines.map((med, i) => (
        <div className="cartHolder" key={med.medicine}>
          <p>
            <span>{i + 1}- </span>
            <span>Name: </span>
            {props.dataRow.map((row) => {
              return row.id === med.medicine ? row.marketName : null;
            })}
          </p>
          <p>
            <span>Count: </span>
            {med.count}
          </p>
        </div>
      ))}
      {props.medicines.length > 0 ? (
        <button
          className="get"
          style={{ margin: "10px auto", display: "block" }}
          onClick={() => {
            props.setMedicines([]);
          }}
        >
          Clear the Selected Medicines
        </button>
      ) : (
        <>
          <SentimentVeryDissatisfiedIcon
            style={{
              width: "100px",
              height: "100px",
              margin: "auto",
              display: "block",
            }}
          />
          <h3 style={{ textAlign: "center" }}>There is no Medicines Yet!</h3>
        </>
      )}
    </Box>
  );
  return (
    <div
      className="cartWrapper"
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "1px solid #0f467e",
        transition: "0.3s",
      }}
    >
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <ShoppingCartIcon
            className="cart"
            onClick={toggleDrawer(anchor, true)}
            style={{
              color: "#0f467e",
              fontSize: "30px",
              cursor: "pointer",
              position: "relative",
              top: "50%",
              left: "50%",
              transform: " translate(-50%,-50%)",
              transition: "0.3s",
            }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Cart;
