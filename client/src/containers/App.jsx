import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch } from "react-redux";
import Home from "../components/Home/Home";
import Landing from "../components/Landing/Landing";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import ProductCreation from "../components/ProductCreation/ProductCreation";
import CategoryCreation from "../components/CategoryCreation/CategoryCreation";
import { getCategories } from "../actions/types/categoryActions.js";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Dashboard } from "../components/DashboardAdmin/Dashboard";
import EditProduct from "../components/EditProduct/EditProduct";
import NavBar from "../components/Navbar/NavBar";

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
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id" component={NavBar} />
      <Switch>
        <ThemeProvider theme={theme}>
        <Route exact path="/admin" component={Dashboard}></Route>
        <Route
          exact
          path="/admin/productCreation"
          component={ProductCreation}
        />
        <Route
          exact
          path="/admin/editProduct/:id"
          component={EditProduct}
        />
        <Route
          exact
          path="/admin/categoryCreation"
          component={CategoryCreation}
        />
        </ThemeProvider>
        <Route exact path="/home/:id" component={ProductDetail} />
      </Switch>
    </div>
  );
}
