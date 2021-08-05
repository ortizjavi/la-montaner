import './CategoryCreation.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategories } from '../../actions/types'
import {fixedCategories} from '../../constants'


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
    dispatch(createCategory(state))
    alert('Categoría creada con éxito')
    setState("");
  }
  
  const handleClick = (id, name) => {
   
    dispatch(deleteCategories(id))
    alert(`Categoría ${name.toUpperCase()} eliminada`)

  };

  return (
    <div className="category-create-container">
      <form className="category-form-container" onSubmit={(e) => handleSubmit(e)} >
        <input required className='input-create-category' name='product' placeholder='Categoría' value={state} onChange={(e) => handleChange(e)} />
        <button className="category-submit" type="submit">CREAR</button>
      </form>
      <ul className="category-list">
        <li className="category-list-title">Categorías Actuales</li>
        <br/>
        {categories?.map((category, i) => (
          <li className="category-bullet" key={i}> {category.name.toUpperCase()}
          {fixedCategories.includes(category.name.toLowerCase())? null :
          <button className="delete-btn" onClick={() => handleClick(category._id, category.name)}>X</button>}
          </li>
        ))}
      </ul>
    </div>
  )
};
