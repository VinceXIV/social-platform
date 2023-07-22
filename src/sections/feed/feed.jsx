import "./feed.css"
import Posts from "../../components/posts/posts";
import { useDispatch } from "react-redux";
import { useGet } from "../../utilities/hooks";
import apiHost from "../../utilities/api";
import { setPosts } from "../../redux/posts";
import { useEffect } from "react";

function Feed(){   
    const [feedPosts] = useGet(`${apiHost}/posts`)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setPosts(feedPosts))
    }, [feedPosts])

    return (
        <div className="content">
            <Posts data={feedPosts}/>
        </div>
    )
}

export default Feed;