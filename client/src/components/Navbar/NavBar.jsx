import "./NavBar.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MenuIcon from '@material-ui/icons/Menu';
import StorefrontIcon from '@material-ui/icons/Storefront';
import swal from "sweetalert";
import {
  searchProductsAction,
  selectCategoryAction,
  deleteCartAll
} from "../../redux/actions/types/productActions.js";
import { logout } from "../../redux/actions/types/authActions.js";
import logoLanding from "../../img/logoLanding.png";
import {
  FIXED_CATEGORIES_NAV,
  FIXED_NAV_CATEGORIES_VALUES
} from '../../utils/constants.js';
import OtherCategories from './OtherCategories';
import SearchBar from "../SearchBar/SearchBar";

function CartSubTotal(){
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  return (
    <>
    {
      (cartSubtotal > 0) ?
      <h3 className='cart_subtotal'>{cartSubtotal}</h3>
      : null
    }
    </>
  )
}

function scrollListener(){
  var header = document.querySelector('header');
  header?.classList.toggle('sticky', window.scrollY > 0)
}

function NavBar(props, {history}) {
  const { push } = useHistory()
  const location = useLocation()
  const currentCategoryState = useSelector(state => state.root.currentCategoryState)
  const [state, setState] = useState(currentCategoryState);
  const user = useSelector(state => state.session.user)
  const usuario = Object.entries(user);
  const isUser = user && user.role;
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])
    
  useEffect(()=> {
    dispatch(selectCategoryAction(state));
    dispatch(searchProductsAction(''));
//toca preguntar si ek search tiene estado
  },[state, dispatch])
  
  const handleCategory = (e) =>{
    e.preventDefault()
    state === e.target.id ?  dispatch(selectCategoryAction(state)) :
    setState(e.target.id);
  }

  const handleWishlist = () => {
    swal({
      title: 'Por favor inicia sesión',
      icon: 'warning'
    })
  }

  const renderCategories = () => {
    return (
      <>
      {FIXED_CATEGORIES_NAV.map((c, i) => (
        <input 
          className={`${state === c ? "actived" : 'Nav-button'}`} 
          type="button" id={c} 
          value={FIXED_NAV_CATEGORIES_VALUES[i]} 
          key={i} onClick={(e) =>handleCategory(e)}
        />
      ))}
      <OtherCategories selected={currentCategoryState} handleCategory={handleCategory}/>
      </>
    )
  }

  const handleLogOut = (e) => {
    dispatch(logout())
  }


  const exit = (e) => {
    dispatch(logout())
    dispatch(deleteCartAll());
    push('/home')
  }    

 return (
   <>
    <header className="navbar">
      <SearchBar /> 
      <NavLink to='/home' className='nav-personicon' title='Ir a la tienda'>
        <img className='nb-img' 
        src={logoLanding} 
        alt="Montañez Logo" />
      </NavLink>
      <div className='nav-icons-container'>
        <Link to='/login' className='nav-icon' title='Usuario'>
          {user && user.picture ? 
          <img className='imgStyle' src={user.picture} alt="imagen de usuario" width="50" height="50" ></img> 
          : <PersonIcon className='nav-personicon' style={{ fontSize: 40 }} />}
        </Link>

        <NavLink to='/home' className='nav-icon' title='Ir a la tienda'>
          
          < StorefrontIcon className='nav-personicon' />
        </NavLink>
        {
          !usuario || usuario.length === 0 ? (
            <Link to='/login' className='nav-icon' title='Favoritos'>
              <FavoriteIcon onClick={() => handleWishlist()} className='fav-icon-nav'/>
            </Link>
          ) : <Link to="/wishlist" className='nav-icon' title='Favoritos'><FavoriteIcon className='fav-icon-nav'/></Link>
        }
        <Link to="/cart" className='nav-icon cart_subtotal_container' title='Carrito de compras'>
            <ShoppingCartIcon className='nav-personicon' style={{ fontSize: 40 }} />
            <CartSubTotal/>
        </Link>
        {isUser ?
          <div className='nav-icon' title='Cerrar sesion'>
              <ExitToAppIcon className='nav-personicon' onClick={exit} style={{ fontSize: 40 }} />     
          </div>
        : null}
      </div> 
      <div className='nav-icons-container-mobile'>
        <ul>
        <MenuIcon className='nav-menu-mobile' style={{ fontSize: 40, color:'white' }} />
          <li>
            <Link to='/login' className='nav-icon' title='Usuario'>
              {user && user.picture ? 
              <img className='imgStyle-mobile' src={user.picture} alt="imagen de usuario" width="50" height="50" ></img> 
              : <PersonIcon className='nav-personicon' style={{ fontSize: 40 }} />}
              <span>Usuario</span>
            </Link>
          </li>
          <li>
            <Link to='/home' className='nav-icon' title='Ir a la tienda'>
              
              < StorefrontIcon className='nav-personicon' /><span>Tienda</span>
            </Link>
          </li>
          {
            !usuario || usuario.length === 0 ? (
              <li>
              <Link to='/login' className='nav-icon' title='Favoritos'>
                <FavoriteIcon onClick={() => handleWishlist()} className='fav-icon-nav'/><span>Favoritos</span>     
              </Link>
              </li>
            ) : <li> <Link to="/wishlist" className='nav-icon' title='Favoritos'><FavoriteIcon className='fav-icon-nav'/><span>Favoritos</span></Link></li>
          }
          <li>
            <Link to="/cart" className='nav-icon cart_subtotal_container' title='Carrito de compras'>
                <ShoppingCartIcon className='nav-personicon' style={{ fontSize: 40 }} /><span>Carrito</span> 
                <CartSubTotal/>
            </Link>
          </li>
          {isUser ?
            <li className='nav-icon-mobile' title='Cerrar sesion'>
              <Link className='nav-icon-mobile' onClick={(e) => handleLogOut(e)}>
                <ExitToAppIcon  className='fav-icon-nav'  style={{ fontSize: 40 }} />
                <span>Cerrar Sesion</span> 
              </Link>    
            </li>
          : null}
        </ul>
      </div>
    </header>
    { location.pathname === '/home' &&
    <section >      
                <ul className='navbar-ul'>
                    <li className='navbar-section'>
                      { renderCategories() }
                    </li>
                      }
                </ul>
    </section>
    }
    </>
  );
}

export default NavBar;


