import axios from 'axios';

import { 
  GET_PRODUCT_DETAIL,
  ALL_PRODUCTS,
  CREATE_CATEGORY,
  GET_CATEGORIES,
  DELETE_CATEGORY
} from './names';

import { 
  GET_PRODUCTS_ENDPOINT,
  CREATE_PRODUCT_ENDPOINT,
  UPDATE_PRODUCT_ENDPOINT,
  DELETE_PRODUCT_ENDPOINT,
  ADMIN_CATEGORY_ENDPOINT,
} from '../constants';

export function getProductDetail(id) {
  return async function(dispatch) {
    try {
        const productDetail = await axios.get(`${GET_PRODUCTS_ENDPOINT}/${id}`);
        return dispatch({ type: GET_PRODUCT_DETAIL, payload: productDetail.data });
    } catch(e) {
      console.log(e);
    }
  }
}
export function getAllProducts(query) {
  return async function(dispatch) {
    try {
        const response = await axios.get(`${ADMIN_CATEGORY_ENDPOINT}?name=${query}`);    
        return dispatch({ type: ALL_PRODUCTS, payload: response.data });
    } catch(e) {
      console.log('actions/types/getAllProducts-Error:',e);
    }
  }
}

export function createCategory(name) {
  return async function(dispatch) {
    try {
        const response = await axios.post(`${ADMIN_CATEGORY_ENDPOINT}`, {name});
        return dispatch({ type: CREATE_CATEGORY, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}

export function getCategories() {
  return async function(dispatch) {
    try {
        const response = await axios.get(`${ADMIN_CATEGORY_ENDPOINT}`);
        return dispatch({ type: GET_CATEGORIES, payload: response.data });
    } catch(e) {
      
    }
  }
}

export function deleteCategories(id) {
  return async function(dispatch) {
    try {
        const response = await axios.delete(`${ADMIN_CATEGORY_ENDPOINT}/${id}`);
        return dispatch({ type: DELETE_CATEGORY, payload: response.data._id });
    } catch(e) {
      
    }
  }
}