import { useSelector } from "react-redux";
import apiHost from "../../utilities/api";
import "./my-posts.css"
import { useGet } from "../../utilities/hooks";
import Feed from "../feed/feed";

function MyPosts(){
    const loggedInUserDetails = useSelector(state => state.user.userDetails)
    const [myPosts] = useGet(`${apiHost}/users/${loggedInUserDetails.id}/posts`)

    return (
        <div id="section-my-posts" className="section content">
            {
                // Use a limit of -1, because the feed filters the posts in the form
                // posts.slice(0, limit). Using -1 means all posts will be shown
                // There will be no paywall when a user views more than 20 of the
                // posts they made
                <Feed posts={myPosts} limit={-1}/>
            }
        </div>
    )
}

export default MyPosts;