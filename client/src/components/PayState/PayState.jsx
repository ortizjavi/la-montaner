import {
  updateOrder,
} from "../../redux/actions/types/productActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import "./PayState.css";

const FAILURE_STATUS = 'failure';
const SUCCESS_STATUS = 'success';
const PENDING_STATUS = 'pending';


export default function PayState() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { status } = useParams();
  const usuario = useSelector((state) => state.session.user);

  useEffect(() => {
    if (usuario.role){
      const queries = new URLSearchParams(location.search);
      dispatch(updateOrder({
        status: queries.get("status"),
        payment_type: queries.get("payment_type"),
        mp_preference: queries.get("preference_id"),
      }))
    }
    
  }, [usuario, dispatch, location.search])

  let h2, img, p, h2ClassName;
  if (status === SUCCESS_STATUS){
    h2 = 'Compra satisfactoria';
    img = 'https://e00-us-marca.uecdn.es/claro/assets/multimedia/imagenes/2020/09/04/15991931033962.jpg';
    p = 'Las mejores cervezas de Cordoba!';
    h2ClassName = 'success';
  } else if (status === PENDING_STATUS){
    h2 = 'Pago en Proceso...'
    img = 'https://64.media.tumblr.com/d30560fbc829bcb17b9fd92844088487/tumblr_naes2zz8im1qza1qzo1_500.gifv';
    p = 'Ya casi estan tus birras';
    h2ClassName = 'success';
  } else {
    h2 = 'Compra fallida';
    img = 'https://i.pinimg.com/originals/1a/f4/9e/1af49e5af38b2b428f0380e57496a39b.png';
    p = 'ya no tenes birras, intenta de nuevo';
    h2ClassName = 'failure';
  }

  
  return (
    <div>
      <div className="psContend">
        <h2 className={h2ClassName}>
          {h2}
        </h2>
        <img
          src={img}
          alt="good"
        />
        <p> {p} </p>
      </div>
    </div>
  );
}
