import axios from 'axios';
import { GET_PRODUCT_DETAIL, ALL_PRODUCTS, CREATE_CATEGORY } from './names';
import { PRODUCTS_ENDPOINT, CATEGORIES_ENDPOINT } from '../constants';

const ALL_PRODUCTS_ENDPOINT = `${SERVER}/search`

export function getProductDetail(id) {
  return async function(dispatch) {
    try {
        const productDetail = await axios.get(`${PRODUCTS_ENDPOINT}/${id}`);
        return dispatch({ type: GET_PRODUCT_DETAIL, payload: productDetail.data });
    } catch(e) {
      console.log(e);
    }
  }
}
export function getAllProducts() {
  return async function(dispatch) {
    try {
        const response = await axios.get(`${ALL_PRODUCTS_ENDPOINT}`);
        return dispatch({ type: ALL_PRODUCTS, payload: response.data });
    } catch(e) {
      console.log('actions/types/getAllProducts-Error:',e);
    }
  }
}

export function createCategory(name) {
  return async function(dispatch) {
    try {
        const response = await axios.post(`${CATEGORIES_ENDPOINT}`, {name});
        return dispatch({ type: CREATE_CATEGORY, payload: response.data});
    } catch(e) {
      console.log(e);
    }
  }
}
