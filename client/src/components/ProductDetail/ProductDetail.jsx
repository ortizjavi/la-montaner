import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useParams } from 'react-router';

export default function ProductDetail() {
  const { id } = useParams();
  const allProducts = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  return (
    <div>Detail</div>
  )
}
