import axios from 'axios';
import { GET_PRODUCT_DETAIL } from './names';

const SERVER = 'http://localhost:3001/products';

export function getProductDetail(id) {
  return async function(dispatch) {
    try {
        const productDetail = await axios.get(`${SERVER}/${id}`);
        return dispatch({ type: GET_PRODUCT_DETAIL, payload: productDetail.data });
    } catch(e) {
      console.log(e);
    }
  }
}
