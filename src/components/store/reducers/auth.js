import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: false,
  loading: false,
  msg: null,
  status: null,
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
        msg: action.msg,
        status: action.status,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.id,
        msg: action.msg,
        status: action.status,
      };
    default:
      return state;
  }
};

export default authReducer;
