export const TYPE = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
}

export const setCurrentUser = () => ({
  type: TYPE.SET_CURRENT_USER,
})

export const logoutUser = () => ({
  type: TYPE.LOGOUT_REQUEST,
})

export const logoutUserSuccess = () => ({
  type: TYPE.LOGOUT_SUCCESS,
})

export const setLoginUser = (data) => ({
  type: TYPE.LOGIN_REQUEST,
  payload: data,
});

export const loginUserSuccess = (data) => ({
  type: TYPE.LOGIN_SUCCESS,
  payload: data,
})

export const setRegisterUser = data => ({
  type: TYPE.REGISTER_REQUEST,
  payload: data,
});

export const registerUserSuccess = data => ({
  type: TYPE.REGISTER_SUCCESS,
  payload: data,
});
