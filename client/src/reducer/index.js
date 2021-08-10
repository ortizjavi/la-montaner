import {
  GET_PRODUCT_DETAIL,
  ALL_PRODUCTS,
  CREATE_CATEGORY,
  GET_CATEGORIES,
  ADMIN_GET_PRODUCTS,
  ADMIN_SELECT_PRODUCTS,
  ADMIN_SELECT_DELETED_PRODUCTS,
  DELETE_CATEGORY,
  CURENT_PAGE,
  SEARCH_STATE,
  ADD_CART_PRODUCT,
  DELETE_CART_PRODUCT,
  ADMIN_CLEAR_SELECT,
  ADMIN_SELECT_UPDATED_PRODUCTS,
  FILTER_PRODUCTS_CATEGORY,
  DELETE_CART_ALL,
} from "../actions/names";

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
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAIL: return { ...state, productDetail: action.payload };
    case ALL_PRODUCTS: return { ...state, allProducts: action.payload };
    case CREATE_CATEGORY: return { ...state, allCategories: state.allCategories.concat(action.payload) };
    case DELETE_CATEGORY: return { ...state, allCategories: state.allCategories.filter(cat => cat._id !== action.payload) };
    case GET_CATEGORIES: return { ...state, allCategories: action.payload };
    case ADMIN_GET_PRODUCTS: return { ...state, adminProducts: action.payload };
    case ADMIN_SELECT_PRODUCTS: return { ...state, selectedAdminProducts: action.payload };
    case ADMIN_SELECT_DELETED_PRODUCTS: return { ...state, selectedAdminProducts: [] };
    case CURENT_PAGE: return { ...state, currentPage: action.payload };
    case SEARCH_STATE: return { ...state, searchProdustsState: action.payload };
    case FILTER_PRODUCTS_CATEGORY: return { ...state, allProducts: action.payload };
    case ADD_CART_PRODUCT: 
      const product = action.payload;
      const existItem = state.cartProducts.find((p) => p.id === product.id);

      if (existItem) {
        return { ...state, cartProducts: state.cartProducts.map((p) => p.id === product.id ? product : p) };
      } else {
        return { ...state, cartProducts: [...state.cartProducts, product] };
      }
    case DELETE_CART_PRODUCT: return { ...state, cartProducts: state.cartProducts.filter((product) => product.id !== action.paylaod) };
    case DELETE_CART_ALL: return { ...state, cartProducts: [] };
    default: return state;
  }
};

export default rootReducer;
