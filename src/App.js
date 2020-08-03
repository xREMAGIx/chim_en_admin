import React, { useEffect } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
// import AdminRoute from "./components/AdminRoute";
// import { useSelector, useDispatch } from "react-redux";
// import { userActions } from "./actions";
// import { ThemeProvider } from "@material-ui/core/styles";
import setAuthToken from "./store/setAuthToken";

//Containers
import Dashboard from "./containers/Dashboard";
//>>Product
import ProductList from "./containers/Product/ProductList";
import ProductAdd from "./containers/Product/ProductAdd";
//>>Category
import CategoryList from "./containers/Category/CategoryList";
//>>Order
import OrderList from "./containers/Order/OrderList";
import OrderEdit from "./containers/Order/OrderEdit";

import { lightTheme, darkTheme, history } from "./store";

import { ThemeProvider } from "@material-ui/core/styles";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  //Custom Hooks
  const [checked, setChecked] = React.useState(true);

  //Handle Functions
  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={checked ? lightTheme : darkTheme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            {/* Product */}
            <Route exact path="/products" component={ProductList}></Route>
            <Route exact path="/products-add" component={ProductAdd}></Route>
            {/* Category */}
            <Route exact path="/categories" component={CategoryList}></Route>
            {/* Order */}
            <Route exact path="/orders" component={OrderList}></Route>
            <Route exact path="/orders-edit" component={OrderEdit}></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
