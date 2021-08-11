import * as actionTypes from "../actions/names";

const initialState = {
  allProducts: [],
  productDetail: {},
  allCategories: [],
  adminProducts: [],
  cartProducts: [],
  selectedAdminProducts: [],
  currentPage: 1,
  searchProdustsState: "",
  activeProduct: null,
  users : {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAIL: return { ...state, productDetail: action.payload };
    case actionTypes.ALL_PRODUCTS: return { ...state, allProducts: action.payload };
    case actionTypes.CREATE_CATEGORY: return { ...state, allCategories: state.allCategories.concat(action.payload) };
    case actionTypes.DELETE_CATEGORY: return { ...state, allCategories: state.allCategories.filter(cat => cat._id !== action.payload) };
    case actionTypes.GET_CATEGORIES: return { ...state, allCategories: action.payload };
    case actionTypes.ADMIN_GET_PRODUCTS: return { ...state, adminProducts: action.payload };
    case actionTypes.ADMIN_SELECT_PRODUCTS: return { ...state, selectedAdminProducts: action.payload };
    case actionTypes.ADMIN_SELECT_DELETED_PRODUCTS: return { ...state, selectedAdminProducts: [] };
    case actionTypes.CURENT_PAGE: return { ...state, currentPage: action.payload };
    case actionTypes.SEARCH_STATE: return { ...state, searchProdustsState: action.payload };
    case actionTypes.FILTER_PRODUCTS_CATEGORY: return { ...state, allProducts: action.payload };
    case actionTypes.ADD_CART_PRODUCT: 
      const newProduct = action.payload;
      const existItem = state.cartProducts.find((product) => product.id === newProduct.id);

      if (existItem) {
        return { ...state, cartProducts: state.cartProducts.map((currentProduct) => currentProduct.id === newProduct.id ? newProduct : currentProduct) };
      } else {
        return { ...state, cartProducts: [...state.cartProducts, newProduct] };
      }
    case actionTypes.DELETE_CART_PRODUCT: return { ...state, cartProducts: state.cartProducts.filter((currentProduct) => currentProduct.id !== action.paylaod) };
    case actionTypes.DELETE_CART_ALL: return { ...state, cartProducts: [] };
    case actionTypes.LOGIN_USER_GOOGLE: return { ...state, users: action.paylaod };
    case actionTypes.LOGIN_USER_FACEBOOK: return { ...state, users: action.paylaod };
    default: return state;
  }
};

export default rootReducer;
