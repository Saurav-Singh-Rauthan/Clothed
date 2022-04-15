import React from "react";

import Styles from "./CartItems.module.css";
import CartItem from "./CartItem/CartItem";
import emptyCart from "../../../../assests/empty-cart.png";

const CartItems = (props) => {
  return (
    <div className={Styles.container}>
      <p className={Styles.title}>{`My cart (${props.items?.length})`} </p>
      {props.items?.length ? (
        props.items?.map((item) => {
          return (
            <CartItem
              key={item.itemKey}
              remove={props.remove}
              change={props.change}
              details={item}
            />
          );
        })
      ) : (
        <img src={emptyCart} alt="empty cart" style={{width: "100%"}}/>
      )}
    </div>
  );
};

export default CartItems;
