// endpoints del back
export const SERVER = "https://la-montaner.herokuapp.com";
export const ADMIN_SERVER = `${SERVER}/admin`;

// endpoints de la auth
export const AUTH_LOGIN = `${SERVER}/login`;
export const AUTH_REGISTER = `${SERVER}/register`;
export const AUTH_RESET = `${SERVER}/user/reset`

// endpoints de las categorias
export const ADMIN_CATEGORY = `${ADMIN_SERVER}/category`;

// endpoints de producto
export const GET_PRODUCTS = `${SERVER}`;
export const ADMIN_GET_PRODUCTS = `${ADMIN_SERVER}/product`;
export const CREATE_PRODUCT = `${ADMIN_SERVER}/product`;
export const UPDATE_PRODUCT = `${ADMIN_SERVER}/product`;
export const DELETE_PRODUCT = `${ADMIN_SERVER}/product`;

//endpoint de compras
export const ORDER_PAY = `${SERVER}/product/pay`;
export const ORDER_STATUS = `${SERVER}/product/order`;
export const GET_USERS = `${ADMIN_SERVER}/users`;
export const DELETE_USER = `${ADMIN_SERVER}/users`;
export const RESET_USER = `${ADMIN_SERVER}/users`;
export const NEW_ADMIN = `${ADMIN_SERVER}/new`;
