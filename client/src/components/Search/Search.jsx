import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './Search.css';

const Search = ()=>{

    const dispatch = useDispatch();
    const allProducts = useSelector( state => state.allProducts)
    const [state, setState] = useState({product: "",})


    useEffect( () => {
       console.log('components/Search/state: ',state.product)
      }, [state])

    const handleChange = (event) => {
        event.preventDefault();
        setState({ ...state, [event.target.name]: event.target.value });
      }
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('me clickeaste')
        setState({ ...state, product: ""});
    }

    return(
        <div>
            <h2>Buscador</h2>
            <form className="form-container" >
              
                    <label  >Buscar Producto: </label>
                    <input className='input_search' name='product' placeholder='Birras' value={state.product} onChange={(e) => handleChange(e)} />
                    <button  type="button" onClick={(e) => handleSubmit(e)}>BUSCAR</button> 
           

            </form>
        </div>
    )
};

export default Search;