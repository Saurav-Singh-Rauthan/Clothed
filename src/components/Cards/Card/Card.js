import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Alert from "../../Alert/Alert";
import Slide from "@mui/material/Slide";
import Styles from "./Card.module.css";

const Card = (props) => {
  let navigate = useNavigate();

  const [open, setopen] = useState(false);
  const [msgState, setmsgState] = useState(1);
  const [transition, setTransition] = useState(undefined);
  let addToCartMsg = props.isAuthenticated
    ? "Item Added to Cart"
    : "please log in to continue! Redirecting....";

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  const addToCartHandler = () => {
    setTransition(() => TransitionUp);
    if (!props.isAuthenticated) {
      setmsgState(0);
      setopen(true);
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } else {
      let itemDetails = {
        ...props.details,
        type: props.type,
        itemId: props.uniqueKey,
        qty: 1,
      };
      console.log("details", itemDetails);

      // checking if item is present in cart already
      axios
        .get(
          `https://react-shop-4fb2f-default-rtdb.firebaseio.com/users/${props.uniqueIdUser}/cart.json?auth=${props.token}&orderBy="itemId"&equalTo="${props.uniqueKey}"`
        )
        .then((res) => {
          if (Object.keys(res.data).length) {
            // updating quantity if item already present in cart

            let qtyUpdated = res.data[Object.keys(res.data)[0]].qty + 1;
            let itemDetailsUpdated = {
              ...itemDetails,
              qty: qtyUpdated,
            };
            const cartItemKey = Object.keys(res.data)[0];

            axios
              .put(
                `https://react-shop-4fb2f-default-rtdb.firebaseio.com/users/${props.uniqueIdUser}/cart/${cartItemKey}.json?auth=${props.token}`,
                itemDetailsUpdated
              )
              .then((res) => {
                console.log(res);
                console.log("item added to cart", res);
                setmsgState(1);
                setopen(true);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            // adding item to cart if the item is not present in cart

            axios
              .post(
                `https://react-shop-4fb2f-default-rtdb.firebaseio.com/users/${props.uniqueIdUser}/cart.json?auth=${props.token}`,
                itemDetails
              )
              .then((res) => {
                console.log("item added to cart", res);
                setmsgState(1);
                setopen(true);
              })
              .catch((err) => {
                addToCartMsg = "Error! Couldn't add item";
                setmsgState(0);
                setopen(true);
                console.log("item added to cart", err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
        success={msgState}
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
    token: state.auth.token,
    uniqueIdUser: state.userInfo.uniqueId,
  };
};

export default connect(mapStateToProps)(Card);
