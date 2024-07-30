import axios from "axios";

import { call, put, takeEvery } from "redux-saga/effects";

import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_FETCH,
} from "../actions";
async function userFetch() {
    return axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

function* getUsers() {
    try {
        const users = yield call(userFetch);
        yield put({ type: GET_USERS_SUCCESS.type, users });
    } catch (error) {
        yield put({ type: GET_USERS_FAILURE.type, error });
    }
}
//Generator function
function* mySaga() {
    yield takeEvery(GET_USERS_FETCH, getUsers);
}

export default mySaga;
