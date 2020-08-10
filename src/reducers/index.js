import { combineReducers } from "redux";

import { products } from "./product.reducers";
import { categories } from "./category.reducers";
import { orders } from "./order.reducers";
import { users } from "./user.reducers";
import { districts } from "./district.reducers";
import { cities } from "./city.reducers";

const rootReducer = combineReducers({
  products,
  categories,
  orders,
  users,
  districts,
  cities,
});

export default rootReducer;
