import "./content.css"
import Post from "../../components/post/post";
import { useSelector } from "react-redux";

function Content(){
    const posts = useSelector(state => state.posts.posts)

    return (
        <div id="section-posts" className="section">
            {
                posts.map(post => {
                    return <Post post={post} key={`post-${post.id}`}/>
                })
            }
        </div>
    )
}

export default Content;