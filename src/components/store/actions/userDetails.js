import * as actionType from "./actionTypes";
import axios from "../../../axiosInstance";

export const failedGetDetails = () => {
  return {
    type: actionType.UI_FAILED,
  };
};

export const setDetails = (
  name,
  email,
  street,
  zipcode,
  country,
  cart,
  wishlist,
  orders,
  id
) => {
  return {
    type: actionType.UI_SUCCESS,
    name,
    email,
    street,
    zipcode,
    country,
    cart,
    wishlist,
    orders,
    id,
  };
};

export const fetchDetails = () => {
  return (dispatch) => {
    axios
      .get(
        `users.json?auth=${localStorage.getItem(
          "token"
        )}&orderBy="userId"&equalTo="${localStorage.getItem("userId")}"`
      )
      .then((res) => {
        let userData = res.data[Object.keys(res.data)[0]];
        dispatch(
          setDetails(
            userData.username,
            userData.email,
            userData.address.street,
            userData.address.zipcode,
            userData.address.country,
            userData.cart,
            userData.wishlist,
            userData.orders,
            Object.keys(res.data)[0]
          )
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(failedGetDetails());
      });
  };
};
