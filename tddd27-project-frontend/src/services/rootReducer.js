import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import dishReducer from "./dish/dishReducer";
import orderReducer from "./order/orderReducer";

const rootReducer = combineReducers({
  user: userReducer,
  dish: dishReducer,
  auth: authReducer,
  order: orderReducer,
});

export default rootReducer;
