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
    link: null,
  };
};

export const authSuccess = (userToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: userToken,
    id: userId,
    link: "/",
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

        const userData = {
          email: res.data.email,
          userId: res.data.localId,
          wishlist: "",
          cart: "",
        };

        if (!isSignIn) {
          axios
            .post(
              `https://react-shop-4fb2f-default-rtdb.firebaseio.com/users.json?auth=${res.data.idToken}`,
              userData
            )
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFailed);
      });
  };
};
