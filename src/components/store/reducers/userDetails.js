import * as actionType from "../actions/actionTypes";

const initialState = {
  name: "",
  email: "",
  street: "",
  zipCode: "",
  country: "",
  cart: "",
  wishlist: "",
  orders: "",
};

const userDetails = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UI_FAILED:
      return {
        ...state,
        name: "",
        email: "",
        street: "",
        zipCode: "",
        country: "",
      };
    case actionType.UI_SUCCESS:
      return {
        ...state,
        name: action.name,
        email: action.email,
        street: action.street,
        zipCode: action.zipCode,
        country: action.country,
        cart: action.cart,
        wishlist: action.wishlist,
        orders: action.orders,
      };
    default:
      return state;
  }
};

export default userDetails;
