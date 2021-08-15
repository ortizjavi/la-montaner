import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import {WHATSAPP_LINK} from '../../utils/constans';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

//icons
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";


const Footer = ()=>{

    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }

    return(
        <div>
            <div className="container-footer">
              <div className="row-footer">

              <div className="footer-col">
                <h4 className="footer-title">La Montañés </h4>
                <ul>
                  <NavLink className='footer-navLink' to={'/about'}><li><a href="#">sobre nosotros</a></li></NavLink>
                  <NavLink className='footer-navLink' to={'/home'}><li><a href="#">nuestras cervezas</a></li></NavLink>
                  <li>Valle de Paravachasca, Córdoba</li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Preguntas Frecuentes </h4>
                <ul>
                <NavLink to={'/faq'}> <li><a href="#">FAQ</a></li> </NavLink>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Contactanos </h4>
                <ul>
                  <li>montaner@gmail.com</li>
                  <li><a href={WHATSAPP_LINK} target="_blank"><FaWhatsapp /> +12312343</a></li>
                </ul>
              </div>
              <div className="footer-col">
              <div class="social-links">
                <h4>Seguinos </h4>
                <ul>
                  <li><a href="https://www.facebook.com/pablo.alisio" target='_blank'><FaFacebookF /></a></li>
                  <li><a href="https://www.instagram.com/lamontanes/" target='_blank'><FaInstagram /></a></li>
                </ul>
                </div>
              </div>
              {/* <div className="footer-col">
                 <a className='footer-icon-w' href={WHATSAPP_LINK} target="_blank">
                    <WhatsAppIcon style={{ fontSize: 160 }} />
                 </a>
             </div> */}
              </div>             
            </div>
        </div>
    )
}

export default Footer;
