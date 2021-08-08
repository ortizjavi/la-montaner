import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import {WHATSAPP_LINK} from '../../utils/constans';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SvgIcon from '@material-ui/core/SvgIcon';


const Footer = ()=>{

    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }

    return(
        <div className='footer-container'>
            <div >
                <NavLink className='footer-h4-l' to={'/'}>
                    <h4> Sobre Nosotros </h4>
                </NavLink>    
                <NavLink className='footer-h4-l' to={'/'}>
                    <h4> Preguntas Frecuentes</h4>
                </NavLink>    
            </div>
            <div className='footer-i'>
                <i>Valle de Paravachasca, Cordoba </i>
            </div>
            <div>
                <h4 className='footer-h4'>Seguinos</h4>
                <div>
                <NavLink className='footer-icon' to={'/'}>
                    <InstagramIcon style={{ fontSize: 40 }} color="" />
                </NavLink>
                <NavLink className='footer-icon' to={'/'}>
                    <FacebookIcon style={{ fontSize: 40 }} color=""/>
                </NavLink>
                </div>
            </div>
            <div>
                <a className='footer-icon-w' href={WHATSAPP_LINK} target="_blank">
                        <WhatsAppIcon style={{ fontSize: 60 }} />
                </a>
            </div>
        </div>
    )
}

export default Footer;