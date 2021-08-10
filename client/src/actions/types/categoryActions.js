import axios from 'axios';

import * as actionTypes from '../names';

import { ADMIN_CATEGORY_ENDPOINT } from '../../utils/endpoints';

export function createCategory(name) {
  return async function(dispatch) {
    try {
        const response = await axios.post(`${ADMIN_CATEGORY_ENDPOINT}`, {name});
        return dispatch({ type: actionTypes.CREATE_CATEGORY, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}

export function getCategories() {
  return async function(dispatch) {
    try {
        const response = await axios.get(`${ADMIN_CATEGORY_ENDPOINT}`);
        return dispatch({ type: actionTypes.GET_CATEGORIES, payload: response.data });
    } catch(e) {
      
    }
  }
}

export function deleteCategories(category) {
  return async function(dispatch) {
    try {
        const response = await axios({
           method: 'delete',
           url: `${ADMIN_CATEGORY_ENDPOINT}`,
           data: category
        });
        return dispatch({ type: actionTypes.DELETE_CATEGORY, payload: response.data._id });
    } catch(e) {
      
    }
  }
}
