import { useSelector } from "react-redux";
import { useGet } from "../../utilities/hooks";
import "./following.css"
import apiHost from "../../utilities/api";
import Posts from "../../components/posts/posts";

function Following(){
    const following = useSelector(state => state.user.following)
    const [followingPosts] = useGet(`${apiHost}/posts`, following)
    
    return (
        <div id="section-following" className="content">
            <Posts data={followingPosts}/>
            {
                ! following.length ?
                    <div className="not-following">
                        <p className="info">You are currently not following any user</p>
                        <p className="call-to-action">Click the follow button to see their posts</p>
                    </div>
                : ''
            }
        </div>
    )
}

export default Following;