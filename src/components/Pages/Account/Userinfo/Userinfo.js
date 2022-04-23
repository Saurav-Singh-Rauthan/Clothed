import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../../../axiosInstance";

import * as action from "../../../store/actions/index";
import Styles from "./Userinfo.module.css";
import Alert from "../../../Alert/Alert";
import Slide from "@mui/material/Slide";

const Userinfo = (props) => {
  let navigate = useNavigate();

  const [edit, setedit] = useState(true);
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);
  const [msgState, setmsgState] = useState(1);
  const [transition, setTransition] = useState(undefined);
  const [Msg, setMsg] = useState("");
  const [userDetails, setuserDetails] = useState({
    username: props.username,
    email: props.email,
    address: {
      street: props.street,
      zipcode: props.zipcode,
      country: props.country,
    },
    userId: props.userId,
    cart: props.cart,
    orders: props.orders,
    wishlist: props.wishlist,
  });

  useEffect(() => {
    props.getUserDetails();
    setuserDetails({
      username: props.username,
      email: props.email,
      address: {
        street: props.street,
        zipcode: props.zipcode,
        country: props.country,
      },
      userId: props.userId,
      cart: props.cart,
      orders: props.orders,
      wishlist: props.wishlist,
    });
  }, [props.username]);

  const onLogoutHandler = () => {
    props.logout();
    props.clearUserInfo();
    navigate("/");
  };

  const changeEditHandler = () => {
    if (edit) {
      setedit(false);
    } else {
      axios
        .put(
          `users/${props.uniqueId}.json?auth=${props.token}`,
          userDetails
        )
        .then((res) => {
          setloading(false);
          props.getUserDetails();
        })
        .catch((err) => {
          console.log(err);
          setMsg("Error! Couldn't Update Details");
          setmsgState(0);
          setopen(true);
        });
      setloading(true);
      setedit(true);
    }
  };

  const valueChangedHandler = (type, event) => {
    switch (type) {
      case "name":
        setuserDetails({
          ...userDetails,
          username: event.target.value,
        });
        break;
      case "street":
        setuserDetails({
          ...userDetails,
          address: {
            ...userDetails.address,
            street: event.target.value,
          },
        });
        break;
      case "zip":
        setuserDetails({
          ...userDetails,
          address: {
            ...userDetails.address,
            zipcode: event.target.value,
          },
        });
        break;
      case "country":
        setuserDetails({
          ...userDetails,
          address: {
            ...userDetails.address,
            country: event.target.value,
          },
        });
        break;
      default:
        break;
    }
  };

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  const handleClose = () => {
    setopen(false);
  };

  return (
    <div>
      <Alert
        open={open}
        handleClose={handleClose}
        transition={transition}
        msg={Msg}
        success={msgState}
      />
      <div className={Styles.heading}>
        <p>User Details</p>
        <button
          className={edit ? Styles.edit : Styles.save}
          onClick={changeEditHandler}
        >
          {edit ? "Edit" : "Save"}
        </button>
        <button className={Styles.logout} onClick={onLogoutHandler}>
          Logout
        </button>
      </div>
      {!loading ? (
        <React.Fragment>
          <div className={Styles.addressField}>
            <div className={Styles.infoFields}>
              <p>Username :</p>
              <TextField
                disabled={edit}
                id="standard-required"
                label=""
                onChange={(event) => valueChangedHandler("name", event)}
                value={edit ? props.username : userDetails.username || ""}
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
                disabled={edit}
                id="standard-required"
                label=""
                onChange={(event) => valueChangedHandler("street", event)}
                value={edit ? props.street : userDetails.address.street || ""}
              />
            </div>
            <div className={Styles.infoFields}>
              <p>Zip code :</p>
              <TextField
                disabled={edit}
                id="standard-required"
                label=""
                onChange={(event) => valueChangedHandler("zip", event)}
                value={edit ? props.zipcode : userDetails.address.zipcode || ""}
              />
            </div>
            <div className={Styles.infoFields}>
              <p>Country :</p>
              <TextField
                disabled={edit}
                id="standard-required"
                label=""
                onChange={(event) => valueChangedHandler("country", event)}
                value={edit ? props.country : userDetails.address.country || ""}
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.userInfo.username,
    email: state.userInfo.email,
    zipcode: state.userInfo.zipcode,
    street: state.userInfo.street,
    country: state.userInfo.country,
    token: state.auth.token,
    userId: state.auth.userId,
    uniqueId: state.userInfo.uniqueId,
    cart: state.userInfo.cart,
    orders: state.userInfo.orders,
    wishlist: state.userInfo.wishlist,
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
