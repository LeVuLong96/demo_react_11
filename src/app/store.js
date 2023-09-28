import counterReducer from '../features/Counter/counterSlice'
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/Auth/userSlice'

const rootReducer = {
    count: counterReducer,
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;