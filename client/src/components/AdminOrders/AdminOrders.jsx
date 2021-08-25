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
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrders, updateStatus, getUsers, getOrdersFilter, deleteOrder } from "../../redux/actions/types/adminActions";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import swal from "sweetalert";

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

function createData( Usuario,Direccion, Fecha, Precio, Pago, Estado, Orden, id, Eliminar) {
  return {
    Usuario,
    Direccion,
    Fecha,
    Precio,
    Pago,
    Estado,
    Orden,
    id,
    Eliminar
  };
}

function Row(props) {

  const dispatch = useDispatch();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
  const [estado, setEstado] = React.useState('');
  


  const handleChange = (event) => {
    setEstado(event.target.value);
    dispatch (updateStatus(row.id, event.target.value));
    dispatch(getOrders())
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "Estas seguro que quieres eliminar la orden?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("La orden fue eliminada", {
          icon: "success",
        });
        dispatch(deleteOrder(id))
        dispatch(getOrders());
        
      } else {
        return swal("La orden esta a salvo :)");
      }
    });
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
          {row.Usuario}
        </TableCell>
        <TableCell align="right">{row.Direccion}</TableCell>
        <TableCell align="right">{row.Fecha}</TableCell>
        <TableCell align="right">{row.Precio}</TableCell>
        <TableCell align="right">{row.Pago}</TableCell>
        <TableCell align="right">
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={row.Estado}
          onChange={handleChange}
        >
          <MenuItem value={'Creada'}>Creada</MenuItem>
          <MenuItem value={'Procesando'}>Procesando</MenuItem>
          <MenuItem value={'Cancelada'}>Cancelada</MenuItem>
          <MenuItem value={'Completa'}>Completa</MenuItem>
        </Select>
      </FormControl>
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={(e) => handleDelete(e, row.id)}
          ><DeleteForeverIcon/></IconButton>
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
                  {row.Orden?.map((historyRow) => (
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
  const classes = useRowStyles();

  const ordenes = useSelector((state) => state.admin.orders);
  const users = useSelector((state) => state.admin.users);
  const filtered = useSelector((state) => state.admin.filteredOrders);

  const [status, setStatus] = React.useState('Estado');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getUsers());
    dispatch(getOrdersFilter(status))
  }, [dispatch, status]);

  const rows = ordenes?.map((o) => {
    const usuario = users?.find(us => us._id === o.user);
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
    let address = o.address ? o.address : 'Retiro en el local'
    let name = usuario ? usuario.name : 'Rocio Juarez';
    return createData(
      name,
      address,
      o.createdAt.slice(0, 10),
      subtotal,
      o.payment,
      o.status,
      orden,
      o._id
    );
  });

  const rowsFilter = filtered?.map((o) => {
    const usuario = users?.find(us => us._id === o.user);
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
    let address = o.address ? o.address : 'Retiro en el local'
    let name = usuario ? usuario.name : 'Rocio Juarez';
    return createData(
      name,
      address,
      o.createdAt.slice(0, 10),
      subtotal,
      o.payment,
      o.status,
      orden,
      o._id
    );
  });

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }

  

  return (
    <div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <b>Usuario</b>
            </TableCell>
            <TableCell align="right">
              <b>Direccion</b>
            </TableCell>
            <TableCell align="center">
              <b>Fecha</b>
            </TableCell>
            <TableCell align="right">
              <b>Precio</b>
            </TableCell>
            <TableCell align="right">
              <b>Pago</b>
            </TableCell>
            <TableCell align="right">
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={status}
                onClick={(e) => handleStatus(e)}
              >
                <MenuItem value={'Estado'}>Estado</MenuItem>
                <MenuItem value={'Creada'}>Creada</MenuItem>
                <MenuItem value={'Procesando'}>Procesando</MenuItem>
                <MenuItem value={'Cancelada'}>Cancelada</MenuItem>
                <MenuItem value={'Completa'}>Completa</MenuItem>
              </Select>
            </FormControl>
            </TableCell>
            <TableCell align="center">
                <b>Eliminar</b>
            </TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {
            status === 'Estado' ?
          (rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
            <Row key={row.name} row={row} id={row.id}/>
          )))
        :
        (rowsFilter?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
          <Row key={row.name} row={row} id={row.id}/>
        )))
        }
        </TableBody>
      </Table>
    </TableContainer>
      {rows && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      </div>
  );
}
