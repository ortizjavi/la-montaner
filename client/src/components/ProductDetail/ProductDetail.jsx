import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useParams } from 'react-router';
import { getProductDetail } from '../../actions/types.js';

export default function ProductDetail() {
  const { id } = useParams();
  const detail = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, []);
console.log('components/ProductDetail:', detail,'id:',id)
  return (
    <div>
      <h1>{detail.name}</h1>
      <p>{detail.category}</p>
      <p>{detail.img}</p>
      <p>{detail.price}</p>
      <p>{detail.stock}</p>
      <p>{detail.abv}</p>
      <p>{detail.ibu}</p>
      <p>{detail.description}</p>
      <p>{detail.volume}</p>
      <p>{detail.others}</p>
    </div>
  )
}
