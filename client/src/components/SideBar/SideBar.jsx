import React from "react";
import {NavLink} from "react-router-dom";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import SvgIcon from '@material-ui/core/SvgIcon';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import './SideBar.css';



function SideBar(){

	function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }

	return( 
	<div> 
		<navigator className="sidebar-container">
			<span className='sidebar-title'>
			<MenuIcon/>
			<h3 >Mi Cuenta</h3>
			</span>
			<div className='sidebar-section'>
			<NavLink to='/dashboard' className='sidebar-navlink'>
				<ShoppingBasketIcon style={{ fontSize: 30, color:"grey" }} />
				<span>Compras</span>
			</NavLink>
			<NavLink to='/dashboard' className='sidebar-navlink'>
				{/* <DescriptionIcon style={{ fontSize: 30, color:"grey" }}/> */}
				<FaFileInvoiceDollar style={{ fontSize: 30, color:"grey" }}/>
				<span>Facturación</span>
			</NavLink>
			{/* <NavLink to='/dashboard' className='sidebar-navlink'>
				<LocalShippingIcon style={{ fontSize: 30, color:"grey" }}/>
				<span>Enviados</span>				
			</NavLink> */}
			<NavLink to='/dashboard/setting' className='sidebar-navlink'>
				<SettingsIcon style={{ fontSize: 30, color:"grey" }}/>
				<span>Configuración</span>				
			</NavLink>
			</div>
			</navigator>
		</div>
	)
}


export default SideBar;