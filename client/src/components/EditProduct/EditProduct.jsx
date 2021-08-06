import axios from "axios";
import React, { useState, useEffect, forwardRef } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./EditProduct.css";
import {getProductDetail, updateProducts} from '../../actions/types/productActions'

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
}));
const Input = styled("input")({
  display: "none",
});
export default function EditProduct(props) {

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id)
  const productoId = useSelector((state) => state.productDetail);
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id, dispatch])

  const [loadingImg, setLoadingImg] = useState(false);
  const [image, setImage] = useState([]);

  const [updateProduct, setUpdateProduct] = useState({
    name: '',
    category: {
      name: "",
    },
    img: [],
    price: '',
    stock: '',
    abv: '',
    ibu: '',
    description: "",
    volumen: 0,
    others: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProducts(id, {
      ...updateProduct,
      img:image
    })) 
  };
  const handleInputChange = (e) => {
    setUpdateProduct({
      ...updateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleCategoryChange = (e) => {
    setUpdateProduct({
      ...updateProduct,
      category: {
        name: e.target.value,
      },
    });
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
        })
        .catch((err) => console.log(err));
    }
    console.log(image);
    /* files.map((i) => {
    }); */
    setLoadingImg(true);

    setLoadingImg(false);
  };

  return (
    <div className="contentPC">
      <Link to="/home">
        {" "}
        <button>Home</button>{" "}
      </Link>
      <h2>Edita tu producto</h2>
      <form className={contentPC.root} onSubmit={handleSubmit}>
        <TextField
          id="outlined-helperText"
          name="name" 
          placeholder="Nombre"
          defaultValue={productoId.name}
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
        <div className="images">
          <label htmlFor="contained-button-file" color="primary">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
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
          {image && image.map((i) => <img src={i} alt="" />)}
        </div>

        <TextField
          id="outlined-number"
          label="Precio"
          defaultValue= {productoId.price}
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
          value= {productoId.abv}
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
          value= {productoId.ibu}
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
          value= {productoId.stock}
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
          placeholder="Descripcion"
          value= {productoId.description}
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
          value= {productoId.volumen}
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
          placeholder="Otros"
          name="others"
          value= {productoId.others}
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
