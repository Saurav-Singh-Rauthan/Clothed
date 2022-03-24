import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slide from "@mui/material/Slide";

import * as actions from "../../store/actions/index";
import Styles from "./Auth.module.css";
import Alert from "../../Alert/Alert";

const Auth = (props) => {
  const [isSignIn, setisSignIn] = useState(true);
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });

  const [value, setValue] = useState("one");
  const [open, setopen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  const handleClose = () => {
    setopen(false);
  };

  const handleChange = (event, newValue) => {
    newValue === "one" ? setisSignIn(true) : setisSignIn(false);
    setValue(newValue);
  };

  const submitHandler = () => {
    props.authenticate(userCred.email, userCred.password, isSignIn);
  };

  const inputChangeHandler = (type, event) => {
    switch (type) {
      case "email":
        setUserCred({
          ...userCred,
          email: event.target.value,
        });
        break;
      case "password":
        setUserCred({
          ...userCred,
          password: event.target.value,
        });
        break;
      default:
        setUserCred({
          email: "",
          password: "",
        });
    }
  };

  console.log(props.authMsg, props.authMsgStatus);
  if (props.authMsg !== null) {
    setTransition(() => TransitionUp);
    setopen(true);
  }

  return (
    <div className={Styles.container}>
      <Alert
        open={open}
        handleClose={handleClose}
        transition={transition}
        msg={props.authMsg}
        success={props.authMsgStatus}
      />
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab value="one" label="Sign In" />
        <Tab value="two" label="Sign Up" />
      </Tabs>

      <div className={Styles.elements}>
        <TextField
          className={Styles.inputField}
          required
          type="text"
          value={userCred.email}
          label="Email"
          onChange={(event) => inputChangeHandler("email", event)}
        />
        <TextField
          className={Styles.inputField}
          required
          type="password"
          value={userCred.password}
          label="Password"
          onChange={(event) => inputChangeHandler("password", event)}
        />
        <button className={Styles.button} onClick={submitHandler}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authMsg: state.auth.msg,
    authMsgStatus: state.auth.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, password, isSignIn) => {
      dispatch(actions.auth(email, password, isSignIn));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
