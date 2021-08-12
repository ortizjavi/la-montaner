import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getProductDetail } from "../../redux/actions/types/productActions";
import Loading from "../Loading/Loading.js";
import "./ProductDetail.css";
import Footer from "../Footer/Footer";

import { addCartProduct } from "../../redux/actions/types/productActions";

//Slider2
//import { BsChevronLeft, BsChevronCompactRight } from "react-icons/fa";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function ProductDetail({ match, history }) {
  const { id } = useParams();
  const detail = useSelector((state) => state.root.productDetail);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  //cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //slider states
  const [current, setCurrent] = useState(0);
  const length = detail?.img?.length;

  useEffect(() => {
    dispatch(getProductDetail(id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id, dispatch, match]);

  //console.log("components/ProductDetail:", detail);
  const addToCartHandler  = () => {
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
                        <img
                          src={slide}
                          alt="beerImage"
                          className="image"
                        />
                      )}
                    </div>
                  );
                })}
              </section>
            ) : (
              <div className={"slide active"}>
                  <img src={detail.img} alt="beerImage" className="image"/>
                    </div>
            )}
            </div>
          </div>
            <div className="productscreen__right">
            <div className="detail_info">
              <p className="detail__name">{detail.name}</p>
              <p className="detail_stars">⭐⭐⭐⭐⭐</p>
              <p>Descripción: {detail.description}</p>
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
                  {detail.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
                Cantidad
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(detail.stock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Agregar al carrito
                </button>
              </p>
            </div>
          </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};