import { TYPE } from './action';

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.LOGIN_REQUEST:
    case TYPE.LOGOUT_REQUEST:
    case TYPE.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case TYPE.LOGIN_SUCCESS || TYPE.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
        isLoading: false,
      }
    case TYPE.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      }
    default:
      return state;
  }
}