import "./sidebar.css"
import FollowingUsers from "../../components/app-users/app-users"

function Sidebar(){

    function getComponent(){
        if(location.pathname === '/home/feed'){
            return <FollowingUsers />
        }else if(location.pathname === '/home/my-posts'){
            return <FollowingUsers />
        }else if(location.pathname === '/home/users'){
            return <FollowingUsers />
        }else if(location.pathname === '/home/following'){
            return <FollowingUsers />
        }else if(location.pathname === '/home/profile'){
            return <FollowingUsers />
        }else {
            return <FollowingUsers />
        }
    }

    return (
        <div className="sidebar">
            {getComponent()}
        </div>
    )
}

export default Sidebar;