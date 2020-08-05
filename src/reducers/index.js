import { combineReducers } from "redux";

import { products } from "./product.reducers";
import { categories } from "./category.reducers";
import { orders } from "./order.reducers";

const rootReducer = combineReducers({
  products,
  categories,
  orders,
});

export default rootReducer;
