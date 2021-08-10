import axios from "axios";
import {
  ADMIN_GET_PRODUCTS,
  ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  ADMIN_SELECT_PRODUCTS,
  CURENT_PAGE,
  CURENT_CATEGORY,
  SEARCH_STATE,
  ADMIN_SELECT_DELETED_PRODUCTS,
  FILTER_PRODUCTS_CATEGORY,
  GET_MAX_PRICE,
  ADD_CART_PRODUCT,
  DELETE_CART_PRODUCT,
  DELETE_CART_ALL,
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

export function deleteProducts(id) {
  return async function (dispatch) {
    try {
      await axios.delete(ADMIN_GET_PRODUCTS_ENDPOINT + "/" + id);
      return dispatch({ type: ADMIN_SELECT_DELETED_PRODUCTS });
    } catch (error) {
      console.log(error);
    }
  }
};


export async function updateProducts(id, producto) {
    try {
      const resp = await axios.put(
        `${ADMIN_GET_PRODUCTS_ENDPOINT}/${id}`,
        producto
      );
      console.log(resp.data)
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }


export function searchProducts({sort, pageNumber, name,category}) {
  console.log('Al actionsearch llega',sort, pageNumber, name,category)
  if (name) {
    console.log('deltro del if name',name,'category',category, 'pageNumber',pageNumber)
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
    console.log('deltro del else name',name,'category',category,'pageNumber',pageNumber)
    if(category ==='vertodos' || !category){
        return async function (dispatch) {
          try {
            const response = await axios.get(
              `${GET_PRODUCTS_ENDPOINT}?pageNumber=${pageNumber}&sort=${sort}`
            );
            return dispatch({ type: ALL_PRODUCTS, payload: response.data });
          } catch (e) {
            console.log("actions/types/productActions/searchProducts-Error:", e);
          }
        }
    }else{
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${GET_PRODUCTS_ENDPOINT}?pageNumber=${pageNumber}&sort=${sort}&categories=${category}`
        );
        return dispatch({ type: ALL_PRODUCTS, payload: response.data });
      } catch (e) {
        console.log("actions/types/productActions/searchProducts-Error:", e);
      }
    };
  }
}
}
export function filterProductsCategory(sort, pageNumber, category) {
  if (category) {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${GET_PRODUCTS_ENDPOINT}?pageNumber=${pageNumber}&sort=${sort}&categories=${category}`
        );
        return dispatch({
          type: FILTER_PRODUCTS_CATEGORY,
          payload: response.data,
        });
      } catch (e) {
        console.log("actions/types/productActions/searchProducts-Error:", e);
      }
    };
  }
}

export function filterProducts (data, sort, pageNumber) {
  if (data) {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${GET_PRODUCTS_ENDPOINT}?pageNumber=${pageNumber}&sort=${sort}&${Object.keys(data)}=${Object.values(data)}`
        );
        return dispatch({ type: ALL_PRODUCTS, payload: response.data });
      } catch (e) {
        console.log("actions/types/productActions/filterProducts-Error:", e);
      }
    }
  }
}

export function currentPageAction(page) {
  return { type: CURENT_PAGE, payload: page };
}
export function selectCategoryAction(page) {
  return { type: CURENT_CATEGORY, payload: page };
}
export function searchProductsAction(state) {
  return { type: SEARCH_STATE, payload: state };
}


export function clearProductDetail() {
  return { type: GET_PRODUCT_DETAIL, payload: {}};
}
export function getMaximumPrice(price) {
  if (price) {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${GET_PRODUCTS_ENDPOINT}?price=giveMeHigherPrice`
        );
        return dispatch({
          type: GET_MAX_PRICE,
          payload: response.data[0].price,
        });
      } catch (e) {
        console.log("actions/types/productActions/getMaximumPrice-Error:", e);
      }
    };
  }

export function addCartProduct(product) {
  return { type: ADD_CART_PRODUCT, payload: product };
}

export function deleteCartProduct(productId) {
  return { type: DELETE_CART_PRODUCT, payload: productId };
}

export function deleteCartAll() {
  return { type: DELETE_CART_ALL };
}
