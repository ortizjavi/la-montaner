import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';





const UserSetting =  () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const [input, setInput] = useState({name: user.name, image:'', phone:'', age:'', adress:'', dni:'',});
    document.title=user.name

    const handleSubmit = e =>{
      e.preventDefault();
      alert('creado con éxito')
    }

    const handleChange = (event) =>{
        event.preventDefault()
      setInput({...input, [event.target.name]: event.target.value,})
      console.log('usersetting/event', event.target.value)
    }
    const uploadImage = (files)=>{
        console.log('usersetting/files',files[0])

    }

    return(
        <section>
          <br></br>
            <h1> Modifica tus datos</h1>
            <br></br>
            <>
            <form className='form_user' onSubmit={ e => handleSubmit(e)}>
              <section className='section_create'>
                <label>Nombre  </label>
                <input  name="name" value={input.name} placeholder={user.name} onChange={handleChange}/>
                <br></br>
              </section>

              <section className='section_create'>
                <label>Imagen  </label>
                <input name="image" type='file' value={input.image} onChange={handleChange, e    => uploadImage(e.target.files)}/>
                <br></br>
              </section>

              <section className='section_create'>
                <label>Telefono</label>
                <input name="phone" value={input.phone} onChange={handleChange}/>
                <br></br>
              </section>

              <section className='section_create'>
                <label>Edad</label>
                <input name="age" value={input.age}  onChange={handleChange}/>
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
            </form>
            </>
            <NavLink to={'/dashboard'}>
                Regresar
            </NavLink>
        </section>
    )
}

export default UserSetting;