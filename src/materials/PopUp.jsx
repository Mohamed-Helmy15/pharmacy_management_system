import React from "react";
import styles from "../components/Categories/Categories.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  width: 400,
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
};

const PopUp = (props) => {
  return (
    <Modal open={props.openModal} closeAfterTransition>
      <Fade in={props.openModal}>
        <Box sx={style}>
          <CancelIcon
            className={styles.cancel}
            onClick={props.handleCloseModal}
          />
          {props.children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default PopUp;
