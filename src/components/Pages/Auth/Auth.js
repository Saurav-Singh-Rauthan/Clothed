import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";

import * as actions from "../../store/actions/index";
import Styles from "./Auth.module.css";

const Auth = (props) => {
  const [isSignIn, setisSignIn] = useState(true);
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
    username: "",
  });

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

  const handleChange = (event, newValue) => {
    newValue === "one" ? setisSignIn(true) : setisSignIn(false);
    setValue(newValue);
  };

  const submitHandler = () => {
    props.authenticate(userCred.email, userCred.password, isSignIn, userCred.username);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, password, isSignIn, username) => {
      dispatch(actions.auth(email, password, isSignIn, username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
