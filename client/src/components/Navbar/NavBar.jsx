import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css';
import Button from '@material-ui/core/Button';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SvgIcon from '@material-ui/core/SvgIcon';
import ExternAuthentication from '../Authentication/Authentication';
import { searchProducts, filterProductsCategory, searchProductsAction, selectCategoryAction } from '../../redux/actions/types/productActions.js';

function NavBar() {
    let initialCategories = {vertodos:false,cervezas:false,conservas:false,merchandising:false,otros:false}
    const [category, setCategory] = useState(initialCategories)
    const currentCategoryState = useSelector( state => state.root.currentCategoryState)

  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.root.currentPage)
  var sort = 'asc'
  const allProducts = useSelector(state => state.root.allProducts)

  const [state, setState] = useState('vertodos')


  useEffect(() => {
    dispatch(selectCategoryAction(state))
    dispatch(searchProductsAction(''))
    //toca preguntar si ek search tiene estado
  }, [state])

  console.log('Se renderizo el navbar/ allproducts', allProducts)
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

    useEffect(()=> {
      dispatch(selectCategoryAction(state))
      dispatch(searchProductsAction(''))
//toca preguntar si ek search tiene estado
    },[state])
  
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
        <img className='nb-img' src="https://live.staticflickr.com/65535/51361173217_49de2674c3_m.jpg" alt="Montañez Logo" />
      </NavLink>
      <SearchBar />
      <nav>
        <ul>
          <li className="list-item">
            <NavLink to='/home'>
              <input className={`${currentCategoryState === 'vertodos' ? "actived" : 'Nav-button'}`} type="button" value="Ver Todos" onClick={() => setState('vertodos')} />
            </NavLink>
            <NavLink to='/home'>
              <input className={`${currentCategoryState === 'cervezas' ? "actived" : 'Nav-button'}`} type="button" value="Cervezas" onClick={() => setState('cervezas')} />
            </NavLink>
            <NavLink to='/home'>
              <input className={`${currentCategoryState === 'conservas' ? "actived" : 'Nav-button'}`} type="button" value="Conservas" onClick={() => setState('conservas')} />
            </NavLink>
            <NavLink to='/home'>
              <input className={`${currentCategoryState === 'merchandising' ? "actived" : 'Nav-button'}`} type="button" value="Merchadising" onClick={() => setState('merchandising')} />
            </NavLink>
            <NavLink to='/home'>
              <input className={`${currentCategoryState === 'otros' ? "actived" : 'Nav-button'}`} type="button" value="Otros" onClick={() => setState('otros')} />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Button variant="contained" color="primary" >
          Signup or SignIn MADAFAKAAAA
        </Button>
      </div>
      <ExternAuthentication />
      <Link to='/admin'>
        <button className='nav-personicon'>
          <PersonIcon style={{ fontSize: 40 }} />
        </button>
      </Link>
      <Link to="/cart">
        <button className='nav-personicon'>
          <ShoppingCartIcon style={{ fontSize: 40 }} />
        </button>
      </Link>

    </header>

  );
};

export default NavBar;


