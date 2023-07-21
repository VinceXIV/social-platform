import { useSelector } from "react-redux";
import { useGet } from "../../utilities/hooks";
import "./feed.css"
import apiHost from "../../utilities/api";
import Posts from "../../components/posts/posts";

function Feed(){   
    return (
        <div className="content">
            <Posts />
        </div>
    )
}

export default Feed;