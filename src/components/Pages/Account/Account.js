import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Styles from "./Account.module.css";
import * as action from "../../store/actions/index";

const Account = (props) => {
  const [option, setoption] = useState(0);

  let navigate = useNavigate();

  const onLogoutHandler = () => {
    props.logout();
    navigate("/");
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.optionContainer}>
        <div
          className={[Styles.option, !option ? Styles.active : null].join(" ")}
          onClick={() => setoption(0)}
        >
          Account
        </div>
        <div
          className={[Styles.option, option ? Styles.active : null].join(" ")}
          onClick={() => setoption(1)}
        >
          Orders
        </div>
      </div>
      <div className={Styles.contentContainer}>
        <div className={Styles.account}>
          <button onClick={onLogoutHandler}>Logout</button>
        </div>
      </div>
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
