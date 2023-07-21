import { useSelector } from "react-redux";
import apiHost from "../../utilities/api";
import Post from "../../components/post/post";
import "./my-posts.css"
import { useGet } from "../../utilities/hooks";

function MyPosts(){
    const loggedInUserDetails = useSelector(state => state.user.userDetails)
    const [myPosts] = useGet(`${apiHost}/users/${loggedInUserDetails.id}/posts`)

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