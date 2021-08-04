import axios from "axios";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "./ProductCreation.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function ProductCreation() {
  const contentPC = useStyles();
  return (
    <div className="contentPC">
      <h2>Crear Nuevo Producto</h2>
      <form className={contentPC.root}>
        <TextField
          id="outlined-helperText"
          label="Nombre"
          defaultValue=""
          helperText="*"
          variant="outlined"
        />
        <TextField
          id="outlined-helperText"
          label="Categoria"
          defaultValue=""
          helperText="*"
          variant="outlined"
        />
        {/* <input type="text" placeholder="img" /> */}
        <TextField
          id="outlined-number"
          label="Precio"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-number"
          label="abv"
          type="number"
          min="1"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-number"
          label="ibu"
          type="number"
          min="1"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-number"
          label="Stock"
          type="number"
          min="1"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          width={300}
          id="outlined-multiline-static"
          label="Descripcion"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
        />
        <TextField
          id="outlined-number"
          label="Volumen"
          type="number"
          min="1"
          pattern="^[0-9]+"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-multiline-static"
          label="Otros"
          multiline
          rows={2}
          defaultValue=""
          variant="outlined"
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
