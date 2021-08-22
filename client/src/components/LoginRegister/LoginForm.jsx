import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FilledInput from '@material-ui/core/FilledInput';
import ExternAuthentication from '../Authentication/Authentication';
import './LoginForm.css';
import { Link } from 'react-router-dom'
import { login } from "../../redux/actions/types/authActions";

const LoginForm = () => {
    const dispatch = useDispatch()
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')
    const user = useSelector(state => state.session.user);
    const loginFailed = useSelector(state => state.session.loginFailed);
    const history = useHistory();

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword)
  };
 const handleMouseDownPassword = (e) => {
    e.preventDefault();
};

    const handleSubmit = (event) => {
        event.preventDefault();
       dispatch(login({email, password}))
    }

    useEffect(() => {
      if(loginFailed) 
      setError(loginFailed);
  
    }, [loginFailed])

    useEffect(() => {
      if (user.role){
        if(user.reset){
          return history.push('/reset')
        }
        history.push('/home');
      }
    }, [user])

    return (
        <form className={'formStyles'} onSubmit={handleSubmit}>
          <div className={'title'}>Ingresá tu email y tu contraseña</div>
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FilledInput
          label="Contraseña"
          variant="filled"
          type={showPassword ? 'text' : 'password'}
          name="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          endAdornment={
              <InputAdornment position="end" >
                  <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                  >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
              </InputAdornment>
          }
      /> 
          <div className='btnStyles'>
            <Button type="submit" variant="contained" color="primary">
              Acceder
            </Button>
            </div>
            {error ? <span className='errorMsg'>{error}</span> : null}
            <div className={'title'}>¿No tienes cuenta?  
             <Link to={'/register'}> Regístrate</Link>
            </div> 
            <div className={'titlePass'}>
              <Link to={'/pass'}>Olvidé mi contraseña</Link>
           </div>
            <div>
            <ExternAuthentication/>
            </div>
          
        </form>
      );
    };

 export default LoginForm;
    

