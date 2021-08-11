import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getProductDetail } from "../../actions/types/productActions";
import Loading from "../Loading/Loading.js";
import "./ProductDetail.css";
import Footer from "../Footer/Footer";

import { addCartProduct } from '../../actions/types/productActions';

//Slider
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ProductDetail({match, history}) {
  const { id } = useParams();
  const detail = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(getProductDetail(id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id, dispatch]);

  //console.log("components/ProductDetail:", detail);
  const handleClick = () => {
    alert("producto agregado correctamente");
  };

  const handleBuyProduct = () => {
    dispatch(addCartProduct(detail._id));
    history.push(`/cart`);
  };


  return (
    <>
      <Link to="/home"> </Link>
      {loading ? (
        <Loading />
      ) : (
          <div className="general_container">
            <div className="detail-img">
              {detail.img.length > 1 ? (
                <div className="container_carousel_atr">
                <Carousel className="carousel_atr">
                  <div>
                    <img src={detail.img[0]} alt={detail.name} />
                  </div>
                  <div>
                    <img src={detail.img[1]} alt="product2" />
                  </div>
                </Carousel>
                </div>
              ) : (
                <div className="slide-image">
                  <img src={detail.img[0]} alt={detail.name} />
                </div>
              )}
            </div>

            <div className="detail_description">
              <div className="detail-render">
                <h2>{detail.name}</h2>
                <p className="detail_stars">⭐⭐⭐⭐⭐</p>
                { detail.categories[0] &&
                <h3>Categoría: {detail.categories[0].name}</h3>
                }
                <div className="detail-price">
                  <h3 className="detail_price">Precio: ${detail.price} </h3>
                </div>
                {detail.stock < 1 ? (
                  <div className="detail-btn">
                    <h3>SIN STOCK</h3>
                  </div>
                ) : (
                  <div className="detail_stock">
                    <input
                      type="number"
                      min={1}
                      max={detail.stock}
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                    />
                    <button onClick={() => handleClick()}>AGREGAR</button>
                  </div>
                )}
                <div className="detail_button">
                  <Link to="/cart"><button type="button" onClick={handleBuyProduct}>COMPRAR</button></Link>
                </div>
                <div className="detail_info_description">
                  <h3>Info del producto:</h3>
                  <p>{detail.description}</p>
                </div>
               
              </div>
            </div>
          </div>
      )}
      <div className="details_footer">
        <Footer />
      </div>
    </>
  );
}
