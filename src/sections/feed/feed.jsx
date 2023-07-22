import "./feed.css"
import Posts from "../../components/posts/posts";
import { useSelector } from "react-redux";
import { useGet } from "../../utilities/hooks";
import apiHost from "../../utilities/api";

function Feed(){   
    const [feedPosts] = useGet(`${apiHost}/posts`)

    return (
        <div className="content">
            <Posts data={feedPosts}/>
        </div>
    )
}

export default Feed;