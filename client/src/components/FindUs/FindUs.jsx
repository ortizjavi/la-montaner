import { React } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaWhatsapp } from "react-icons/fa";
import {WHATSAPP_LINK} from '../../utils/constants';
import './FindUs.css';
//import { useForm } from 'react-hook-form';
//import swal from "sweetalert";

export default function FindUs() {
  const mapStyle = { height: '400px', width: '600px', margin: '0 auto'};
  const location = { lat: -30.856862725386204, lng: -64.51534707428485};
  // const { register, errors, handleSubmit } = useForm();

  // const handleForm = (data, e) => {
  // 	console.log('datos enviados')
  // 	e.target.reset();
  // 	swal('Su consulta ha sido enviada', 
  //     {
  // 		icon: "success",
  // 	});
  // };
  
  return (
  <div classsName='div-map'>
    <div classsName='div-image-map'>
      <LoadScript googleMapsApiKey='AIzaSyC7MPsGJ-Zbo5Tdt4xof6TPywH970pO0zw' className='loadScript-div'>
        <GoogleMap
          mapContainerStyle={mapStyle}
          zoom={15}
          center={location}
        >
          <Marker position={location}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
      <div className='location-info'>
        <h2> Nos encontramos en Cordoba </h2>
        <h3>Por cualquier consulta escribinos:</h3>
        <p>Por Whatsapp: </p>
        <a href={WHATSAPP_LINK} target="_blank" rel='noopener noreferrer'><FaWhatsapp /></a>

          <div>
            <p>Por mail:</p>
            {/* <form onSubmit={handleSubmit(handleForm)}>
            <h3>Nombre y apellido </h3>
            input
            className='inputs'
            type='text'
            {...register('name', { required: true, minLength: 4 })}
            />

            <span>{errors?.name?.message}</span>
            <h3>Asunto: </h3>
            <input
            className='inputs'
            type='text'
            {...register('subject', { required: true, minLength: 3 })}
            />

            <h3>Mensaje: </h3>
				<textarea
				className='messageInput'
                {...register('message', {
                required: true,
                minLength: 4,
                maxLength: 150,
                })}
                ></textarea>
                <br />
                <button className='contactBtn'>enviar</button>
          </form> */}
          </div>
      </div>
    </div>
  )
}
