import { orderStatus } from "../../redux/actions/types/productActions";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import "./Address.css";

const useStyles = makeStyles((theme) => ({
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
export default function Address() {
  const usuario = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState({
    provincia: "",
    direccion: "",
    mcl: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAddress = `${address.provincia}-${address.mcl}-${address.direccion}`;
      if (!usuario.role) {
        swal({
          title: "Por favor inicia sesion",
          icon: "warning",
        });
        history.push("/login");
      } else {
        dispatch(orderStatus(cart, usuario._id, newAddress));
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

  return (
    <div className="contentPC">
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
  );
}
