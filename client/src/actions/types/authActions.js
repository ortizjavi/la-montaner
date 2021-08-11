import axios from 'axios';
import * as actionTypes from '../names';
import * as endpoints from '../../utils/endpoints';

export function loginWithGoogle(token) {
  return async function(dispatch){  
    try {
        const response = await axios.post(`${endpoints.AUTH_LOGIN}`, 
        											{ google: token });
        console.log(response);
         return dispatch({ type: actionTypes.LOGIN_USER, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}

export function loginWithFacebook(token) {
  return async function(dispatch){  
    try {
        const response = await axios.post(`${endpoints.AUTH_LOGIN}`, 
        											{ facebook: token });
        console.log(response);
    	return dispatch({ type: actionTypes.LOGIN_USER, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}

export function loadUserSession() {
  return async function(dispatch){  
    let session = JSON.parse(sessionStorage.getItem('userSession'));
    if (session.user){
      dispatch({ type: actionTypes.LOGIN_USER, payload: session.user });
    }
    return
  }
}

