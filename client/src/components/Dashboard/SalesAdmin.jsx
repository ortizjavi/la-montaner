import "date-fns";
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { deleteSale, getSales, newSale } from "../../redux/actions/types/adminActions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import swal from "sweetalert";
import InfiniteCalendar, {
  Calendar,
  withRange,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Modal from "@material-ui/core/Modal";



const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  margin: {
    height: theme.spacing(3),
  },
  rootInput: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  div: {
    width: "95%",
    margin: "30px 40px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 20,
    label: "20%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 100,
    label: "100%",
  },
];
function valuetext(value) {
  return `${value}%`;
}

function createData(fecha, precioBase, descuento, id) {
  return { fecha, precioBase, descuento, id };
}

function getModalStyle() {
  const top = 15;
  const left = 25;

  return {
    top: `${top}%`,
    left: `${left}%`,
  };
}

export default function SalesAdmin() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState({
    start:Date(),
    end: Date(),
  });

  const [selectedDate2, setSelectedDate2] = React.useState({
    start:Date(),
    end: Date(),
  });
  const [sale, setSale] = React.useState({
    price: 0,
    discount: 0,
  });
  const [modalStyle] = React.useState(getModalStyle());
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const CalendarWithRange = withRange(Calendar);

  
  useEffect(() => {
    dispatch(getSales())
  }, [dispatch])
  
  const sales = useSelector(state => state.cart.sales)

  const rows = sales?.map(s =>{ 
    const date = s.date ? s.date : 'Sin Fecha Especial'
    return createData(date, s.price, s.discount, s._id)
    })

  const handleChangeState = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };
  const handleChangeDiscount = (e, value) => {
    setSale({ ...sale, discount: value });
  };

  const handleSale = () => {
    try {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      console.log(selectedDate)
      console.log(selectedDate2)
      /* if(addDate){
        const date = selectedDate.toLocaleDateString(undefined, options);
        const newSales = {
          ...sale,
          date: date,
        };
        dispatch(newSale(newSales));
        swal("Genial!", "El descuento fue creado!", "success");  */
      /* } else {
        dispatch(newSale(sale));
        swal("Genial!", "El descuento fue creado!", "success");
      } */
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "Estas seguro que quieres eliminar el descuento?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("El descuento fue eliminado", {
          icon: "success",
        });
        dispatch(deleteSale(id))
        dispatch(getSales());
        
      } else {
        return swal("El descuento esta a salvo :)");
      }
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const onCalendarSelect = (e) => {
   if (e.eventType === 3)  {
      setSelectedDate({
            start: e.start,
            end: e.end,
        });
    }
  }

const onCalendarSelect2 = (e) => {
     setSelectedDate2({
           start: e});
}

const body = (
  <div style={modalStyle} className={classes.paper}>
    <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    handleOpen
                  }
                  size="large"
                >
                  Rango de Fechas
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                <InfiniteCalendar
                style={modalStyle}  
                className={classes.paper}
                min={new Date()}
                minDate={new Date()}
                Component={CalendarWithRange}
                selected={selectedDate}
                locale={{
                  headerFormat: 'MMM Do',
                }}
                onSelect={onCalendarSelect}
              />
              </Modal>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    handleOpen2
                  }
                  size="large"
                >
                  Fecha Especial
                </Button>
                <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                <InfiniteCalendar
                  min={new Date()} 
                  minDate={new Date()} 
                  selected={selectedDate2.start}
                  onSelect={onCalendarSelect2}
                />
              </Modal>
  </div>
);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.div}>
        <Paper className={classes.paper}>
          <Grid justifyContent="space-evenly" container spacing={3}>
            <Grid item xs={6}>
              <h2>Crea tu Descuento!</h2>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSale}
                size="large"
              >
                Crear
              </Button>
            </Grid>
            <Grid item xs={3}>
            <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    handleOpen3
                  }
                  size="large"
                >
                  Fechas Especiales
                </Button>
                <Modal
                  open={open3}
                  onClose={handleClose3}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                  </Modal>
            {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    handleOpen
                  }
                  size="large"
                >
                  Rango de Fechas
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                <InfiniteCalendar
                style={modalStyle}  
                className={classes.paper}
                min={new Date()}
                minDate={new Date()}
                Component={CalendarWithRange}
                selected={selectedDate}
                locale={{
                  headerFormat: 'MMM Do',
                }}
                onSelect={onCalendarSelect}
              />
              </Modal>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    handleOpen2
                  }
                  size="large"
                >
                  Fecha Especial
                </Button>
                <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                <InfiniteCalendar
                  min={new Date()} 
                  minDate={new Date()} 
                  selected={selectedDate2.start}
                  onSelect={onCalendarSelect2}
                />
              </Modal> */}
            </Grid>
            <Grid item xs={3}>
              <form className={classes.rootInput} noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Precio Base"
                  variant="outlined"
                  type="number"
                  name="price"
                  onChange={handleChangeState}
                  InputProps={{ inputProps: { min: 0, max: 99999 } }}
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.root}>
                <Typography id="discrete-slider-custom" gutterBottom>
                  Porcentaje de Descuento
                </Typography>
                <Slider
                  defaultValue={20}
                  name="discount"
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-custom"
                  onChange={handleChangeDiscount}
                  value={sale.discount}
                  step={5}
                  valueLabelDisplay="auto"
                  marks={marks}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <Paper>
      <TableContainer component={Paper}>
        <h2 align="center">Descuentos:</h2>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell><b>Fecha de descuento</b></TableCell>
            <TableCell align="right"><b>Precio Base($)</b></TableCell>
            <TableCell align="right"><b>Descuento(%)</b></TableCell>
            <TableCell align="right"><b>Eliminar</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.fecha}
              </TableCell>
              <TableCell align="right">${row.precioBase}</TableCell>
              <TableCell align="right">{row.descuento}%</TableCell>
              <TableCell align="right">
                <IconButton
                 onClick={(e) => handleDelete(e, row.id)}
                ><DeleteForeverIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </MuiPickersUtilsProvider>
  );
}
