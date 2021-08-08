import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SvgIcon from '@material-ui/core/SvgIcon';
import {  searchProducts,filterProductsCategory,  } from '../../actions/types/productActions.js';

function NavBar() {
    const [category, setCategory] = useState('')
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage)
    var sort = 'asc'
    const allProducts = useSelector( state => state.allProducts)
   
   const handleSort= (param) => {
     
    dispatch(filterProductsCategory(sort,currentPage-1, param))
  }

 
  useEffect(() => {
    if(allProducts[0]>8){ 
      dispatch(searchProducts(sort, currentPage-1));
    }
  }, [currentPage]) 
  
  


    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }

  return (
    <header className="navbar">
            <NavLink to='/home' className='nav-personicon'>
              <img className='nb-img'  src="https://live.staticflickr.com/65535/51361173217_49de2674c3_m.jpg" alt="Montañez Logo"/>
            </NavLink>
            <SearchBar/>
            <nav>
                <ul >
                    <li className="list-item">
                    <input className='Nav-button' type="button" value="Cervezas" onClick={() => handleSort('cervezas')}/>
                    <input className='Nav-button' type="button" value="Conservas" onClick={()=> handleSort('conservas')}/>
                    <input className='Nav-button' type="button" value="Merchadising" onClick={()=> handleSort('merchandising')}/>
                    <input className='Nav-button' type="button" value="Otros" onClick={()=> handleSort('otros')}/>
                    </li>
                </ul>
            </nav>
                <button className='nav-personicon' onClick={()=> alert('Che como vaz!🚀')}>
                    <PersonIcon style={{ fontSize: 40 }}  />
                </button>
                <button className='nav-personicon' onClick={()=> alert('Yo... Re-bien!!😎')}>
                    <ShoppingCartIcon style={{ fontSize: 40 }} />
                </button>
            
        </header>

  );
};

export default NavBar;


