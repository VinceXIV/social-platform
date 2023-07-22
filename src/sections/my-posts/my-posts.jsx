import { useDispatch, useSelector } from "react-redux";
import apiHost from "../../utilities/api";
import "./my-posts.css"
import { useGet } from "../../utilities/hooks";
import Posts from "../../components/posts/posts";
import { setPosts } from "../../redux/posts";
import { useEffect } from "react";

function MyPosts(){
    const loggedInUserDetails = useSelector(state => state.user.userDetails)
    const [myPosts] = useGet(`${apiHost}/users/${loggedInUserDetails.id}/posts`)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setPosts(myPosts))
    }, [myPosts])

    return (
        <div id="section-my-posts" className="section content">
            <Posts />
        </div>
    )
}

export default MyPosts;