import React from "react";
import { NavLink } from "react-router-dom";

import NavbarDesk from "./NavbarDesk/NavbarDesk";
import NavbarMob from './NavbarMob/NavbarMob';

import Styles from "./Navbar.module.css";

const navbar = (props) => {
  return (
    <div className={Styles.navbar}>
      <div className={Styles.logo}>
        <NavLink style={{ color: "white", textDecoration: "none" }} to="/">
          CLOTHED
        </NavLink>
      </div>
      <NavbarDesk />
      <NavbarMob/>
    </div>
  );
};

export default navbar;
