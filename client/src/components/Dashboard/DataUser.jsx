import React from 'react';
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';
import { HiOutlinePhotograph  } from 'react-icons/hi';
import { FaComments  } from 'react-icons/fa';
import { IoIosNotificationsOutline  } from 'react-icons/io';
import './DataUser.css';

const DataUser = () =>{
    const user = useSelector((state) => state.session.user);

    console.log('datauser/user:',user.name)

    return(
        <div className='dataUser-container'>
           {user && user.picture ? 
                <img className='du-image' src={user.picture} alt="imagen de usuario" width="80" height="80" ></img> 
            : 
            <HiOutlinePhotograph style={{fontSize: 30, color:"grey"}}/>}
            <h4> Hola, {user.name.split(' ')[0]}</h4>

            <div className='dataUser-section'>
                <NavLink className='du-link' to='/wishlist'>
                    <BsHeart style={{ fontSize: 30, color:"grey" }}/>
                    <h5>Lista De Deseos</h5>
                </NavLink >
                <NavLink className='du-link' to='/dashboard'>
                    <FaComments style={{fontSize: 30, color:"grey"}}/>
                    <h5> Comentarios</h5>
                </NavLink>
                <NavLink className='du-link' to='/dashboard'>
                    <IoIosNotificationsOutline style={{fontSize: 30, color:"grey"}}/>
                    <h5>Notificaciones</h5>
                </NavLink>

            </div>
        </div>
    )
}
export default DataUser;