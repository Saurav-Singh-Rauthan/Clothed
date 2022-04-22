import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  userEmail: null,
  error: false,
  errorMsg: null,
  loading: false,
  redirectLink: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.AUTH_RESET:
      return {
        ...state,
        error: false,
        errorMsg: null,
      };

    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        token: null,
        userId: null,
        userEmail: null,
        loading: false,
        error: true,
        errorMsg: action.msg,
        redirectLink: action.link,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.id,
        userEmail: action.email,
        redirectLink: action.link,
        error: false,
        errorMsg: null,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        redirectLink: "/",
        error: false,
        errorMsg: null,
      };

    default:
      return state;
  }
};

export default authReducer;
