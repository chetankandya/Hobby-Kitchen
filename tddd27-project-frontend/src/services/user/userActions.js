import * as UT from "./userTypes";
import axios from "axios";

const SERVER_URL = "http://localhost:8086/";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(userRequest());
    axios
      .get(
        SERVER_URL + "v1/user/viewAll"
      )
      .then((response) => {
        dispatch(userSuccess(response.data));
      })
      .catch((error) => {
        dispatch(userFailure(error.message));
      });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    dispatch(userRequest());
    axios
      .put(
        SERVER_URL + "v1/user/update/" + user.email, user
      )
      .then((response) => {
        dispatch(userSavedSuccess(response.data));
      })
      .catch((error) => {
        dispatch(userFailure(error.message));
      });
  };
};

export const registerUser = (userObject) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const response = await axios.post(SERVER_URL + "v1/user/create", userObject);
    dispatch(userSavedSuccess(response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(userFailure(error.message));
    return Promise.reject(error);
  }
};

const userRequest = () => {
  return {
    type: UT.USER_REQUEST,
  };
};

const userSavedSuccess = (user) => {
  return {
    type: UT.USER_SAVED_SUCCESS,
    payload: user,
  };
};

const userSuccess = (users) => {
  return {
    type: UT.USER_SUCCESS,
    payload: users,
  };
};

const userFailure = (error) => {
  return {
    type: UT.USER_FAILURE,
    payload: error,
  };
};
