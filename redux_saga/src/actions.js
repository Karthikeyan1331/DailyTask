import { createAction } from "@reduxjs/toolkit";

export const GET_USERS_FETCH = createAction("GET_USERS_FETCH");
export const GET_USERS_SUCCESS = createAction("GET_USERS_SUCCESS");
export const GET_USERS_FAILURE = createAction("GET_USERS_FAILURE");
//Doctor
//Fetch data
export const GET_DOCTOR_FETCH = createAction("GET_DOCTOR_FETCH");
export const GET_DOCTOR_SUCCESS = createAction("GET_DOCTOR_SUCCESS");
export const GET_DOCTOR_FAILURE = createAction("GET_DOCTOR_FAILURE");
//Update data
export const EDIT_DOCTOR = createAction("EDIT_DOCTOR");
export const EDIT_DOCTOR_SUCCESS = createAction("EDIT_DOCTOR_SUCCESS");
export const EDIT_DOCTOR_FAILURE = createAction("EDIT_DOCTOR_FAILURE");
//Delete data
export const DELETE_DOCTOR = createAction("DELETE_DOCTOR");
export const DELETE_DOCTOR_SUCCESS = createAction("DELETE_DOCTOR_SUCCESS");
export const DELETE_DOCTOR_FAILURE = createAction("DELETE_DOCTOR_FAILURE");
//Create data
export const CREATE_DOCTOR = createAction("CREATE_DOCTOR");
export const CREATE_DOCTOR_SUCCESS = createAction("CREATE_DOCTOR_SUCCESS");
export const CREATE_DOCTOR_FAILURE = createAction("CREATE_DOCTOR_FAILURE");