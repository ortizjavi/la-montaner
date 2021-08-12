import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//Root Reducer + Cart Reducer
import cartReducer from "../reducer/cartReducers";
import rootReducer from '../reducer/index';
import { 
  cartItemsInLocalStorage,
  userSession
} from '../utils/localStorage' 

const middleware = [thunk];

const reducer = combineReducers({
  cart: cartReducer,
  root: rootReducer,
});






const initialState = {
  route: {
    user: userSession.user ? userSession.user : {}
  },
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;