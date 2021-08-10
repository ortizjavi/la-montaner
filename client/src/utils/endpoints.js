// endpoints del back
export const SERVER = 'http://localhost:3001';
export const ADMIN_SERVER = `${SERVER}/admin`;

// endpoints de las categorias
export const ADMIN_CATEGORY = `${ADMIN_SERVER}/category`;
// endpoints de producto
export const GET_PRODUCTS = `${SERVER}`;
export const ADMIN_GET_PRODUCTS = `${ADMIN_SERVER}/product`;
export const CREATE_PRODUCT = `${ADMIN_SERVER}/product`;
export const UPDATE_PRODUCT = `${ADMIN_SERVER}/product`;
export const DELETE_PRODUCT = `${ADMIN_SERVER}/product`;

export const fixedCategories = ['cervezas', 'conservas', 'merchandising', 'otros']
