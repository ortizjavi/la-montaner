import React from "react";
import { useSelector } from "react-redux";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  return (
    <div>
      {
        wishlistItems.length === 0 ? (
          <div>No tienes productos favoritos</div>
        ) : (
          wishlistItems.map((product) => (
            <div>
              <h3>{product.name}</h3>
              <img src={product.img} alt="product"/>
              <h4>Price: ${product.price}</h4>
            </div>
          ))
        )
      }
    </div>
  )
}
