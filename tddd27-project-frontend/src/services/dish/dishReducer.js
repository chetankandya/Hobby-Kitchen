import * as BT from "./dishTypes";

const initialState = {
  dish: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_DISH_REQUEST:
    case BT.FETCH_DISH_REQUEST:
    case BT.UPDATE_DISH_REQUEST:
    case BT.DELETE_DISH_REQUEST:
      return {
        ...state,
      };
    case BT.DISH_SUCCESS:
      return {
        dish: action.payload,
        error: "",
      };
    case BT.DISH_FAILURE:
      return {
        dish: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
