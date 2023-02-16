import * as BT from "./dishTypes";
import axios from "axios";

const SERVER_URL = "http://localhost:8086/";

export const saveDish = (dish) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_DISH_REQUEST,
    });
    axios
      .post(SERVER_URL + "v1/dish/create", dish)
      .then((response) => {
        dispatch(dishSuccess(response.data));
      })
      .catch((error) => {
        dispatch(dishFailure(error));
      });
  };
};

export const fetchDishesForMenu = () => async (dispatch) => {
  dispatch({
    type: BT.FETCH_DISH_REQUEST,
  });
  try{
      const response = await axios.get(SERVER_URL + "v1/dish/checkStatus/true" )
      dispatch(dishSuccess(response.data));
      console.log(response.data);
      return Promise.resolve(response.data);
    } catch(error) {
        dispatch(dishFailure(error));
        return Promise.reject(error);
      }
};

export const fetchAllDishes = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_DISH_REQUEST,
    });
    axios
      .get(SERVER_URL + "v1/dish/viewAll" )
      .then((response) => {
        dispatch(dishSuccess(response.data));
      })
      .catch((error) => {
        dispatch(dishFailure(error));
      });
  };
};

export const fetchDish = (dishId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_DISH_REQUEST,
    });
    axios
      .get(SERVER_URL + "v1/dish/view/" + dishId)
      .then((response) => {
        dispatch(dishSuccess(response.data));
      })
      .catch((error) => {
        dispatch(dishFailure(error));
      });
  };
};

export const updateDish = (dish) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_DISH_REQUEST,
    });
    axios
      .put(SERVER_URL + "v1/dish/update/" + dish.dishId, dish)
      .then((response) => {
        dispatch(dishSuccess(response.data));
      })
      .catch((error) => {
        dispatch(dishFailure(error));
      });
  };
};

export const deleteDish = (dishId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_DISH_REQUEST,
    });
    axios
      .delete(SERVER_URL + "v1/dish/delete/" + dishId)
      .then((response) => {
        dispatch(dishSuccess(response.data));
      })
      .catch((error) => {
        dispatch(dishFailure(error));
      });
  };
};

const dishSuccess = (dish) => {
  return {
    type: BT.DISH_SUCCESS,
    payload: dish,
  };
};

const dishFailure = (error) => {
  return {
    type: BT.DISH_FAILURE,
    payload: error,
  };
};


