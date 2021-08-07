import axios from "axios";
import {
  ADMIN_GET_PRODUCTS,
  ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  ADMIN_SELECT_PRODUCTS,
  CURENT_PAGE,
  SEARCH_STATE,
  ADMIN_SELECT_DELETED_PRODUCTS,
  ADMIN_CLEAR_SELECT,
} from "../names";

import {
  GET_PRODUCTS_ENDPOINT,
  CREATE_PRODUCT_ENDPOINT,
  UPDATE_PRODUCT_ENDPOINT,
  DELETE_PRODUCT_ENDPOINT,
  ADMIN_GET_PRODUCTS_ENDPOINT,
} from "../../utils/endpoints";

export function getProductDetail(id) {
  return async function (dispatch) {
    try {
      const productDetail = await axios.get(`${GET_PRODUCTS_ENDPOINT}/${id}`);
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: productDetail.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getAllProducts(query) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${GET_PRODUCTS_ENDPOINT}?name=${query}`
      );
      return dispatch({ type: ALL_PRODUCTS, payload: response.data });
    } catch (e) {
      console.log("actions/types/getAllProducts-Error:", e);
    }
  };
}

export function getAdminProducts() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${ADMIN_GET_PRODUCTS_ENDPOINT}`);
      return dispatch({ type: ADMIN_GET_PRODUCTS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function selectedProducts(selected) {
  return async function (dispatch) {
    try {
      return dispatch({ type: ADMIN_SELECT_PRODUCTS, payload: selected });
    } catch (error) {
      console.log(error);
    }
  };
}

/* export function clearSelectedProducts() {
  return async function (dispatch) {
    try {
      return dispatch({ type: ADMIN_CLEAR_SELECT });
    } catch (error) {
      console.log(error);
    }
  };
} */

export function deleteProducts(id) {
  return async function (dispatch) {
    try {
      for (let i = 0; i < id.length; i++) {
        await axios.delete(ADMIN_GET_PRODUCTS_ENDPOINT + "/" + id[i]);
      }
      return dispatch({ type: ADMIN_SELECT_DELETED_PRODUCTS });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateProducts(id, producto) {
  return async function () {
    try {
      const resp = await axios.put(
        `${ADMIN_GET_PRODUCTS_ENDPOINT}/${id}`,
        producto
      );
      return resp.json();
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchProducts(sort, pageNumber, name) {
  if (name) {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${GET_PRODUCTS_ENDPOINT}?pageNumber=${pageNumber}&sort=${sort}&name=${name}`
        );
        return dispatch({ type: ALL_PRODUCTS, payload: response.data });
      } catch (e) {
        console.log("actions/types/productActions/searchProducts-Error:", e);
      }
    };
  } else {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${GET_PRODUCTS_ENDPOINT}?pageNumber=${pageNumber}&sort=${sort}`
        );
        return dispatch({ type: ALL_PRODUCTS, payload: response.data });
      } catch (e) {
        console.log("actions/types/productActions/searchProducts-Error:", e);
      }
    };
  }
}

export function currentPageAction(page) {
  return { type: CURENT_PAGE, payload: page };
}
export function searchProductsAction(state) {
  return { type: SEARCH_STATE, payload: state };
}
