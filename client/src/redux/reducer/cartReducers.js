import * as actionTypes from "../actions/names";

const CART_INITIAL_STATE = {
  cartItems: [],
  cartSubtotal: 0,
};

const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART_PRODUCT:
      const newProduct = action.payload;
      const existItem = state.cartItems.find(
        (product) => product.id === newProduct.id
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product.id === existItem.id ? newProduct : product
          ),
        };
      } else {
        return { ...state, cartItems: state.cartItems.concat(newProduct) };
      }
    case actionTypes.DELETE_CART_PRODUCT:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.id !== action.payload
        ),
      };
    case actionTypes.DELETE_CART_ALL:
      return { ...state, cartItems: [] };
    case actionTypes.ADD_CART_SUB_TOTAL: return { ...state, cartSubtotal: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
