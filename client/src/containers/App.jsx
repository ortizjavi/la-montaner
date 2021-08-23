import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
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
import DashboardAdmin from "../components/Dashboard/DashboardAdmin";
import EditProduct from "../components/EditProduct/EditProduct";
import NavBar from "../components/Navbar/NavBar";
import Cart from "../components/Cart/Cart";
import Wishlist from "../components/Wishlist/Wishlist";
import PayState from "../components/PayState/PayState";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";
import LoginForm from "../components/LoginRegister/LoginForm";
import Footer from "../components/Footer/Footer";
import SideBarAdmin from "../components/Dashboard/SideBarAdmin";
import AboutPage from "../components/About/About";
import Accordion from "../components/About/FAQ";
import RegisterForm from "../components/LoginRegister/RegisterForm";
import ResetForm from "../components/LoginRegister/ResetForm";
import PasswordRecovery from "../components/LoginRegister/PasswordRecovery";
import UserSetting from "../components/UserSetting/UserSetting";
import { ROLE } from "../utils/constants";
import Address from "../components/Address/Address";

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
  const location = useLocation();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="body-container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute
            exact
            path="/admin"
            component={SideBarAdmin}
            roles={[ROLE.ADMIN]}
          />
          <PrivateRoute
            exact
            path="/admin/productCreation"
            component={ProductCreation}
            roles={[ROLE.ADMIN]}
          />
          <PrivateRoute
            exact
            path="/admin/editProduct/:id"
            component={EditProduct}
            roles={[ROLE.ADMIN]}
          />
          <PrivateRoute
            exact
            path="/admin/categoryCreation"
            component={CategoryCreation}
            roles={[ROLE.ADMIN]}
          />
        </Switch>
        {location.pathname !== "/" &&
        !location.pathname.startsWith("/admin") ? (
          <>
            <NavBar />
            <div className="main-container">
              <Route exact path="/home" component={Home} />
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
                roles={[ROLE.USER]}
              />
              <PrivateRoute
                exact
                path="/dashboard/setting"
                component={UserSetting}
                roles={[ROLE.USER]}
              />
              <PrivateRoute
                exact
                path="/reset"
                component={ResetForm}
                roles={[ROLE.USER]}
              />
               <PublicRoute
                exact
                path="/pass"
                component={PasswordRecovery}
                roles={[ROLE.USER]}
              />
              <Route exact path="/home/products/pay" component={Pay} />
              <Route exact path="/home/pay/:status" component={PayState} />
              <PublicRoute exact path="/login" component={LoginForm} />
              <PublicRoute exact path="/register" component={RegisterForm} />
              <Route exact path="/home/:id" component={ProductDetail} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/wishlist" component={Wishlist} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/add/address" component={Address} />
              <Route exact path="/faq" component={Accordion} />
            </div>
            <Footer />
          </>
        ) : null}
      </div>
    </ThemeProvider>
  );
}
