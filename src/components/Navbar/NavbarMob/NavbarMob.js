import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Styles from "./NavbarMob.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

const NavbarMob = (props) => {
  const [drawerState, setdrawerState] = useState(Styles.close);

  const openDrawerHandler = () => {
    setdrawerState(Styles.open);
  };

  const closeDrawerHandler = () => {
    setdrawerState(Styles.close);
  };

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
      <div className={Styles.hamburger}>
        <MenuIcon onClick={openDrawerHandler} />
      </div>
      <div
        onClick={closeDrawerHandler}
        className={[Styles.NavModal, drawerState].join(" ")}
      >
        <div className={Styles.logoSec}>
          <div></div>
          <div className={Styles.logo}>
            <NavLink style={{ color: "white", textDecoration: "none" }} to="/">
              CLOTHED
            </NavLink>
          </div>
          <CloseIcon onClick={closeDrawerHandler} />
        </div>

        {/* Icons */}
        <div className={Styles.links}>{links}</div>

        <div className={Styles.linksVert}>
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
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(NavbarMob);
