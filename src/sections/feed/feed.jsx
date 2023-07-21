import { useSelector } from "react-redux";
import "./feed.css"
import Posts from "../../components/posts/posts";

function Feed(){   
    const posts = useSelector(state => state.posts.posts)
    
    return (
        <div className="content">
            <Posts posts={posts}/>
        </div>
    )
}

export default Feed;