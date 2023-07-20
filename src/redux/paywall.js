import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paywalled: false
}

export const counterSlice = createSlice({
  name: 'paywall',

  initialState,

  reducers: {
    paywall: (state) => {
        state.paywalled = true
    },

    unpaywall: (state) => {
        state.paywalled = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {paywall, unpaywall} = counterSlice.actions

export default counterSlice.reducer