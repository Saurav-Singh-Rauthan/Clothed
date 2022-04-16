import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import Styles from "./Description.module.css";
import Subsection from "../../Subsection/Subsection";

const Description = (props) => {
  const [params, setparams] = useSearchParams();
  const [itemDetails, setitemDetails] = useState();
  // console.log(params.get("type"), params.get("item"));

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(
        `https://react-shop-4fb2f-default-rtdb.firebaseio.com/${params.get(
          "type"
        )}/${params.get("item")}.json`
      )
      .then((res) => {
        setitemDetails({ ...res.data, key: params.get("item") });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.get("item")]);

  return (
    <div className={Styles.container}>
      {itemDetails?.key === params.get("item") ? (
        <div className={Styles.descContainer}>
          <div className={Styles.img}>
            <img
              style={{ objectFit: "contain", width: "100%", height: "80%" }}
              src={itemDetails?.img}
              alt="item img"
            />
          </div>
          <div className={Styles.detailsContainer}>
            <p className={Styles.name}>{itemDetails?.name}</p>
            <p className={Styles.price}>${itemDetails?.price}</p>
            <p className={Styles.desc}>{itemDetails?.desc}</p>
            <div className={Styles.btnContainer}>
              <button className={Styles.addWish}>Add to wishlist</button>
              <button className={Styles.addCart}>Add to cart</button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={"4rem"} />
        </div>
      )}

      <div>
        <p className={Styles.similarItems}>People also like</p>
        <Subsection type={params.get("type")} heading={false} />
      </div>
    </div>
  );
};

export default Description;
