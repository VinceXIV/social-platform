import "./posts.css"
import Post from "../post/post"
import { useSelector } from "react-redux";
import Paywall from "../../components/paywall/paywall";

function Posts({posts = []}){
    const paywalled = useSelector(state => state.paywall.paywalled)

    return (
        <div id="section-posts" className="section">
            {
                // Show the paywall if the user is paywalled
                // User is paywalled after viewing all 20 free posts
                paywalled? <Paywall /> : ''
            }

            {
                posts.map(post => {
                    return <Post post={post} key={`post-${post.id}`}/>
                })
            }
        </div>
    )
}

export default Posts;