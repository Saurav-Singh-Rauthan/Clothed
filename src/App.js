import "./App.css";
import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "./components/store/actions/index";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Notfound from "./components/Pages/Notfound/Notfound";
import CircularProgress from "@mui/material/CircularProgress";

// pages lazy loading
const Auth = React.lazy(() => {
  return import("./components/Pages/Auth/Auth");
});

const Home = React.lazy(() => {
  return import("./components/Pages/Home/Home");
});

const Shorts = React.lazy(() => {
  return import("./components/Pages/Shorts/Shorts");
});

const Jeans = React.lazy(() => {
  return import("./components/Pages/Jeans/Jeans");
});

const Shoes = React.lazy(() => {
  return import("./components/Pages/Shoes/Shoes");
});

const Shirts = React.lazy(() => {
  return import("./components/Pages/Shirts/Shirts");
});

const Account = React.lazy(() => {
  return import("./components/Pages/Account/Account");
});

const Cart = React.lazy(() => {
  return import("./components/Pages/Cart/Cart");
});

const Description = React.lazy(() => {
  return import("./components/Pages/Description/Description");
});

const Wishlist = React.lazy(() => {
  return import("./components/Pages/Wishlist/Wishlist");
});

const App = (props) => {
  useEffect(() => {
    props.autoAuth();
    setTimeout(() => {
      if (props.isAuthenticated) {
        props.getUserDetails();
      }
    }, 100);
  });

  let routes = (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/shorts" element={<Shorts />} />
      <Route path="/shirts" element={<Shirts />} />
      <Route path="/jeans" element={<Jeans />} />
      <Route path="/shoes" element={<Shoes />} />
      <Route path="/desc" element={<Description />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );

  if (props.isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/shirts" element={<Shirts />} />
        <Route path="/jeans" element={<Jeans />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/desc" element={<Description />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="body">
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "1rem",
                }}
              >
                <CircularProgress />
              </div>
            }
          >
            {routes}
          </Suspense>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoAuth: () => {
      dispatch(action.autoAuth());
    },
    getUserDetails: () => {
      dispatch(action.fetchDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
