import {orderPay, orderStatus} from '../../redux/actions/types/productActions';
import {useDispatch} from 'react-redux';
import React from "react";
import Button from "@material-ui/core/Button";

export default function Pay({cart}) {

  const dispatch = useDispatch()
  const handlePay = (e) => {
    e.preventDefault();
    console.log(cart);
    dispatch(orderStatus(cart));
    orderPay(cart);
  }
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
