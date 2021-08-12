import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//Root Reducer + Cart Reducer
import { 
  cartItemsInLocalStorage,
  session
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

const initialState = {
  session,
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
