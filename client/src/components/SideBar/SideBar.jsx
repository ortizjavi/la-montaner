import React from "react";
import {NavLink} from "react-router-dom";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import SvgIcon from '@material-ui/core/SvgIcon';
import { BsHeart } from 'react-icons/bs';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import RateReviewIcon from '@material-ui/icons/RateReview';
import './SideBar.css';
import Tooltip from '@material-ui/core/Tooltip';



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
			{/* <MenuIcon/> */}
			{/* <h3 >Mi Cuenta</h3> */}
			</span>
			<div className='sidebar-section'>
			{/* <NavLink to='/dashboard' className='sidebar-navlink'>
				<ShoppingBasketIcon style={{ fontSize: 30, color:"grey" }} />
				<span className='sidebar-actived'>Mis compras</span>
			</NavLink> */}
			{/* <NavLink to='/dashboard' className='sidebar-navlink'>
				<FaFileInvoiceDollar style={{ fontSize: 30, color:"grey" }}/>
				<span>Facturación</span>
			</NavLink> */}
			{/* <NavLink to='/dashboard' className='sidebar-navlink'>
				<LocalShippingIcon style={{ fontSize: 30, color:"grey" }}/>
				<span>Enviados</span>				
			</NavLink> */}
			<Tooltip title='Favoritos' arrow placement="right-start">
				<NavLink to='/wishlist' className='sidebar-navlink'>
					<BsHeart style={{ fontSize: 40, color:"grey" }}/>
				</NavLink >
			</Tooltip>
			<Tooltip title='Mis Reviews' arrow placement="right-start">
				<NavLink to='/dashboard/userreviews' className='sidebar-navlink'>
					<RateReviewIcon style={{ fontSize: 40, color:"grey" }}/>
				</NavLink>
			</Tooltip>
			<Tooltip title='Modificar mis datos' arrow placement="right-start">
				<NavLink to='/dashboard/setting' className='sidebar-navlink'>
					<SettingsIcon style={{ fontSize: 40, color:"grey" }}/>
				</NavLink>
			</Tooltip>
			</div>
			</navigator>
		</div>
	)
}


export default SideBar;