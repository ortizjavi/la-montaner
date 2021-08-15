import {
  orderPay,
  orderStatus,
} from "../../redux/actions/types/productActions";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom"

export default function Pay({ cart }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const usuario = useSelector((state) => state.session.user);

  const handlePay = (e) => {
    e.preventDefault();
    console.log(cart);

    if(!usuario.ROLE){history.push("/login")}
    else{
      dispatch(orderStatus(cart, usuario.name));
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
          Paga!
        </Button>
      </form>
    </div>
  );
}
