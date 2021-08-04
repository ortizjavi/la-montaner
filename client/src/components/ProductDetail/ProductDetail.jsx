import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getProductDetail } from '../../actions/types.js';
import Loading from '../Loading/Loading.js';

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
          <h1>{detail.name}</h1>
          {detail.img ? <img src={detail.img} alt="not found1" /> : <p>image not found2</p>}
          <div>
            <h3>Price</h3>
            <p> {detail.price} </p>

            <h3>Stock</h3>
            <p> {detail.stock} </p>

          </div>
        </div>
      ) : (
        <h1>Something went wrong!</h1>
      )}
  </div>
  )
}
