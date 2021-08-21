import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../Loading/Loading.js";
import { FaStar } from "react-icons/fa";
import "./ProductDetail.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Reviews from './Reviews';

import {
  addCartProduct,
  addFavProducts,
  getProductDetail,
  removeFavProduct,
} from "../../redux/actions/types/productActions";
import { getOrders } from "../../redux/actions/types/adminActions";

export default function ProductDetail({ match, history }) {
  const { id } = useParams(); //pasarle por props
  const dispatch = useDispatch();

  //State selector
  const detail = useSelector((state) => state.root.productDetail);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let wishlist = useSelector((state) => state.wishlist);
  let { wishlistItems } = wishlist;
  let currentUser = useSelector((state) => state.session.user);
  let userOrders = currentUser.orders;

  //Local states
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  const fav = wishlistItems.find((product) => product.id === id);
  const length = detail?.img?.length;

  //Order user
  let usuarioPrueba = currentUser;
  let usuario = Object.entries(currentUser);

    
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
              <p>{detail.description}</p>
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
            
           </div>
          </div>
        </div>
      )}
      <Reviews id={id} />
    </div>
  );
}
