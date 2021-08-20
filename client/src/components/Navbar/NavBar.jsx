import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SvgIcon from '@material-ui/core/SvgIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import swal from "sweetalert";
import { searchProductsAction, selectCategoryAction } from '../../redux/actions/types/productActions.js';
import { logout } from '../../redux/actions/types/authActions.js';
// import { IoStorefrontOutline } from 'react-icons/ri';
import StorefrontIcon from '@material-ui/icons/Storefront';
import logoLanding from "../../img/logoLanding.png";


function NavBar(props, {history}) {
  const location = useLocation()
  console.log('Navbar/location',location)
  let initialCategories = { vertodos: false, cervezas: false, conservas: false, merchandising: false, otros: false }
  const [category, setCategory] = useState(initialCategories)
  const currentCategoryState = useSelector(state => state.root.currentCategoryState)
  const user = useSelector(state => state.session.user)
  const cart = useSelector((state) => state.cart);

  const { cartSubtotal } = cart;

  const isUser = user && user.role;

  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.root.currentPage)
  var sort = 'asc'
  const allProducts = useSelector(state => state.root.allProducts)

  const [state, setState] = useState(currentCategoryState);
  let usuario = useSelector((state) => state.session.user);
  usuario = Object.entries(usuario);

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

    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }
    
      

 return (
   <>
    <header className="navbar">
      <SearchBar />
     
        {/* <nav className='nav-container'>
          <ul className='nav-ul'>
            <li className="list-item">
              <select className='nav-selec' id='select' name="select" size='5' onClick={(e) =>handleCategory(e)}>
                <option id='range1'  value='vertodos'>Todos los productos</option>
                <option id='range2' value='cervezas'>Cervezas</option>
                <option id='range3' value='conservas'>Conservas</option>
                <option id='range3' value='merchandising'>Merchandising</option>
                <option id='range3' value='otros'>Otros</option>
              </select>
              
          </li>
        </ul>
      </nav> */}
       <NavLink to='/home' className='nav-personicon'>
        <img className='nb-img' 
        // src="https://res.cloudinary.com/la-montanes/image/upload/v1629134641/logopng_qbilvd.png" 
        src={logoLanding} 
        alt="Montañez Logo" />
      </NavLink>
      <div className='nav-icons-container'>

      
      <Link to='/login' className='nav-icon'>
        {user && user.picture ? 
        <img className='imgStyle' src={user.picture} alt="imagen de usuario" width="50" height="50" ></img> 
        : <PersonIcon className='nav-personicon' style={{ fontSize: 40 }} />}
         
  
      </Link>
      <NavLink to='/home' className='nav-icon'>
        
        {/* <h3 className='nav-title'>La Montañes Craft Beer <StorefrontIcon/></h3> */}
        < StorefrontIcon className='nav-personicon'/>
      </NavLink>

      {
                 !usuario || usuario.length === 0 ? (
                   <Link to='/login' className='nav-icon'>
                     <FavoriteIcon onClick={() => handleWishlist()} className='fav-icon-nav'/>
                   </Link>
                 ) : <Link to="/wishlist" className='nav-icon'><FavoriteIcon className='fav-icon-nav'/></Link>
              }


      <Link to="/cart" className='nav-icon'>
          <ShoppingCartIcon className='nav-personicon' style={{ fontSize: 40 }} />
        <div className='cart_subtotal_container'>
          {
            !usuario || usuario.length === 0 || cartSubtotal > 0 &&
            <h3 className='cart_subtotal'>{cartSubtotal}</h3>
          }
        </div>
      </Link>
      {isUser ?
        <div className='nav-icon'>
          
            <ExitToAppIcon className='nav-personicon' onClick={(e) => dispatch(logout())} style={{ fontSize: 40 }} />
        
        </div>
      : null}
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
};

export default NavBar;


     {/* <NavLink to='/home'>
              <input className={`${currentCategoryState === 'conservas' ? "actived" : 'Nav-button'}`} type="button" value="Conservas" onClick={() => setState('conservas')} />
            </NavLink> */}
