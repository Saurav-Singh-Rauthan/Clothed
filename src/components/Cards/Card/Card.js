import React, { useState } from "react";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

import Styles from "./Card.module.css";

const Card = (props) => {
  const [open, setopen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  const addToCartHandler = () => {
    setTransition(() => TransitionUp);
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  return (
    <div className={Styles.card}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        key={transition ? transition.name : ""}
      >
        <Alert severity="success">
          Item Added to Cart
        </Alert>
      </Snackbar>
      <div>
        <img
          src={props.details.img}
          alt={props.details.img}
          className={Styles.cardImg}
        />
      </div>
      <div className={Styles.descCont}>
        <div className={Styles.desc}>
          <p>{props.details.name}</p>
          <div className={Styles.price}>${props.details.price}</div>
        </div>
        <button className={Styles.view} onClick={addToCartHandler}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
