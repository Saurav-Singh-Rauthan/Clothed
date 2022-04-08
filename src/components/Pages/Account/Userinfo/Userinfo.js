import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";

import * as action from "../../../store/actions/index";
import Styles from "./Userinfo.module.css";

const Userinfo = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    props.getUserDetails();
  }, [props.username]);

  const onLogoutHandler = () => {
    props.logout();
    props.clearUserInfo();
    navigate("/");
  };

  return (
    <div>
      <div className={Styles.heading}>
        <p>User Details</p>
        <button onClick={onLogoutHandler}>Logout</button>
      </div>
      <div className={Styles.details}>
        <div className={Styles.infoFields}>
          <p>Username :</p>
          <TextField
            disabled
            id="standard-required"
            label=""
            value={props.username}
          />
        </div>
        <div className={Styles.infoFields}>
          <p>Email :</p>
          <TextField
            disabled
            id="standard-required"
            label=""
            value={props.email}
          />
        </div>
      </div>
      <div className={Styles.addressField}>
        <p className={Styles.infoType}>Address</p>
        <div className={Styles.infoFields}>
          <p>Street :</p>
          <TextField
            disabled
            id="standard-required"
            label=""
            value={props.street}
          />
        </div>
        <div className={Styles.infoFields}>
          <p>Zip code :</p>
          <TextField
            disabled
            id="standard-required"
            label=""
            value={props.zipcode}
          />
        </div>
        <div className={Styles.infoFields}>
          <p>Country :</p>
          <TextField
            disabled
            id="standard-required"
            label=""
            value={props.country}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.userInfo.name,
    email: state.userInfo.email,
    zipcode: state.userInfo.zipCode,
    street: state.userInfo.street,
    country: state.userInfo.country,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(action.logout());
    },
    getUserDetails: () => {
      dispatch(action.fetchDetails());
    },
    clearUserInfo: () => {
      dispatch(action.failedGetDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userinfo);
