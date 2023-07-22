import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import Button from "../../elements/button/button";
import "./desktopHeader.css"
import { useLocation, useNavigate } from "react-router-dom";

function DesktopHeader({actions}){
    const loggedIn = useSelector(state => state.user.loggedIn)
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
        <ul id="desktop-header" className="menu">
            <li className={`action ${getActiveState('/home/feed')}`}
                onClick={()=>navigate('home/feed')}>
                Feed
            </li>

            {
                loggedIn ?
                    <>
                        {
                            actions.map((action, i) => {
                                return (
                                    <li key={`action-${i}`} className={`action ${getActiveState(action.path)}`}
                                        onClick={()=>navigate(action.path.slice(1))}>
                                        {action.name}
                                    </li>
                                )
                            })
                        }
                        <li><Button text="Logout" action={()=>dispatch(logout())} /></li>
                    </>
                :
                <li><Button text="Login" action={()=> navigate('login')}/></li>
            }
        </ul>
    )
}

export default DesktopHeader;