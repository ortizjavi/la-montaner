import * as actionTypes from "../actions/names";

const INDEX_INITIAL_STATE = {
  allProducts: [],
  allProductsAutocomplete: [],
  productDetail: {},
  allCategories: [],
  adminProducts: [],
  selectedAdminProducts: [],
  currentPage: 1,
  searchProdustsState: "",
  activeProduct: null,
  maxPrice: "",
  currentCategoryState :'vertodos',
  wishlist: [],
};

const rootReducer = (state = INDEX_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAIL: return { ...state, productDetail: action.payload };
    case actionTypes.ALL_PRODUCTS: return { ...state, allProducts: action.payload};
    case actionTypes.ALL_PRODUCTS_AUTOCOMPLETE: return { ...state, allProductsAutocomplete: action.payload};
    case actionTypes.CREATE_CATEGORY: return { ...state, allCategories: state.allCategories.concat(action.payload) };
    case actionTypes.DELETE_CATEGORY: return { ...state, allCategories: state.allCategories.filter(cat => cat._id !== action.payload) };
    case actionTypes.GET_CATEGORIES: return { ...state, allCategories: action.payload };
    case actionTypes.ADMIN_GET_PRODUCTS: return { ...state, adminProducts: action.payload };
    case actionTypes.ADMIN_SELECT_PRODUCTS: return { ...state, selectedAdminProducts: action.payload };
    case actionTypes.ADMIN_SELECT_DELETED_PRODUCTS: return { ...state, selectedAdminProducts: [] };
    case actionTypes.CURENT_PAGE: return { ...state, currentPage: action.payload };
    case actionTypes.SEARCH_STATE: return { ...state, searchProdustsState: action.payload };
    case actionTypes.GET_MAX_PRICE: return { ...state, maxPrice: action.payload[0].price };
    case actionTypes.FILTER_PRODUCTS_CATEGORY: return { ...state, allProducts: action.payload };
    case actionTypes.CURENT_CATEGORY: return { ...state, currentCategoryState: action.payload };
    //case actionTypes.GET_MAX_PRICE: return { ...state, maxPrice: action.payload };
    case actionTypes.ADD_FAV_PRODUCT:
      const newFav = state.allProducts.find(product => product.id === action.payload);
      return { ...state, wishlist: state.wishlist.concat(newFav) };
    case actionTypes.DELETE_FAV_PRODUCT: 
    const favDelete = state.allProducts.filter(product => product.id !== action.payload);
    return {...state, wishlist: favDelete}
    default: return state;
  }
};

export default rootReducer;
