import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

import Alert from "../../Alert/Alert";
import Slide from "@mui/material/Slide";
import Styles from "./Card.module.css";

const Card = (props) => {
  let navigate = useNavigate();

  const [open, setopen] = useState(false);
  const [msgState, setmsgState] = useState(1);
  const [transition, setTransition] = useState(undefined);
  const [Msg, setMsg] = useState("");
  const [imgLoad, setimgLoad] = useState(false);

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  const addToCartHandler = () => {
    setTransition(() => TransitionUp);
    if (!props.isAuthenticated) {
      setMsg("please log in to continue! Redirecting....");
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
                setMsg("item added to cart");
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
                setMsg("item added to cart");
                setmsgState(1);
                setopen(true);
              })
              .catch((err) => {
                setMsg("Error! Couldn't add item");
                setmsgState(0);
                setopen(true);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          setMsg("Error! Couldn't add item");
          setmsgState(0);
          setopen(true);
        });
    }
  };

  const removeWishItemHandler = () => {
    axios
      .delete(
        `https://react-shop-4fb2f-default-rtdb.firebaseio.com/users/${props.uniqueIdUser}/wishlist/${props.wishKey}.json?auth=${props.token}`
      )
      .then(() => {
        setMsg("Item removed from wishlist!");
        setmsgState(1);
        setopen(true);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Error! Couldn't remove item");
        setmsgState(0);
        setopen(true);
      });
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
        msg={Msg}
        success={msgState}
      />
      <div
        onClick={() =>
          navigate(`/desc?type=${props.type}&item=${props.uniqueKey}`)
        }
        style={imgLoad ? null : { display: "none" }}
      >
        <img
          src={props.details.img}
          alt={props.details.img}
          className={Styles.cardImg}
          onLoad={() => setimgLoad(true)}
        />
      </div>
      <div
        className={Styles.descCont}
        style={imgLoad ? null : { display: "none" }}
      >
        <div
          className={Styles.desc}
          onClick={() =>
            navigate(`/desc?type=${props.type}&item=${props.uniqueKey}`)
          }
        >
          <p>{props.details.name}</p>
          <div className={Styles.price}>${props.details.price}</div>
        </div>
        {/* {!props.showBtn ? ( */}
        <button className={Styles.view} onClick={addToCartHandler}>
          Add To Cart
        </button>
        {/* ) : null} */}
        {/* 
          work on removing items after clicking btn
        (
          <button className={Styles.view} onClick={removeWishItemHandler}>
            Remove Item
          </button>
        ) */}
      </div>
      {imgLoad ? null : (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={"100%"}
        />
      )}
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
