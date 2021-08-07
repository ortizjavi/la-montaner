import React,{useState, useEffect} from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SvgIcon from '@material-ui/core/SvgIcon';


function NavBar() {
    const [category, setCategory] = useState('')

    useEffect(()=>{
        console.log('Navbar/category: ',category)
    },[category])

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
                    <input className='Nav-button' type="button" value="Cervezas" onClick={()=> setCategory('cervezas')}/>
                    <input className='Nav-button' type="button" value="Conservas" onClick={()=> setCategory('conservas')}/>
                    <input className='Nav-button' type="button" value="Merchadising" onClick={()=> setCategory('merchandising')}/>
                    <input className='Nav-button' type="button" value="Otros" onClick={()=> setCategory('otros')}/>
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


