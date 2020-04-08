import { TYPE } from "./action";

const initialState = {
  rooms: [],
  room: {
    conversation: [],
    participans: [],
    name: '',
    owner: {
      name: '',
    },
    "_id": '',
    createdAt: '',
    updatedAt: ''
  },
  selectedRoomId: '',
  isSendMessageLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.GET_ROOM_SUCCESS:
      return {
        ...state,
        rooms: action.payload.docs,
        selectedRoomId: action.payload.docs.length > 0 ? action.payload.docs[0]._id : '',
        room: action.payload.docs.length > 0 ? action.payload.docs.find(item => item._id === action.payload.docs[0]._id) : { conversation: [] },
      }
    case TYPE.SET_SELECTED_ROOM:
      const choosedRoom = state.rooms.find(item => item._id === action.payload._id);
      return {
        ...state,
        selectedRoomId: action.payload._id,
        room: choosedRoom,
      }
    case TYPE.ADD_NEW_ROOM:
      return {
        ...state,
        rooms: [action.payload, ...state.rooms],
        room: action.payload,
        selectedRoomId: action.payload._id,
      }
    case TYPE.GET_ROOM_MESSAGE_SUCCESS:
      return {
        ...state,
        room: {
          ...state.room,
          conversation: action.payload.docs.reverse(),
        }
      }
    case TYPE.SEND_MESSAGE_SUCCESS:
      const roomIndex = state.rooms.findIndex(item => item._id === action.payload.data.room);
      const updatedRoom = {
        ...state.rooms[roomIndex],
        conversation: [...state.rooms[roomIndex].conversation, action.payload.data]
      }
      state.rooms[roomIndex] = updatedRoom;
      return {
        ...state,
        room: {
          ...state.room,
          conversation: [...state.room.conversation, action.payload.data],
        },
        rooms: [...state.rooms],
        isSendMessageLoading: false,
      }
    case TYPE.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        isSendMessageLoading: true,
      }
    default:
      return state;
  }
}