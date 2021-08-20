import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { getProductDetail } from "../../redux/actions/types/productActions";
import Loading from "../Loading/Loading.js";
import StarRatingComponent from "react-star-rating-component";
import { FaStar } from "react-icons/fa";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import "./ProductDetail.css";

import {
  addCartProduct,
  addFavProducts,
  removeFavProduct,
  addReview,
  deleteReview,
} from "../../redux/actions/types/productActions";
import { getOrders } from "../../redux/actions/types/adminActions";

//Slider2
//import { BsChevronLeft, BsChevronCompactRight } from "react-icons/fa";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

//Favs
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function ProductDetail({ match, history }) {
  const { id } = useParams();

  const detail = useSelector((state) => state.root.productDetail);

  const dispatch = useDispatch();

  //local states
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  //cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //wishlist
  let wishlist = useSelector((state) => state.wishlist);
  let { wishlistItems } = wishlist;
  const fav = wishlistItems.find((product) => product.id === id);

  //slider states
  const [current, setCurrent] = useState(0);
  const length = detail?.img?.length;

  //Cart order user
  let currentUser = useSelector((state) => state.session.user);
  let userOrders = currentUser.orders;
  let carritoUsuarioConMap = userOrders?.map(el => el.cart);
  let mapDentroDeCarrito = carritoUsuarioConMap?.map(el => el.map(ele => ele.id))
  let filtrarElMap = mapDentroDeCarrito?.map(ele => ele.includes(id))
  let comproElProducto = filtrarElMap?.find(el => el === 'true' ? 'true' : 'false');

  let totalReviews = detail.reviews;
  let idReviews = totalReviews?.map(el => el.idUsuario);
  let mapReviews = idReviews?.map(el => el === currentUser._id ? 'true' : 'false');
  let hizoReview = mapReviews?.filter(el => el === "true");

  //////
  let usuarioPrueba = currentUser;
  let usuario = Object.entries(currentUser);
  const ordenes = useSelector((state) => state.admin.orders);
  const allOrders = ordenes?.filter(o => o.user === usuarioPrueba._id);

  //reviews
  const [calification, setCalification] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState("");
  const [content, setContent] = useState("");
  const [ rating, setRating ] = useState(null);
  const [ hover, setHover ] = useState(null);

  // const productsKeys = Object.keys(detail);
  // const guardarReviews = productsKeys.map(el => el?.reviews);
  // const filterReviews = guardarReviews.filter(el => el?.name === user?.name);

  useEffect(() => {
    dispatch(getProductDetail(id));
    dispatch(getOrders())
    console.log('las reviews ', detail.reviews);
    console.log('si es true compro el producto ', comproElProducto);

    console.log('detalle de la review ', totalReviews);
    //console.log('ids de las reviews ', idReviews);
    console.log('si es true ya hizo una review ', hizoReview);
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [detail._id, dispatch, match, usuarioPrueba, userOrders, id]);

  useEffect(() => {
    window.localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    if (detail.rating) {
      let totalStars = detail.rating.reduce((a, b) => a + b, 0);
      setStars(totalStars / detail.rating.length);
    }
  }, [detail]);

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

  const removeReview = (e) => {
    e.preventDefault();
    console.log('eliminaste tu review');
    dispatch(
      deleteReview({
        content,
        id,
        calification,
        idUsuario: currentUser._id,
      })
    );
  }
  // if(!ordenes){
  //   dispatch(getOrders())
  // }
  
  // console.log('dashboard/respuesta', userId)
  // console.log('dashboard/ordenes', ordenes)
  //console.log(ordenes)
  // console.log('user state', usuario);
  // console.log('datauser/user:',usuario.name)

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
              !comproElProducto ? null :
              hizoReview[0] === "true" ? null :
              (
                <div>
                  <form onSubmit={(e) => handleSubmit(e)}>
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

                                {
                              hizoReview[0] === "true" ? 
                              (
                                <button onClick={(e) => removeReview(e)}>X</button>
                              )
                               : null
                                }

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
