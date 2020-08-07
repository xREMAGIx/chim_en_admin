import { combineReducers } from "redux";

import { products } from "./product.reducers";
import { categories } from "./category.reducers";
import { orders } from "./order.reducers";
import { users } from "./user.reducers";

const rootReducer = combineReducers({
  products,
  categories,
  orders,
  users,
});

export default rootReducer;
