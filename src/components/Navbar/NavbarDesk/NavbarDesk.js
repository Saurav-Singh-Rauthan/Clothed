import React from "react";
import { NavLink } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Styles from "./NavbarDesk.module.css";

const navbarDesk = (props) => {
  return (
    <React.Fragment>
      <div className={Styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/home"
        >
          HOME
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/shorts"
        >
          SHORTS
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/shirts"
        >
          SHIRTS
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/jeans"
        >
          JEANS
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/shoes"
        >
          SHOES
        </NavLink>
      </div>
      <div className={Styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/wishlist"
        >
          <FavoriteIcon />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/cart"
        >
          <ShoppingCartIcon />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/account"
        >
          <AccountCircleIcon />
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default navbarDesk;
