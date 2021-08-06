import {
  GET_PRODUCT_DETAIL,
  ALL_PRODUCTS,
  CREATE_CATEGORY,
  GET_CATEGORIES,
  DELETE_CATEGORY,
  CURENT_PAGE,
  SEARCH_STATE,
} from '../actions/names';

const initialState = {
  allProducts: [],
  productDetail: {},
  allCategories: [],
  currentPage: 1,
  searchProdustsState:'',
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAIL: return { ...state, productDetail: action.payload };
    case ALL_PRODUCTS: return { ...state, allProducts: action.payload };
    case CREATE_CATEGORY:
      return {
        ...state,
        allCategories: state.allCategories.concat(action.payload)
      };
    case GET_CATEGORIES: return { ...state, allCategories: action.payload };
    case DELETE_CATEGORY:
      return {
        ...state,
        allCategories: state.allCategories.filter((category) => category._id !== action.payload)
      };
    case CURENT_PAGE: return { ...state, currentPage: action.payload };
    case SEARCH_STATE: return { ...state, searchProdustsState: action.payload };
    default: return state;
  }
}

export default rootReducer;
