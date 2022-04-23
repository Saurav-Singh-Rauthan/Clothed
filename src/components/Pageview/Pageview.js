import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";

import Styles from "./Pageview.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Cards from "../Cards/Cards";
import Alert from "../Alert/Alert";
import Slide from "@mui/material/Slide";

const Pageview = (props) => {
  const [values, setvalues] = useState();
  const [open, setopen] = useState(false);
  const [msgState, setmsgState] = useState(1);
  const [Msg, setMsg] = useState("");
  const [transition, setTransition] = useState(undefined);

  const fetch = (type) => {
    axios
      .get(`${type}.json`)
      .then((res) => {
        setvalues(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Error! Couldn't fetch details");
        setmsgState(0);
        setopen(true);
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

  const handleClose = () => {
    setopen(false);
  };


  return (
    <div className={Styles.container}>
      <Alert
        open={open}
        handleClose={handleClose}
        transition={transition}
        msg={Msg}
        success={msgState}
      />
      {values ? (
        <Cards data={values} type={props.type} />
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

export default Pageview;
