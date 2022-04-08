import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Alert from "../../Alert/Alert";
import Slide from "@mui/material/Slide";
import Styles from "./Card.module.css";

const Card = (props) => {
  let navigate = useNavigate();

  const [open, setopen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  let addToCartMsg = props.isAuthenticated
    ? "Item Added to Cart"
    : "please log in to continue! Redirecting....";

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  const addToCartHandler = () => {
    setTransition(() => TransitionUp);
    setopen(true);
    if (!props.isAuthenticated) {
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    }
  };

  const handleClose = () => {
    setopen(false);
  };

  return (
    <div className={Styles.card}>
      <Alert
        open={open}
        handleClose={handleClose}
        transition={transition}
        msg={addToCartMsg}
        success={props.isAuthenticated}
      />
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Card);
