import { configureStore } from "@reduxjs/toolkit"
import signInReducer from "./page/SignIn/SignInSlice"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import thunk from "redux-thunk"

// combine reducers
const reducers = combineReducers({
  SignIn: signInReducer,
})

// set persist config
const persistConfig = {
  key: "root",
  storage,
}

// combine persist reducer
const persistedReducer = persistReducer(persistConfig, reducers)

// config store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export default store
