import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import "./Address.css";
import { addAddress } from '../../redux/actions/types/productActions';


function getModalStyle() {
  const top = 20;
  const left = 25;

  return {
    top: `${top}%`,
    left: `${left}%`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    left: 100,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    alignContent: "center",
    "& .MuiTextField-root": {
      color: "#4caf50",
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  button: {
    color: "#fff",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "85%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  images: {
    display: "none",
  },
  add: {
    width: "auto",
    alignSelf: "center",
  },
  card: {
    maxWidth: 345,
  },
}));

export default function AddressModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle());
  const [open, setOpen] = React.useState(false);
  const usuario = useSelector((state) => state.session.user);
  const history = useHistory();


  const [address, setAddress] = useState({
    provincia: "",
    direccion: "",
    mcl: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAddress = `${address.provincia} - ${address.mcl} - ${address.direccion} `;
      if (!usuario.role) {
        swal({
          title: "Por favor inicia sesion",
          icon: "warning",
        });
        history.push("/login");
      } else {
        return dispatch(addAddress(newAddress));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  const contentPC = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Cargar Dirección
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.paper}>
      <h2>Añade tu dirección</h2>
      <form className={contentPC.root} onSubmit={handleSubmit}>
        <TextField
          id="outlined-helperText"
          name="provincia"
          label="Provincia"
          isRequired="true"
          required
          defaultValue=""
          helperText="* Campo requerido"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-helperText"
          name="mcl"
          label="Municipio, capital o localidad"
          isRequired="true"
          required
          defaultValue=""
          helperText="* Campo requerido"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-helperText"
          name="direccion"
          label="Dirección"
          isRequired="true"
          required
          defaultValue=""
          helperText="* Campo requerido"
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Enviar
        </Button>
      </form>
    </div>
      </Modal>
    </div>
  );
}