import { createSlice } from '@reduxjs/toolkit'
import { mobileThreshold } from '../utilities/variables'

// This will hold the state we are currently showing our app
// whether it is in mobile view or desktop view
const initialState = {
    view: window.innerWidth > mobileThreshold? 'desktop' : 'mobile',
}

export const counterSlice = createSlice({
  name: 'view',

  initialState,

  reducers: {
    updateView: (state, newView) => {
        state.view = newView.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateView } = counterSlice.actions

export default counterSlice.reducer