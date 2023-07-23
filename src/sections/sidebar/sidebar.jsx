import "./sidebar.css"
import AppUsers from "../../components/app-users/app-users"
import Recommended from "../../components/recommended/recommended"
import { useNavigate } from "react-router-dom"

function Sidebar(){
    const navigate = useNavigate()

    function handleUserClick(userId){
        navigate(`/users/${userId}/profile`)
    }

    function getComponent(){
        if(location.pathname === '/home/feed'){
            return <Recommended />
        }else if(location.pathname === '/home/my-posts'){
            return <AppUsers handleUserClick={handleUserClick} />
        }else if(location.pathname === '/home/users'){
            return <AppUsers handleUserClick={handleUserClick} />
        }else if(location.pathname === '/home/following'){
            return <AppUsers handleUserClick={handleUserClick} />
        }else if(location.pathname === '/home/profile'){
            return <AppUsers handleUserClick={handleUserClick} />
        }else {
            return <AppUsers handleUserClick={handleUserClick} />
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