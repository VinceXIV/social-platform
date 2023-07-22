import { useSelector } from "react-redux";
import "./feed.css"
import Posts from "../../components/posts/posts";
import { useGet } from "../../utilities/hooks";
import apiHost from "../../utilities/api";

function Feed(){   
    const [posts] = useGet(`${apiHost}/posts`)
    
    return (
        <div className="content">
            <Posts posts={posts}/>
        </div>
    )
}

export default Feed;