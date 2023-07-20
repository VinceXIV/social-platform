import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import apiHost from "../../utilities/api";
import Post from "../../components/post/post";
import "./my-posts.css"

function MyPosts(){
    const loggedInUserDetails = useSelector(state => state.user.userPosts)
    const [myPosts, setMyPosts] = useState([])

    useEffect(()=>{
        fetch(`${apiHost}/users/${loggedInUserDetails.id}/posts`)
        .then(res => {
            if(res.ok){
                res.json().then(data => setMyPosts(data))
            }else {
                res.json().then(error => console.warn(error))
            }
        })
    }, [myPosts, setMyPosts])

    return (
        <div id="section-my-posts" className="section">
            {
                myPosts.map(post => {
                    return <Post post={post} key={`post-${post.id}`}/>                 
                })
            }
        </div>
    )
}

export default MyPosts;