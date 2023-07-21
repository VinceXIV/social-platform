import { useSelector } from "react-redux";
import { useGet } from "../../utilities/hooks";
import "./following.css"
import apiHost from "../../utilities/api";
import Post from "../../components/post/post";

function Following(){
    const following = useSelector(state => state.user.following)
    const [followingPosts] = useGet(`${apiHost}/posts`, following)
    
    return (
        <div>
            {
                followingPosts.map(post => {
                    return <Post post={post} key={`following-post-${post.id}`}/>
                })
            }
        </div>
    )
}

export default Following;