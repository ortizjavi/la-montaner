import axios from 'axios';

import * as actionTypes from '../names';

import { ADMIN_CATEGORY } from '../../utils/endpoints';

export function createCategory(name) {
  return async function(dispatch) {
    try {
        const response = await axios.post(`${ADMIN_CATEGORY}`, {name});
        return dispatch({ type: actionTypes.CREATE_CATEGORY, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}

export function getCategories() {
  return async function(dispatch) {
    try {
        const response = await axios.get(`${ADMIN_CATEGORY}`);
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
           url: `${ADMIN_CATEGORY}`,
           data: category
        });
        return dispatch({ type: actionTypes.DELETE_CATEGORY, payload: response.data._id });
    } catch(e) {
      
    }
  }
}
