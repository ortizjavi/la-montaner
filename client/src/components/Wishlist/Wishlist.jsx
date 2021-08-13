import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './Wishlist.css';

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  return (
    <div className='root_container'>
      {
        wishlistItems.length === 0 ? (
          <div className='no_product_container'>
            <h2 className='no_product_msg'>No tienes productos favoritos</h2>
          </div>
        ) : (
          wishlistItems.map((product) => (
            <div className='product_container'>
              <div className='image_container'>
                <Link to={`/home/${product.id}`}>
                  <img className='product_image' src={product.img} alt="product"/>
                </Link>
              </div>
              <h5 className='product_name'>{product.name}</h5>
              <h4 className='product_price'>${product.price}</h4>
            </div>
          ))
        )
      }
    </div>
  )
}
