import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FilledInput from '@material-ui/core/FilledInput';
import { register } from '../../redux/actions/types/authActions'
import Button from '@material-ui/core/Button';
import ExternAuthentication from '../Authentication/Authentication';
import './LoginForm.css';


const RegisterForm = () => {
    const dispatch = useDispatch()
    const registerFailed = useSelector(state => state.session.registerFailed);
    const [error, setError] = useState('')
    const pRgx = new RegExp(`^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$`)
    const eRgx = new RegExp(`[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?`)
    const [input, setInput] = useState({
        given_name: '',
        family_name: '',
        email: '',
        password: '',
        name: '',
        showPassword: false,
    })
    const [checkPassword, setCheckPassword] = useState({
        checkPassword: '',
        showCheckPassword: false,
    })

    function handleClickShowCheckPassword() {
        setCheckPassword({
            ...checkPassword,
            showCheckPassword: !checkPassword.showCheckPassword
        })
    }


    function handleClickShowPassword() {
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
        setCheckPassword({
            ...checkPassword,
            [event.target.name]: event.target.value
        })
    }

    function handleInputPassword(event) {
        if (!event.target.value) {
            setError('')
        }
        else if (pRgx.test(event.target.value)) {
            setError(`La contraseña debe contener:  
            al menos ocho caracteres, 
            un número,
            una letra mayúscula,
            una letra minúscula y
            un carácter especial.`)
        } else {
            setError('')
        }
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleInputMail(event) {
        if (!event.target.value) {
            setError('')
        }
        else if (!eRgx.test(event.target.value)) {
            setError(`Debes proveer una dirección de email válida.`)
        } else {
            setError('')
        }
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }


    function handleInputChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();

        (checkPassword.checkPassword && checkPassword.checkPassword !== input.password) ?
            setError('Las contraseñas no coinciden') :
            dispatch(register({ ...input, name: `${input.given_name} ${input.family_name}` }))
        console.log(registerFailed)
    }

    useEffect(() => {
        if (registerFailed)
            setError(registerFailed);

    }, [registerFailed])



    return (
        <form className={'registerForm'} onSubmit={handleSubmit}>
            <div className={'title'}>Ingresá tus datos y registrate</div>
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
                    type="email"
                    value={input.email}
                    onChange={handleInputMail}
                />

                <FilledInput
                    placeholder="Contraseña *"
                    label="Contraseña"
                    variant="filled"
                    type={input.showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={input.password}
                    onChange={handleInputPassword}
                    endAdornment={
                        <InputAdornment position="end" >
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
                    placeholder="Contraseña *"
                    label="Contraseña"
                    variant="filled"
                    type={checkPassword.showCheckPassword ? 'text' : 'password'}
                    name="checkPassword"
                    required
                    value={checkPassword.checkPassword}
                    onChange={handleChangePassword}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowCheckPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {checkPassword.showCheckPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {error ? <span className='errorMsg'>{error}</span> : null}
                <div className='btnStylesRegister'>
                    <Button type="submit" variant="contained" color="primary" >
                        Registrarse
                    </Button>
                </div>
                <div className={'titleRegister'}>¿Ya tienes cuenta?
                    <Link to={'/login'}> Acceder</Link>
                </div>
                <ExternAuthentication register />
            </div>
        </form>
    )
}

export default RegisterForm;