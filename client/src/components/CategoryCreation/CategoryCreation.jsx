import './CategoryCreation.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategories, getCategories } from '../../actions/types'
import { fixedCategories } from '../../constants'


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
      <picture className='image_contain'>
                                    <img className="item_image_form" src={'https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg'} placeholder="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg" alt="Imagen de Birra" />
                                    {/* <img className="item_image" src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"  alt="Imagen de Birra" /> */}
                                </picture>
      <ul className="category-list">
        <li className="category-list-title">Categorías Actuales</li>
        <br />

        {categories?.map((category, i) => (
          <li className="category-bullet" key={i}> {category.name.toUpperCase()}
          {fixedCategories.includes(category.name.toLowerCase())? null :
          <button className="delete-btn" onClick={() => handleClick(category)}>X</button>}
          </li>
        ))}
      </ul>
    </div>
  )
};
