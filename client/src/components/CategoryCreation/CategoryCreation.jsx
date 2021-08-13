import './CategoryCreation.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategories } from '../../redux/actions/types/categoryActions';
import { fixedCategories } from '../../utils/endpoints.js';
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import IconButton from "@material-ui/core/IconButton";

export default function CategoryCreator() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.root.allCategories)
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
  }

  const handleClick = (category) => {
    swal({
      title: 'Estas seguro que quieres eliminarlo?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(
          'Tu categoria fue eliminada',{
            icon: 'success'
          })
          dispatch(deleteCategories(category)) 
      }else{
        return swal('Tu categoria esta a salvo :)')
      }
    })
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
                <Link to={"/dashboard"}>
                  <ArrowBackSharpIcon />
                </Link>
      </IconButton>
    </div>
  )
};
