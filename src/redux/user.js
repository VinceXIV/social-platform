import { createSlice } from '@reduxjs/toolkit'


// We will be saving some data to the local storage to use for initial state
const localStorageData = JSON.parse(localStorage.getItem('data') || null) || {}

const initialState = {
  loggedIn: localStorageData['loggedIn'] || false,
  userDetails: localStorageData['userDetails'] || {},
  userType: localStorageData['userType'] || 'regular', // User can be regular or premium
}

export const counterSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    login: (state, userData) => {
      state.loggedIn = true
      state.userDetails = userData.payload

      localStorage.setItem('data', JSON.stringify(state))
    },

    logout: (state) => {
      localStorage.clear()
      state.loggedIn = false
      state.userDetails = {}
      state.userType = 'regular'      
    },

    updateUserDetails: (state, userData) => {
      state.userDetails = {...state.userDetails, ...userData.payload}
    },

    updateUserType: (state, newUserType) => {
      state.userType = newUserType
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, updateUserType } = counterSlice.actions

export default counterSlice.reducer