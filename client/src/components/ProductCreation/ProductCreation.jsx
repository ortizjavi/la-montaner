import React from "react";

export default function ProductCreation() {
  return (
    <div>
      <form>
        <input type="text" placeholder="nombre" />
        <input type="text" placeholder="categoria" />
        <input type="text" placeholder="img" />
        <input type="number" placeholder="precio" />
        <input type="number" placeholder="stock" />
        <input type="number" placeholder="abv" />
        <input type="number" placeholder="ibu" />
        <textarea></textarea>
        <input type="number" placeholder="volumen" />
        <input type="text" placeholder="otros" />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
