import React from "react";

import Styles from "./Order.module.css";
import CartItem from "../.././../Cart/CartItems/CartItem/CartItem";

const Order = (props) => {
  return (
    <form className={Styles.container}>
      <fieldset>
        <legend>{`${new Date(props.date).toLocaleDateString()} ${new Date(
          props.date
        ).toLocaleTimeString()}`}</legend>
        <div className={Styles.orderContainer}>
          {props.items.map((item) => {
            return (
              <CartItem
                details={item}
                type={item.type}
                key={item.itemKey}
                showBtn={false}
              />
            );
          })}
        </div>
      </fieldset>
    </form>
  );
};

export default Order;
