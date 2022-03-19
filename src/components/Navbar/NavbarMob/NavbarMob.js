import React from "react";

import Styles from "./NavbarMob.module.css";
import MenuIcon from "@mui/icons-material/Menu";

const navbarMob = (props) => {
  return (
    <div className={Styles.hamburger}>
      <MenuIcon />
      <div className={Styles.NavModal}>
        
      </div>
    </div>
  );
};

export default navbarMob;
