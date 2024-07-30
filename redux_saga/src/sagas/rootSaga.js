import { all } from "redux-saga/effects";
import doctorSagas from "./Doctor";
import mySaga from "./sagas";
function* rootSaga() {
    yield all([
        mySaga(),   
        doctorSagas(),
    ]);
}

export default rootSaga;
