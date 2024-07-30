import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
    GET_DOCTOR_FETCH,
    GET_DOCTOR_SUCCESS,
    GET_DOCTOR_FAILURE,
    EDIT_DOCTOR,
    EDIT_DOCTOR_SUCCESS,
    EDIT_DOCTOR_FAILURE,
    DELETE_DOCTOR,
    DELETE_DOCTOR_SUCCESS,
    DELETE_DOCTOR_FAILURE,
    CREATE_DOCTOR,
    CREATE_DOCTOR_SUCCESS,
    CREATE_DOCTOR_FAILURE
} from "../actions";

// Base API URL
const API_URL = 'http://localhost:8000';

// Fetch doctors
async function fetchDoctors() {
    const response = await axios.get(`${API_URL}/doctors`);
    return response.data;
}

// Edit doctor
async function editDoctor(doctor) {
    const response = await axios.put(`${API_URL}/doctors/${doctor.id}`, doctor);
    return response.data;
}

// Delete doctor
async function deleteDoctor(id) {
    await axios.delete(`${API_URL}/doctors/${id}`);
    return id;
}

// Create doctor
async function createDoctor(doctor) {
    const response = await axios.post(`${API_URL}/doctors`, doctor);
    console.log(response)
    return response.data;
}

// Fetch doctors saga
function* fetchDoctorsSaga() {
    try {
        const doctors = yield call(fetchDoctors);
        yield put({ type: GET_DOCTOR_SUCCESS.type, payload: doctors });
    } catch (error) {
        yield put({ type: GET_DOCTOR_FAILURE.type, payload: error });
    }
}

// Edit doctor saga
function* editDoctorSaga(action) {
    console.log(action)
    try {
        const updatedDoctor = yield call(editDoctor, action.payload);
        yield put({ type: EDIT_DOCTOR_SUCCESS.type, payload: updatedDoctor });
    } catch (error) {
        yield put({ type: EDIT_DOCTOR_FAILURE.type, payload: error });
    }
}

// Delete doctor saga
function* deleteDoctorSaga(action) {
    try {
        yield call(deleteDoctor, action.payload);
        yield put({ type: DELETE_DOCTOR_SUCCESS.type, payload: action.payload });
    } catch (error) {
        yield put({ type: DELETE_DOCTOR_FAILURE.type, payload: error });
    }
}

// Create doctor saga
function* createDoctorSaga(action) {
    try {
        const newDoctor = yield call(createDoctor, action.payload);
        yield put({ type: CREATE_DOCTOR_SUCCESS.type, payload: newDoctor });
    } catch (error) {
        yield put({ type: CREATE_DOCTOR_FAILURE.type, payload: error });
    }
}

function* doctorSagas() {
    yield takeEvery(GET_DOCTOR_FETCH, fetchDoctorsSaga);
    yield takeEvery(EDIT_DOCTOR, editDoctorSaga);
    yield takeEvery(DELETE_DOCTOR, deleteDoctorSaga);
    yield takeEvery(CREATE_DOCTOR, createDoctorSaga);
}

export default doctorSagas;
