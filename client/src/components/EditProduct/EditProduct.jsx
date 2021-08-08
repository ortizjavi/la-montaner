import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./EditProduct.css";
import {
  getProductDetail,
  updateProducts,
} from "../../actions/types/productActions";

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
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};
export default function EditProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id, dispatch]);
  const productoId = useSelector((state) => state.productDetail);

  useEffect(() => {
    if(productoId && productoId.hasOwnProperty('categories')) {
      setCreateProduct({ 
        ...productoId,
        categories: productoId.categories.map(c => c.name)
      } )
      setImage(img)
    }
  }, [productoId, dispatch])
  

  const [loadingImg, setLoadingImg] = useState(0);
  const theme = useTheme();
  const [image, setImage] = useState([]);
  const allCategories = useSelector((state) => state.allCategories);

  const contentPC = useStyles();

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
  if(!productoId){return <div>Buscando producto...</div>}
  
  let { img, categories } = productoId; 

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
    console.log('CLICK!!!');
    /* categories: allCategories.filter(c => createProduct.categories.includes(c.name)), */
    try {
      await axios.put('http://localhost:3001/admin/product/'+id,{
        ...createProduct,
        img: image
      })
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
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteImage = (e, i) => {
    e.preventDefault()
    setImage(image.filter(j => j !== i))
  }

  return (
    <div className="contentPC">
      <Link to="/home">
        {" "}
        <button>Home</button>{" "}
      </Link>
      <h2>Editar Producto</h2>
      <form className={contentPC.root} noValidate autoComplete="off">
        <TextField
          id="outlined-helperText"
          name="name"
          label="Nombre"
          defaultValue={productoId.name}
          helperText="* Campo requerido"
          variant="outlined"
          onChange={handleInputChange}
        />
        <div className="categoryContent">
          <FormControl className={contentPC.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Categorias</InputLabel>
            <Select
              multiple
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              value={createProduct.categories}
              defaultValue={categories}
              helperText="* Campo requerido"
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
        </div>
        <div className="images">
          <label htmlFor="contained-button-file" color="primary">
            <Input
              className={contentPC.images}
              accept="image/*"
              id="contained-button-file"
              inputProps={{ multiple: true }}
              type="file"
              helperText="* Campo requerido"
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
          {
            image && image.map((i) => 
          <Card className={contentPC.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Imagen la Montañes"
                height="140"
                src={i}
                key= {i}
              />
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary" onClick={(e)=> deleteImage(e,i)}>
              Eliminar
              </Button>
            </CardActions>
         </Card>)}
        </div>
        <TextField
          id="outlined-number"
          label="Precio"
          helperText="* Campo requerido"
          name="price"
          placeholder={productoId.price}
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
          placeholder={productoId.abv}
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
          placeholder={productoId.ibu}
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
          placeholder={productoId.stock}
          helperText="* Campo requerido"
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
          //label="Descripcion"
          name="description"
          helperText="* Campo requerido"
          defaultValue={productoId.description}
          multiline
          rows={4}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-number"
          label="Volumen"
          type="number"
          placeholder={productoId.volumen}
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
          placeholder={productoId.others}
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Editar
        </Button>
      </form>
    </div>
  );
}
