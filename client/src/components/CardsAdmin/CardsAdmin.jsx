import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryIcon from "@material-ui/icons/Category";
import "./CardsAdmin.css";

export default function CardsAdmin() {
  return (
    <div className="cardsAdmin">
      <div>
        <CategoryIcon />
        <h2>99</h2>
        <h3>Productos</h3>
      </div>
      <div>
        <CategoryIcon />
        <h2>99</h2>
        <h3>Categorias</h3>
      </div>
      <div>
        <CategoryIcon />
        <h2>99</h2>
        <h3>Usuarios</h3>
      </div>
      <div>
        <CategoryIcon />
        <h2>99</h2>
        <h3>Ordenes</h3>
      </div>
    </div>
  );
}
