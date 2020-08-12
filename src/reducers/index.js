import { combineReducers } from "redux";
import { products } from "./product.reducers";
import { categories } from "./category.reducers";
import { orders } from "./order.reducers";
import { users } from "./user.reducers";
import { districts } from "./district.reducers";
import { cities } from "./city.reducers";
import { permissions } from "./permission.reducers";

//Theme
import { themeConstants } from "../constants";

export function theme(state = { dark: false }, action) {
  switch (action.type) {
    // Get Reducers
    case themeConstants.CHANGE_THEME:
      return {
        dark: !action.toggle,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  products,
  categories,
  orders,
  users,
  districts,
  cities,
  theme,
  permissions,
});

export default rootReducer;
