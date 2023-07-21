import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paywalled: false,
    messages: []
}

export const counterSlice = createSlice({
  name: 'paywall',

  initialState,

  reducers: {
    showPaywall: (state, message) => {
        state.paywalled = true
        state.messages = message?.payload || state.messages
    },

    unshowPaywall: (state) => {
        state.paywalled = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {showPaywall, unshowPaywall} = counterSlice.actions

export default counterSlice.reducer