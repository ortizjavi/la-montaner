import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { register } from '../../redux/actions/types/authActions'
import Button from '@material-ui/core/Button';
import './LoginForm.css';

const RegisterForm = () => {
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        given_name: '',
        family_name: '',
        email: '',
        password: '',
        name: ''
    })

    function handleInputChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(register({ ...input, name: `${input.given_name} ${input.family_name}` }));
    }

    return (
        <form className={'registerForm'} onSubmit={handleSubmit}>
            <div>
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
                <div className='btnStylesRegister'>
                    <Button type="submit" variant="contained" color="primary" >
                        Registrarse
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default RegisterForm;