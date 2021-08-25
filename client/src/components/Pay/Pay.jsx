import { createOrder } from "../../redux/actions/types/productActions";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";

export default function Pay({ cart, medio }) {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.session.user);
  const address = useSelector((state) => state.cart.address);
  const discount = useSelector((state) => state.cart.discount);

  const handlePay = (e) => {
    e.preventDefault();
    console.log(discount);

    if (medio === "efectivo") {
      swal({
        title: "Gracias por tu compra!",
        icon: "success",
      });
      if (discount > 0) {
        const cartDiscount = cart.forEach((p) => p.price - p.price * discount);
        console.log("carrito", cartDiscount);
        //return dispatch(createOrder(cartDiscount, usuario._id, address, true));
      }
      dispatch(createOrder(cart, usuario._id, address));
    } else {
      if (discount) {
        const cartDiscount = cart.forEach((p) => p.price - p.price * discount);
        console.log(cartDiscount);
        //return dispatch(createOrder(cartDiscount, usuario._id, address, true));
      }
      dispatch(createOrder(cart, usuario._id, address, true));
    }
  };
  return (
    <div>
      <form>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handlePay}
        >
          Ir a pagar
        </Button>
      </form>
    </div>
  );
}
