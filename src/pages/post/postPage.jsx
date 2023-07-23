import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../components/post/post";
import apiHost from "../../utilities/api";
import { useGet } from "../../utilities/hooks";
import "./postPage.css"

function PostPage(){
    const location = useLocation()
    const [,,postId] = location.pathname.split("/")
    const [post] = useGet(`${apiHost}/posts/${postId}`)
    const loggedIn = useSelector(state => state.user.loggedIn)
    const navigate = useNavigate()
    

    useEffect(()=>{
        if(!loggedIn){
            navigate('/login')
        }
    }, [loggedIn])

    return (
        <div className="page">
            <div className="content">
                <Post post = {post}/>
            </div>
        </div>
    )
}

export default PostPage;