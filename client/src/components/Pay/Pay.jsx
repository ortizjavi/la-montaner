import axios from "axios";
import React from "react";
import Button from "@material-ui/core/Button";

export default function Product() {
  const paga = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/products/pay", {
      locale: "es-AR",
    });
    console.log(response);
    window.location.href = response.data.response.init_point;
  };
  return (
    <div>
      <form>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={paga}
        >
          Paga Boludo
        </Button>
      </form>
    </div>
  );
}
