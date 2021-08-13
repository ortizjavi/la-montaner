import React from "react";
import { useSelector } from "react-redux";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const { wishItems } = wishlist;

  return (
    <div>
      {
        wishItems.length === 0 ? (
          <div>No tienes productos favoritos</div>
        ) : (
          wishItems.map((product) => (
            <div>
              <h3>{product.name}</h3>
              <img src={product.img} alt="product"/>
              <span>Price: ${product.price}</span>
            </div>
          ))
        )
      }
    </div>
  )
}
