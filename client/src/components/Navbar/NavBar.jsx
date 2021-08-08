import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import Search from '../SearchBar/SearchBar';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SvgIcon from '@material-ui/core/SvgIcon';
import {  } from '../../actions/types/productActions.js';
import {  searchProducts,filterProductsCategory, searchProductsAction, selectCategoryAction } from '../../actions/types/productActions.js';

function NavBar() {
    let initialCategories = {vertodos:false,cervezas:false,conservas:false,merchandising:false,otros:false}
    const [category, setCategory] = useState(initialCategories)
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage)
    var sort = 'asc'
    const allProducts = useSelector( state => state.allProducts)
   
   const handleSort= (param) => {
      dispatch(filterProductsCategory(sort,0, param))
      setCategory({...initialCategories, [param]: true})
    }

    const handleAllProducts = (state)=>{
      dispatch(searchProducts(sort, currentPage-1));
      setCategory({...initialCategories, [state]: true})
    }

    // useEffect(() => {
    //   if(allProducts[0]>8){ 
    //     dispatch(searchProducts(sort, currentPage));
    //   }
    // },[])

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
            <Search/>
            <nav>
                <ul >
                    <li className="list-item">
                    <input className={`${category.vertodos ? "actived" : 'Nav-button'}`} type="button" value="Ver Todos" onClick={() => handleAllProducts('vertodos')}/>
                    <input className={`${category.cervezas ? "actived" : 'Nav-button'}`}  type="button" value="Cervezas" onClick={() => handleSort('cervezas')}/>
                    <input className={`${category.conservas ? "actived" : 'Nav-button'}`}  type="button" value="Conservas" onClick={()=> handleSort('conservas')}/>
                    <input className={`${category.merchandising ? "actived" : 'Nav-button'}`} type="button" value="Merchadising" onClick={()=> handleSort('merchandising')}/>
                    <input className={`${category.otros ? "actived" : 'Nav-button'}`} type="button" value="Otros" onClick={()=> handleSort('otros')}/>
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


