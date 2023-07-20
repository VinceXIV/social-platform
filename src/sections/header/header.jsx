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

    return (
        <div id="section-header">
            <div className="container">
                <h1>Socially</h1>

                <div className="actions">
                    <ul className="menu">
                        <li onClick={()=>navigate('home/feed')}>Feed</li>

                        {
                            loggedIn ?
                                <>
                                    <li onClick={()=>navigate('home/my-posts')}>My Posts</li>
                                    <li onClick={()=>navigate('home/following')}>Following</li>
                                    <li onClick={()=>navigate('home/profile')}>{userDetails.name}</li>
                                    <li><Button text="Logout" action={()=>dispatch(logout())} /></li>
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