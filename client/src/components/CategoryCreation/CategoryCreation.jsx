import './CategoryCreation.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategories } from '../../actions/types/categoryActions';
import { fixedCategories } from '../../utils/endpoints.js';
import { Link } from "react-router-dom";
import swal from "sweetalert";
import HomeIcon from '@material-ui/icons/Home';
import IconButton from "@material-ui/core/IconButton";

export default function CategoryCreator() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.allCategories)
  const [state, setState] = useState("")


  const handleChange = (event) => {
    event.preventDefault();
    setState(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categories.filter(cat => cat.name === state).length) {
      return swal({
        title: "Categoria existente",
        text: 'No puedes crear dos categorías con el mismo nombre!',
        icon: "error",
      });
      //alert('No puedes crear dos categorías con el mismo nombre!')
    }
    dispatch(createCategory(state))
    setState("")
    return swal({
      title: "Categoria creada con exito!",
      icon: "success",
      })
      setTimeout(
        () => (document.location.href = "http://localhost:3000/admin"),
        3000
      );
  }

  const handleClick = (category) => {
    swal({
      title: "Categoria eliminada!",
      text: `Categoría ${category.name.toUpperCase()} eliminada`,
      icon: "success",
    })
    //alert(`Categoría ${category.name.toUpperCase()} eliminada`)
    dispatch(deleteCategories(category)) 
  };


  return (
    <div className="category-create-container">
      <form className="category-form-container" onSubmit={(e) => handleSubmit(e)} >
        <input required className='input-create-category' name='product' placeholder='Categoría' value={state} onChange={(e) => handleChange(e)} />
        <button className="category-submit" type="submit">CREAR</button>
      </form>
      <ul className="category-list">
        <li className="category-list-title">Categorías Actuales</li>
        <br />
        {categories?.map((category, i) => (
          <li className="category-bullet" key={i}> {category.name.toUpperCase()}
            {fixedCategories.includes(category.name.toLowerCase()) ? null :
              <button className="delete-btn" onClick={() => handleClick(category)}>X</button>}
          </li>
        ))}
      </ul>
      <IconButton >
                <Link to={"/admin"}>
                  <HomeIcon />
                </Link>
      </IconButton>
    </div>
  )
};
