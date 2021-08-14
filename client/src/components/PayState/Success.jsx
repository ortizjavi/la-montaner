import React from "react";
import Button from "@material-ui/core/Button";
import "./PayState.css";
import NavBar from "../Navbar/NavBar";
export default function Success() {
  return (
    <div>
      <div className="psContend">
        <h2 className="success">Compra satisfactoria</h2>
        <img
          src="https://e00-us-marca.uecdn.es/claro/assets/multimedia/imagenes/2020/09/04/15991931033962.jpg"
          alt="good"
        />
        <p>Las mejores cervezas de Cordoba!</p>
      </div>
    </div>
  );
}
