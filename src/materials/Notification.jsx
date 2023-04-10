import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = (props) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={props.notification}
        autoHideDuration={props.auto}
        onClose={props.handleNotClose}
      >
        <Alert
          onClose={props.handleNotClose}
          severity={props.case}
          sx={{ width: "100%" }}
        >
          {props.case === "success"
            ? `${props.successfulMessage}`
            : `${props.unsuccessfulMessage}`}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Notification;
