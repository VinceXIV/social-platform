import "./sidebar.css"
import AppUsers from "../../components/app-users/app-users"
import Recommended from "../../components/recommended/recommended"

function Sidebar(){

    function getComponent(){
        if(location.pathname === '/home/feed'){
            return <Recommended />
        }else if(location.pathname === '/home/my-posts'){
            return <AppUsers />
        }else if(location.pathname === '/home/users'){
            return <AppUsers />
        }else if(location.pathname === '/home/following'){
            return <AppUsers />
        }else if(location.pathname === '/home/profile'){
            return <AppUsers />
        }else {
            return <AppUsers />
        }
    }

    return (
        <div className="sidebar">
            <div className="scroll">
                {getComponent()}
            </div>
        </div>
    )
}

export default Sidebar;