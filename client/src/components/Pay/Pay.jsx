import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FORM_ID = "payment-form";

export default function Product() {
  const paga = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/products/pay", {
      locale: "es-AR",
      name: "pepito",
      price: 100,
    });
    console.log(response);
  };
  return (
    <div>
      <form>
        <button onClick={paga}>paga boludo</button>
      </form>
    </div>
  );
}
