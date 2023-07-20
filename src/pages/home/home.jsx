import "./home.css"
import Feed from "../../sections/feed/feed"
import { useLocation } from "react-router-dom";
import MyPosts from "../../sections/my-posts/my-posts";
import Following from "../../sections/following/following";
import Users from "../../sections/users/users";
import Profile from "../../sections/profile/profile";

function Home(){
    const content = null
    const location = useLocation()

    function getSection(){
        if(location.pathname === '/home/feed'){
            return <Feed />
        }else if(location.pathname === '/home/my-posts'){
            return <MyPosts />
        }else if(location.pathname === '/home/users'){
            return <Users />
        }else if(location.pathname === '/home/following'){
            return <Following />
        }else if(location.pathname === '/home/profile'){
            return <Profile />
        }else {
            return <Feed />
        }
    }

    return (
        <div id="page-home" className="page">
            <div className="container">
                { getSection() }
            </div>
        </div>
    )
}

export default Home;