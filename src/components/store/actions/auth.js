import * as actionTypes from "./actionTypes";
import axios from "axios";

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("expireTime");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

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

export const auth = (email, password, isSignIn, username) => {
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

        const expirationTime = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expireTime", expirationTime);

        const userData = {
          email: res.data.email,
          userId: res.data.localId,
          wishlist: "",
          cart: "",
          orders: "",
          userName: username,
          address: {
            street: '',
            zipCode: '',
            country: '',
          },
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

export const autoAuth = () => {
  return (dispatch) => {
    const expiredTime = localStorage.getItem("expireTime");
    const curTime = new Date(new Date().getTime());

    if (curTime > new Date(expiredTime).getTime()) {
      dispatch(logout);
    } else {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      dispatch(authSuccess(token, userId));
    }
  };
};
