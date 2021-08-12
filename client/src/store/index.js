import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//Root Reducer + Cart Reducer
import cartReducer from "../reducer/cartReducers";
import sessionReducer from "../reducer/sessionReducer";
import rootReducer from '../reducer/index';
import { 
  cartItemsInLocalStorage,
  userSession
} from '../utils/localStorage' 

const middleware = [thunk];

const reducer = combineReducers({
  cart: cartReducer,
  root: rootReducer,
  session: sessionReducer
});

const initialState = {
  session: {
    user: userSession.user,
    token: userSession.token
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