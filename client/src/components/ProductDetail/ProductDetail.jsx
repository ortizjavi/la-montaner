import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getProductDetail } from '../../actions/types/productActions';
import Loading from '../Loading/Loading.js';
import './ProductDetail.css';

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
  
  console.log('components/ProductDetail:', detail,'id:',id)
  
  return (
    <div>
      {loading ? (
        <Loading />
      ): detail.name ? (
        <div>
          <Link to="/home"> <button>Home</button> </Link>
          <h1 className="detail_title">{detail.name}</h1>
          <div className="detail_img">
          {detail.img ? <img src={detail.img} alt="not found1" /> : <p>image not found2</p>}
          </div>
          <div className="detail_puntuaction">
          ⭐⭐⭐⭐⭐
          </div>
          <div className="detail_price">
            <h3>Precio ${detail.price} </h3>
          </div>
          <div className="detail_button">
            <button>Agregar al carrito</button>
          </div>
          <div className="detail_description">
          <h3>Descripcion:</h3>
            <p>{detail.description}</p>
          </div>
        </div>
      ) : (
        <h1>Something went wrong!</h1>
      )}
  </div>
  )
}
