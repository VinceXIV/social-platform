import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user"
import requestReducer from './request'
import postsReducer from './posts'
import paywallReducer from './paywall'

export const store = configureStore({
  reducer: {
    user: userReducer,
    request: requestReducer,
    posts: postsReducer,
    paywall: paywallReducer
  },
})