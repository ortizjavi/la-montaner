import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './UserSetting.css'




const UserSetting =  () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const [input, setInput] = useState({name: user.name, image: '', phone:'', email:'', adress:'', dni:'',});

    const handleSubmit = e =>{
      e.preventDefault();
      alert('creado con éxito')
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
          setInput({...input, image: res.data.secure_url});
        })
        .catch((err) => console.log('UserSetting/uploadImage/Error: ',err));
  };

    console.log('usersetting/user',user)

    return(
        <section className='userSetting-container'>
          <br></br>
            <h1> Modifica tus datos</h1>
            <br></br>
            <>
            <form className='userSetting-form' onSubmit={ e => handleSubmit(e)}>
              <section className='section_create'>
                <label>Nombre  </label>
                <input  name="name" value={input.name} placeholder={user.name} onChange={handleChange}/>
                <br></br>
              </section>

              <section className='section_create'>
                <br></br>
                <label>Imagen  </label>
                <br></br>
                <img className='usersetting-img' src={input.image ? input.image :  user.picture} />
                <br></br>
                <input class="custom-file-input" name="image" accept="image/*" type='file'  onChange={uploadImage}/>
                <br></br>
                <button type='button' onClick={() => setInput({...input, image:''})}> Borrar</button>
                <br></br>
              </section>

              <section className='section_create'>
                <label>Telefono</label>
                <input name="phone" value={input.phone} onChange={handleChange}/>
                <br></br>
              </section>

              <section className='section_create'>
                <label>Correo</label>
                <input name="email" value={input.email}  onChange={handleChange}/>
                <br></br>
              </section>

              <section className='section_create'>
                <label>Direccion  </label>
                <input name="adress" multiple value={input.adress} onChange={handleChange}/>
                <br></br>
              </section>
              <section className='section_create'>
                <label>DNI </label>
                <input name="dni" multiple value={input.dni} onChange={handleChange}/>
                <br></br>
              </section>
                <button type="submit">Modificar</button>
                <br></br>
            <NavLink to={'/dashboard'}>
                Regresar
            </NavLink>
            </form>
            </>
        </section>
    )
}

export default UserSetting;