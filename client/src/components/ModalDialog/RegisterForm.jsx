import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { register } from '../../redux/actions/types/authActions'
import Button from '@material-ui/core/Button';
import ExternAuthentication from '../Authentication/Authentication';
import './LoginForm.css';

const RegisterForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [input, setInput] = useState({
        given_name: '',
        family_name: '',
        email: '',
        password: '',
        name: ''
    })

    const [checkPassword, setCheckPassword] = useState('')

    function handleChangePassword(event) {
        event.preventDefault();
        setCheckPassword(event.target.value)
    }

    function handleInputChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        user === `${input.given_name} ${input.family_name}` ? alert('ese usuario ya existe') :
        checkPassword && checkPassword === input.password ?
        dispatch(register({ ...input, name: `${input.given_name} ${input.family_name}` }),
         alert(`Bienvenido a La Montañés ${input.given_name} ${input.family_name}!`)) :
         alert('Las constraseñas no coinciden')
    }

    return (
        <form className={'registerForm'} onSubmit={handleSubmit}>
            <div className='fields'>
                <TextField
                    label="Nombre"
                    variant="filled"
                    name="given_name"
                    required
                    value={input.given_name}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Apellido"
                    variant="filled"
                    name="family_name"
                    required
                    value={input.family_name}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Email"
                    variant="filled"
                    name="email"
                    required
                    value={input.email}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Contraseña"
                    variant="filled"
                    type="password"
                    name="password"
                    required
                    value={input.password}
                    onChange={handleInputChange}
                />
                <p>Ingresa nuevamente tu contraseña</p>
                <TextField
                    label="Contraseña"
                    variant="filled"
                    type="password"
                    name="checkPassword"
                    required
                    value={checkPassword}
                    onChange={handleChangePassword}
                />
                <div className='btnStylesRegister'>
                    <Button type="submit" variant="contained" color="primary" >
                        Registrarse
                    </Button>
                </div>
                <ExternAuthentication register/>
            </div>
        </form>
    )
}

export default RegisterForm;