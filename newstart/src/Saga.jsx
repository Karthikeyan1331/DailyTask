// sagas.js
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchUsersSuccess, fetchUsersFailure } from './UserReducer';  

// Worker saga to handle fetching users
function* fetchUsersSaga() {
    try {
        const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/users');
        const data = yield response.json();
        yield put(fetchUsersSuccess(data));
    } catch (error) {
        yield put(fetchUsersFailure(error.message));
    }
}

// Watcher saga to listen for actions
function* watchFetchUsers() {
    yield takeEvery('users/fetchUsers', fetchUsersSaga);
}

// Root saga to combine all individual sagas
export default function* rootSaga() {
    yield all([
        watchFetchUsers(),
        // Add more watchers here
    ]);
}
