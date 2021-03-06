import React from "react";

import Styles from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <div className={props.showBtn ? Styles.cardContainer: Styles.orderContainer}>
      <img className={Styles.img} src={props.details.img} alt="item img" />
      <div className={Styles.itemDesc}>
        <p className={Styles.itemName}>{props.details.name}</p>
        <p>${props.details.price}</p>
      </div>
      {props.showBtn ? (
        <React.Fragment>
          <div className={Styles.btnContainer}>
            <button
              className={Styles.delBtn}
              onClick={() => props.change("sub", props.details)}
              disabled={props.details.qty <= 1}
            >
              -
            </button>
            <p>{props.details.qty}</p>
            <button
              className={Styles.addBtn}
              onClick={() => props.change("add", props.details)}
            >
              +
            </button>
          </div>
          <button
            className={Styles.removeBtn}
            onClick={() => props.remove(props.details.itemKey)}
          >
            Remove Item
          </button>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default CartItem;
