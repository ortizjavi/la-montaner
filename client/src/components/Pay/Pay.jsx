import {
  createOrder,
} from "../../redux/actions/types/productActions";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";

export default function Pay({ cart }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const usuario = useSelector((state) => state.session.user);

  const handlePay = (e) => {
    e.preventDefault();
    console.log(cart);
    console.log(usuario._id)

    if(!usuario.role){
      swal({
        title: 'Por favor inicia sesion',
        icon: 'warning'
        })
        history.push("/login")
    }
    else{
      dispatch(createOrder(cart, usuario._id));
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
