import * as actionTypes from "../actions/names";

const CART_INITIAL_STATE = {
    cartItems: [],
  };
  
const cartReducer = (state = CART_INITIAL_STATE, action) => {
    switch (action.type) {
      case actionTypes.ADD_CART_PRODUCT:
        const item = action.payload;
  
        const existItem = state.cartItems.find((x) => x.id === item.id);
  
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.id === existItem.id ? item : x
            ),
          };
        } else {
          return {
            ...state,
            cartItems: state.cartItems.concat(item),
          };
        }
      case actionTypes.DELETE_CART_PRODUCT:
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.id !== action.payload),
        };
      default:
        return state;
    }
  };

  export default cartReducer;