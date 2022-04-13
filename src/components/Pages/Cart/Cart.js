import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Styles from "./Cart.module.css";
import CartItems from "./CartItems/CartItems";
import CartSummary from "./CartSummary/CartSummary";

const Cart = (props) => {
  const [items, setitems] = useState();

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

  return (
    <div className={Styles.container}>
      <CartItems items={items} />
      <CartSummary />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.userInfo.cart,
  };
};

export default connect(mapStateToProps)(Cart);
