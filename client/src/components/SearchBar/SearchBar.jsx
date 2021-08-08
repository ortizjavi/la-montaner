import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './SearchBar.css';
import { searchProductsAction } from '../../actions/types/productActions.js';
import SearchIcon from '@material-ui/icons/Search';
import SvgIcon from '@material-ui/core/SvgIcon';


export default function Search() {
    const dispatch = useDispatch();
    const allProducts = useSelector( state => state.allProducts)
    const [state, setState] = useState({product: ""})

    useEffect(() => {
            dispatch(searchProductsAction(state.product))
            return ()=> searchProductsAction('')
    }, [state])

    const handleChange = (event) => {
        event.preventDefault();
        setState({ ...state, [event.target.name]: event.target.value });
     }

     function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
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
                <button className='nav-personicon' onClick={()=> alert('Qué te puedo decir.. Falta el preventDefaul()!!')}>
                    <SearchIcon style={{ fontSize: 40,color:'#66D040' }} />
                </button>
            </form>
        </div>
    );
};

     
