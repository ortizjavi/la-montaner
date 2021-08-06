import axios from "axios";
import React, { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import "./ProductCreation.css";


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
    width: "100%",
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
}));
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};
export default function ProductCreation() {

  const [loadingImg, setLoadingImg] = useState(false);
  const theme = useTheme();
  const [image, setImage] = useState([]);
  const allCategories = useSelector((state) => state.allCategories);
  const [createProduct, setCreateProduct] = useState({
    name: "",
    categories: [],
    img: [],
    price: 0,
    stock: 0,
    abv: 0,
    ibu: 0,
    description: "",
    volumen: 0,
    others: "",
  });
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /* await setCreateProduct({ ...createProduct, img: image }); */
      let post = await axios.post("http://localhost:3001/admin/product", {
        ...createProduct,
        img: image,
      });
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
      categories: e.target.value,
    });
    console.log(createProduct.categories);
  };
  const contentPC = useStyles();

  const uploadImage = async (e) => {
    const files = e.target.files;
    const images = new FormData();
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      images.append("file", files[i]);
      console.log(i.name);
      images.append("upload_preset", "laMontanes");
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/la-montanes/image/upload",
          images
        )
        .then((res) => {
          setImage((imgs) => [...imgs, res.data.secure_url]);
          console.log(res.data.secure_url);
          console.log(image);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="contentPC">
      <Link to="/home">
        {" "}
        <button>Home</button>{" "}
      </Link>
      <h2>Crear Nuevo Producto</h2>
      <form className={contentPC.root} onSubmit={handleSubmit}>
        {/* <TextField
          id="outlined-helperText"
          label="Categoria"
          name="category"
          defaultValue=""
          helperText="*"
          variant="outlined"
          onChange={handleCategoryChange}
        /> */}
        <FormControl className={contentPC.formControl}>
          <InputLabel id="demo-mutiple-chip-label">Categorias</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={createProduct.categories}
            onChange={handleCategoryChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={contentPC.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={contentPC.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {allCategories.map((i) => (
              <MenuItem
                key={i._id}
                value={i.name}
                tyle={getStyles(i.name, createProduct.categories, theme)}
              >
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-helperText"
          name="name"
          label="Nombre"
          defaultValue=""
          helperText="*"
          variant="outlined"
          onChange={handleInputChange}
        />
        <div className="images">
          <label htmlFor="contained-button-file" color="primary">
            <Input
              className={contentPC.images}
              accept="image/*"
              id="contained-button-file"
              inputProps={{ multiple: true }}
              type="file"
              onChange={uploadImage}
            />
            <Button
              variant="contained"
              component="span"
              className={contentPC.button}
              color="primary"
            >
              Sube tus imagenes
            </Button>
          </label>
          {image && image.map((i) => <img key={i} src={i} alt="" />)}
        </div>

        <TextField
          id="outlined-number"
          label="Precio"
          name="price"
          InputProps={{ inputProps: { min: 0, max: 999999999 } }}
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
          InputProps={{ inputProps: { min: 0, max: 100 } }}
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
          InputProps={{ inputProps: { min: 0, max: 100 } }}
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
          InputProps={{ inputProps: { min: 0, max: 999999999 } }}
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
          InputProps={{ inputProps: { min: 0, max: 99999 } }}
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
        <Button variant="contained" color="primary" type="submit">
          Crear
        </Button>
      </form>
    </div>
  );
}
