import React from "react";

import Styles from "./CartItems.module.css";
import CartItem from "./CartItem/CartItem";

const CartItems = (props) => {
  return (
    <div className={Styles.container}>
      <p className={Styles.title}>{`My cart (${props.items?.length})`} </p>
      {props.items?.length
        ? props.items?.map((item) => {
            return (
              <CartItem
                key={item.itemKey}
                remove={props.remove}
                change={props.change}
                details={item}
              />
            );
          })
        : "cart's empty"}
    </div>
  );
};

export default CartItems;
