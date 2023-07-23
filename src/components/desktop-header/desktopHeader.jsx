import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import Button from "../../elements/button/button";
import "./desktopHeader.css"
import { useNavigate } from "react-router-dom";

function DesktopHeader({actions, getActiveState}){
    const loggedIn = useSelector(state => state.user.loggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function getShowable(){
        return actions.filter(action => {
            if(loggedIn){
                return action
            }else if(action.showWhenLoggedOut) {
                return action
            }
        })
    }

    return (
        <ul id="desktop-header" className="menu">
                        
            {
                getShowable(actions).map((action, i) => {
                    return (
                        <li key={`desktop-action-${i}`} className={`action ${getActiveState(action.path)}`}
                            onClick={()=>navigate(action.path.slice(1))}>
                            {action.name}
                        </li>
                    )
                })
            }

            {
                loggedIn ?
                    <li><Button text="Logout" action={()=>dispatch(logout())} /></li>
                :
                    <li><Button text="Login" action={()=> navigate('login')}/></li>
            }  
        </ul>
    )
}

export default DesktopHeader;