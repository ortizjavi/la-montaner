import React,{useState, useEffect} from 'react';
import './Sidebar.css';
// import { NavLink } from 'react-router-dom';
// import SearchBar from '../SearchBar/SearchBar';


function Sidebar() {

  return (
    <navigator className="sidebar-container">
        <div className='sidebar-title'>
            <picture>
                <img className='sidebar-img' src="https://live.staticflickr.com/65535/51362991144_97764de6d9_m.jpg" alt="Vaso de Cerveza" />
            </picture>
            <h1>NUESTRA <br></br> CERVEZAS </h1>
        </div>
            <div>
                <ul className="list-sidebar"  >
                    <li className='list_sidebar-li'>
                        <select className='select-sidebar' name="estilos" ></select>Estilos 
                    </li>
                    <li className='list_sidebar-li'>
                         <select className='select-sidebar' name="volumen" > </select>Volumen
                    </li>
                    <li className='list_sidebar-li'>
                        <select className='select-sidebar' name="precio" ></select>Precio 
                    </li>
                    <li className='list_sidebar-li'>
                        <select className='select-sidebar' name="ibu-s" ></select>IBU's 
                    </li>
                </ul>
            </div>
            <h4 className='sb-h4'>Las mejores cervezas  de <br></br> Cordoba</h4>
    </navigator>

  );
};

export default Sidebar;


