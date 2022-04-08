import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Styles from "./Account.module.css";
import * as action from "../../store/actions/index";

const Account = (props) => {
  let navigate = useNavigate();

  const onLogoutHandler = () => {
    props.logout();
    navigate("/");
  };

  return (
    <div>
      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(action.logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Account);
