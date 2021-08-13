import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { login } from './actions/types/authActions';
//Root Reducer + Cart Reducer
import { 
  cartItemsInLocalStorage,
  session,
  wishlistItemsInLocalStorage,
} from '../utils/localStorage' 
import cartReducer from "./reducer/cartReducers";
import rootReducer from './reducer/index';
import sessionReducer from "./reducer/sessionReducer";

const middleware = [thunk];

const reducer = combineReducers({
  cart: cartReducer,
  root: rootReducer,
  session: sessionReducer
});

console.log(session);

const initialState = {
  session: {
    user : {}
  },
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
  root: {
    wishlist: wishlistItemsInLocalStorage
  }
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

if (session.token){
  store.dispatch(login({ token : session.token }));
}

export default store;
