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
      const product = action.payload;
      const existItem = state.cartProducts.find((p) => p.id === product.id);

      if (existItem) {
        return { ...state, cartProducts: state.cartProducts.map((p) => p.id === product.id ? product : p) };
      } else {
        return { ...state, cartProducts: [...state.cartProducts, product] };
      }
    case actionTypes.DELETE_CART_PRODUCT: return { ...state, cartProducts: state.cartProducts.filter((product) => product.id !== action.paylaod) };
    case actionTypes.DELETE_CART_ALL: return { ...state, cartProducts: [] };
    default: return state;
  }
};

export default rootReducer;
