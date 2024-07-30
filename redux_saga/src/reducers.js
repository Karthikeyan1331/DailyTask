import { createReducer } from "@reduxjs/toolkit";
import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_FETCH,
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
} from "./actions";

const initialState = {
    users: [],
    doctors: [],
    loading: false,
    error: null
};

const myReducer = createReducer(initialState, (builder) => {
    builder
        // Handling users fetch actions
        .addCase(GET_USERS_FETCH, (state) => {
            state.loading = true;
        })
        .addCase(GET_USERS_SUCCESS, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(GET_USERS_FAILURE, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Handling doctors fetch actions
        .addCase(GET_DOCTOR_FETCH, (state) => {
            state.loading = true;
        })
        .addCase(GET_DOCTOR_SUCCESS, (state, action) => {
            state.loading = false;
            console.log(action)
            state.doctors = action.payload; // Corrected: action.payload instead of action.doctors
        })
        .addCase(GET_DOCTOR_FAILURE, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Handling doctor update actions
        .addCase(EDIT_DOCTOR, (state) => {
            state.loading = true;
        })
        .addCase(EDIT_DOCTOR_SUCCESS, (state, action) => {
            state.loading = false;
            // Update the doctor in the state
            console.log(action.payload, "vanakam")
            state.doctors = state.doctors.map(doctor =>
                doctor._id === action.payload._id ? action.payload : doctor
            );
        })
        .addCase(EDIT_DOCTOR_FAILURE, (state, action) => {
            state.loading = false;
            console.log("mission failed")
            state.error = action.payload;
        })

        // Handling doctor delete actions
        .addCase(DELETE_DOCTOR, (state) => {
            state.loading = true;
        })
        .addCase(DELETE_DOCTOR_SUCCESS, (state, action) => {
            state.loading = false;
            console.log(action.payload)
            // Remove the deleted doctor from the state
            state.doctors = state.doctors.filter(doctor => doctor._id !== action.payload._id);
        })
        .addCase(DELETE_DOCTOR_FAILURE, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Handling doctor creation actions
        .addCase(CREATE_DOCTOR, (state) => {
            state.loading = true;
        })
        .addCase(CREATE_DOCTOR_SUCCESS, (state, action) => {
            state.loading = false;
            // Add the new doctor to the state
            state.doctors.push(action.payload);
        })
        .addCase(CREATE_DOCTOR_FAILURE, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
});

export default myReducer;
