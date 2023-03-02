import { all } from 'redux-saga/effects';
import AppSaga from './app/saga';
import { logOutSuccess } from './auth/action';
import AuthSaga, { loginSaga } from './auth/saga';

export default function* rootSaga() {
    yield all([AppSaga(), AuthSaga(),loginSaga(),logOutSuccess()]);
}
