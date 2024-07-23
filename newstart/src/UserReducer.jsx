import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data";
const userSlice = createSlice({
    name: "users",
    initialState: {
        userList,
        selectedUser: null,
        loading: false,
        error: null,

    },
    reducers: {
        addUser: (state, action) => {
            state.userList.push(action.payload)
        },
        deleteUser: (state, action) => {
            state.userList = state.userList.filter((cur) => cur.id !== action.payload.id)
        },
        findEditData: (state, action) => {
            const user = state.userList.find((cur) => cur.id === +action.payload.id);
            state.selectedUser = user;
        },
        updateEditValue: (state, action) => {
            state.userList = state.userList.map((cur) => cur.id === action.payload.id ? action.payload : cur);
        },
        fetchUsers: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action) => {
            state.userList = action.payload;
            state.loading = false;
        },
        fetchUsersFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})
export const { addUser, deleteUser, findEditData, 
    updateEditValue, fetchUsersSuccess, fetchUsersFailure, fetchUsers } = userSlice.actions;
export default userSlice.reducer