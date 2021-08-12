import axios from 'axios';
import * as actionTypes from '../names';
import * as endpoints from '../../../utils/endpoints';

export function login(payload) {
  return async function(dispatch){
    try {
      const response = await axios.post(`${endpoints.AUTH_LOGIN}`, payload);
      return dispatch({
         type: actionTypes.LOGIN_USER, 
         payload: setUserSession(response.data)
      });
    } catch(e) {
      console.log(e);
    }
  }
}

function setUserSession(data){
  const { token, ...userProps } = data;
  setAuthDefaulHeaders(token);
  localStorage.setItem('session', JSON.stringify({ token }))
  return userProps;
}

export function logout(){
  localStorage.removeItem('session');
  deleteAuthDefaultHeaders();
  return { 
    type: actionTypes.LOGIN_USER, 
    payload: {}
  }
}


function setAuthDefaulHeaders(token) {
  axios.defaults.headers.common['authorization'] = token;
}

function deleteAuthDefaultHeaders() {
  delete axios.default.headers.common['authorization'];
}