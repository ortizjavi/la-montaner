import React, { useState }  from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {createCategory} from '../../actions/types'

export default function CategoryCreator() {
  const dispatch = useDispatch();
  const allProducts = useSelector( state => state.allProducts)
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

  return (
    <div>     
      <form className="form-container" >
        <label  >Crear Categoría: </label>
          <input className='input_search' name='product' placeholder='Categoría' value={state} onChange={(e) => handleChange(e)} />
          <button  type="button" onClick={(e) => handleSubmit(e)}>CREAR CATEGORÍA</button> 
      </form>
    </div>
  )
};
