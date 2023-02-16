import * as OT from "./orderTypes";
import axios from "axios";

const SERVER_URL = "http://localhost:8086/";

export const saveOrder = (order) => async (dispatch) => {
    dispatch({
      type: OT.SAVE_ORDER_REQUEST,
    });
    try{
      const response = await axios.post(
          SERVER_URL + "v1/order/create", order)
      dispatch(orderSuccess(response.data));
      return Promise.resolve(response.data);
    } catch(error) {
        dispatch(orderFailure(error));
        return Promise.reject(error);
      }
};

export const fetchOrderByEmail = (email) => async (dispatch) => {
    
  dispatch({
      type: OT.FETCH_ORDER_REQUEST,
    });
    try{
      const response = await axios.get(SERVER_URL + "v1/order/viewByEmail/" + email)
      dispatch(orderSuccess(response.data));
      return Promise.resolve(response.data);
    } catch(error) {
        dispatch(orderFailure(error));
        return Promise.reject(error);
      }
};

export const fetchIncompleteOrders = () => async (dispatch) => {
    dispatch({
      type: OT.FETCH_ORDER_REQUEST,
    });
    try {

      const response = await axios.get(SERVER_URL + "v1/order/checkStatus/false")
      dispatch( orderSuccess(response.data));
      return Promise.resolve(response.data);
    } catch(error) {
        dispatch(orderFailure(error));
        return Promise.reject(error);
    }
};

export const fetchAllOrders = () => async (dispatch) => {
    dispatch({
      type: OT.FETCH_ORDER_REQUEST,
    });
    try {

      const response = await axios.get(SERVER_URL + "v1/order/viewAll" )
      dispatch(orderSuccess(response.data));
      return Promise.resolve(response.data);
    } catch(error) {
        dispatch(orderFailure(error));
        return Promise.reject(error);
      }
};

export const updateOrder = (order) => async (dispatch) => {
    dispatch({
      type: OT.UPDATE_ORDER_REQUEST,
    });
    try {
        const response = await axios.put(SERVER_URL + "v1/order/update/" + order.orderId, order)
        dispatch(orderSuccess(response.data));
        return Promise.resolve(response.data);
    } catch(error) {
        dispatch(orderFailure(error));
        return Promise.reject(error);
      }
};

const orderSuccess = (order) => {
  return {
    type: OT.ORDER_SUCCESS,
    payload: order,
  };
};

const orderFailure = (error) => {
  return {
    type: OT.ORDER_FAILURE,
    payload: error,
  };
};


