// endpoints del back
export const SERVER = 'http://localhost:3001';
export const ADMIN_SERVER = `${SERVER}/admin`;

// endpoints de las categorias
export const ADMIN_CATEGORY_ENDPOINT = `${ADMIN_SERVER}/category`;
// endpoints de producto
export const GET_PRODUCTS_ENDPOINT = `${SERVER}`;
export const CREATE_PRODUCT_ENDPOINT = `${ADMIN_SERVER}/product`;
export const UPDATE_PRODUCT_ENDPOINT = `${ADMIN_SERVER}/product`;
export const DELETE_PRODUCT_ENDPOINT = `${ADMIN_SERVER}/product`;

export const fixedCategories = ['cervezas', 'conservas', 'merchandising', 'otros']