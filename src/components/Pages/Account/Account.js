import React, { useState, useEffect } from "react";

import Styles from "./Account.module.css";
import Userinfo from "./Userinfo/Userinfo";

const Account = (props) => {
  const [option, setoption] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        {!option ? <Userinfo /> : null}
      </div>
    </div>
  );
};

export default Account;
