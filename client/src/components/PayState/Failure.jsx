import React from "react";
import Button from "@material-ui/core/Button";
import "./PayState.css";
import NavBar from "../Navbar/NavBar";
export default function Failure() {
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
