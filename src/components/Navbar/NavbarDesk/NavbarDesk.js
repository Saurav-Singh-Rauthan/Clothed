import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Styles from "./NavbarDesk.module.css";

const navbarDesk = (props) => {
  let links = (
    <React.Fragment>
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
    </React.Fragment>
  );

  if (!props.isAuthenticated) {
    links = (
      <NavLink
        className={({ isActive }) =>
          isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
        }
        to="/auth"
      >
        Login / Register
      </NavLink>
    );
  }

  return (
    <React.Fragment>
      <div className={Styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/"
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

      <div className={Styles.links}>{links}</div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(navbarDesk);
