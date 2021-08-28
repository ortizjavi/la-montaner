import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeFavProduct, addCartProduct, removeFavAll } from '../../redux/actions/types/productActions';
import swal from 'sweetalert';
import './Wishlist.css';

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  useEffect(() => {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const handleRemove = (id) => {
    dispatch(removeFavProduct(id));
  };

  const handleRemoveAll = () => {
    swal({
      title: '¿Estás seguro que deseas eliminar todos tus favoritos?',
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: 'Favoritos eliminados con exitó :)',
          icon: 'success',
          buttons: [false, true],
        });
        dispatch(removeFavAll());
      }
    });
  };

  const handleAddToCart = (id) => {
    swal({
      title: 'Producto agregado al carrito.',
      icon: 'success',
    });
    dispatch(addCartProduct(id, '1'));
  };

  return (
    <div>
      <div
        className={
          wishlistItems.length === 0
            ? 'wishlistDeleteAllDisable'
            : 'wishlistDeleteAll_container'
        }
      >
        <button className="wishlistDeleteAll_btn" onClick={handleRemoveAll}>
          Vaciar favoritos
        </button>
      </div>
      <div className="root_container">
        {wishlistItems.length === 0 ? (
          <div className="no_product_container">
            <h3>Tu lista de favoritos esta vacia...</h3>
            <Link className="back-home-btn" to="/home">
              Volver a la tienda
            </Link>
          </div>
        ) : (
          wishlistItems.map((product) => (
            <div key={product.id} className="product_container">
              <div className="delete_btn_container">
                <button
                  className="delete_btn"
                  onClick={() => handleRemove(product.id)}
                >
                  {' '}
                  <DeleteIcon />{' '}
                </button>
              </div>
              <div className="image_container">
                <Link to={`/home/${product.id}`}>
                  <img
                    className="product_image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
              </div>
              <h5 className="product_name">{product.name}</h5>
              <h4 className="product_price">${product.price}</h4>

              {product.stock > 0 ? (
                <h6 className="sp-h6">Tenemos en stock!</h6>
              ) : (
                <h6 className="sp-h6-null">No tenemos stock</h6>
              )}

              {product.stock > 0 ? (
                <button
                  className="sp-button"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Agregar al Carrito
                </button>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
