import "./App.css";
import { useEffect } from "react";
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

const App = (props) => {
  useEffect(() => {
    console.log("after refresh");
    props.autoAuth();
    props.getUserDetails();
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="body">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/shirts" element={<Shirts />} />
            <Route path="/jeans" element={<Jeans />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    autoAuth: () => {
      dispatch(action.autoAuth());
    },
    getUserDetails: () => {
      dispatch(action.fetchDetails());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
