import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../user.reducer.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const myPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:myPersistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
export const  perstStore = persistStore(store);
