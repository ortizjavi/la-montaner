import axios from 'axios';
import { ALL_PRODUCTS, GET_PRODUCT_DETAIL } from '../names';
import { 
  GET_PRODUCTS_ENDPOINT,
  CREATE_PRODUCT_ENDPOINT,
  UPDATE_PRODUCT_ENDPOINT,
  DELETE_PRODUCT_ENDPOINT,
} from '../../utils/endpoints';

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

// export function getAllProducts(query) {
//   return async function(dispatch) {
//     try {
//         const response = await axios.get(`${GET_PRODUCTS_ENDPOINT}?name=${query}`);    
//         return dispatch({ type: ALL_PRODUCTS, payload: response.data });
//     } catch(e) {
//       console.log('actions/types/getAllProducts-Error:',e);
//     }
//   }
// }
export function searchProducts(pageNumber, name) {
  if(name){
    return async function(dispatch) {
      try {
          const response = await axios.get(`${GET_PRODUCTS_ENDPOINT}?pageNumber=${pageNumber}&name=${name}`);    
          return dispatch({ type: ALL_PRODUCTS, payload: response.data });
      } catch(e) {
        console.log('actions/types/productActions/searchProducts-Error:',e);
      }
    }
  } else {
    return async function(dispatch) {
      try {
          const response = await axios.get(`${GET_PRODUCTS_ENDPOINT}?pageNumber=${pageNumber}`);    
          return dispatch({ type: ALL_PRODUCTS, payload: response.data });
      } catch(e) {
        console.log('actions/types/productActions/searchProducts-Error:',e);
      }
    }
  }
}

