import { fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { TYPE, registerUserSuccess, loginUserSuccess, logoutUserSuccess } from './action';
import * as AuthService from './service';
import openNotification, { TYPE as NOTIF_TYPE } from '../../utils/notification';
import { setToken } from '../../utils/api';

function* watchLoginUser() {
  yield takeLatest(TYPE.LOGIN_REQUEST, loginUser);
}

function* watchRegisterUser() {
  yield takeLatest(TYPE.REGISTER_REQUEST, registerUser);
}

function* watchRegisterUserSuccess() {
  yield takeEvery(TYPE.REGISTER_SUCCESS, loginUser);
}

function* watchLogoutUser() {
  yield takeEvery(TYPE.LOGOUT_REQUEST, logoutUser);
}

function* loginUser(action) {
  try {
    const { email, name } = action.payload;
    const result = yield AuthService.loginUser({ email, name });
    const res = result.data;
    setToken(res.data.token);
    openNotification(NOTIF_TYPE.SUCCESS, res.message);
    localStorage.setItem('user', JSON.stringify(res.data));
    yield put(loginUserSuccess(res))
  } catch (error) {
    const err = error.response;
    openNotification(NOTIF_TYPE.ERROR, err.data.message, err.data.error[[Object.keys(err.data.error)[0]]]);
  }
}

function* registerUser(action) {
  try {
    const result = yield AuthService.registerUser(action.payload);
    const res = result.data;
    openNotification(NOTIF_TYPE.SUCCESS, res.message);
    yield put(registerUserSuccess(res.data));
  } catch (error) {
    const err = error.response;
    openNotification(NOTIF_TYPE.ERROR, err.data.message, err.data.error[[Object.keys(err.data.error)[0]]]);
  }
}

function* logoutUser() {
  try {
    setToken(null);
    openNotification(NOTIF_TYPE.WARNING, 'You`ve Logout from Apps');
    yield put(logoutUserSuccess())
  } catch {
    openNotification(NOTIF_TYPE.ERROR, 'Something Wrong!');
  }
}

const authSaga = [
  fork(watchLoginUser),
  fork(watchRegisterUser),
  fork(watchRegisterUserSuccess),
  fork(watchLogoutUser),
];

export default authSaga;