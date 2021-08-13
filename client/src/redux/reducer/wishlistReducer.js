import * as actionTypes from '../actions/names';

const WISHLIST_INITIAL_STATE = {
  wishlistItems: [],
}

const wishlistReducer = (state = WISHLIST_INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.ADD_FAV_PRODUCT: return { ...state, wishlistItems: state.wishlistItems.concat(action.payload) };
    case actionTypes.DELETE_FAV_PRODUCT: return { ...state, wishlistItems: state.wishlistItems.filter((fav) => fav.id !== action.payload) }
    default: return state
  }
}

export default wishlistReducer;
