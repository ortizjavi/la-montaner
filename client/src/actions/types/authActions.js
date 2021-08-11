import axios from 'axios';
import * as actionTypes from '../names';
import * as endpoints from '../../utils/endpoints';

export async function loginWithGoogle(token) {
    try {
        const response = await axios.post(`${endpoints.AUTH_LOGIN}`, 
        											{ google: token });
        // return dispatch({ type: actionTypes.LOGIN_USER, payload: response.data});
    } catch(e) {
      console.log(e);
    }
}

