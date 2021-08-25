import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { FaHandRock, FaHandScissors, FaHandPaper } from "react-icons/fa";
import "./EasterEgg.css";
//holi
export default function Box({ option }) {
  return (
    <div>
      <h2>{option === "holi" ? "que haces?" : "hola"}</h2>
    </div>
  );
}
