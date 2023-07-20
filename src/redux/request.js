import { createSlice } from '@reduxjs/toolkit'


// Used to track the stage we are when sending asynchronous requests
// such as fetch(api-endpoint)
// 0 means we havent sent any request
// 1 means we have sent it and it is being worked on
// 2 means it has been completed
const initialState = {
    stages: {
        'login': 0
    }
}

export const counterSlice = createSlice({
  name: 'request',

  initialState,

  reducers: {
    goToNextStage: (state, activity) => {
        const newStage = state[activity] + 1
        state[activity] = newStage

        // If a request has been completed, automatically
        // return to the idle state in 3 seconds
        if(newStage === 2){
            setTimeout(()=>{
                state[activity] = 0
            }, 3000)
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { goToNextStage } = counterSlice.actions

export default counterSlice.reducer