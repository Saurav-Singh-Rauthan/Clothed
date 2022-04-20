import React, { useEffect } from "react";
import { connect } from "react-redux";

import Styles from "./Wishlist.module.css";
import Cards from "../../Cards/Cards";
import * as action from "../../store/actions/index";
import CircularProgress from "@mui/material/CircularProgress";

const Wishlist = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    props.getUserDetails();
  }, []);

  return (
    <div className={Styles.container}>
      <p className={Styles.heading}>Wishlist</p>
      {Object.keys(props.wishlist).length ? (
        <Cards data={props.wishlist} showBtn={true} isWish={true} />
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
    wishlist: state.userInfo.wishlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: () => {
      dispatch(action.fetchDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
