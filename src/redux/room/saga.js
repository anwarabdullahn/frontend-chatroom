import { fork, takeLatest, put } from 'redux-saga/effects';
import { TYPE, getRoomSuccess, addNewRoom, addRoomMessage } from './action';
import openNotification, { TYPE as NOTIF_TYPE } from '../../utils/notification';
import * as RoomService from './service';

function* watchCreateRoomRequest() {
  yield takeLatest(TYPE.CREATE_ROOM_REQUEST, createRoom);
}

function* watchGetRoomRequest() {
  yield takeLatest(TYPE.GET_ROOM_REQUEST, getRoom);
}

function* watchJoinRoomRequest() {
  yield takeLatest(TYPE.JOIN_ROOM_REQUEST, joinRoom);
}

function* watchGetRoomMessageRequest() {
  yield takeLatest(TYPE.GET_ROOM_MESSAGE_REQUEST, roomMessage)
}

// function* watchSendMessageRequest() {
//   yield takeLatest(TYPE.SEND_MESSAGE_REQUEST, sendMessageRequest)
// }

function* createRoom(data) {
  console.log('function* createRoom(data) {')
  try {
    const result = yield RoomService.createRoom(data);
    const res = result.data;
    openNotification(NOTIF_TYPE.SUCCESS, res.message);
    yield put(addNewRoom(res.data))
  } catch (error) {
    const err = error.response;
    openNotification(NOTIF_TYPE.ERROR, err.data.message, err.data.error[[Object.keys(err.data.error)[0]]]);
  }
}

function* getRoom(data) {
  try {
    const result = yield RoomService.getRoom(data);
    const res = result.data;
    yield put(getRoomSuccess(res.data));
  } catch (err) {
    console.log(err, 'err')
    openNotification(NOTIF_TYPE.WARNING, 'You dont have any room!');
  }
}

function* joinRoom(data) {
  try {
    const result = yield RoomService.joinRoom(data);
    const res = result.data;
    openNotification(NOTIF_TYPE.SUCCESS, res.message);
    yield put(addNewRoom(res.data));
  } catch (error) {
    const err = error.response;
    openNotification(NOTIF_TYPE.ERROR, err.data.message, err.data.error[[Object.keys(err.data.error)[0]]]);
  }
}

function* roomMessage(data) {
  try {
    const result = yield RoomService.roomMessage(data);
    const res = result.data;
    console.log(res, 'res')
    yield put(addRoomMessage(res.data));
  } catch (error) {
    const err = error.response;
    openNotification(NOTIF_TYPE.ERROR, err.data.message);
  }
}

// function* sendMessageRequest(data) {
//   try {
//     const result = yield RoomService.sendMessage(data);
//     yield put(sendMessageSuccess(result.data))
//   } catch (error) {
//     const err = error.response;
//     openNotification(NOTIF_TYPE.ERROR, err.data.message);
//   }
// }

const roomSaga = [
  fork(watchCreateRoomRequest),
  fork(watchGetRoomRequest),
  fork(watchJoinRoomRequest),
  fork(watchGetRoomMessageRequest),
  // fork(watchSendMessageRequest),
]

export default roomSaga;
