import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoBeer } from "react-icons/io5";
import CategoryIcon from "@material-ui/icons/Category";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StoreIcon from "@material-ui/icons/Store";
import "./CardsAdmin.css";

export default function CardsAdmin() {
  return (
    <div className="cardsAdmin">
      <div>
        <IoBeer />
        <h2>99</h2>
        <h3>Productos</h3>
      </div>
      <div>
        <CategoryIcon />
        <h2>99</h2>
        <h3>Categorias</h3>
      </div>
      <div>
        <StoreIcon />
        <h2>99</h2>
        <h3>Ordenes</h3>
      </div>
      <div>
        <AccountCircleIcon />
        <h2>99</h2>
        <h3>Usuarios</h3>
      </div>
    </div>
  );
}
