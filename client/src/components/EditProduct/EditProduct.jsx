import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./EditProduct.css";
import swal from "sweetalert";
import {
  getProductDetail,
  updateProducts,
  clearProductDetail
} from "../../redux/actions/types/productActions";
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

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
  const productoId = useSelector((state) => state.root.productDetail);

  let state = {
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
    reviews:[]
  };

  if (productoId && productoId._id) {
    return (
      <EditProductChild producto={{ ...productoId }} defaultState={state} />
    );
  }

  return <div> No hay productos </div>;
}

const getProps = (producto) => {
  return {
    name: producto.name,
    categories: producto.categories.map((cat) => cat.name),
    img: producto.img,
    price: producto.price,
    stock: producto.stock,
    abv: producto.abv,
    ibu: producto.ibu,
    description: producto.description,
    volumen: producto.volumen,
    others: producto.others,
    reviews: producto.reviews,
  };
};

const StylesAccord = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function EditProductChild({ producto, defaultState }) {
  const [loadingImg, setLoadingImg] = useState(0);
  const [image, setImage] = useState([]);
  const [review, setReview] = useState([]);
  const allCategories = useSelector((state) => state.root.allCategories);
  const dispatch = useDispatch();


  const contentPC = useStyles();
  const classes = StylesAccord();

  const [createProduct, setCreateProduct] = useState(getProps(producto));

  useEffect(() => {
    setImage(producto.img);
    setReview(producto.reviews)
    return () => {
      dispatch(clearProductDetail());
      setCreateProduct(defaultState);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      swal({
        title: "Estas seguro que quieres editar este producto?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal(`${createProduct.name} fue editado!`, {
            icon: "success",
          });
          updateProducts(producto._id, {
            ...createProduct,
            categories: allCategories.filter((c) =>
              createProduct.categories.includes(c.name)
            ),
            img: image,
            reviews: review
          });
          setTimeout(
            () => (document.location.href = "http://localhost:3000/admin"),
            3000
          );
        } else {
          return swal("Tu producto esta a salvo :)");
        }
      });
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

    const axiosInstance = axios.create();
    delete axiosInstance.defaults.headers.common['authorization']

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      images.append("file", files[i]);
      console.log(i.name);
      images.append("upload_preset", "laMontanes");
      const instance = axios.create();
      delete instance.defaults.headers.common['authorization'];
      await instance
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
    e.preventDefault();
    setImage(image.filter((j) => j !== i));
  };

  const deleteReview = (e, r) => {
    e.preventDefault();
    setReview(review?.filter((j) => j !== r))
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
          placeholder={producto.name}
          defaultValue={createProduct.name}
          helperText="*"
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
              defaultValue={producto.categories}
              onChange={handleCategoryChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={contentPC.chips}>
                  {selected?.map((value) => (
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
              {allCategories?.map((i) => (
                <MenuItem
                  key={i.name}
                  value={i.name}
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
          {image &&
            image.map((i) => (
              <Card className={contentPC.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Imagen la Montañes"
                    height="140"
                    src={i}
                    key={i}
                  />
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => deleteImage(e, i)}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            ))}
        </div>
        <TextField
          id="outlined-number"
          label="Precio"
          helperText="* Campo requerido"
          name="price"
          placeholder={producto.price.toString()}
          defaultValue={createProduct.price}
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
          placeholder={producto.abv ? producto.abv.toString() : ""}
          defaultValue={createProduct.abv}
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
          placeholder={producto.ibu ? producto.ibu.toString() : ""}
          defaultValue={createProduct.ibu}
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
          placeholder={producto.stock.toString()}
          defaultValue={createProduct.stock}
          type="number"
          InputProps={{ inputProps: { min: 1, max: 999999999 } }}
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
          placeholder={producto.description}
          defaultValue={createProduct.description}
          multiline
          rows={4}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-number"
          label="Volumen"
          type="number"
          placeholder={producto.volumen.toString()}
          defaultValue={createProduct.volumen}
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
          placeholder={producto.others}
          defaultValue={createProduct.others}
          variant="outlined"
          onChange={handleInputChange}
        />
        {
          review?.map(r => (
        <div className={classes.root}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
          <div className={classes.column}>
            <Typography className={classes.heading}>{r.name}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography className={classes.heading}>{r.content}</Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button size="small" color="primary" onClick={(e) => deleteReview(e, r)}>
            Eliminar
          </Button>
        </AccordionActions>
      </Accordion>
        <Divider />
    </div>
          ))
        }
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
