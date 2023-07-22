import "./post.css"
import apiHost from "../../utilities/api";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeViewed, makeLiked, makeUnliked } from "../../redux/posts";
import { showPaywall } from "../../redux/paywall";
import Button from "../../elements/button/button";

function Post({post}){
    const [comments, setComments] = useState([]) // By default, don't show the comments
    const viewedPosts = useSelector(state => state.posts.viewed)
    const likedPosts = useSelector(state => state.posts.liked)
    const paywalled = useSelector(state => state.paywall.paywalled)
    const { userType } = useSelector(state => state.user.userType)
    const postRef = useRef()
    const dispatch = useDispatch()

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

    function getDiv(cssSelector){
        return postRef.current.querySelector(cssSelector)
    }

    function handlePostClick(postId){
        const comments = getDiv('.comments')
        const postBody = getDiv('.body')

        // If a user has already viewed 20 posts
        if(viewedPosts.length >= 20){
            // If they are a premium user, or this post is simply them 
            // reopening one of the posts they have already viewed
            if(userType === 'premium' || viewedPosts.find(p => p === postId)){
                
                // We don't want to display-none a post body when the comments 
                // are being displayed. At the least, comments should only be 
                // shown when the post is being shown too
                if(Array.from(comments.classList).find(c => c === 'display-none')){
                    postBody.classList.toggle('display-none')
                }
            }else { // Else they should pay
                dispatch(showPaywall(["You have reached today's limit of 20 posts.", "Join premium to view more"]))
            }
        }else {
            // We don't want to display-none a post body when the comments 
            // are being displayed. At the least, comments should only be 
            // shown when the post is being shown too
            if(Array.from(comments.classList).find(c => c === 'display-none')){
                postBody.classList.toggle('display-none')
            }
            dispatch(makeViewed(postId)) // Register this post as viewed
        }
    }

    function toggleShowComments(){
        const comments = getDiv('.comments')
        comments.classList.toggle('display-none')      
    }

    function handleActivityClick(e){
        e.stopPropagation()
    }

    function handleLikeClick(e){
        e.stopPropagation()
        
        if(likedPosts.find(lId => lId === post.id)){
            dispatch(makeUnliked(post.id))
        }else {
            dispatch(makeLiked(post.id))
        }
    }

    return (
        <div ref={postRef} id="component-post" className="component" >
            <h2 className="post-title">
                {post.title}
                <ul className="header-buttons">
                    <li><Button text="view" action={()=>handlePostClick(post.id)} /></li>
                    <li><Button text="Block" /></li>
                </ul>
            </h2>
            <div className="body display-none">

                <p>{post.body}</p>

                <ul className="activity" onClick={handleActivityClick}>
                    <li className="activity-item" onClick={handleLikeClick}>
                        {
                            likedPosts.find(lId => lId === post.id)? 
                                <i className="fa-solid fa-heart"></i>
                            :
                            <i className="fa-regular fa-heart"></i>
                        }
                        {post.likes} likes
                    </li>

                    <li className="activity-item">
                        <i className="fa-regular fa-eye"></i>
                        <p>{post.views} views</p>
                    </li>

                    <li className="activity-item" onClick={toggleShowComments}>
                        <i className="fa-regular fa-comment"></i>
                        <p>{comments.length} comments</p>                        
                    </li>
                </ul>
            </div>


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