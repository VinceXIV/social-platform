import "./post.css"
import apiHost from "../../utilities/api";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function Post({post}){
    const [comments, setComments] = useState([]) // By default, don't show the comments
    const postRef = useRef()

    useEffect(()=>{
        fetch(`${apiHost}/posts/${post.id}/comments`)
        .then(res => {

            if(res.ok){
                res.json().then(data => {
                    setComments(data)
                })
            }
        })
    }, [setComments])

    function handlePostClick(){
        // Get comments related to this post element as rendered on dom
        const comments = postRef.current.querySelector('.comments')

        comments.classList.toggle('display-none')
    }

    return (
        <div ref={postRef} id="component-post" className="component" onClick={handlePostClick}>
            <h2 className="post-title">{post.title}</h2>
            <p className="body">{post.body}</p>

            <div id={`post-${post.id}-comments`} className="comments display-none">
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