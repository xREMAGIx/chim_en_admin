import { combineReducers } from "redux";
import { products } from "./product.reducers";

const rootReducer = combineReducers({
  products,
});

export default rootReducer;
