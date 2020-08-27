import { combineReducers } from "redux";
import { products } from "./product.reducers";
import { categories } from "./category.reducers";
import { orders } from "./order.reducers";
import { users } from "./user.reducers";
import { districts } from "./district.reducers";
import { cities } from "./city.reducers";
import { permissions } from "./permission.reducers";
import { dashboard } from "./dashboard.reducers";
import { inputs } from "./input.reducers";

//Theme
import { themeConstants } from "../constants";
import { menuConstants } from "../constants";

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

export function menu(state = { expand: false }, action) {
  switch (action.type) {
    // Get Reducers
    case menuConstants.CHANGE_MENU:
      return {
        expand: action.toggle,
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
  dashboard,
  inputs,
  menu,
});

export default rootReducer;
