import axios from 'axios';
import * as actionTypes from '../names';
import * as endpoints from '../../utils/endpoints';

export function loginWithGoogle(token) {
  return async function(dispatch){  
    try {
        const response = await axios.post(`${endpoints.AUTH_LOGIN}`, 
        											{ google: token });
        console.log(response);
         return dispatch({ type: actionTypes.LOGIN_USER_GOOGLE, payload: response.data});
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
    	return dispatch({ type: actionTypes.LOGIN_USER_FACEBOOK, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}

