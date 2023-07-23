import { useSelector } from "react-redux";
import "./header.css"
import DesktopHeader from "../../components/desktop-header/desktopHeader";
import MobileHeader from "../../components/mobile-header/mobileHeader";
import { useLocation, useNavigate } from "react-router-dom";

function Header(){
    const view = useSelector(state => state.view.view)
    const location = useLocation()
    const userDetails = useSelector(state => state.user.userDetails)
    const navigate = useNavigate()

    const actions = [
        {name: 'Feed', path: '/home/feed'},
        {name: 'Following', path: '/home/following'},
        {name: 'Users', path: '/users/list'},
        {name: 'My Posts', path: '/home/my-posts'},
        {name: userDetails.name, path: `/users/${userDetails.id}/profile`}
    ]

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
                <h1 onClick={()=>navigate('home/feed')}>Socially</h1>

                {
                    view === 'desktop' ? 
                        <DesktopHeader actions={actions} getActiveState={getActiveState} /> 
                    :   <MobileHeader actions={actions} getActiveState={getActiveState} />
                }
            </div>
        </div>
    )
}

export default Header;