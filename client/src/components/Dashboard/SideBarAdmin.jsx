import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StoreIcon from "@material-ui/icons/Store";
import { IoBeer } from "react-icons/io5";
import CategoryIcon from "@material-ui/icons/Category";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import Dashboard from "./DashboardAdmin";
import CategoryCreator from "../CategoryCreation/CategoryCreation";
import OrdersAdmin from "../AdminOrders/AdminOrders";
import UsersTable from "../UsersTable/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, getOrders, getUsers } from "../../redux/actions/types/adminActions";
import { getCategories } from "../../redux/actions/types/categoryActions";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
//import SalesAdmin from "./SalesAdmin";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SideBarAdmin() {

  const dispatch = useDispatch()
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [button, setButton] = React.useState("");

  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(getOrders())
    dispatch(getUsers())
  }, [dispatch])

  const productos = useSelector(state => state.root.adminProducts)
  const categorias = useSelector(state => state.root.allCategories)
  const orders = useSelector((state) => state.admin.orders);
  const users = useSelector((state) => state.admin.users); 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleButton = (e, value) => {
    e.preventDefault();
    setButton(value);
    console.log(value);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          {!open && (
            <IconButton>
              <Link to="/home">
                <img
                  src="https://i.ibb.co/QJXf6C3/la-montaner.png"
                  alt="La Montanes"
                />
              </Link>
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            La Montañes
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton>
            <Link to="/home">
              <img
                src="https://i.ibb.co/QJXf6C3/la-montaner.png"
                alt="La Montanes"
              />
            </Link>
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <IconButton
                onClick={(e) => handleButton(e, "productos")}
                value="productos"
              >
                <IoBeer className="beer" />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconButton
                className="iconSB"
                onClick={(e) => handleButton(e, "categorias")}
                value="categorias"
              >
                <CategoryIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconButton
                className="iconSB"
                onClick={(e) => handleButton(e, "ordenes")}
                value="ordenes"
              >
                <StoreIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconButton className="iconSB">
                <AccountCircleIcon
                  onClick={(e) => handleButton(e, "usuarios")}
                  value="usuarios"
                />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconButton className="iconSB">
                <LocalOfferIcon
                  onClick={(e) => handleButton(e, "descuentos")}
                  value="descuentos"
                />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Descuentos" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {button === "productos" ? (
          <Dashboard />
        ) : button === "categorias" ? (
          <CategoryCreator />
        ) : button === "ordenes" ? (
          <OrdersAdmin />
        ) : button === "usuarios" ? (
          <UsersTable />
        ) /* : button === 'descuentos' ? (
          <SalesAdmin/>
        ) */:(
          <div className="cardsAdmin">
            <div onClick={(e) => handleButton(e, "productos")}>
              <IoBeer />
              <h2>{productos?.length}</h2> 
              <h3>Productos</h3>
            </div>
            <div onClick={(e) => handleButton(e, "categorias")}>
              <CategoryIcon />
              <h2>{categorias?.length}</h2>
              <h3>Categorias</h3>
            </div>
            <div onClick={(e) => handleButton(e, "ordenes")}>
              <StoreIcon />
              <h2>{orders?.length}</h2>
              <h3>Ordenes</h3>
            </div>
            <div onClick={(e) => handleButton(e, "usuarios")}>
              <AccountCircleIcon />
              <h2>{users?.length}</h2>
              <h3>Usuarios</h3>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
