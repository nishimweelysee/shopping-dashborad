import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';

import { actionTypes, loginSuccess, logOutSuccess } from './action';

const modalSuccess = (type) => {
    notification[type]({
        message: 'Wellcome back',
        description: 'You are login successful!',
    });
};

const modalWarning = (type) => {
    notification[type]({
        message: 'Good bye!',
        description: 'Your account has been logged out!',
    });
};

export function* loginSaga() {
    try {
        const data = JSON.parse(localStorage.getItem('ikimina'));
        yield put(loginSuccess(data.data,data.accessToken));
        modalSuccess('success');
    } catch (err) {
        // console.log(err);
    }
}

export function* logOutSaga() {
    try {
        yield put(logOutSuccess());
        modalWarning('warning');
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}
