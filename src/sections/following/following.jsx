import { useSelector } from "react-redux";
import { useGet } from "../../utilities/hooks";
import "./following.css"
import apiHost from "../../utilities/api";
import Posts from "../../components/posts/posts";

function Following(){
    const following = useSelector(state => state.user.following)
    const [followingPosts] = useGet(`${apiHost}/posts`, following)
    
    return (
        <div className="content">
            <Posts posts={followingPosts}/>
        </div>
    )
}

export default Following;