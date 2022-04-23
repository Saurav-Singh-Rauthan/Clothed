import * as actionTypes from "./actionTypes";
import axios from "../../../axiosInstance";

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

export const authFailed = (msg) => {
  let errorMessage = "";
  switch (msg) {
    case "EMAIL_EXISTS":
      errorMessage = "Email already taken, Sign In";
      break;
    case "OPERATION_NOT_ALLOWED":
      errorMessage = "Password sign-in is disabled ";
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      errorMessage = "Too many attempts!! Try again later";
      break;
    case "EMAIL_NOT_FOUND":
      errorMessage = "This email is not registered! Sign Up ";
      break;
    case "INVALID_PASSWORD":
      errorMessage = "Please enter correct password!";
      break;
    case "USER_DISABLED":
      errorMessage = "Account has been disabled by an administrator";
      break;
    default:
  }

  return {
    type: actionTypes.AUTH_FAILED,
    link: null,
    msg: errorMessage,
  };
};

export const authSuccess = (userToken, userId, userEmail) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: userToken,
    id: userId,
    email: userEmail,
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
        dispatch(
          authSuccess(res.data.idToken, res.data.localId, res.data.email)
        );

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
          username: username,
          address: {
            street: "",
            zipcode: "",
            country: "",
          },
        };

        if (!isSignIn) {
          axios
            .post(
              `users.json?auth=${res.data.idToken}`,
              userData
            )
            .then((response) => {})
            .catch((err) => {
              console.log(err);
              dispatch(authFailed(err.response.data.error.message));
            });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFailed(err.response.data.error.message));
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

export const resetError = () => {
  return {
    type: actionTypes.AUTH_RESET,
  };
};
