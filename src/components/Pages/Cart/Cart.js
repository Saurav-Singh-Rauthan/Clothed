import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Styles from "./Cart.module.css";
import * as actions from "../../store/actions/index";
import CartItems from "./CartItems/CartItems";
import CartSummary from "./CartSummary/CartSummary";
import Alert from "../../Alert/Alert";
import Slide from "@mui/material/Slide";

const Cart = (props) => {
  const [items, setitems] = useState();
  const [open, setopen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [msgState, setmsgState] = useState(1);
  const [msg, setmsg] = useState("");

  useEffect(() => {
    props.getInfo();
  }, []);

  useEffect(() => {
    let items = [];
    if (props.cartItems) {
      items = Object.keys(props.cartItems).map((key) => {
        let currentItem = { ...props.cartItems[key], itemKey: key };
        return currentItem;
      });
    }
    setitems(items);
  }, [props.cartItems]);

  const handleClose = () => {
    setopen(false);
  };

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  const removeItemHandler = (key) => {
    let newItems = items?.filter((item) => {
      return item.itemKey !== key;
    });

    setitems(newItems);
    console.log(typeof items);

    axios
      .delete(
        `https://react-shop-4fb2f-default-rtdb.firebaseio.com/users/${props.userId}/cart/${key}.json?auth=${props.token}`
      )
      .then((res) => {
        setTransition(() => TransitionUp);
        setmsgState(1);
        setmsg("Item removed successfully");
        setopen(true);
      })
      .catch((err) => {
        console.log(err);
        setTransition(() => TransitionUp);
        setmsgState(0);
        setmsg("Error!! Please try again");
        setopen(true);
      });
  };

  const changeQtyHandler = (type, details) => {
    let updatedDetails = { ...details };
    if (type === "add") {
      updatedDetails.qty += 1;
    } else {
      if (updatedDetails.qty > 1) {
        updatedDetails.qty -= 1;
      }
    }

    let newItems = items?.map((item) => {
      if (item.itemKey === details.itemKey) {
        return updatedDetails;
      } else {
        return item;
      }
    });
    setitems(newItems);

    // updating qty at db
    axios
      .put(
        `https://react-shop-4fb2f-default-rtdb.firebaseio.com/users/${props.userId}/cart/${details.itemKey}.json?auth=${props.token}`,
        updatedDetails
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Alert
        open={open}
        handleClose={handleClose}
        transition={transition}
        msg={msg}
        success={msgState}
      />
      <div className={Styles.container}>
        <CartItems
          items={items}
          remove={removeItemHandler}
          change={changeQtyHandler}
        />
        <CartSummary />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    cartItems: state.userInfo.cart,
    userId: state.userInfo.uniqueId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInfo: () => {
      dispatch(actions.fetchDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
