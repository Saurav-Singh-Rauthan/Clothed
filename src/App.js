import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "./components/store/actions/index";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home/Home";
import Shorts from "./components/Pages/Shorts/Shorts";
import Shirts from "./components/Pages/Shirts/Shirts";
import Jeans from "./components/Pages/Jeans/Jeans";
import Shoes from "./components/Pages/Shoes/Shoes";
import Notfound from "./components/Pages/Notfound/Notfound";
import Auth from "./components/Pages/Auth/Auth";
import Account from "./components/Pages/Account/Account";
import Cart from "./components/Pages/Cart/Cart";
import Description from "./components/Pages/Description/Description";
import Wishlist from "./components/Pages/Wishlist/Wishlist";

const App = (props) => {
  useEffect(() => {
    console.log("after refresh");
    props.autoAuth();
    if (props.isAuthenticated) {
      props.getUserDetails();
    }
  });

  let routes = (
    <React.Fragment>
      <Route path="/auth" element={<Auth />} />
      <Route path="/shorts" element={<Shorts />} />
      <Route path="/shirts" element={<Shirts />} />
      <Route path="/jeans" element={<Jeans />} />
      <Route path="/shoes" element={<Shoes />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Notfound />} />
    </React.Fragment>
  );

  if (props.isAuthenticated) {
    routes = (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="body">
          <Routes>{routes}</Routes>
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
