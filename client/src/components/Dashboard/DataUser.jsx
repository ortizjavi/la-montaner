import React from 'react';
import {NavLink} from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';
import { HiOutlinePhotograph  } from 'react-icons/hi';
import { FaComments  } from 'react-icons/fa';
import { IoIosNotificationsOutline  } from 'react-icons/io';
import './DataUser.css';

const DataUser = () =>{
    return(
        <div className='dataUser-container'>
            <HiOutlinePhotograph style={{fontSize: 30, color:"grey"}}/>
            Hola, {'Nombre'}
            <div className='dataUser-section'>
                <NavLink to='/dashboard'>
                    <BsHeart style={{ fontSize: 30, color:"grey" }}/>
                    <h5>Lista De Deseos</h5>
                </NavLink>
                <NavLink to='/dashboard'>
                    <FaComments style={{fontSize: 30, color:"grey"}}/>
                    <h5> Comentarios</h5>
                </NavLink>
                <NavLink to='/dashboard'>
                    <IoIosNotificationsOutline style={{fontSize: 30, color:"grey"}}/>
                    <h5>Notificaciones</h5>
                </NavLink>

            </div>
        </div>
    )
}
export default DataUser;