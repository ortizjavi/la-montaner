import axios from 'axios';
import { GET_PRODUCT_DETAIL, CREATE_CATEGORY } from './names';
import { PRODUCTS_ENDPOINT, CATEGORIES_ENDPOINT } from '../constants';

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
