import * as OT from "./orderTypes";

const initialState = {
  order: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OT.SAVE_ORDER_REQUEST:
    case OT.FETCH_ORDER_REQUEST:
    case OT.UPDATE_ORDER_REQUEST:
    case OT.DELETE_ORDER_REQUEST:
      return {
        ...state,
      };
    case OT.ORDER_SUCCESS:
      return {
        order: action.payload,
        error: "",
      };
    case OT.ORDER_FAILURE:
      return {
        order: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
