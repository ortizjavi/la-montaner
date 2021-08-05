import axios from 'axios';
<<<<<<< HEAD:client/src/actions/types.js

import { 
  GET_PRODUCT_DETAIL,
  ALL_PRODUCTS,
  CREATE_CATEGORY,
  GET_CATEGORIES,
  ADMIN_GET_PRODUCTS,
} from './names';

=======
import { ALL_PRODUCTS, GET_PRODUCT_DETAIL } from '../names';
>>>>>>> fe08e792003c23c3948368f6c8e3411ba264b75e:client/src/actions/types/productActions.js
import { 
  GET_PRODUCTS_ENDPOINT,
  CREATE_PRODUCT_ENDPOINT,
  UPDATE_PRODUCT_ENDPOINT,
  DELETE_PRODUCT_ENDPOINT,
<<<<<<< HEAD:client/src/actions/types.js
  GET_CATEGORY_ENDPOINT,
  CREATE_CATEGORY_ENDPOINT,
  ADMIN_GET_PRODUCTS_ENDPOINT,
} from '../constants';
=======
} from '../../utils/endpoints';
>>>>>>> fe08e792003c23c3948368f6c8e3411ba264b75e:client/src/actions/types/productActions.js

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
        const response = await axios.get(`${GET_PRODUCTS_ENDPOINT}?name=${query}`);    
        return dispatch({ type: ALL_PRODUCTS, payload: response.data });
    } catch(e) {
      console.log('actions/types/getAllProducts-Error:',e);
    }
  }
}

<<<<<<< HEAD:client/src/actions/types.js
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

export function getAdminProducts() {
  return async function(dispatch) {
    try {
        const response = await axios.get(`${ADMIN_GET_PRODUCTS_ENDPOINT}`);
        return dispatch({ type: ADMIN_GET_PRODUCTS, payload: response.data });
    } catch(e) {
      console.log(e);
    }
  }
}
=======
>>>>>>> fe08e792003c23c3948368f6c8e3411ba264b75e:client/src/actions/types/productActions.js
