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
import Wishlist from '../components/Wishlist/Wishlist';
import Success from "../components/PayState/Success";
import Pending from "../components/PayState/Pending";
import Failure from "../components/PayState/Failure";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import LoginForm from "../components/ModalDialog/LoginForm";
import Footer from '../components/Footer/Footer';
import SideBarAdmin from "../components/Dashboard/SideBarAdmin";
import CardsAdmin from "../components/CardsAdmin/CardsAdmin";
import AboutPage from '../components/About/About';

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

const ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
};

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
            path='/admin' 
            component={SideBarAdmin} 
            roles={[ROLE.ADMIN]}
          />
          <Route
            exact
            path="/admin/productCreation"
            component={ProductCreation}
          />
          <Route exact path="/admin/tarjetas" component={CardsAdmin} />

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
        </Switch>
        {
          location.pathname !== '/'  && 
          !location.pathname.startsWith('/admin') ?
        <>
        <NavBar/>
          <div className="main-container">
             <Route exact path="/home" component={Home} />
             <PrivateRoute 
               exact 
               path='/dashboard' 
               component={Dashboard} 
               roles={[ROLE.USER]}
             />
             <Route
               exact
               path="/login"
               component={LoginForm}
             />
             <Route exact path="/home/:id" component={ProductDetail} />
             <Route exact path="/cart" component={Cart} />
             <Route exact path="/wishlist" component={Wishlist} />
           </div>
         <Footer/>
         </>
          : null
        }
        {location.pathname !== "/" &&
        !location.pathname.startsWith("/admin") ? (
          <Footer />
        ) : null}
      </div>
    </ThemeProvider>
  );
}