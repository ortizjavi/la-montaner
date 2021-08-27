import { React } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaWhatsapp } from 'react-icons/fa';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { WHATSAPP_LINK } from '../../utils/constants';
import './FindUs.css';
//import { useForm } from 'react-hook-form';
//import swal from "sweetalert";

export default function FindUs() {
  const mapStyle = { height: '400px', width: '80%', margin: '0 auto' };
  const location = { lat: -31.73197584607406, lng: -64.45617099471914 };

  return (
    <div classsName="div-map">
      <div classsName="div-image-map">
        <LoadScript
          googleMapsApiKey="AIzaSyC7MPsGJ-Zbo5Tdt4xof6TPywH970pO0zw"
          className="loadScript-div"
        >
          <GoogleMap mapContainerStyle={mapStyle} zoom={15} center={location}>
            <Marker position={location}></Marker>
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="location-info">
        <h2> Nos encontramos en Villa Serranita, Córdoba </h2>

        <div className="caja-flex-pages">
          <div className="sub-caja-pages">
            <div>
              <ShoppingCartIcon className="icon-naranja" />
              <h2 className="texto-destacado titulo-retiro">Retiro</h2>
              <h5>(Pedidos ya realizados)</h5>
              <p>Lunes a viernes de 10:00 a 20.00 hs</p>
            </div>
          </div>

          <div className="sub-caja-pages">
            <div>
              <MailOutlineIcon className="icon-naranja" />
              <h2 className="texto-destacado titulo-retiro">Mail</h2>
              <h5>lamontanes@gmail.com</h5>
            </div>
          </div>

          <div className="sub-caja-pages">
            <div>
              <WhatsAppIcon className="icon-naranja" />
              <h2 className="texto-destacado titulo-retiro">Chat</h2>
              <h5>Horario:</h5>
              <p>Lunes a viernes de 10:00 a 20.00 hs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
