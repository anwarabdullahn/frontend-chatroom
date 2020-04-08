import { all } from 'redux-saga/effects';
import AuthSaga from './auth/saga';
import RoomSaga from './room/saga';

export default function* rootSaga() {
  yield all([
    ...AuthSaga,
    ...RoomSaga,
  ]);
}
