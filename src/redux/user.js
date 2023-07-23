import { createSlice } from '@reduxjs/toolkit'


// We will be saving some data to the local storage to use for initial state
const localStorageData = JSON.parse(localStorage.getItem('data') || null) || {}

const initialState = {
  loggedIn: localStorageData['loggedIn'] || false,
  userDetails: localStorageData['userDetails'] || {},
  userType: localStorageData['userType'] || 'regular', // User can be regular or premium
  following: localStorageData['following'] || [], // Will hold the an array of ids that the user is following
  blocked: localStorageData['blocked'] || []
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
    },

    updateUserDetails: (state, userData) => {
      state.userDetails = {...state.userDetails, ...userData.payload}
      localStorage.setItem('data', JSON.stringify(state))
    },

    updateUserType: (state, newUserType) => {
      state.userType = newUserType.payload
      localStorage.setItem('data', JSON.stringify(state))
    },

    setFollowing: (state, following) => {
      state.following = following.payload
      localStorage.setItem('data', JSON.stringify(state))
    },

    follow: (state, userId) => {
      state.following.push(userId.payload)
      localStorage.setItem('data', JSON.stringify(state))
    },

    unfollow: (state, userId) => {
      state.following = state.following.filter(f => f !== userId.payload)
      localStorage.setItem('data', JSON.stringify(state))
    },

    block: (state, userId) => {
      if(state.userType === 'premium'){
        state.blocked.push(userId.payload)
        state.following = state.following.filter(f => f !== userId.payload)
        localStorage.setItem('data', JSON.stringify(state))
      }
    },

    unblock: (state, userId) => {
      state.blocked = state.blocked.filter(f => f !== userId.payload)
      localStorage.setItem('data', JSON.stringify(state))     
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  login, logout, updateUserType,
  setFollowing, follow, unfollow,
  block, unblock } = counterSlice.actions

export default counterSlice.reducer