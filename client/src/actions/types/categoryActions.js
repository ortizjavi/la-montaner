import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY } from '../names';
import { GET_CATEGORY_ENDPOINT, CREATE_CATEGORY_ENDPOINT } from '../../utils/endpoints';

export function createCategory(name) {
  return async function(dispatch) {
    try {
        const response = await axios.post(`${CREATE_CATEGORY_ENDPOINT}`, {name});
        return dispatch({ type: CREATE_CATEGORY, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}

export function getCategories() {
  return async function(dispatch) {
    try {
        const response = await axios.get(`${GET_CATEGORY_ENDPOINT}`);
        return dispatch({ type: GET_CATEGORIES, payload: response.data });
    } catch(e) {
      
    }
  }
}
