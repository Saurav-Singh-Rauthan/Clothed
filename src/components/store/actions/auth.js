import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authFailed = () => {
  return {
    type: actionTypes.AUTH_FAILED,
    msg: "authentication failed! enter correct credentials",
    status: false,
  };
};

export const authSuccess = (userToken, userId) => {
  return {
    type: actionTypes.AUTH_START,
    token: userToken,
    id: userId,
    msg: "user authenticated!",
    status: true,
  };
};

export const auth = (email, password, isSignIn) => {
  return (dispatch) => {
    dispatch(authStart);

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_DATABASE_API_KEY}`;
    if (isSignIn) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_DATABASE_API_KEY}`;
    }

    axios
      .post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.email));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
