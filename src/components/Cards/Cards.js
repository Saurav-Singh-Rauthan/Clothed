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
          type={props.type}
          uniqueKey={itemKey}
          details={props.data[itemKey]}
          key={itemKey}
        />
      );
    });

  return <div className={Styles.cardCont}>{items}</div>;
};

export default Cards;
