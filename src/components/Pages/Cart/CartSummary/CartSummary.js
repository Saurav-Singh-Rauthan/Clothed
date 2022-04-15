import React from "react";

import Styles from "./CartSummary.module.css";

const CartSummary = (props) => {
  let discount = 0;
  if (props.total > 100 && props.total < 200) {
    discount = 5;
  } else if (props.total > 200 && props.total < 400) {
    discount = 10;
  } else if (props.total > 400) {
    discount = 15;
  }

  return (
    <div className={Styles.container}>
      <p className={Styles.heading}>Summary</p>
      <div className={Styles.summaryCont}>
        <div className={Styles.values}>
          <p>Price</p>
          <p>${props.total.toFixed(2)}</p>
        </div>
        <div className={Styles.values}>
          <p>Discount</p>
          <p>{discount}%</p>
        </div>
        <div className={Styles.values}>
          <p>Payable Amount</p>
          <p>${(props.total - props.total * (discount / 100)).toFixed(2)}</p>
        </div>
      </div>
      <button
        className={Styles.orderBtn}
        onClick={props.order}
        disabled={props.total < 1}
      >
        Place Order
      </button>
    </div>
  );
};

export default CartSummary;
