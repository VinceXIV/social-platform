import "./post.css"
import apiHost from "../../utilities/api";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeViewed } from "../../redux/posts";

function Post({post}){
    const [comments, setComments] = useState([]) // By default, don't show the comments
    const paywalled = useSelector(state => state.paywall.paywalled)
    const postRef = useRef()
    const dispatch = useDispatch()
    const viewedPosts = useSelector(state => state.posts.viewed)

    useEffect(()=>{
        // Get the comments for each posts so that when a 
        // user clicks on particular post, they can see the comments
        fetch(`${apiHost}/posts/${post.id}/comments`)
        .then(res => {

            if(res.ok){
                res.json().then(data => {
                    setComments(data)
                })
            }
        })

        // If a user is paywalled, style the posts such that the paywall is
        // more prominent/pronounced. The styling are in the css file
        if(paywalled){
            postRef.current.classList.add('paywalled')
        }else{
            postRef.current.classList.remove('paywalled')
        }
    }, [setComments, paywalled])

    function handlePostClick(postId){

        dispatch(makeViewed(postId)) // Register this post as viewed

        const comments = postRef.current.querySelector('.comments')
        if(Array.from(comments.classList).find(c => c === 'display-none')){
            const postBody = postRef.current.querySelector('.body')
            postBody.classList.toggle('display-none')
        }

        console.log(viewedPosts)
    }

    function toggleShowComments(e){
        e.stopPropagation()
        const comments = postRef.current.querySelector('.comments')
        comments.classList.toggle('display-none')      
    }

    return (
        <div ref={postRef} id="component-post" className="component" onClick={()=>handlePostClick(post.id)}>
            <h2 className="post-title">{post.title}</h2>
            <p className="body display-none" onClick={toggleShowComments}>{post.body}</p>

            <div id={`post-${post.id}-comments`} className="comments display-none" onClick={toggleShowComments}>
                {
                    comments.map(comment => {
                        return (
                            <div key={`post-${post.id}-comment-${comment.id}`} className="comment" >
                                <h3 className="comment-title">{comment.name}</h3>
                                <p >{comment.body}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Post;