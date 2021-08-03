import { GET_PRODUCT_DETAIL } from '../actions/names';

const initialState = {
  allProducts: [],
  productDetail: {},
  allCategories: [],
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PRODUCT_DETAIL: return { ...state, productDetail: action.payload };
    default: return state;
  }
}

export default rootReducer;
