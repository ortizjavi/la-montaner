import React from 'react';
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';
import { HiOutlinePhotograph  } from 'react-icons/hi';
import { FaComments  } from 'react-icons/fa';
import { IoIosNotificationsOutline  } from 'react-icons/io';
import RateReviewIcon from '@material-ui/icons/RateReview';
import './DataUser.css';

const DataUser = () =>{
    const user = useSelector((state) => state.session.user);
console.log('Este es user: ', user)

    return(
        <div className='dataUser-container'>
           {user && user.picture ? 
                <img className='du-image' src={user.picture} alt="imagen de usuario" width="110" height="110" ></img> 
            : 
            <HiOutlinePhotograph style={{fontSize: 30, color:"grey"}}/>}
            <h4> Hola, {user.given_name}!</h4>

            <div className='dataUser-section'>
              <p>Nombre: {user.given_name}</p>
              <p>Apellido: {user.family_name}</p>
              <p>E-mail: {user.email}</p>
            </div>
        </div>
    )
}
export default DataUser;