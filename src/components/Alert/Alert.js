import React from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertComp = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={4000}
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={props.transition}
      key={props.transition ? props.transition.name : ""}
    >
      <Alert severity={props.success ? "success" : "error"}>{props.msg}</Alert>
    </Snackbar>
  );
};

export default AlertComp;
