import React from "react";
import { Link } from "react-router-dom";

import Styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={Styles.card}>
      <div>
        <img
          src={props.details.img}
          alt={props.details.img}
          className={Styles.cardImg}
        />
      </div>
      <div className={Styles.descCont}>
        <p>{props.details.name}</p>
        <div className={Styles.desc}>
          <div className={Styles.price}>${props.details.price}</div>
          <div className={Styles.view}>
            <Link to="/">Add To Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
