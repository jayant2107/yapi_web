import { all, call, takeEvery } from "redux-saga/effects";
import { sagaLoginActions } from "./SagaAction";

function* workGetLogin(action) {
  yield call(() => action?.payload?.LoginCalling(action?.payload?.requestPayload));
}
function* LoginWithSaga() {
  yield takeEvery(sagaLoginActions.AUTH_LOGIN_SAGA, workGetLogin);
}

export default function* rootSaga() {
  yield all([LoginWithSaga()]);
};
