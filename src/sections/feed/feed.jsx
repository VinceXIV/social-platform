import "./feed.css"
import Posts from "../../components/posts/posts";
import { useDispatch, useSelector } from "react-redux";
import { useGet } from "../../utilities/hooks";
import apiHost from "../../utilities/api";
import { setPosts } from "../../redux/posts";
import { useEffect } from "react";

function Feed(){   
    const [feedPosts] = useGet(`${apiHost}/posts`)
    const posts = useSelector(state => state.posts.posts)
    const dispatch = useDispatch()

    useEffect(()=>{
        // Other sections might have modified the posts shown.
        // For instance, the following section wil only limit
        // the posts shown to users the current logged in user
        // is following. As such, the posts state is likely to
        // contain less than the maximum number of posts (100)
        if(!!posts && posts.length < 100){
            dispatch(setPosts(feedPosts))
        }
    }, [feedPosts])

    return (
        <div className="content">
            <Posts data={feedPosts}/>
        </div>
    )
}

export default Feed;