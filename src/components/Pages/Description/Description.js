import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import Styles from "./Description.module.css";
import Subsection from "../../Subsection/Subsection";
import Alert from "../../Alert/Alert";
import Slide from "@mui/material/Slide";

const Description = (props) => {
  let navigate = useNavigate();

  const [params, setparams] = useSearchParams();
  const [itemDetailsState, setitemDetails] = useState();
  const [open, setopen] = useState(false);
  const [msgState, setmsgState] = useState(1);
  const [transition, setTransition] = useState(undefined);
  let addToCartMsg = props.isAuthenticated
    ? "Item Added to Cart"
    : "please log in to continue! Redirecting....";

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(
        `https://react-shop-4fb2f-default-rtdb.firebaseio.com/${params.get(
          "type"
        )}/${params.get("item")}.json`
      )
      .then((res) => {
        setitemDetails({ ...res.data, key: params.get("item") });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.get("item")]);

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
        ...itemDetailsState,
        type: params.get("type"),
        itemId: params.get("item"),
        qty: 1,
      };
      console.log("details", itemDetails);

      // checking if item is present in cart already
      axios
        .get(
          `https://react-shop-4fb2f-default-rtdb.firebaseio.com/users/${
            props.uniqueIdUser
          }/cart.json?auth=${
            props.token
          }&orderBy="itemId"&equalTo="${params.get("item")}"`
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
          addToCartMsg = "Error! Couldn't add item";
          setmsgState(0);
          setopen(true);
        });
    }
  };

  const handleClose = () => {
    setopen(false);
  };

  return (
    <React.Fragment>
      <Alert
        open={open}
        handleClose={handleClose}
        transition={transition}
        msg={addToCartMsg}
        success={msgState}
      />
      <div className={Styles.container}>
        {itemDetailsState?.key === params.get("item") ? (
          <div className={Styles.descContainer}>
            <div className={Styles.img}>
              <img
                style={{ objectFit: "contain", width: "100%", height: "80%" }}
                src={itemDetailsState?.img}
                alt="item img"
              />
            </div>
            <div className={Styles.detailsContainer}>
              <p className={Styles.name}>{itemDetailsState?.name}</p>
              <p className={Styles.price}>${itemDetailsState?.price}</p>
              <p className={Styles.desc}>{itemDetailsState?.desc}</p>
              <div className={Styles.btnContainer}>
                <button className={Styles.addWish}>Add to wishlist</button>
                <button className={Styles.addCart} onClick={addToCartHandler}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={"4rem"} />
          </div>
        )}

        <div>
          <p className={Styles.similarItems}>People also like</p>
          <Subsection type={params.get("type")} heading={false} />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    uniqueIdUser: state.userInfo.uniqueId,
  };
};

export default connect(mapStateToProps)(Description);
