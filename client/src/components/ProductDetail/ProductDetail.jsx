import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from '../Loading/Loading.js';
import './ProductDetail.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Reviews from './Reviews';
import * as productActions from '../../redux/actions/types/productActions.js';
import { getOrders } from '../../redux/actions/types/adminActions';
import { Rating } from '@material-ui/lab';
import { FaCircle } from 'react-icons/fa';

export default function ProductDetail({ match, history }) {
  const { id } = useParams(); //pasarle por props
  const dispatch = useDispatch();

  //State selector
  const detail = useSelector((state) => state.root.productDetail);
  let wishlist = useSelector((state) => state.wishlist);
  let currentUser = useSelector((state) => state.session.user);

  let userOrders = currentUser.orders;
  let { wishlistItems } = wishlist;

  //Local states
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [stars, setStars] = useState(0);

  const fav = wishlistItems.find((product) => product.id === id);
  const length = detail?.img?.length;

  //Order user
  let usuarioPrueba = currentUser;
  let usuario = Object.entries(currentUser);

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
    dispatch(getOrders());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, match, usuarioPrueba, userOrders, id, detail._id]);

  useEffect(() => {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    if (detail.rating) {
      let totalStars = detail.rating.reduce((a, b) => a + b, 0);
      setStars(totalStars / detail.rating.length);
    }
  }, [detail.rating]);

  const addToCartHandler = () => {
    dispatch(productActions.addCartProduct(detail._id, qty));
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
    dispatch(productActions.removeFavProduct(id));
  };

  const handleAddFav = () => {
    dispatch(productActions.addFavProducts(id));
  };

  const handleWishlist = () => {
    swal({
      title: 'Por favor inicia sesión',
      icon: 'warning',
    });
  };

  return (
    <div className="big-container-detail">
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
                        className={index === current ? 'slide active' : 'slide'}
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
            <div className="detail-heart">
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
              )}{' '}
            </div>
            <div className="detail_info">
              <div className="name_fav_detail">
                <p className="detail__name">{detail.name}</p>
              </div>
              <div className="detail_stars">
                <Rating
                  name="read-only"
                  value={stars}
                  defaultValue={4}
                  precision={0.5}
                  readOnly
                />
              </div>

              <div className="detail-description">
                <p>{detail.description}</p>
              </div>

              {detail.ibu && detail.abv && (
                <div className="sipd-center">
                  <table>
                    <tbody>
                      <tr>
                        <td>Ibu: {detail.ibu}</td>
                        <td>Abv: {detail.abv}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="right__info">
              <p>
                Precio:
                <span>${detail.price}</span>
              </p>
              <p>
                Stock:
                <span>
                  {detail.stock > 0 ? (
                    <div className="stock-disponible">
                      <FaCircle /> <p>disponible</p>
                    </div>
                  ) : (
                    <div className="stock-noDisponible">
                      <FaCircle /> <p> no disponible</p>
                    </div>
                  )}
                </span>
              </p>
              <p>
                Cantidad:
                {detail.stock > 0 ? (
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
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
            <div></div>
          </div>
        </div>
      )}
      <Reviews id={id} />
    </div>
  );
}
