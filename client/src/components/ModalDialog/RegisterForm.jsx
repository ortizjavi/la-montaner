import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { register } from '../../redux/actions/types/authActions'
import Button from '@material-ui/core/Button';

  const RegisterForm = () => {
    const dispatch = useDispatch()
   
    const [input, setInput] = useState({
        given_name: '',
        family_name: '',
        email:'', 
        password: '',
        name:''
    })

    function handleInputChange(event){
       setInput({
           ...input,
            [event.target.name]: event.target.value
        })
    }
    
 function handleSubmit(event){
      event.preventDefault();
      console.log(input)
      dispatch(register(input));
   }

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <TextField
        label="Name"
        variant="filled"
        name="given_name"
        
        value={input.given_name}
        onChange={handleInputChange}
      />
            <TextField
        label="Lastname"
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
        label="Password"
        variant="filled"
        type="password"
        name="password"
        required
        value={input.password}
        onChange={handleInputChange}
      />
      <Button type="submit" variant="contained" color="primary" >
              Registrarse
            </Button>
      </div>
      </form>
    )
}

export default RegisterForm;