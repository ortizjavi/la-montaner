import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './UserSetting.css'
import {UPDATE_USER} from '../../utils/endpoints';
import loader from './loader.gif'
import swal from "sweetalert";


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
    const [loading, setLoading] = useState(true)

    const handleSubmit = async e =>{
      e.preventDefault();
      try {
        const resp = await axios.put(`${UPDATE_USER}/${user._id}`, {...input,
          name: input.given_name +' '+ input.family_name
        }).then(res => res.data.ok ? swal({title: "Cambios agregados con éxito", icon: "success",})
        : swal({title: "Intenta de nuevo", icon: "warning", dangerMode: true}))
      } catch (error) {
        console.log('components/UserSetting/Error ',error);
      }
      window.location.reload()
    }

    const handleChange = (event) =>{
        event.preventDefault()
      setInput({...input, [event.target.name]: event.target.value,})
    }
    
    const uploadImage = async (e) => {
    setLoading(false)
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
          setLoading(true)
        })
        .catch((err) => console.log('UserSetting/uploadImage/Error: ',err));
    };


    return(
      <>
        <NavLink to='/dashboard'>
              <p className='setting-volver'>&#x2B05; Volver</p>
        </NavLink>
        <section className='userSetting-container'>
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
                <p>Carga una foto para tu cuenta</p>
                {
                  loading ? <img className='usersetting-img' src={input.picture} /> 
                  : <img className='usersetting-img' src={loader} /> 
                }
                
                <input class="custom-file-input" name="picture" accept="image/*" type='file'  onChange={uploadImage}/>
                <button className='us-button' type='button' onClick={() => setInput({...input, picture:''})}>Borrar</button>
              </section>
            </form>
              <button className='us-button' type="submit" onClick={handleSubmit}>Agregar los Cambios</button>
            </>
        </section>
        <NavLink to='/dashboard'>
              <p className='setting-volver'>&#x2B05; Volver</p>
        </NavLink>
      </>
    )
}

export default UserSetting;