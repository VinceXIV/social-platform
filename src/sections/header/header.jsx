import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import Button from "../../elements/button/button";
import "./header.css"
import { useLocation, useNavigate } from "react-router-dom";

function Header(){
    const loggedIn = useSelector(state => state.user.loggedIn)
    const userDetails = useSelector(state => state.user.userDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    function getActiveState(expectedPathName){
        if(location.pathname === expectedPathName){
            return 'active'
        }else {
            return 'inactive'
        }
    }

    return (
        <div id="section-header">
            <div className="container">
                <h1>Socially</h1>

                <div className="actions">
                    <ul className="menu">
                        <li className={`action ${getActiveState('/home/feed')}`}
                            onClick={()=>navigate('home/feed')}>
                            Feed
                        </li>

                        {
                            loggedIn ?
                                <>
                                    <li className={`action ${getActiveState('/home/my-posts')}`}
                                        onClick={()=>navigate('home/my-posts')}>
                                        My Posts
                                    </li>
                                    <li className={`action ${getActiveState('/home/following')}`}
                                        onClick={()=>navigate('home/following')}>
                                        Following
                                    </li>
                                    <li className={`action ${getActiveState(`/profile/${userDetails.id}`)}`}
                                        onClick={()=>navigate(`profile/${userDetails.id}`)}>
                                        {userDetails.name}
                                    </li>
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