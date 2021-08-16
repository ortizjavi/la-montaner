import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrders, updateStatus, getUsers } from "../../redux/actions/types/adminActions";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 150,
    textAlign: "left"
  },
}));

function createData(Detalle, Usuario, Fecha, Precio, Estado, Orden, id) {
  return {
    Detalle,
    Usuario,
    Fecha,
    Precio,
    Estado,
    Orden,
    id
  };
}

function Row(props) {

  const dispatch = useDispatch();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
  const [estado, setEstado] = React.useState(row.Estado);


  const handleChange = (event) => {
    event.preventDefault()
    setEstado(event.target.value);
    dispatch (updateStatus(row.id, event.target.value));
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Detalle}
        </TableCell>
        <TableCell align="right">{row.Fecha}</TableCell>
        <TableCell align="right">{row.Usuario}</TableCell>
        <TableCell align="right">{row.Precio}</TableCell>
        <TableCell align="right">
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={estado}
          onChange={handleChange}
        >
          <MenuItem value={'Creada'}>Creada</MenuItem>
          <MenuItem value={'Procesando'}>Procesando</MenuItem>
          <MenuItem value={'Cancelada'}>Cancelada</MenuItem>
          <MenuItem value={'Completa'}>Completa</MenuItem>
        </Select>
      </FormControl>
      </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Orden
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Producto</b>
                    </TableCell>
                    <TableCell>
                      <b>Precio</b>
                    </TableCell>
                    <TableCell>
                      <b>Cantidad</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Total($)</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Orden.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell>{historyRow.price}</TableCell>
                      <TableCell>{historyRow.stockSelected}</TableCell>
                      <TableCell align="center">
                        {historyRow.stockSelected * historyRow.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number,
    carbs: PropTypes.number,
    fat: PropTypes.number,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    estado: PropTypes.string.isRequired
  }).isRequired,
};

export default function OrdersAdmin() {
  const dispatch = useDispatch();

  const ordenes = useSelector((state) => state.admin.orders);
  const users = useSelector((state) => state.admin.users);
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getUsers());
  }, [dispatch]);
  console.log(ordenes);
  const rows = ordenes?.map((o) => {
    console.log(users);
    const usuario = users?.find(us => us._id === o.user);
    console.log(usuario);
    let subtotal = 0;
    o.cart.forEach((i) => {
      subtotal += i.price * i.stockSelected;
    });
    let orden = o.cart.map((i) => {
      return {
        date: o.createdAt,
        name: i.name,
        price: i.price,
        stockSelected: i.stockSelected,
      };
    });
    let name = usuario ? usuario.name : 'Rocio Juarez';
    return createData(
      o.cart[0].name,
      o.createdAt.slice(0, 10),
      name,
      subtotal,
      o.status,
      orden,
      o._id
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <b>Detalle</b>
            </TableCell>
            <TableCell align="right">
              <b>Usuario</b>
            </TableCell>
            <TableCell align="right">
              <b>Fecha</b>
            </TableCell>
            <TableCell align="right">
              <b>Precio</b>
            </TableCell>
            <TableCell align="right">
              <b>Estado</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <Row key={row.name} row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
