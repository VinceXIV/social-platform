import { useSelector } from "react-redux";
import { useGet } from "../../utilities/hooks";
import "./following.css"
import apiHost from "../../utilities/api";
import Feed from "../feed/feed";

function Following(){
    const following = useSelector(state => state.user.following)
    const [followingPosts] = useGet(`${apiHost}/posts`, following)
    
    return (
        <div className="content">
            <Feed posts={followingPosts}/>
        </div>
    )
}

export default Following;