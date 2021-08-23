import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginForm.css';
import { recoveryPassword } from "../../redux/actions/types/authActions";

const PasswordRecovery = () => {
    const dispatch = useDispatch()
    const[email, setEmail] = useState('');
    const[name, setName] = useState('');
    const [error, setError] = useState('')
    const user = useSelector(state => state.session.user);
    const loginFailed = useSelector(state => state.session.loginFailed);
    const history = useHistory();

 

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('sadasdas')
      dispatch(recoveryPassword({email, name}))
    }

    useEffect(() => {
      if(loginFailed) 
      setError(loginFailed);
  
    }, [loginFailed]) 

   /*  useEffect(() => {
      if (user.role){
        if(user.reset){
          return history.push('/reset')
        }
        history.push('/home');
      }
    }, [user]) */

    return (
        <form className={'formStyles'} onSubmit={handleSubmit}>
          <div className={'title'}>Ingresá tu email</div>
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Name"
            variant="filled"
            type="name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
            {error ? <span className='errorMsg'>{error}</span> : null}
      
          <div className='btnStyles'>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
            </div>
        </form>
      );
    };

 export default PasswordRecovery;
    
