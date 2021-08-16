import * as actionTypes from "../actions/names";

const SESSION_INITIAL_STATE = {
  user: {},
  registerFailed: '',
  orders: [],
  loginFailed:''
};

const sessionReducer = (state = SESSION_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        user: action.payload
      };
    case actionTypes.REGISTER_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.REGISTER_FAILED:
      return {
        ...state,
        registerFailed: action.payload,
      };
      case actionTypes.LOGIN_FAILED:
        return {
          ...state,
          loginFailed: action.payload,
        };
      case actionTypes.RESET_PASSWORD:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.ORDER_STATUS:
      return { ...state, orders: state.orders.concat(action.payload.order) };
    default: return state;
  }
};

export default sessionReducer;
