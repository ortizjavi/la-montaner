import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getProductDetail } from "../../actions/types/productActions";
import Loading from "../Loading/Loading.js";
import "./ProductDetail.css";
import Footer from "../Footer/Footer";

//Slider
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ProductDetail() {
  const { id } = useParams();
  const detail = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(getProductDetail(id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id, dispatch]);

  console.log("components/ProductDetail:", detail);

  const handleClick = () => {
    alert("producto agregado correctamente");
  };

  const handleBuyProduct = () => {
    alert("gracias por comprar nuestros productos");
  };


  return (
    <>
      <Link to="/home"> </Link>
      {loading ? (
        <Loading />
      ) : (
        <div className="detail_style">
          <div className="general_container">
            <div className="detail-img">
              {detail.img.length > 1 ? (
                <Carousel>
                  <div className="slide_image">
                    <img src={detail.img[0]} alt={detail.name} />
                  </div>
                  <div className="slide_image">
                    <img src={detail.img[1]} alt="product2" />
                  </div>
                </Carousel>
              ) : (
                <div className="slide_image">
                  <img src={detail.img[0]} alt={detail.name} />
                </div>
              )}
            </div>

            <div className="detail_description">
              <div className="detail-render">
                <h2>{detail.name}</h2>
                <p className="detail_stars">⭐⭐⭐⭐⭐</p>
                <h3>Categoría: {detail.categories[0].name}</h3>
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
                  <button onClick={() => handleBuyProduct()}>COMPRAR</button>
                </div>

                <div className="detail_info_description">
                  <h3>Info del producto:</h3>
                  <p>{detail.description}</p>
                </div>
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
