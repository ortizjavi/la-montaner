import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SvgIcon from "@material-ui/core/SvgIcon";
import FavoriteIcon from "@material-ui/icons/Favorite";
import swal from "sweetalert";
import {
  searchProductsAction,
  selectCategoryAction,
  deleteCartAll
} from "../../redux/actions/types/productActions.js";
import { logout } from "../../redux/actions/types/authActions.js";
// import { IoStorefrontOutline } from 'react-icons/ri';
import StorefrontIcon from '@material-ui/icons/Storefront';
import logoLanding from "../../img/logoLanding.png";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
// import MobileNavBar from "./MobileNavBar";


function CartSubTotal(){
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  useEffect(() => {
    console.log(cartSubtotal)
  }, [cartSubtotal])
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

function NavBar(props, {history}) {
  const { push } = useHistory()
  const location = useLocation()
  console.log('Navbar/location',location)
  let initialCategories = { vertodos: false, cervezas: false, conservas: false, merchandising: false, otros: false }
  const [category, setCategory] = useState(initialCategories)
  const currentCategoryState = useSelector(state => state.root.currentCategoryState)
  const user = useSelector(state => state.session.user)
  const usuario = Object.entries(user);
  const isUser = user && user.role;

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.root.currentPage);
  var sort = "asc";
  const allProducts = useSelector((state) => state.root.allProducts);

  const [state, setState] = useState(currentCategoryState);

  useEffect(() => {
    window.addEventListener('scroll', function () {
        var header = document.querySelector('header');
        header?.classList.toggle('sticky', window.scrollY > 0)
      })
  }, [])
    

    useEffect(()=> {
      dispatch(selectCategoryAction(state))
      dispatch(searchProductsAction(''))
//toca preguntar si ek search tiene estado
    },[state])
  
    const handleCategory = (e) =>{
      e.preventDefault()
      state === e.target.id ?  dispatch(selectCategoryAction(state)) :

      setState(e.target.id)
    }

    const handleWishlist = () => {
      swal({
        title: 'Por favor inicia sesión',
        icon: 'warning'
        })
    }

    const handleLogOut = (e) => {
      dispatch(logout())
    }

    function HomeIcon(props) {
      return (
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
      );
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
      {/* <MobileNavBar/> */}

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
        {/* <CloseIcon style={{ fontSize: 40 }} /> */}
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
                        <input className={`${state === 'vertodos' ? "actived" : 'Nav-button'}`} type="button" id='vertodos'value="Todos los Productos" onClick={(e) =>handleCategory(e)}/>
                        <input className={`${state === 'cervezas' ? "actived" : 'Nav-button'}`}  type="button" id='cervezas' value="Cervezas" onClick={(e) =>handleCategory(e)}/>
                        <input className={`${state=== 'conservas'? "actived" : 'Nav-button'}`}  type="button" id='conservas' value="Conservas" onClick={(e) =>handleCategory(e)}/>
                        <input className={`${state === 'merchandising' ? "actived" : 'Nav-button'}`} type="button"id='merchandising' value="Merchadising" onClick={(e) =>handleCategory(e)}/>
                         <input className={`${state ==='otros' ? "actived" : 'Nav-button'}`} type="button" value="Otros" id='otros' onClick={(e) =>handleCategory(e)}/>
                    </li>
                </ul>
    </section>
    }
    </>
  );
}

export default NavBar;


