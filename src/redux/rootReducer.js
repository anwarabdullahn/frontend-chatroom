import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
import RoomReducer from './room/reducer';

export default combineReducers({
  auth: AuthReducer,
  room: RoomReducer,
});