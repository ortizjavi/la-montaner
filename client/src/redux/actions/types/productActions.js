import axios from "axios";
import * as actionTypes from "../names";
import * as endpoints from "../../../utils/endpoints";

export function getProductDetail(id) {
  return async function (dispatch) {
    try {
      const productDetail = await axios.get(`${endpoints.GET_PRODUCTS}/${id}`);
      return dispatch({
        type: actionTypes.GET_PRODUCT_DETAIL,
        payload: productDetail.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

// export function getAllProducts(query) {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get( `${endpoints.GET_PRODUCTS}?name=${query}`);
//       return dispatch({ type: actionTypes.ALL_PRODUCTS, payload: response.data });
//     } catch (e) {
//       console.log("actions/types/getAllProducts-Error:", e);
//     }
//   };
// }

export function getAllProductsAutocomplete(query) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${endpoints.GET_PRODUCTS}?name=${query}`
      );
      return dispatch({
        type: actionTypes.ALL_PRODUCTS_AUTOCOMPLETE,
        payload: response.data,
      });
    } catch (e) {
      console.log("actions/types/getAllProducts-Error:", e);
    }
  };
}

export function selectedProducts(selected) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: actionTypes.ADMIN_SELECT_PRODUCTS,
        payload: selected,
      });
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
  };
}

export async function updateProducts(id, producto) {
  try {
    const resp = await axios.put(
      `${endpoints.ADMIN_GET_PRODUCTS}/${id}`,
      producto
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}

export function searchProducts({ sort, pageNumber, name, category }) {
  if (name) {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${endpoints.GET_PRODUCTS}?pageNumber=${pageNumber}&sort=${sort}&name=${name}`
        );
        return dispatch({
          type: actionTypes.ALL_PRODUCTS,
          payload: response.data,
        });
      } catch (e) {
        console.log("actions/types/productActions/searchProducts-Error:", e);
      }
    };
  } else {
    if (category === "vertodos" || !category) {
      return async function (dispatch) {
        try {
          const response = await axios.get(
            `${endpoints.GET_PRODUCTS}?pageNumber=${pageNumber}&sort=${sort}`
          );
          return dispatch({
            type: actionTypes.ALL_PRODUCTS,
            payload: response.data,
          });
        } catch (e) {
          console.log("actions/types/productActions/searchProducts-Error:", e);
        }
      };
    } else {
      return async function (dispatch) {
        try {
          const response = await axios.get(
            `${endpoints.GET_PRODUCTS}?pageNumber=${pageNumber}&sort=${sort}&categories=${category}`
          );
          return dispatch({
            type: actionTypes.ALL_PRODUCTS,
            payload: response.data,
          });
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
          `${endpoints.GET_PRODUCTS}?pageNumber=${pageNumber}&sort=${sort}&categories=${category}`
        );
        return dispatch({
          type: actionTypes.FILTER_PRODUCTS_CATEGORY,
          payload: response.data,
        });
      } catch (e) {
        console.log("actions/types/productActions/searchProducts-Error:", e);
      }
    };
  }
}

export function filterProducts(data, sort, pageNumber) {
  if (data) {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${
            endpoints.GET_PRODUCTS
          }?pageNumber=${pageNumber}&sort=${sort}&${Object.keys(
            data
          )}=${Object.values(data)}`
        );
        return dispatch({
          type: actionTypes.ALL_PRODUCTS,
          payload: response.data,
        });
      } catch (e) {
        console.log("actions/types/productActions/filterProducts-Error:", e);
      }
    };
  }
}

export function currentPageAction(page) {
  return { type: actionTypes.CURENT_PAGE, payload: page };
}
export function selectCategoryAction(page) {
  return { type: actionTypes.CURENT_CATEGORY, payload: page };
}
export function searchProductsAction(state) {
  return { type: actionTypes.SEARCH_STATE, payload: state };
}

export function clearProductDetail() {
  return { type: actionTypes.GET_PRODUCT_DETAIL, payload: {} };
}

export function addCartProduct(productId, stockSelected) {
  return async function (dispatch) {
    const { data } = await axios.get(`${endpoints.GET_PRODUCTS}/${productId}`);
    dispatch({
      type: actionTypes.ADD_CART_PRODUCT,
      payload: {
        id: data._id,
        name: data.name,
        image: data.img[0],
        price: data.price,
        stock: data.stock,
        stockSelected,
      },
    });
    dispatch({
      type: actionTypes.CART_SUBTOTAL_PLUS_ONE
    })
  };
}

export function deleteCartProduct(productId) {
  return async function (dispatch) {
    dispatch({ type: actionTypes.DELETE_CART_PRODUCT, payload: productId });
  };
}

export function deleteCartAll() {
  return async function (dispatch) {
    dispatch({ type: actionTypes.DELETE_CART_ALL });
  };
}

export function getMaximumPrice(price) {
  console.log("action/getmaxprice: ", price);
  if (price) {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${endpoints.GET_PRODUCTS}?price=GiveMeMaxPrice`
        );
        return dispatch({
          type: actionTypes.GET_MAX_PRICE,
          payload: response.data,
        });
      } catch (e) {
        console.log("actions/types/productActions/getMaximumPrice-Error:", e);
      }
    };
  }
}

export function filterByPrice(sort, filter, pageNumber) {
  if (filter) {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `${endpoints.GET_PRODUCTS}?pageNumber=${pageNumber}&sort=${sort}&priceSort=${filter}`
        );
        return dispatch({
          type: actionTypes.ALL_PRODUCTS,
          payload: response.data,
        });
      } catch (e) {
        console.log("actions/types/productActions/filterByPrice-Error:", e);
      }
    };
  }
}

export function createOrder(cart, user, address, mercadopago) {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`${endpoints.ORDER_STATUS}`, {
        cart,
        user,
        address,
        mercadopago,
      });
      dispatch({ type: actionTypes.ORDER_CREATED, payload: resp.data.order });
      if (mercadopago) {
        return (window.location.href = resp.data.mp_link);
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateOrder(data) {
  return async function (dispatch) {
    try {
      const resp = await axios.put(
        `${endpoints.ORDER_STATUS}`,
         data
      );
      dispatch({ type: actionTypes.ORDER_UPDATED, payload: resp.data.order });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addFavProducts(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${endpoints.GET_PRODUCTS}/${id}`);
      dispatch({
        type: actionTypes.ADD_FAV_PRODUCT,
        payload: {
          id: data._id,
          name: data.name,
          image: data.img[0],
          price: data.price,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function removeFavProduct(id) {
  return async function (dispatch) {
    return dispatch({ type: actionTypes.DELETE_FAV_PRODUCT, payload: id });
  };
}

export function addCartSubTotal(subtotal) {
  return async function (dispatch) {
    return dispatch({
      type: actionTypes.ADD_CART_SUB_TOTAL,
      payload: subtotal,
    });
  };
}

export function addAddress(address) {
  return async function (dispatch) {
    return dispatch({
      type: actionTypes.ADD_ADDRESS,
      payload: address,
    });
  };
}

export function addReview(data){
	return async () => {
		await axios.put(`${endpoints.ADD_REVIEW}`, { 
          content: data.content,
          id: data.id,
          calification: data.calification,
          idUsuario: data.idUsuario},
		);
	};
};
