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
  const [createProduct, setCreateProduct] = useState({
    name: "",
    category: {
      name: "",
    },
    img: "https://misanimales.com/wp-content/uploads/2018/04/mangosta-alimentacion.jpg",
    price: 0,
    stock: 0,
    abv: 0,
    ibu: 0,
    description: "",
    volumen: 0,
    others: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(createProduct);
    try {
      let post = await axios.post(
        "http://localhost:3001/admin/add",
        createProduct
      );
      console.log(post);
      /* setTimeout(() => (document.location.href = HOME), 1000); */
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
  const handleCategoryChange = (e) => {
    setCreateProduct({
      ...createProduct,
      category: {
        name: e.target.value,
      },
    });
  };
  const contentPC = useStyles();
  return (
    <div className="contentPC">
      <h2>Crear Nuevo Producto</h2>
      <form className={contentPC.root} onSubmit={handleSubmit}>
        <TextField
          id="outlined-helperText"
          name="name"
          label="Nombre"
          defaultValue=""
          helperText="*"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-helperText"
          label="Categoria"
          name="category"
          defaultValue=""
          helperText="*"
          variant="outlined"
          onChange={handleCategoryChange}
        />
        {/* <input type="text" placeholder="img" /> */}
        <TextField
          id="outlined-number"
          label="Precio"
          name="price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-number"
          label="abv"
          name="abv"
          type="number"
          min="1"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-number"
          label="ibu"
          type="number"
          name="ibu"
          min="1"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-number"
          label="Stock"
          type="number"
          name="stock"
          min="1"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          width={300}
          id="outlined-multiline-static"
          label="Descripcion"
          name="description"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-number"
          label="Volumen"
          type="number"
          name="volumen"
          min="1"
          pattern="^[0-9]+"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-multiline-static"
          label="Otros"
          name="others"
          multiline
          rows={2}
          defaultValue=""
          variant="outlined"
          onChange={handleInputChange}
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
