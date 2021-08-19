import {
  orderStatus,
  orderPay,
} from "../../redux/actions/types/productActions";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Button from "@material-ui/core/Button";

export default function Pay({ cart }, medio) {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.session.user);
  const address = useSelector((state) => state.cart.address);

  const handlePay = (e) => {
    e.preventDefault();
    console.log(cart);
    console.log(usuario._id);

    if (medio === "efectivo") {
      dispatch(orderStatus(cart, usuario._id, address));
    } else {
      console.log(address);
      dispatch(orderStatus(cart, usuario._id, address, "MercadoPago"));
      orderPay(cart);
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
