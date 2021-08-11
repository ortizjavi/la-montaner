import axios from "axios";
import * as actionTypes from "../names";
import * as endpoints from "../../utils/endpoints";

export function getProductDetail(id) {
  return async function (dispatch) {
    try {
      const productDetail = await axios.get(`${endpoints.GET_PRODUCTS}/${id}`);
      return dispatch({ type: actionTypes.GET_PRODUCT_DETAIL, payload: productDetail.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getAllProducts(query) {
  return async function (dispatch) {
    try {
      const response = await axios.get( `${endpoints.GET_PRODUCTS}?name=${query}`);
      return dispatch({ type: actionTypes.ALL_PRODUCTS, payload: response.data });
    } catch (e) {
      console.log("actions/types/getAllProducts-Error:", e);
    }
  };
}

export function getAdminProducts() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${endpoints.ADMIN_GET_PRODUCTS}`);
      return dispatch({ type: actionTypes.ADMIN_GET_PRODUCTS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function selectedProducts(selected) {
  return async function (dispatch) {
    try {
      return dispatch({ type: actionTypes.ADMIN_SELECT_PRODUCTS, payload: selected });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteProducts(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${endpoints.ADMIN_GET_PRODUCTS}/${id}`);
      return dispatch({ type: actionTypes.ADMIN_SELECT_DELETED_PRODUCTS });
    } catch (error) {
      console.log(error);
    }
  }
};


export async function updateProducts(id, producto) {
    try {
      const resp = await axios.put( `${endpoints.ADMIN_GET_PRODUCTS}/${id}`, producto);
      console.log(resp.data)
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }


export function searchProducts(sort, pageNumber, name) {
  if (name) {
    return async function (dispatch) {
      try {
        const response = await axios.get( `${endpoints.GET_PRODUCTS}?pageNumber=${pageNumber}&sort=${sort}&name=${name}`);
        return dispatch({ type: actionTypes.ALL_PRODUCTS, payload: response.data });
      } catch (e) {
        console.log("actions/types/productActions/searchProducts-Error:", e);
      }
    };
  } else {
    return async function (dispatch) {
      try {
        const response = await axios.get( `${endpoints.GET_PRODUCTS}?pageNumber=${pageNumber}&sort=${sort}`);
        return dispatch({ type: actionTypes.ALL_PRODUCTS, payload: response.data });
      } catch (e) {
        console.log("actions/types/productActions/searchProducts-Error:", e);
      }
    };
  }
}

export function filterProductsCategory(sort, pageNumber, category) {
  if (category) {
    return async function (dispatch) {
      try {
        const response = await axios.get( `${endpoints.GET_PRODUCTS}?pageNumber=${pageNumber}&sort=${sort}&categories=${category}`);
        return dispatch({ type: actionTypes.FILTER_PRODUCTS_CATEGORY, payload: response.data });
      } catch (e) {
        console.log("actions/types/productActions/searchProducts-Error:", e);
      }
    };
  }
}

export function currentPageAction(page) {
  return { type: actionTypes.CURENT_PAGE, payload: page };
}

export function searchProductsAction(state) {
  return { type: actionTypes.SEARCH_STATE, payload: state };
}

export function clearProductDetail() {
  return { type: actionTypes.GET_PRODUCT_DETAIL, payload: {}};
}

export function addCartProduct(productId) {
  return async function (dispatch, getState) {
    const { data } = await axios.get(`${endpoints.GET_PRODUCTS}/${productId}`);
    dispatch({ 
      type: actionTypes.ADD_CART_PRODUCT,
      payload: {
        id: data._id,
        name: data.name,
        image: data.img[0],
        price: data.price,
        stock: data.stock,
      }
    })
  }
}

export function deleteCartProduct(productId) {
  return async function (dispatch, getState) {
    dispatch({ type: actionTypes.DELETE_CART_PRODUCT, payload: productId });
  }
}

export function deleteCartAll() {
  return async function (dispatch, getState) {
    dispatch({ type: actionTypes.DELETE_CART_ALL });
  }
}
