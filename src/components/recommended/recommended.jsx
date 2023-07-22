import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import getRecommendations from "../../recommender/recommender";
import "./recommended.css"

function Recommended(){
    const {liked: likedPosts, viewed: viewedPosts, posts: allPosts} = useSelector(state => state.posts)
    const [recommendedPosts, setRecommendedPosts] = useState([])

    useEffect(()=>{
        setRecommendedPosts(getRecommendations(likedPosts, viewedPosts, allPosts))
    }, [likedPosts, viewedPosts, allPosts])

    return (
        <div id="recommended-for-you">
            <h1 className="recommendation-title">
                Here are some posts you might be 
                interested in
            </h1>

            {
                recommendedPosts.map(post => {
                    return (
                        <div className="posts" key={`recommended-post-${post.id}`}>
                            <p>{post.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Recommended;