import axios from "axios";
import * as actionTypes from "../names";
import * as endpoints from "../../../utils/endpoints";

export function getUsers() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${endpoints.GET_USERS}`);
      return dispatch({ type: actionTypes.GET_USERS, payload: resp.data });
    } catch (error) {
      console.log(error);
    }
  };
}


export function getAdminProducts() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${endpoints.ADMIN_GET_PRODUCTS}`);
      return dispatch({
        type: actionTypes.ADMIN_GET_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export function updateStatus(id, estado) {
  return async function () {
    try {
      const resp = await axios.put(`${endpoints.ORDER_STATUS}/${id}`, {
        status: estado,
      });
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrders() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${endpoints.ORDER_STATUS}`);
      return dispatch({ type: actionTypes.GET_ORDERS, payload: resp.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(user) {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`${endpoints.DELETE_USER}`, { email : user.email });
      return dispatch({ type: actionTypes.DELETE_USER, payload: user._id });
    } catch (error) {
      console.log(error);
    }
  };
}

export function resetUser(user) {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`${endpoints.RESET_USER}`, { email : user.email });
      return dispatch({ type: actionTypes.RESET_USER, payload: resp });
    } catch (error) {
      console.log(error);
    }
  };
}

export function newAdmin(user) {
	return async function (dispatch) {
    try {
      const resp = await axios.post(`${endpoints.NEW_ADMIN}`, { email : user.email });
      return dispatch({ type: actionTypes.DELETE_USER, payload: user._id });
    } catch (error) {
      console.log(error);
    }
  };
}




