import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './UserSetting.css'
import {UPDATE_USER} from '../../utils/endpoints';


const UserSetting =  () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [input, setInput] = useState({
      name: user.name,
      given_name: user.given_name, 
      family_name: user.family_name,
      picture: user.picture, 
      email: user.email, 
      // adress: '', 
      });
    const handleSubmit = async e =>{
      e.preventDefault();
      try {
        const resp = await axios.put(`${UPDATE_USER}/${user._id}`, {...input,
          name: input.given_name +' '+ input.family_name
        }).then(res => res.data.ok ? alert('Cambios agragados con éxito') : alert('Intentalo nuevamente')).then(window.location.reload())
      } catch (error) {
        console.log('components/UserSetting/Error ',error);
      }
    }

    const handleChange = (event) =>{
        event.preventDefault()
      setInput({...input, [event.target.name]: event.target.value,})
    }
    
    const uploadImage = async (e) => {

    const files = e.target.files;
    const images = new FormData();
    const axiosInstance = axios.create();
    delete axiosInstance.defaults.headers.common['authorization']
    images.append("file", files[0]);
    images.append("upload_preset", "laMontanes");
    await axiosInstance
        .post(
          "https://api.cloudinary.com/v1_1/la-montanes/image/upload",
          images,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            // onUploadProgress(e) {
            //   setLoadingImg(Math.round((e.loaded * 100) / e.total));
            // },
          }
        )
        .then((res) => {
          setInput({...input, picture: res.data.secure_url});
        })
        .catch((err) => console.log('UserSetting/uploadImage/Error: ',err));
    };

    

    return(
        <section className='userSetting-container'>
          <NavLink to='/dashboard'>
                <p>&#x2B05; Volver</p>
          </NavLink>
          <br></br>

            <h3>¿Deseas modificar tus datos?</h3>
            <br></br>
            <>
            <form className='userSetting-form' onSubmit={ e => handleSubmit(e)}>
              <section className='section_create'>
                <label>Nombre: </label>
                <input  name="given_name" value={input.given_name} placeholder={user.given_name} onChange={handleChange}/>
                <br></br>
              {/* </section> */}

              {/* <section className='section_create'> */}
                <label>Apellido: </label>
                <input  name="family_name" value={input.family_name} placeholder={user.family_name} onChange={handleChange}/>
                <br></br>
              {/* </section> */}
              
              {/* <section className='section_create'> */}
                <label>e-mail:    </label>
                <input name="email" value={input.email}  onChange={handleChange}/>
                <br></br>
              </section>

              <section className='section_create-us-section-img'>
                <p>Carga una foto</p>
                <img className='usersetting-img' src={input.picture } />
                <input class="custom-file-input" name="picture" accept="image/*" type='file'  onChange={uploadImage}/>
                <button className='us-button' type='button' onClick={() => setInput({...input, picture:''})}>Borrar</button>
              </section>

              {/* <section className='section_create'>
                <label>Telefono</label>
                <input name="phone" value={input.phone} onChange={handleChange}/>
                <br></br>
              </section> */}

              {/* <section className='section_create'>
                <label>Direccion  </label>
                <input name="adress" multiple value={input.adress} onChange={handleChange}/>
                <br></br>
              </section> */}

              {/* <section className='section_create'>
                <label>DNI </label>
                <input name="dni" multiple value={input.dni} onChange={handleChange}/>
                <br></br>
              </section> */}

            {/* <NavLink className='us-button' to={'/dashboard'}>
                Regresar
              </NavLink> */}
            </form>
              <button className='us-button' type="submit" onClick={handleSubmit}>Agregar Los Cambios</button>
            </>
            <NavLink to='/dashboard'>
                <p>&#x2B05; Volver</p>
          </NavLink>
        </section>
    )
}

export default UserSetting;