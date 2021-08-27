import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading.js";
import "./ShowProducts.css";
import swal from "sweetalert";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addCartProduct, addFavProducts,removeFavProduct } from "../../redux/actions/types/productActions";


const ShowProducts = ({allProducts}) => {

  const dispatch = useDispatch();

  const articlesPerPage=8;
  const diff = articlesPerPage - allProducts[0]%articlesPerPage;

  let currentUser = useSelector((state) => state.session.user);
  let usuario = Object.entries(currentUser);

  let wishlist = useSelector((state) => state.wishlist);
  let { wishlistItems } = wishlist;
  const fav = wishlistItems.map((product) => product.id);


  if(diff && allProducts[1].length<8){
    for(let i = 0; i < diff; i++){
      allProducts[1].push({
        _id: i,
        img: [],
        name: "Producto en Proceso de Creación",
        noExist: true,
      });
    }
  }

  function validaURLs(url) {
    var re =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/;
    return re.test(url);
  }

  const addToCartHandler  = (id) => {
    swal({
      title: "Producto agregado al carrito",
      icon: "success",
      button: "ok",
    });
    dispatch(addCartProduct(id, "1"));
  };

  const handleAddFav = (id) => {
    dispatch(addFavProducts(id));
  };

  const handleRemoveFav = (id) => {
    dispatch(removeFavProduct(id));
  };

  const handleWishlist = () => {
    swal({
      title: 'Para Agregar a Favoritos Por favor inicia sesión',
      icon: 'warning',
    });
  };

  return (
    <>
      {allProducts.length ? (
        allProducts[0] > 0 ? (
          <>
            {allProducts[1].map((item) => (
              <>
                {item.noExist ? (
                  <div className="sp-product_container" key={item._id}>
      
                    <div>
                      <div className="image_contain">
                        <img
                          className="item_image"
                          style={{ opacity: 0.1 }}
                          src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="sp-link sp-name">
                      <h5 className="link-name">
                        Producto en Proceso de Creación
                      </h5>
                      <hr></hr>
                    </div>
                  </div>
                ) : (
                  <div className="sp-product_container" key={item._id}>
                    {/* <FavoriteBorderIcon
                  onClick={() => handleAddFav(item._id)}
                  className="sp-detail_fav"
                    /> */}
                    {!usuario || usuario.length === 0 ? (
                      <NavLink to="/login" className="sp-detail_fav">
                        <FavoriteBorderIcon
                          onClick={() => handleWishlist()}
                          className="sp-detail_fav"
                        />
                      </NavLink>
                    ) : fav.includes(item._id) ? (
                      <FavoriteIcon
                        onClick={() => handleRemoveFav(item._id)}
                        className="sp-detail_fav"
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={() => handleAddFav(item._id)}
                        className="sp-detail_fav"
                      />
                    )}{' '}
                    <NavLink className="sp-link" to={`/home/${item?._id}`}>
                      <div className="image_contain">
                        {validaURLs(item.img[0]) ? (
                          <img
                            className="item_image"
                            src={item?.img[0]}
                            alt=""
                          />
                        ) : (
                          <img
                            className="item_image"
                            style={{ opacity: 0.1 }}
                            src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"
                            alt="Producto"
                            onError="this.style.display='none'"
                          />
                        )}

                      </div>
                        <h5 className="link-name">{item?.name}</h5>
                        <h4 className="item_price">${item?.price}</h4>
                      {
                        item.stock > 0 ? null
                        // (<h6 className='sp-h6'>Tenemos en stock!</h6>)
                        : (<h6 className='sp-h6-null'>Sin stock</h6>)
                      }
                    </NavLink>
                    { item.stock > 0 ?
                      <button
                      className="sp-button"
                      onClick={() => addToCartHandler(item._id)}
                    >
                      Agregar al Carrito
                    </button>
                    : null}
                  </div>
                )}
              </>
            ))}
            {allProducts[0] > 8 && <Pagination response={allProducts[0]} />}
          </>
        ) : (
          <h2> 😢 No hay productos que coincidan</h2>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ShowProducts;
