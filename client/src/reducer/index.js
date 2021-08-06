import { 
  GET_PRODUCT_DETAIL,
  ALL_PRODUCTS,
  CREATE_CATEGORY,
  GET_CATEGORIES,
<<<<<<< HEAD
  ADMIN_GET_PRODUCTS,
  ADMIN_SELECT_PRODUCTS,
  ADMIN_SELECT_DELETED_PRODUCTS
=======
  CURENT_PAGE,
  SEARCH_STATE,
>>>>>>> origin/develop
} from '../actions/names';

const initialState = {
  allProducts: [],
  productDetail: {},
  allCategories: [],
<<<<<<< HEAD
  adminProducts:[],
  selectedAdminProducts: []
=======
  currentPage: 1,
  searchProdustsState:'',
>>>>>>> origin/develop
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PRODUCT_DETAIL: return { ...state, productDetail: action.payload };
    case ALL_PRODUCTS: return { ...state, allProducts: action.payload };
    case CREATE_CATEGORY: return { ...state, allCategories: state.allCategories.concat(action.payload)};
    case GET_CATEGORIES: return { ...state, allCategories: action.payload };
<<<<<<< HEAD
    case ADMIN_GET_PRODUCTS: return {...state, adminProducts: action.payload};
    case ADMIN_SELECT_PRODUCTS: return {...state, selectedAdminProducts:action.payload}
    case ADMIN_SELECT_DELETED_PRODUCTS: return{...state, selectedAdminProducts: []}
=======
    case CURENT_PAGE: return { ...state, currentPage: action.payload };
    case SEARCH_STATE: return { ...state, searchProdustsState: action.payload };
>>>>>>> origin/develop
    default: return state;
  }
}

export default rootReducer;
