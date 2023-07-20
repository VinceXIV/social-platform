import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
  userDetails: {},
  userType: 'regular', // User can be regular or premium
  activePagePath: '/',
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, userDetails) => {
      state.loggedIn = true
      state.userDetails = userDetails
      state.activePagePath = '/home'
    },
    logout: (state, newUserDetails) => {
      state.loggedIn = false
      state.userDetails = {...state.userDetails, ...newUserDetails}
      state.activePagePath = '/login'
    },
    updateUserType: (state, newUserType) => {
      state.userType = newUserType
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, updateUserType } = counterSlice.actions

export default counterSlice.reducer