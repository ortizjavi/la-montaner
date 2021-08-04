import axios from "axios";
import React, { useState, useEffect, forwardRef } from "react";
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
  const [loadingImg, setLoadingImg] = useState(false);
  const [image, setImage] = useState([]);

  const [createProduct, setCreateProduct] = useState({
    name: "",
    category: {
      name: "",
    },
    img: [],
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
    try {
      /* await setCreateProduct({ ...createProduct, img: image }); */
      console.log(createProduct);
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
        <input
          type="file"
          placeholder="img"
          multiple={true}
          name="img"
          onChange={uploadImage}
        />
        {image &&
          image.map((i) => <img src={i} alt="" style={{ width: "300px" }} />)}
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
