import "./content.css"
import Post from "../../components/post/post";
import { useSelector } from "react-redux";

function Content(){
    const {loggedIn, userType } = useSelector(state => state.user)
    const posts = useSelector(state => state.posts.posts)

    function getShowablePosts(){
        if(!loggedIn){
            // Show only 20 pots if user is not logged
            return posts.slice(0, 20)
        }else if (loggedIn && userType === 'regular'){
            // Also, only show 20 posts if they have logged
            // in but they are not premium users.
            return posts.slice(0, 20)
        }else if (loggedIn && userType === 'premium'){
            return posts
        }
    }

    return (
        <div id="section-posts" className="section">
            {
                getShowablePosts().map(post => {
                    return <Post post={post} key={`post-${post.id}`}/>
                })
            }
        </div>
    )
}

export default Content;