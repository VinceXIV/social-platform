import { createSlice } from '@reduxjs/toolkit'
import apiHost from '../utilities/api'


// First we fetch 20 posts to be shown by default to 
// users who have not logged in yet
const res = await fetch(`${apiHost}/posts`)

let posts = []

if(res.ok){
    posts = await res.json().then(data => data)
}

// We use the posts we got above to set it as the
// default state of the posts to be shown to the user
const initialState = {
    posts: posts, // These are posts by the users of the social app
}

export const counterSlice = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    setPosts: (state, data) => {
        state.posts = data.payload
    },

    addPost: (state, data) => {
        state.posts = [...state.posts, data.payload]
    },

    deletePost: (state, data) => {
        state.posts = state.posts.filter(post => post.id !== data.payload.id)
    },

    updatePost: (state, data) => {
        state.posts = state.posts.map(post => {
            if(post.id === data.payload.id){
                return {...post, ...data.payload}
            }else {
                return post
            }
        })
    }
  },
})

// Action creators are generated for each case reducer function
export const {setPosts, addPost, deletePost, updatePost, setLoggedInUserPosts } = counterSlice.actions

export default counterSlice.reducer