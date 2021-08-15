import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
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
        name: '',
        showPassword: false,
    })
    const [checkPassword, setCheckPassword] = useState({
        checkPassword:'',
        showCheckPassword: false,
    })
    

    function handleClickShowPassword() {
        setCheckPassword({
            ...checkPassword,
            showCheckPassword: !checkPassword.showCheckPassword
        })
        setInput({
                ...input, 
                showPassword: !input.showPassword
            })
    };
    
    function handleMouseDownPassword(e) {
        e.preventDefault();
    };

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
                    variant="outlined"
                    name="given_name"
                    required
                    value={input.given_name}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Apellido"
                    variant="outlined"
                    name="family_name"
                    required
                    value={input.family_name}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    required
                    value={input.email}
                    onChange={handleInputChange}
                />
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                
                    label="Contraseña"
                    variant="outlined"
                    type={input.showPassword ? 'text' : 'password' }
                    name="password"
                    required
                    value={input.password}
                    onChange={handleInputChange}
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {input.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                    }
                />
                <p>Ingresa nuevamente tu contraseña</p>
                <FilledInput
                
                    label="Contraseña"
                    variant="outlined"
                    type={checkPassword.showCheckPassword ? 'text' : 'password'}
                    name="checkPassword"
                    required
                    value={checkPassword.checkPassword}
                    onChange={handleChangePassword}
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {checkPassword.checkPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                    }
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