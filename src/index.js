import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./components/store/reducers/auth";
import userDetailsReducer from "./components/store/reducers/userDetails";

// const composeEnhancers =
//   typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// composeEnhancers(applyMiddleware(thunk))

const rootreducer = combineReducers({
  auth: authReducer,
  userInfo: userDetailsReducer,
});

const store = createStore(rootreducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
