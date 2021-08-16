import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { resetPassword } from '../../redux/actions/types/authActions'

const ResetForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch= useDispatch();
    const history = useHistory();
    const [error, setError] = useState('')
    const [input, setInput] = useState({
        oldPassword:'',
        password: '',
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

    function handleInputChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        (checkPassword.checkPassword && checkPassword.checkPassword === input.password) ?
         dispatch(resetPassword({oldPassword: input.oldPassword, password : input.password})) :   
        setError('Las contraseñas no coinciden')        
    }

    useEffect(() => {
        if(!user.reset) 
        history.push('/home')
    }, [user])


    return (
        <form className={'registerForm'} onSubmit={handleSubmit}>
            <div className='fields'>
            <FilledInput
                    placeholder="Antigua Contraseña"
                    variant="filled"
                    type={input.showPassword ? 'text' : 'password'}
                    name="oldPassword"
                    required
                    value={input.oldPassword}
                    onChange={handleInputChange}
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

                <FilledInput
                    placeholder="Nueva Contraseña"
                    variant="filled"
                    type={input.showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={input.password}
                    onChange={handleInputChange}
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
                {error ? <span>{error}</span> : null}
                <div className='btnStylesRegister'>
                    <Button type="submit" variant="contained" color="primary" >
                        Cambiar Contraseña
                    </Button>
                </div>

            </div>
        </form>
    )
}
export default ResetForm;