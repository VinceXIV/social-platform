import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../elements/button/button";
import getRecommendations from "../../recommender/recommender";
import "./recommended.css"
import { setPosts } from "../../redux/posts";

function Recommended(){
    const {liked: likedPosts, viewed: viewedPosts, posts: allPosts} = useSelector(state => state.posts)
    const [recommendedPosts, setRecommendedPosts] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        setRecommendedPosts(getRecommendations(likedPosts, viewedPosts, allPosts))
    }, [likedPosts, viewedPosts, allPosts])

    function handlePostView(post){
        dispatch(setPosts([post]))
        navigate(`/posts/${post.id}`)
    }

    return (
        <div id="recommended-for-you">
            <h1 className="recommendation-title">
                Here are some posts you might be 
                interested in
            </h1>

            {
                recommendedPosts.map(post => {
                    return (
                        <div className="post" key={`recommended-post-${post.id}`}>
                            <p>{post.title}</p>
                            <Button text="open" action={()=>handlePostView(post)}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Recommended;