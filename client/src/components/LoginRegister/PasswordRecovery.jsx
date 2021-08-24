import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from "sweetalert";
import './LoginForm.css';
import { recoveryPassword } from "../../redux/actions/types/authActions";

const PasswordRecovery = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const loginFailed = useSelector(state => state.session.loginFailed);
  const history = useHistory();



  const handleSubmit = (event) => {
    event.preventDefault();
   
    dispatch(recoveryPassword({ email })).then((result) => {
      result && result.payload === "Invalid user" ?
        setError(loginFailed) :
        swal({
          title: "Revisa tu casilla de correo!",
          icon: "success",
          buttons: true,
        }).then((ok) => {
          if (ok) {
            history.push('/home')
          }
        })
      
    })
  }
  
const handleChange =(e) =>{
  setEmail(e.target.value)
if(!e.target.value){
  setError('')
}
}

  useEffect(() => {
    if(loginFailed) {
    setError(loginFailed);
    } else {
      setError('')
    }
  }, [loginFailed])
  
  
 



  return (
    <form className={'formStyles'} onSubmit={handleSubmit}>
      <div className={'title'}>Ingresá tu email</div>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={handleChange}
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

