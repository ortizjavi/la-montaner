import * as actionTypes from "../actions/names";

const ADMIN_INITIAL_STATE = {
  orders: [],
  users: [],
  filteredOrders: [],
};

const adminReducer = (state = ADMIN_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS:
      return { ...state, orders: action.payload };
    case actionTypes.GET_USERS:
      console.log('adminReducers/payload: ',action.payload)
      return { ...state, users: action.payload };
    case actionTypes.DELETE_USER:
      const deletedUser = state.users?.filter(user => user._id !== action.payload) 
      return {...state, users: deletedUser }
    case actionTypes.RESET_USER:
      const updatedUsers = state.users.slice();  
      updatedUsers.find(user => user._id === action.payload).reset = true;
      return { ...state, users: updatedUsers };
    case actionTypes.GET_ORDER_FILTERED:
      return {...state, filteredOrders: state.orders.filter(o => o.status === action.payload)}
    default:
      return state;
  }
};

export default adminReducer;
