import * as actionType from "./actionTypes";
import axios from "axios";

export const failedGetDetails = () => {
  return {
    type: actionType.UI_FAILED,
  };
};

export const setDetails = (
  name,
  email,
  street,
  zipCode,
  country,
  cart,
  wishlist,
  orders
) => {
  return {
    type: actionType.UI_SUCCESS,
    name,
    email,
    street,
    zipCode,
    country,
    cart,
    wishlist,
    orders,
  };
};

export const fetchDetails = () => {
  return (dispatch) => {
    axios
      .get(
        `https://react-shop-4fb2f-default-rtdb.firebaseio.com/users.json?auth=${localStorage.getItem(
          "token"
        )}&orderBy="userId"&equalTo="${localStorage.getItem("userId")}"`
      )
      .then((res) => {
        // console.log(res.data[Object.keys(res.data)[0]]);
        let userData = res.data[Object.keys(res.data)[0]];
        dispatch(
          setDetails(
            userData.userName,
            userData.email,
            userData.address.street,
            userData.address.zipCode,
            userData.address.country,
            userData.cart,
            userData.wishlist,
            userData.orders
          )
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(failedGetDetails());
      });
  };
};
