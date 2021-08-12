import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector} from 'react-redux';
import{ NavLink } from 'react-router-dom';

import './SearchBar.css';
import { searchProductsAction } from '../../redux/actions/types/productActions.js';
import SearchIcon from '@material-ui/icons/Search';
import SvgIcon from '@material-ui/core/SvgIcon';
import ClearIcon from '@material-ui/icons/Clear';


export default function SearchBar() {
    const dispatch = useDispatch();
    const allProducts = useSelector( state => state.root.allProducts)
    const currentCategoryState = useSelector( state => state.root.currentCategoryState)

    const [state, setState] = useState({product: "", icono:true,})


    useEffect(() => {
            dispatch(searchProductsAction(state.product))
    }, [state.product])
   
    useEffect(() => {
        if(currentCategoryState !== 'vertodos'){
            setState({product: "", icono:true,})
        }
    }, [currentCategoryState])

    const handleChange = event => {
        event.preventDefault();
        let bool= event.target.value.length>1;
        if(event.target.value.length <=2){
            setState({ ...state, [event.target.name]: event.target.value,  icono:!bool });
        }else{
            setState({ ...state, [event.target.name]: event.target.value, icono:!bool  });
            dispatch(searchProductsAction(state.product))
        }
     }
    const handleSubmit =event => {
        event.preventDefault();
        if(state.product.length){
            if(!state.icono){
                setState({ ...state, product:"", icono:!state.icono });
            }  
        }
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
                    <input list="product" multiple value={state.product} className='input_search' 
                    autoComplete='off' placeholder='Buscar Productos' name="product" 
                    onChange={(e)=>handleChange(e)} />
                </label>   
                <datalist  id="product" multiple >
                    {   
                        state.product.length >=2 ?
                        allProducts[1].map( (t, key) => (
                            <NavLink  to={`/home/${t._id}`}>
                                <option key={key} value={t.name} />  
                            </NavLink>
                        ))
                        :
                            <option/>
                    }  
                </datalist>
                {
                    state.icono ?
                    <button className='nav-personicon'>
                        <SearchIcon style={{ fontSize: 40,color:'#66D040' }} />
                    </button>
                    :
                    // <button className='nav-personicon'  onClick={() => setState({ ...state, product:"", icono:!state.icono })}>
                    <button className='nav-personicon'  onClick={(e) => handleSubmit(e)}>
                        <ClearIcon style={{ fontSize: 40,color:'#66D040' }} />
                    </button>
                }
            </form>
        </div>
    );
};

     
