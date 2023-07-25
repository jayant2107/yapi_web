import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import createSagaMiddleware from "redux-saga";
import SignInSlice from "../Auth/signIn/SignInSlice";
import storage from "redux-persist/lib/storage";
import rootSaga from "../Auth/signIn/LoginSaga";

const reducers = combineReducers({
  LoginSlice: SignInSlice,
});

const persistConfig = {
  key: "root",
  storage
};

const saga = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga)
});
saga.run(rootSaga);

export const persistor = persistStore(store);
