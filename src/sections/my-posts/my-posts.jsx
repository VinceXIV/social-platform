import { useSelector } from "react-redux";
import apiHost from "../../utilities/api";
import "./my-posts.css"
import { useGet } from "../../utilities/hooks";
import Posts from "../../components/posts/posts";

function MyPosts(){
    const loggedInUserDetails = useSelector(state => state.user.userDetails)
    const [myPosts] = useGet(`${apiHost}/users/${loggedInUserDetails.id}/posts`)

    return (
        <div id="section-my-posts" className="section content">
            <Posts data={myPosts}/>
        </div>
    )
}

export default MyPosts;