import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import myReducer from "./reducers";
import rootSaga from "./sagas/rootSaga"; // Import the root saga

// Combine reducers
const rootReducer = combineReducers({ myReducer });

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store with saga middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable the serializable check
        }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
