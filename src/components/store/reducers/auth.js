import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: false,
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
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        redirectLink: action.link,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.id,
        redirectLink: action.link,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        redirectLink: "/",
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;
