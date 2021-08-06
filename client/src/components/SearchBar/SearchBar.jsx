import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './SearchBar.css';
import { searchProductsAction } from '../../actions/types/productActions.js';

export default function Search() {
    const dispatch = useDispatch();
    const allProducts = useSelector( state => state.allProducts)
    const [state, setState] = useState({product: ""})

    useEffect(() => {
            dispatch(searchProductsAction(state.product))
    }, [state])

    const handleChange = (event) => {
        event.preventDefault();
        setState({ ...state, [event.target.name]: event.target.value });
     }
     
    return(
        <div>
            <form className="form-container" >
                <label >     
                    <input list="product" multiple value={state.product} className='input_search' autoComplete='off' placeholder='Buscar Productos' name="product" onChange={handleChange} />
                </label>   
                <datalist  id="product" multiple  >
                    {
                        state.product.length >=2 ?
                        allProducts[1].map( (t, key) => (
                            <option key={key} value={t.name} />  
                        ))
                        :
                            <option/>
                    }  
                </datalist>
            </form>
        </div>
    );
};

     
