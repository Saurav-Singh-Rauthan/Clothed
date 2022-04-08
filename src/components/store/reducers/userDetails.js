import * as actionType from "../actions/actionTypes";

const initialState = {
  username: "",
  email: "",
  street: "",
  zipcode: "",
  country: "",
  cart: "",
  wishlist: "",
  orders: "",
  uniqueId: "",
};

const userDetails = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UI_FAILED:
      return {
        ...state,
        username: "",
        email: "",
        street: "",
        zipcode: "",
        country: "",
        uniqueId: "",
      };
    case actionType.UI_SUCCESS:
      return {
        ...state,
        username: action.name,
        email: action.email,
        street: action.street,
        zipcode: action.zipcode,
        country: action.country,
        cart: action.cart,
        wishlist: action.wishlist,
        orders: action.orders,
        uniqueId: action.id,
      };
    default:
      return state;
  }
};

export default userDetails;
