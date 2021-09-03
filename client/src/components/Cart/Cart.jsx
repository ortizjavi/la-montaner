/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

// Components
import CartItem from './CartItem.jsx';
import './Cart.css';

// Actions
import * as productActions from '../../redux/actions/types/productActions.js';
import HorizontalNonLinearAlternativeLabelStepper from '../Address/pasarelaDeCompra.jsx';
import { getSales } from '../../redux/actions/types/adminActions.js';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, sales, game } = cart;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [offers, setOffers] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    window.localStorage.setItem(`cart`, JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    dispatch(productActions.addDiscount(offers));
  }, [offers, dispatch]);
  const discountDate = (descuento, rango) => {
    if (
      descuento.slice(0, 4) >= rango.start.slice(0, 4) &&
      descuento.slice(0, 4) <= rango.end.slice(0, 4)
    ) {
      if (
        descuento.slice(5, 7) >= rango.start.slice(5, 7) &&
        descuento.slice(5, 7) <= rango.end.slice(5, 7)
      ) {
        if (
          descuento.slice(5, 7) === rango.end.slice(5, 7) &&
          descuento.slice(8, 10) <= rango.end.slice(8, 10)
        ) {
          return true;
        }
        if (descuento.slice(5, 7) < rango.end.slice(5, 7)) {
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  };
  const alert = () => {
    if (sales) {
      let discountGame = 0;
      let dia = new Date().toISOString().slice(0, 10);
      let offertas = [];
      for (let i = 0; i < sales.length; i++) {
        if (
          sales[i].date?.end &&
          sales[i].price <= total &&
          discountDate(dia, sales[i].date)
        ) {
          offertas.push(sales[i].discount);
        } else if (sales[i].price <= total && dia === sales[i].start) {
          offertas.push(sales[i].discount);
        } else if (sales[i].price <= total && (dia === sales[i]) === {}) {
          offertas.push(sales[i].discount);
        } else if (!sales[i].date && sales[i].price === 0) {
          discountGame = sales[i].discount;
        }
      }
      if (game && discountGame > 0) {
        if (offertas.length === 0) {
          setOffers(discountGame);
        }
        if (offertas.length >= 1) {
          setOffers(offertas[offertas.length - 1] + discountGame);
        }
      } else {
        if (offertas.length === 0 && offers > 0) {
          setOpen(false);
          setOffers(0);
        }
        if (offertas.length >= 1) {
          setOffers(offertas[offertas.length - 1]);
        }
      }
    }
  };

  const qtyChangeHandler = (id, qty) => {
    dispatch(productActions.addCartProduct(id, qty));
  };
  const removeFromCartHandler = (id) => {
    swal({
      title: '¿Estás seguro que quieres eliminar este producto?',
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Tu producto fue eliminado con exito :)', {
          icon: 'success',
        });
        dispatch(productActions.deleteCartProduct(id));
      } else {
        return swal('Tu producto sigue en el carrito :)');
      }
    });
  };

  const removeAllHandler = () => {
    swal({
      title: '¿Estás seguro que quieres vaciar tu carrito?',
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Tu carrito se vació con exito :)', {
          icon: 'success',
        });

        dispatch(productActions.deleteCartAll());
      }
    });
  };

  const getCartCount = () => {
    return cartItems.reduce(
      (stockSelected, item) => Number(item.stockSelected) + stockSelected,
      0,
    );
  };

  const subtotal = getCartCount();

  useEffect(() => {
    dispatch(productActions.addCartSubTotal(subtotal));
    getCartSubTotal();
    dispatch(getSales());
  }, [subtotal, dispatch]);

  useEffect(() => {
    alert();
  }, [total, alert]);

  const getCartSubTotal = () => {
    const resultado = cartItems
      .reduce((price, item) => price + item.price * item.stockSelected, 0)
      .toFixed(2);
    setTotal(resultado);
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Carrito de compras</h2>

          {cartItems.length === 0 ? (
            <div>
              Tu carrito esta vacio.{' '}
              <Link to="/home" className="back-btn">
                Volver a la tienda
              </Link>
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

        <div className="cartDeleteAll_container">
          <button
            className={
              cartItems.length === 0
                ? 'cartDeleteAllDisable'
                : 'cartDeleteAll_btn'
            }
            onClick={() => removeAllHandler()}
          >
            Vaciar carrito
          </button>
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            {offers === 0 ? (
              <p>${total}</p>
            ) : (
              <p>
                <b>${Math.round(total - total * (offers * 0.01))} </b>
                <br />
                <span className="discount">${total}</span>
              </p>
            )}
          </div>
          {offers > 0 && !open && (
            <div className={classes.root}>
              <Alert onClose={() => setOpen(!open)} severity="success">
                {`Tenes un descuento de ${offers}%!`}
              </Alert>
            </div>
          )}

          <div>
            <HorizontalNonLinearAlternativeLabelStepper />
          </div>
        </div>
      </div>
    </>
  );
}
