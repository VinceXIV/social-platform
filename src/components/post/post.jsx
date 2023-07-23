import "./post.css"
import apiHost from "../../utilities/api";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeViewed, makeLiked, makeUnliked } from "../../redux/posts";
import { regularUserLimit } from "../../utilities/variables";
import { block } from "../../redux/posts";
import { showPaywall } from "../../redux/paywall";
import Button from "../../elements/button/button";

function Post({post}){
    const [postState, setPostState] = useState({comments: [], hidden: true, blocking: false})
    const viewedPosts = useSelector(state => state.posts.viewed)
    const likedPosts = useSelector(state => state.posts.liked)
    const paywalled = useSelector(state => state.paywall.paywalled)
    const { userType, loggedIn } = useSelector(state => state.user)
    const postRef = useRef()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        // Get the comments for each posts so that when a 
        // user clicks on particular post, they can see the comments
        fetch(`${apiHost}/posts/${post.id}/comments`)
        .then(res => {

            if(res.ok){
                res.json().then(data => {
                    setPostState(postState => ({...postState, comments: data}))
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
    }, [setPostState, paywalled, post])

    function getDiv(cssSelector){
        return postRef.current.querySelector(cssSelector)
    }

    function handlePostClick(postId){
        if(!postState.hidden){
            setPostState(postState => ({...postState, hidden: true}))
        }else if(viewedPosts.length > regularUserLimit){
            // If they are a premium user, or this post is simply them 
            // reopening one of the posts they have already viewed
            if(userType === 'premium' || viewedPosts.find(p => p === postId)){  
                setPostState(postState => ({...postState, hidden: false}))
            }else { // Else they should pay
                dispatch(showPaywall([`You have reached today's limit of ${regularUserLimit} posts.`, "Join premium to view more"]))
            }
        }else {
            setPostState(postState => ({...postState, hidden: false}))
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

    function handleBlockClick(){
        setPostState(postState => ({...postState, blocking: true}))
    }

    function cancelBlockProcess(){
        setPostState(postState => ({...postState, blocking: false}))
    }

    return (
        <div ref={postRef} id="component-post" className={`component ${postState.blocking? 'blocking': ''}`} >
            {/* this will appear when one is trying to block the post */}
            <div className={`${postState.blocking? 'block-confirm': 'display-none'}`}>
                <h1>You are about to block this post</h1>

                <div>
                    <Button text="Confirm" action={()=>dispatch(block(post.id))}/>
                    <Button text="Cancel" action={cancelBlockProcess}/>
                </div>
            </div>

            {/* This is the whole of the post that would normally be rendered */}
            <div className="post-content">
                <h2 className="post-title">
                    {post.title}
                    <ul className="header-buttons">
                        <li>
                            <Button text={postState.hidden? 'open': 'hide'} action={()=>handlePostClick(post.id)} />
                        </li>
                        <li className={loggedIn? '': 'display-none'}>
                            <Button text="Block" action={handleBlockClick} />
                        </li>
                    </ul>
                </h2>

                <div className={`body ${postState.hidden? 'display-none': ''}`}>

                    <p>{post.body}</p>

                    <ul className="activity" onClick={handleActivityClick}>
                        <li className="activity-item" onClick={handleLikeClick}>
                            {
                                likedPosts.find(lId => lId === post.id)? 
                                    <i className="fa-solid fa-heart"></i>
                                :
                                <i className="fa-regular fa-heart"></i>
                            }
                            {post.likes || 0} likes
                        </li>

                        <li className="activity-item">
                            <i className="fa-regular fa-eye"></i>
                            <p>{post.views || 1} views</p>
                        </li>

                        <li className="activity-item" onClick={toggleShowComments}>
                            <i className="fa-regular fa-comment"></i>
                            <p>{postState.comments.length} comments</p>                        
                        </li>
                    </ul>
                    
                    <div id={`post-${post.id}-comments`} className="comments display-none" onClick={toggleShowComments}>
                        {
                            postState.comments.map(comment => {
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
            </div>
        </div>
    )
}

export default Post;