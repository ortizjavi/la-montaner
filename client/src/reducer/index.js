import { 
  GET_PRODUCT_DETAIL,
  ALL_PRODUCTS,
  CREATE_CATEGORY,
  GET_CATEGORIES,
  ADMIN_ALL_PRODUCTS
} from '../actions/names';

const initialState = {
  allProducts: [],
  productDetail: {},
  allCategories: [],
  adminProducts: []
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PRODUCT_DETAIL: return { ...state, productDetail: action.payload };
    case ALL_PRODUCTS: return { ...state, allProducts: action.payload };
    case CREATE_CATEGORY: return { ...state, allCategories: state.allCategories.concat(action.payload)};
    case GET_CATEGORIES: return { ...state, allCategories: action.payload };
    case ADMIN_ALL_PRODUCTS: return {...state, adminProducts:action.payload};
    default: return state;
  }
}

export default rootReducer;
