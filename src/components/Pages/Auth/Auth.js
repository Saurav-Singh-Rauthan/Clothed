import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";

import * as actions from "../../store/actions/index";
import Styles from "./Auth.module.css";
import Alert from "../../Alert/Alert";
import Slide from "@mui/material/Slide";

const Auth = (props) => {
  const [isSignIn, setisSignIn] = useState(true);
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [open, setopen] = useState(false);
  const [msgState, setmsgState] = useState(1);
  const [transition, setTransition] = useState(undefined);
  const [Msg, setMsg] = useState("");

  const [value, setValue] = useState("one");
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.isAuthenticated && props.link !== null) {
      navigate(props.link);
    }
  }, [props.isAuthenticated]);

  useEffect(() => {
    if (props.isError) {
      setMsg(props.errorMessage);
      setmsgState(0);
      setopen(true);
      setTimeout(() => {
        props.resetError();
      }, 1000);
    }
  }, [props.isError]);

  const handleChange = (event, newValue) => {
    newValue === "one" ? setisSignIn(true) : setisSignIn(false);
    setValue(newValue);
  };

  const submitHandler = () => {
    props.authenticate(
      userCred.email,
      userCred.password,
      isSignIn,
      userCred.username
    );
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
      case "username":
        setUserCred({
          ...userCred,
          username: event.target.value,
        });
        break;
      default:
        setUserCred({
          email: "",
          password: "",
        });
    }
  };

  const handleClose = () => {
    setopen(false);
  };

  return (
    <div className={Styles.container}>
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
        <Alert
          open={open}
          handleClose={handleClose}
          transition={transition}
          msg={Msg}
          success={msgState}
        />
        {!isSignIn ? (
          <TextField
            className={Styles.inputField}
            required
            type="text"
            value={userCred.username}
            label="User Name"
            onChange={(event) => inputChangeHandler("username", event)}
          />
        ) : null}
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
          placeholder={!isSignIn ? "min. length should be 6" : null}
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
    link: state.auth.redirectLink,
    isAuthenticated: state.auth.token !== null,
    isError: state.auth.error !== false,
    errorMessage: state.auth.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, password, isSignIn, username) => {
      dispatch(actions.auth(email, password, isSignIn, username));
    },
    resetError: () => {
      dispatch(actions.resetError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
