import axios from "axios";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
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
  const [createProduct, setCreateProduct] = useState({
    departamento: "",
    MCL: "",
    barrio: "",
    direccion: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      swal({
        title: "Dirreción Añadida!",
        text: "Se ha añadido con exito!",
        icon: "success",
      });

      setTimeout(
        () => (document.location.href = "http://localhost:3000/home"),
        3000
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (e) => {
    setCreateProduct({
      ...createProduct,
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
          name="departamento"
          label="Departamento"
          isRequired="true"
          required
          defaultValue=""
          helperText="* Campo requerido"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-helperText"
          name="MCL"
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
          name="barrio"
          label="Barrio"
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
