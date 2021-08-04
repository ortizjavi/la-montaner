import axios from 'axios';
import { GET_PRODUCT_DETAIL, ALL_PRODUCTS, CREATE_CATEGORY, GET_CATEGORIES } from './names';
import { 
  GET_PRODUCTS_ENDPOINT,
  CREATE_PRODUCT_ENDPOINT,
  UPDATE_PRODUCT_ENDPOINT,
  DELETE_PRODUCT_ENDPOINT,
  GET_CATEGORY_ENDPOINT,
  CREATE_CATEGORY_ENDPOINT,
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
export function getAllProducts() {
  return async function(dispatch) {
    try {
        const response = await axios.get(`${GET_PRODUCTS_ENDPOINT}`);
        return dispatch({ type: ALL_PRODUCTS, payload: response.data });
    } catch(e) {
      console.log('actions/types/getAllProducts-Error:',e);
    }
  }
}

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