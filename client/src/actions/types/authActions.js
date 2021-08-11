import axios from 'axios';
import * as actionTypes from '../names';
import * as endpoints from '../../utils/endpoints';

export async function loginWithGoogle(token) {
  return async function(dispatch){  
    try {
        const response = await axios.post(`${endpoints.AUTH_LOGIN}`, 
        											{ google: token });
         return dispatch({ type: actionTypes.LOGIN_USER_GOOGLE, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}

export async function loginWithFacebook(token) {
  return async function(dispatch){  
    try {
        const response = await axios.post(`${endpoints.AUTH_LOGIN}`, 
        											{ facebook: token });
         return dispatch({ type: actionTypes.LOGIN_USER_FACEBOOK, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}

