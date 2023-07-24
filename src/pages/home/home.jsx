import "./home.css"
import Feed from "../../sections/feed/feed"
import { useLocation, useNavigate } from "react-router-dom";
import MyPosts from "../../sections/my-posts/my-posts";
import Following from "../../sections/following/following";
import Users from "../../sections/users/users";
import Sidebar from "../../sections/sidebar/sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Home(){
    const location = useLocation()
    const loggedIn = useSelector(state => state.user.loggedIn)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!loggedIn){
            navigate('/home/feed')
        }
    }, [loggedIn])

    function getSection(){
        if(location.pathname === '/home/feed'){
            return <Feed />
        }else if(location.pathname === '/home/my-posts'){
            return <MyPosts />
        }else if(location.pathname === '/home/users'){
            return <Users />
        }else if(location.pathname === '/home/following'){
            return <Following />
        }else {
            return <Feed />
        }
    }

    return (
        <div id="page-home" className="page">
            <div className="container">
                { getSection() }
                {loggedIn? <Sidebar /> : ""}
            </div>
        </div>
    )
}

export default Home;