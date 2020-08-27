//Theme
import { themeConstants } from "../constants";
import { menuConstants } from "../constants";

export * from "./product.actions";
export * from "./category.actions";
export * from "./order.actions";
export * from "./user.actions";
export * from "./district.actions";
export * from "./city.actions";
export * from "./permission.actions";
export * from "./dashboard.actions";
export * from "./input.actions";

//Theme
export const themeActions = {
  changeDarkTheme,
};

function changeDarkTheme(toggle) {
  return (dispatch) => {
    dispatch({ type: themeConstants.CHANGE_THEME, toggle });
  };
}

//Menu
export const menuActions = {
  changeMenu,
};

function changeMenu(toggle) {
  return (dispatch) => {
    dispatch({ type: menuConstants.CHANGE_MENU, toggle });
  };
}
