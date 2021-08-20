import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { getProductDetail } from "../../redux/actions/types/productActions";
import Loading from "../Loading/Loading.js";
import { FaStar } from "react-icons/fa";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import "./ProductDetail.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import {
  addCartProduct,
  addFavProducts,
  removeFavProduct,
  addReview,
} from "../../redux/actions/types/productActions";
import { getOrders } from "../../redux/actions/types/adminActions";

export default function ProductDetail({ match, history }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  //State selector
  const detail = useSelector((state) => state.root.productDetail);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let wishlist = useSelector((state) => state.wishlist);
  let currentUser = useSelector((state) => state.session.user);
  let userOrders = currentUser.orders;
  const ordenes = useSelector((state) => state.admin.orders);

  //States
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  let { wishlistItems } = wishlist;
  const [current, setCurrent] = useState(0);

  const fav = wishlistItems.find((product) => product.id === id);
  const length = detail?.img?.length;

  //Cart order 
  let carritoUsuarioConMap = userOrders?.map(el => el.cart);
  let mapDentroDeCarrito = carritoUsuarioConMap?.map(el => el.map(ele => ele.id))
  let filtrarElMap = mapDentroDeCarrito?.map(ele => ele.includes(id))
  let comproElProducto = filtrarElMap?.filter(el => el === 'true' ? 'true' : 'false');
  let finalCompro = comproElProducto?.find(el => el === true);

  //Reviews
  let totalReviews = detail.reviews;
  let idReviews = totalReviews?.map(el => el.idUsuario);
  let mapReviews = idReviews?.map(el => el === currentUser._id ? true : false);
  let hizoReview = mapReviews?.filter(el => el === true ? true : false);
 
  //Order user
  let usuarioPrueba = currentUser;
  let usuario = Object.entries(currentUser);

  //reviews
  const [calification, setCalification] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState("");
  const [content, setContent] = useState("");
  const [ rating, setRating ] = useState(null);
  const [ hover, setHover ] = useState(null);


  useEffect(() => {
    dispatch(getProductDetail(id));
    dispatch(getOrders())
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, match, usuarioPrueba, userOrders, id, detail._id]);

  useEffect(() => {
    window.localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);


  useEffect(() => {
    if (detail.rating) {
      let totalStars = detail.rating.reduce((a, b) => a + b, 0);
      setStars(totalStars / detail.rating.length);
    }
  }, [detail, detail.reviews]);

  const addToCartHandler = () => {
    dispatch(addCartProduct(detail._id, qty));
    history.push(`/cart`);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(detail.img) || detail.img.length <= 0) {
    return null;
  }

  const handleRemoveFav = () => {
    dispatch(removeFavProduct(id));
  };

  const handleAddFav = () => {
    dispatch(addFavProducts(id));
  };

  const handleWishlist = () => {
    swal({
      title: "Por favor inicia sesión",
      icon: "warning",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (calification < 1 || calification > 5) {
      setErrors("");
    }
    dispatch(
      addReview({
        content: content,
        id,
        calification: calification,
        idUsuario: currentUser._id,
      })
    );
    console.log("agregaste tu review");
    setContent("");
    setCalification(0);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="productscreen">
          <div className="productscreen__left">
            <div className="left__image">
              {detail.img.length > 1 ? (
                <section className="slider">
                  <ArrowBackIosIcon
                    className="left-arrow"
                    onClick={prevSlide}
                  />
                  <ArrowForwardIosIcon
                    className="right-arrow"
                    onClick={nextSlide}
                  />
                  {detail.img.map((slide, index) => {
                    return (
                      <div
                        className={index === current ? "slide active" : "slide"}
                        key={index}
                      >
                        {index === current && (
                          <img src={slide} alt="beerImage" className="image" />
                        )}
                      </div>
                    );
                  })}
                </section>
              ) : (
                <div className="slide.active">
                  <img
                    src={detail.img}
                    alt="beerImage"
                    className="imageSlide"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="productscreen__right">
            <div className="detail_info">
              <div className="name_fav_detail">
                <p className="detail__name">{detail.name}</p>

                {!usuario || usuario.length === 0 ? (
                  <Link to="/login">
                    <FavoriteBorderIcon
                      onClick={() => handleWishlist()}
                      className="detail_fav"
                    />
                  </Link>
                ) : fav ? (
                  <FavoriteIcon
                    onClick={handleRemoveFav}
                    className="detail_fav"
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={handleAddFav}
                    className="detail_fav"
                  />
                )}
              </div>
              <div className='detail-rating'>
              {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;

                        return (
                          <label>
                            <input 
                              type='radio'
                              name='rating'
                              value={ratingValue}
                            />
                            <FaStar 
                              className='star'
                              color={'#ffc107'}
                              size={25}
                            />
                          </label>
                        ); 
                      })}
              </div>
            </div>

            <div>
              <div className="right__info">
                <p>
                  Precio:
                  <span>${detail.price}</span>
                </p>
                <p>
                  Stock:
                  <span>
                    {detail.stock > 0 ? "disponible" : "no disponible"}
                  </span>
                </p>
                <p>
                  Cantidad:
                  {detail.stock > 0 ? (
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(detail.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>no disponible</span>
                  )}
                </p>
                <p>
                  {detail.stock > 0 ? (
                    <button type="button" onClick={addToCartHandler}>
                      Agregar al carrito
                    </button>
                  ) : null}
                </p>
              </div>
            </div>
            <div>
              {!usuario || usuario.length === 0 ? null : 
              detail.stock === 0 ? null : 
              !finalCompro ? null :
             
              (
                <div>
                  <form onSubmit={(e) => handleSubmit(e)} style={mapReviews !== undefined ? {display: 'none'} : {display: 'block'}}>
                    <textarea
                      className="text-area"
                      type="text"
                      placeholder="Agregue su opinión sobre este producto..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className='detail-rating'>
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;

                        return (
                          <label>
                            <input 
                              type='radio'
                              name='rating'
                              value={ratingValue}
                              onClick={() => setRating(ratingValue)}
                              onChange={(e) => setCalification(ratingValue)}
                            />
                            <FaStar 
                              className='star'
                              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                              size={30}
                              onMouseEnter={() => setHover(ratingValue)}
                              onMouseLeave={() => setHover(null)}
                            />
                          </label>
                        ); 
                      })}
                      <button type="submit">calificar</button>
                      <Link to={"/home"}>
                        <button className="back">volver</button>
                      </Link>
                    </div>
                  </form>
                </div>
              ) }
            </div>
         
          </div>
        </div>
      )}
      {detail.reviews && detail.reviews.length > 0 ? (
              <div>
                <h1>Comentarios</h1>
                <ul>
                  {detail.reviews &&
                    detail.reviews.map((el, idx) => {
                      return (
                        <li key={idx}>
                          <Paper style={{ padding: "40px 20px" }}>
                            <Grid container wrap="nowrap" spacing={2}>
                              <Grid item>
                                <Avatar alt="Remy Sharp" src={currentUser.picture ? currentUser.picture : 'https://cdn.iconscout.com/icon/free/png-256/care-emoji-with-beer-2419208-2012657.png'} />
                              </Grid>
                              <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>
                                  {el.name}
                                </h4>
                                <p style={{ textAlign: "left" }}>
                                  {" "}
                                  {el.content}{" "}
                                </p>
                      <div className='detail-rating'>
                        {[...Array(el.calification)].map((star, i) => {
                        const ratingValue = i + 1;

                        return (
                          <label>
                            <input 
                              type='radio'
                              name='rating'
                              value={ratingValue}
                            />
                            <FaStar 
                              className='star'
                              color={'#ffc107'}
                              size={15}
                            />
                          </label>
                        ); 
                      })}
                      </div>
                              </Grid>
                            </Grid>
                            <Divider
                              variant="fullWidth"
                              style={{ margin: "30px 0" }}
                            />
                          </Paper>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : null}
    </div>
  );
}
