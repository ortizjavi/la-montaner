import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';

// Components
import CartItem from "./CartItem.jsx";
import './Cart.css';

// Actions
import { addCartProduct, deleteCartProduct } from "../../actions/types/productActions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
      window.localStorage.setItem(`cart`, JSON.stringify(cartItems))
  }, [cartItems]);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addCartProduct(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(deleteCartProduct(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.stock) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.stock, 0)
      .toFixed(2);
  };

  return (
    <>
    <NavBar />
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Carrito de compras</h2>

          {cartItems.length === 0 ? (
            <div>
              Tu carrito esta vacio <Link to="/">Volver atras</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button>ir a pagar</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;