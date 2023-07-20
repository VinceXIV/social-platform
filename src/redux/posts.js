import { createSlice } from '@reduxjs/toolkit'
import apiHost from '../utilities/api'


// First we fetch 20 posts to be shown by default to 
// users who have not logged in yet
const res = await fetch(`${apiHost}/posts`)

let posts = []

if(res.ok){
    posts = await res.json().then(data => data.slice(0, 20))
}

// We use the posts we got above to set it as the
// default state of the posts to be shown to the user
const initialState = {
    posts: posts,
}


export const counterSlice = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    setPosts: (state, newPostArray) => {
        state.posts = newPostArray
    },

    addPost: (state, newPost) => {
        state.posts = state.posts.push(newPost)
    },

    deletePost: (state, deletedPost) => {
        state.posts = state.posts.filter(post => post.id !== deletedPost.id)
    },

    updatePost: (state, updatedPost) => {
        state.posts = state.posts.map(post => {
            if(post.id === updatedPost.id){
                return {...post, ...updatedPost}
            }else {
                return post
            }
        })
    }
  },
})

// Action creators are generated for each case reducer function
export const {setPosts, addPost, deletePost, updatePost } = counterSlice.actions

export default counterSlice.reducer