import * as actionTypes from "../actions/names";

const SESSION_INITIAL_STATE = {
  user: {},
  registerFailed: '',
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
        user: { ...state.user, reset : false },
      };
    case actionTypes.ORDER_CREATED:
      state.user.orders = state.user.orders.push(action.payload);
      return {
        ...state
      };
    case actionTypes.ORDER_UPDATED:
      const order = state.user.orders.find(o => o._id === action.payload._id);
      order = action.payload;
      return {
        ...state
      }
    default: return state;
  }
};

export default sessionReducer;
