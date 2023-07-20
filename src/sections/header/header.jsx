import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import Button from "../../elements/button/button";
import "./header.css"
import { useNavigate } from "react-router-dom";

function Header(){
    const loggedIn = useSelector(state => state.user.loggedIn)
    const userDetails = useSelector(state => state.user.userDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function viewLoggedInUserPosts(){

    }

    function viewLoggedInUserDetails(){

    }

    function handleLogoutClick(){
        dispatch(logout())
    }

    function viewFollowing(){

    }

    return (
        <div id="section-header">
            <div className="container">
                <h1>Socially</h1>

                <div className="actions">
                    <ul className="menu">
                        <li onClick={()=>navigate('home')}>Feed</li>

                        {
                            loggedIn ?
                                <>
                                    <li onClick={viewLoggedInUserPosts}>My Posts</li>
                                    <li onClick={viewFollowing}>Following</li>
                                    <li onClick={viewLoggedInUserDetails}>{userDetails.name}</li>
                                    <li><Button text="Logout" action={handleLogoutClick} /></li>
                                </>
                            :
                            <li><Button text="Login" action={()=> navigate('login')}/></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;