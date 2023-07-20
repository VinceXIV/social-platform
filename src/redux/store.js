import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user"
import requestReducer from './request'

export const store = configureStore({
  reducer: {
    user: userReducer,
    request: requestReducer
  },
})