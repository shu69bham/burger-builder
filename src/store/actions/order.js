import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerLoading = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_LOADING
  };
};

export const purchaseBurgerStart = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerLoading());
    axios
      .post("/orders.json", orderData)
      .then(response =>
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      )
      .catch(error => dispatch(purchaseBurgerFail(error)));
  };
};
