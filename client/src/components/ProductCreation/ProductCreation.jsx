import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
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
}));
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};
export default function ProductCreation() {
  const [addCategory, setAddCategory] = useState(false);
  const [loadingImg, setLoadingImg] = useState(0);
  const theme = useTheme();
  const [image, setImage] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
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
  const addNewCategory = async () => {
    setAddCategory(!addCategory);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newCategory.length > 0) {
        let postC = await axios.post("http://localhost:3001/admin/category", {
          name: newCategory,
        });
        createProduct.categories.push(newCategory);
        console.log(postC);
      }
      /* await setCreateProduct({ ...createProduct, img: image }); */
      let post = await axios.post("http://localhost:3001/admin/product", {
        ...createProduct,
        categories: allCategories.filter(c => createProduct.categories.includes(c.name)),
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
  const handleInputCategory = (e) => {
    setNewCategory(e.target.value);
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
          images,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress(e) {
              setLoadingImg(Math.round((e.loaded * 100) / e.total));
            },
          }
        )
        .then((res) => {
          setLoadingImg(0);
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
      <form className={contentPC.root}>
        <TextField
          id="outlined-helperText"
          name="name"
          label="Nombre"
          defaultValue=""
          helperText="*"
          variant="outlined"
          onChange={handleInputChange}
        />
        <div className="categoryContent">
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
                    <Chip
                      key={value}
                      label={value}
                      className={contentPC.chip}
                    />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {allCategories.map((i) => (
                <MenuItem
                  key={i.name}
                  value={i.name}
                  tyle={getStyles(i.name, createProduct.categories, theme)}
                >
                  {i.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            className={contentPC.add}
            onClick={addNewCategory}
          >
            <AddIcon />
          </Button>
          {addCategory && (
            <TextField
              id="outlined-helperText"
              label="Categoria"
              name="category"
              defaultValue=""
              helperText="*"
              variant="outlined"
              onChange={handleInputCategory}
            />
          )}
        </div>
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
          {loadingImg > 0 && (
            <LinearProgress
              variant="determinate"
              value={loadingImg}
              className="progressBar"
            />
          )}
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Crear
        </Button>
      </form>
    </div>
  );
}
