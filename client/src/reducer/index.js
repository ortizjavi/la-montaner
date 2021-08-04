import { GET_PRODUCT_DETAIL, CREATE_CATEGORY } from '../actions/names';

const initialState = {
  allProducts: [],
  productDetail: {},
  allCategories: [],
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PRODUCT_DETAIL: return { ...state, productDetail: action.payload };
    case CREATE_CATEGORY: return { ...state, allCategories: action.payload };
    default: return state;
  }
}

export default rootReducer;
