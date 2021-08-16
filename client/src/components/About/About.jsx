import React from 'react';
import './About.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import aboutImg from "../../img/laMontanes.png";
import beerPinta from "../../img/beerPinta.png";

const AboutPage = () => {

    return (
        <div className="section-about">
            <div className="container-about">
                <div className="content-section">
                    <div className="title-about">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Eucalyp-Deus_Beer.png" alt="beerImage" width="100"/>
                        <h1>La Montañes</h1>
                    </div>
                    <div className="content">
                        <h3>Cervecería artesanal</h3>
                        <p> Nuestros principios son promover una economía justa y solidaria, centrada en la valorización del ser humano y no en la priorización del capital.
                        Consumiendo productos locales no sólo contribuimos a mejorar la economía local sino que también ayudamos al medio ambiente y fomentamos las relaciones sociales dentro de la comunidad. 
                        </p>
                        <p className="content_p">Nos encontramos en Villa Paravachasca, Córdoba, Argentina.</p>
                    <div className="button_about">
                        <a href='https://www.instagram.com/lamontanes/' target='_blank'>Ver mas</a>
                    </div>
                    </div>
                    <div className='social'>
                    <p>Seguinos en nuestras redes!</p>
                        <a href="https://www.facebook.com/pablo.alisio" target='_blank'><FacebookIcon className="social_icons"/></a>
                        <a href='https://www.instagram.com/lamontanes/' target='_blank'><InstagramIcon className="social_icons"/></a>
                    </div>
                </div>
                <div className="image-section">
                    <img src={aboutImg} alt="beerImage"/>
                    <img src={beerPinta} alt="beerImage"/>
                </div>
            </div>
            
        </div>
    )
}

export default AboutPage;