import { createSlice } from '@reduxjs/toolkit'
import apiHost from '../utilities/api'


// First we fetch 20 posts to be shown by default to 
// users who have not logged in yet
const res = await fetch(`${apiHost}/posts`)

let posts = []

if(res.ok){
    const results = await res.json().then(data => data)

    // Add some random number of likes and views
    // for each post
    posts = results.map(p => {
        return {
            ...p,
            likes: Math.floor(Math.random()*50),
            views: Math.floor(Math.random()*5000)
        }
    })
    // Randomize the posts afterwards. That's because the posts
    // by default come are sorted by users so all posts of user 1
    // are shown before user 2, before user 3 ...
    .sort(()=> Math.random() - Math.random())
}

// We use the posts we got above to set it as the
// default state of the posts to be shown to the user
const initialState = {
    posts: posts, // These are posts by the users of the social app
    viewed: [], // Will contain a list of posts for which the user has viewed
    liked: [],
    unliked: [], // Holds a list of posts that were previously liked but not any more
    blocked: []
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

    block: (state, postId) => {
        state.blocked.push(postId.payload)
    },

    updatePost: (state, data) => {
        state.posts = state.posts.map(post => {
            if(post.id === data.payload.id){
                return {...post, ...data.payload}
            }else {
                return post
            }
        })
    },

    makeViewed: (state, postId) => {
        if(!state.viewed.find(pId => pId === postId.payload)){
            // Update the number of views of that post
            state.posts = state.posts.map(post => {
                if(post.id === postId.payload){
                    const p = post
                    p.views += 1
                    return p
                }else {
                    return post
                }
            })
        }

        const viewedPosts = state.viewed
        viewedPosts.push(postId.payload)

        state.viewed = Array.from(new Set(viewedPosts))
    },

    makeLiked: (state, postId) => {
        if(!state.liked.find(pId => pId === postId.payload)){
            // Update the number of views of that post
            state.posts = state.posts.map(post => {
                if(post.id === postId.payload){
                    const p = post
                    p.likes += 1

                    state.liked.push(postId.payload)
                    state.unliked = state.unliked.filter(lId => lId !== postId.payload)
                    return p
                }else {
                    return post
                }
            })            
        }

        const likedPosts = state.liked
        likedPosts.push(postId.payload)

        state.liked = Array.from(new Set(likedPosts))
    },

    makeUnliked: (state, postId) => {
        if(!state.unliked.find(pId => pId === postId.payload)){
            state.posts = state.posts.map(post => {
                if(post.id === postId.payload){
                    const p = post
                    p.likes -= 1

                    state.unliked.push(postId.payload)
                    state.liked = state.liked.filter(lId => lId !== postId.payload)
                    return p
                }else {
                    return post
                }
            })           
        }

        const unlikedPosts = state.unliked
        unlikedPosts.push(postId.payload)

        state.unliked = Array.from(new Set(unlikedPosts))
    }
  },
})

// Action creators are generated for each case reducer function
export const {setPosts, addPost, deletePost, updatePost,
    setLoggedInUserPosts, makeViewed, makeLiked,
    makeUnliked, block } = counterSlice.actions

export default counterSlice.reducer