import React from "react";

import Styles from "./CartItems.module.css";

const CartItems = (props) => {
  console.log(props.items);

  return (
    <div className={Styles.container}>
    <p className={Styles.title}>{`My cart ()`} </p>

      <div className={Styles.cardContainer}>
        <img
          className={Styles.img}
          src="https://rukminim2.flixcart.com/image/580/696/krce64w0/short/1/4/p/m-tnvshortzskullbeard-tripr-original-imag55m5xczsev5f.jpeg?q=50"
          alt=""
        />
        <div className={Styles.itemDesc}>
          <p className={Styles.itemName}>Item 1</p>
          <p>$20</p>
        </div>
        <div className={Styles.btnContainer}>
          <button>+</button>
          <p>1</p>
          <button>-</button>
        </div>
        <button>Remove Item</button>
      </div>
      <div className={Styles.cardContainer}>
        <img
          className={Styles.img}
          src="https://rukminim2.flixcart.com/image/580/696/krce64w0/short/1/4/p/m-tnvshortzskullbeard-tripr-original-imag55m5xczsev5f.jpeg?q=50"
          alt=""
        />
        <div className={Styles.itemDesc}>
          <p className={Styles.itemName}>Item 1</p>
          <p>$20</p>
        </div>
        <div className={Styles.btnContainer}>
          <button>+</button>
          <p>1</p>
          <button>-</button>
        </div>
        <button>Remove Item</button>
      </div>
    </div>
  );
};

export default CartItems;
