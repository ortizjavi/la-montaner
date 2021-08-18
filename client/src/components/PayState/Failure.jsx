import {
  updateOrder,
} from "../../redux/actions/types/productActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./PayState.css";

export default function Failure() {
  const location = useLocation();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.session.user);

  useEffect(() => {
    console.log(usuario)
    const queries = new URLSearchParams(location.search);
    dispatch(updateOrder({
      _id: usuario._id,
      status: queries.get("status"),
      preference_id: queries.get("preference_id")
    }))
  }, [])

  return (
    <div>
      <div className="psContend">
        <h2 className="failure">Compra fallida</h2>
        <img
          src="https://i.pinimg.com/originals/1a/f4/9e/1af49e5af38b2b428f0380e57496a39b.png"
          alt="good"
        />
        <p>ya no tenes birras, intenta de nuevo</p>
      </div>
    </div>
  );
}
