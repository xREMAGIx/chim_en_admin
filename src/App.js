import React, { useEffect } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";

//Authority
import AdminRoute from "./components/AdminRoute";
import setAuthToken from "./store/setAuthToken";

//Containers
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
//>>Product
import ProductList from "./containers/Product/ProductList";
import ProductAdd from "./containers/Product/ProductAdd";
import ProductEdit from "./containers/Product/ProductEdit";
//>>Category
import CategoryList from "./containers/Category/CategoryList";
//>>Order
import OrderList from "./containers/Order/OrderList";
import OrderEdit from "./containers/Order/OrderEdit";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./actions";

//Theme
import { lightTheme, darkTheme, history } from "./store";
import { ThemeProvider } from "@material-ui/core/styles";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  //Theme Hooks
  const [checked, setChecked] = React.useState(true);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getMe());
  }, [dispatch]);

  return (
    <React.Fragment>
      <ThemeProvider theme={checked ? lightTheme : darkTheme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login}></Route>

            <AdminRoute exact path="/" component={Dashboard}></AdminRoute>

            {/* Product */}
            <AdminRoute
              exact
              path="/products"
              component={ProductList}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/products-add"
              component={ProductAdd}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/products-edit/:id"
              component={ProductEdit}
            ></AdminRoute>

            {/* Category */}
            <AdminRoute
              exact
              path="/categories"
              component={CategoryList}
            ></AdminRoute>
            {/* Order */}
            <AdminRoute exact path="/orders" component={OrderList}></AdminRoute>
            <AdminRoute
              exact
              path="/orders-edit/:id"
              component={OrderEdit}
            ></AdminRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
