import * as actionTypes from "../actions/names";

const SESSION_INITIAL_STATE = {
    user: {},
    token : ''
};
  
const sessionReducer = (state = SESSION_INITIAL_STATE, action) => {
    switch (action.type) {
      case actionTypes.LOGIN_USER:
        return { user: action.payload.user, token: action.payload.token };
      default: return state;
    }
  };

export default sessionReducer;
