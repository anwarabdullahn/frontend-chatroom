import { TYPE } from './action';

const initialState = {
  isAuthenticated: false,
}

export default (state = initialState, action) => {
  console.warn(action, 'action');

  switch (action.type) {
    case TYPE.LOGIN_SUCCESS || TYPE.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
      }
    case TYPE.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}