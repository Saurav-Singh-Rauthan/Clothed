import React, { useEffect, useState } from "react";
import axios from "axios";

import Styles from "./Pageview.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Cards from "../Cards/Cards";

const Pageview = (props) => {
  const [values, setvalues] = useState();

  const fetch = (type) => {
    axios
      .get(`https://react-shop-4fb2f-default-rtdb.firebaseio.com/${type}.json`)
      .then((res) => {
        setvalues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    switch (props.type) {
      case "shorts":
        fetch("shorts");
        break;
      case "shirts":
        fetch("shirts");
        break;
      case "jeans":
        fetch("jeans");
        break;
      case "shoes":
        fetch("shoes");
        break;
      default:
    }
  }, [props.type]);

  return (
    <div className={Styles.container}>
      {values ? (
        <Cards data={values} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={"4rem"}/>
        </div>
      )}
    </div>
  );
};

export default Pageview;
