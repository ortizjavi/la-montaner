import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExternAuthentication from '../Authentication/Authentication';

const LoginForm = ({ handleClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(firstName, lastName, email, password);
        handleClose();
    }

    useEffect(() => {
      if (user){
        const isUser = user.role;
        const isAdmin = user.role && user.role === 'ADMIN';
        isAdmin ? history.push('/admin') : history.push('/dashboard');
        if (!isUser){
          history.push('/login');
        }
      }
    }, [user])

    return (
        <form  onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
            <ExternAuthentication />
          </div>
        </form>
      );
    };

 export default LoginForm;
    

