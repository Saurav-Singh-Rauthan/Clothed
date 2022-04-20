import React from "react";

import Styles from "./Cards.module.css";
import Card from "./Card/Card";

const Cards = (props) => {
  let items = Object.keys(props.data)
    .map((key) => {
      return key;
    })
    .map((itemKey) => {
      return (
        <Card
          type={props.type || props.data[itemKey].type}
          uniqueKey={
            props.type !== undefined ? itemKey : props.data[itemKey].itemId
          }
          details={props.data[itemKey]}
          key={itemKey}
          wishKey={itemKey}
          showBtn={props.showBtn}
        />
      );
    });

  return <div className={Styles.cardCont}>{items}</div>;
};

export default Cards;
