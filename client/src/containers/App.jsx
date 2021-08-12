import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { getCategories } from "../redux/actions/types/categoryActions.js";
import Home from "../components/Home/Home";
import Landing from "../components/Landing/Landing";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import ProductCreation from "../components/ProductCreation/ProductCreation";
import CategoryCreation from "../components/CategoryCreation/CategoryCreation";
import Pay from "../components/Pay/Pay";
import Dashboard from "../components/Dashboard/Dashboard";
import EditProduct from "../components/EditProduct/EditProduct";
import NavBar from "../components/Navbar/NavBar";
import Cart from "../components/Cart/Cart";
import Success from "../components/PayState/Success";
import Pending from "../components/PayState/Pending";
import Failure from "../components/PayState/Failure";
import PrivateRoute from '../components/PrivateRoute/PrivateRoute' 

const theme = createTheme({
  palette: {
    primary: {
      light: "#388e3c",
      main: "#047e28",
      dark: "#33691e",
      contrastText: "#fff",
    },
    secondary: {
      light: "#008037",
      main: "#022E1A",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
  },
});

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" component={NavBar} />
        <Switch>
          <PrivateRoute 
            exact 
            path='/dashboard' 
            component={Dashboard} 
            roles={['ADMIN']}
          />
          {/*<Route exact path="/dashboard" component={Dashboard}></Route>*/}
          <Route
            exact
            path="/admin/productCreation"
            component={ProductCreation}
          />
          <Route exact path="/admin/editProduct/:id" component={EditProduct} />
          <Route exact path="/home/products/pay" component={Pay} />
          <Route exact path="/home/pay/success" component={Success} />
          <Route exact path="/home/pay/pending" component={Pending} />
          <Route exact path="/home/pay/failure" component={Failure} />
          <Route
            exact
            path="/admin/categoryCreation"
            component={CategoryCreation}
          />
          <Route exact path="/home/:id" component={ProductDetail} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}
