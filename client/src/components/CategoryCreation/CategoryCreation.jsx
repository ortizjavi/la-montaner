import './CategoryCreation.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategories } from '../../actions/types/categoryActions';
import { fixedCategories } from '../../utils/endpoints.js'

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
      return alert('No puedes crear dos categorías con el mismo nombre!')
    }
    dispatch(createCategory(state))
    alert('Categoría creada con éxito!')
    setState("");
  }

  const handleClick = (category) => {
    dispatch(deleteCategories(category))
    alert(`Categoría ${category.name.toUpperCase()} eliminada`)
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
    </div>
  )
};
