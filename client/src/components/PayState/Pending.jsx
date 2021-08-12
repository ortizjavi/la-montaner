import React from "react";
import "./PayState.css";
import NavBar from "../Navbar/NavBar";
export default function Pending() {
  return (
    <div>
      <NavBar />
      <div className="psContend">
        <h2 className="success">Pago en Proceso...</h2>
        <img
          src="https://64.media.tumblr.com/d30560fbc829bcb17b9fd92844088487/tumblr_naes2zz8im1qza1qzo1_500.gifv"
          alt="good"
        />
        <p>Ya casi estan tus birras</p>
      </div>
    </div>
  );
}
