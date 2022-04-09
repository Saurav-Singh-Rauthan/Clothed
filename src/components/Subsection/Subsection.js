import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Styles from "./Subsection.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Cards from "../Cards/Cards";

const Subsection = (props) => {
  const [sectionDetails, setsectionDetails] = useState({
    sectionName: "",
    sectionLink: "",
  });

  const [values, setvalues] = useState();

  const fetch = (type) => {
    axios
      .get(
        `https://react-shop-4fb2f-default-rtdb.firebaseio.com/${type}.json?orderBy="$key"&limitToFirst=4`
      )
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
        setsectionDetails({
          sectionName: "Shorts",
          sectionLink: "/shorts",
        });
        fetch("shorts");
        break;

      case "shirts":
        setsectionDetails({
          sectionName: "Shirts",
          sectionLink: "/shirts",
        });
        fetch("shirts");
        break;

      case "jeans":
        setsectionDetails({
          sectionName: "Jeans",
          sectionLink: "/jeans",
        });
        fetch("jeans");
        break;

      case "shoes":
        setsectionDetails({
          sectionName: "Shoes",
          sectionLink: "/shoes",
        });
        fetch("shoes");
        break;
      default:
        setsectionDetails({
          sectionName: "",
          sectionLink: "",
        });
    }
  }, []);

  return (
    <div className={Styles.subsection}>
      <div className={Styles.sectionType}>
        <p className={Styles.heading}>{sectionDetails.sectionName}</p>
        <Link to={sectionDetails.sectionLink}>More {">"}</Link>
      </div>
      {values ? (
        <Cards data={values} type={props.type}/>
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
    </div>
  );
};

export default Subsection;
