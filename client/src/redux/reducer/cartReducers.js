import * as actionTypes from "../actions/names";

const CART_INITIAL_STATE = {
  cartItems: [],
  cartSubtotal: 0,
  address: "",
  sales: [],
  discount: 0,
  game:false,
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
    case actionTypes.ADD_CART_SUB_TOTAL:
      return { ...state, cartSubtotal: action.payload };
    case actionTypes.ADD_ADDRESS:
      return { ...state, address: action.payload };
    case actionTypes.CART_SUBTOTAL_PLUS_ONE:
      return { ...state, cartSubtotal: state.cartSubtotal + 1 };
    case actionTypes.ADD_SALE_CART:
      return {
        ...state,
        sales: action.payload,
      };
    case actionTypes.ADD_DISCOUNT:
      return {
        ...state,
        discount: action.payload,
      };

    case actionTypes.NEW_SALE:
      return {
        ...state,
        sales: [...state.sales, action.payload],
      };

    case actionTypes.DELETE_SALES:
      const deletedSale = state.sales?.filter((s) => s._id !== action.payload);
      return { ...state, sales: deletedSale };
    case actionTypes.WIN_GAME:
      return{...state, game:action.payload}
    default: return state;
  }
};

export default cartReducer;
