import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Styles from "./Notfound.module.css";
import nf from "../../../assests/undraw_page_not_found_re_e9o6.svg";

const Notfound = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={Styles.cont}>
      <img className={Styles.img} src={nf} alt="404 Not Found" />
      <div className={Styles.home}>
        <div>The Page you're looking for doesn't exist</div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default Notfound;
