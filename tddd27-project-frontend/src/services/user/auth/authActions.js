import * as AT from "./authTypes";
import axios from "axios";

const AUTH_URL = "http://localhost:8086/v1/user/authenticate";

export const authenticateUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(AUTH_URL, {
      email: email,
      password: password
    });
    localStorage.setItem("jwtToken", response.data.token);
    dispatch(success({ username:response.data.name, userrole:response.data.role, isLoggedIn: true }));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    dispatch(success({ username: "", userrole: "", isLoggedIn: false }));
    // dispatch(success({ }));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
}

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};