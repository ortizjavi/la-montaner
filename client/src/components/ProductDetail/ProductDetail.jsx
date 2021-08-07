import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getProductDetail } from '../../actions/types/productActions';
import Loading from '../Loading/Loading.js';
import './ProductDetail.css';

//Slider
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

//image gallery
// import ImageGallery from 'react-image-gallery';
// import styles from "~react-image-gallery/styles/css/image-gallery.css";

export default function ProductDetail() {
  const { id } = useParams();
  const detail = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProductDetail(id));
    setTimeout(() => {
			setLoading(false);
		}, 2000);
  }, [id, dispatch]);
  
  //console.log('components/ProductDetail:', detail,'id:',id)
  
  return (
    <>
  <Link to="/home"> <button>Back to home</button> </Link>
    {loading ? (
      <Loading />
    ) : (
    <div className='detail_style'>
      <div className='general_container'>
        <div className="detail-img">
          <Carousel>
          <img src={detail.img[0]} alt={detail.name} />
          <img src={detail.img[1]} alt="product2" />
          </Carousel>
          </div>
        <div className="detail_description">
          <div className="detail-render">
            <h2>{detail.name}</h2>
            <p className="detail_stars">⭐⭐⭐⭐⭐</p>
            <div className="detail-price">
              <h3 className="detail_price">Precio: ${detail.price} </h3>
            </div>
            <div>
              <button className="detail_button">Agregar al carrito</button>
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
  </>
);
};
