export const TYPE = {
  CREATE_ROOM_REQUEST: 'CREATE_ROOM_REQUEST',
  CREATE_ROOM_SUCCESS: 'CREATE_ROOM_SUCCESS',
  JOIN_ROOM_REQUEST: 'JOIN_ROOM_REQUEST',
  JOIN_ROOM_SUCCESS: 'JOIN_ROOM_SUCCESS',
  GET_ROOM_REQUEST: 'GET_ROOM_REQUEST',
  GET_ROOM_SUCCESS: 'GET_ROOM_SUCCESS',
  SET_SELECTED_ROOM: 'SET_SELECTED_ROOM',
  ADD_NEW_ROOM: 'ADD_NEW_ROOM',
  GET_ROOM_MESSAGE_REQUEST: 'GET_ROOM_MESSAGE_REQUEST',
  GET_ROOM_MESSAGE_SUCCESS: 'GET_ROOM_MESSAGE_SUCCESS',
  SEND_MESSAGE_REQUEST: 'SEND_MESSAGE_REQUEST',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
}

export const createNewRoom = (data) => ({
  type: TYPE.CREATE_ROOM_REQUEST,
  payload: data
})

export const getMyRoom = (data) => ({
  type: TYPE.GET_ROOM_REQUEST,
  payload: data
})

export const getRoomSuccess = data => ({
  type: TYPE.GET_ROOM_SUCCESS,
  payload: data,
})

export const setSelectedRoom = data => ({
  type: TYPE.SET_SELECTED_ROOM,
  payload: data,
})

export const joinNewRoom = data => ({
  type: TYPE.JOIN_ROOM_REQUEST,
  payload: data,
})

export const addNewRoom = data => ({
  type: TYPE.ADD_NEW_ROOM,
  payload: data,
})

export const getRoomMessage = data => ({
  type: TYPE.GET_ROOM_MESSAGE_REQUEST,
  payload: data,
})

export const addRoomMessage = data => ({
  type: TYPE.GET_ROOM_MESSAGE_SUCCESS,
  payload: data,
})

export const sendMessageRequest = () => ({
  type: TYPE.SEND_MESSAGE_REQUEST,
})

export const sendMessageSuccess = data => ({
  type: TYPE.SEND_MESSAGE_SUCCESS,
  payload: data,
})
