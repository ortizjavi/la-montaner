import * as actionTypes from '../actions/names';

const WISHLIST_INITIAL_STATE = {
  wishlistItems: [],
}

const wishlistReducer = (state = WISHLIST_INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.ADD_FAV_PRODUCT: 
      const newFav = action.payload;
      const existFav = state.wishlistItems.find((product) => product.id === newFav.id);

      if (existFav) {
        return { ...state, wishlistItems: state.wishlistItems.map((product) => product.id === existFav.id ? newFav : product) };
      } else {
        return { ...state, wishlistItems: state.wishlistItems.concat(newFav) };
      }
    case actionTypes.DELETE_FAV_PRODUCT: return { ...state, wishlistItems: state.wishlistItems.filter((fav) => fav.id !== action.payload) };
    case actionTypes.DELETE_FAV_ALL: return { ...state, wishlistItems: [] };
    default: return state
  }
}

export default wishlistReducer;
