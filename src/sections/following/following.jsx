import { useDispatch, useSelector } from "react-redux";
import { useGet } from "../../utilities/hooks";
import "./following.css"
import apiHost from "../../utilities/api";
import Posts from "../../components/posts/posts";
import { setPosts } from "../../redux/posts";
import { useEffect } from "react";

function Following(){
    const following = useSelector(state => state.user.following)
    const [followingPosts] = useGet(`${apiHost}/posts`, following)
    const dispatch = useDispatch()
    const view = useSelector(state => state.view.view)

    useEffect(()=>{
        dispatch(setPosts(followingPosts))
    }, [followingPosts])

    function getText(view){
        if(view === 'mobile'){
            return 'Go to users, follow some then come back here to see their posts'
        }else if(view === 'desktop'){
            return 'Click the follow button to see their posts'
        }
    }
    
    return (
        <div id="section-following" className="content">
            {
                ! following.length ?
                    <div className="not-following">
                        <p className="info">You are currently not following any user</p>
                        <p className="call-to-action">{getText(view)}</p>
                    </div>
                : ''
            }
            <Posts />
        </div>
    )
}

export default Following;