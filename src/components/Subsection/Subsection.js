import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Styles from "./Subsection.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Cards from "../Cards/Cards";
import Alert from "../Alert/Alert";

const Subsection = (props) => {
  const [sectionDetails, setsectionDetails] = useState({
    sectionName: "",
    sectionLink: "",
  });

  const [values, setvalues] = useState();
  const [open, setopen] = useState(false);
  const [msgState, setmsgState] = useState(1);
  const [Msg, setMsg] = useState("");
  const [transition, setTransition] = useState(undefined);

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
        console.log(err);
        setMsg("Error! Couldn't fetch details");
        setmsgState(0);
        setopen(true);
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

  const handleClose = () => {
    setopen(false);
  };

  return (
    <div className={Styles.subsection}>
      <Alert
        open={open}
        handleClose={handleClose}
        transition={transition}
        msg={Msg}
        success={msgState}
      />
      {props.heading ? (
        <div className={Styles.sectionType}>
          <p className={Styles.heading}>{sectionDetails.sectionName}</p>
          <Link to={sectionDetails.sectionLink}>More {">"}</Link>
        </div>
      ) : null}
      {values ? (
        <Cards data={values} type={props.type} showBtn={true} />
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
