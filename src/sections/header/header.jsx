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
        {name: 'Feed', path: '/home/feed', showWhenLoggedOut: true},
        {name: 'Following', path: '/home/following', showWhenLoggedOut: false},
        {name: 'Users', path: '/users/list', showWhenLoggedOut: false},
        {name: 'My Posts', path: '/home/my-posts', showWhenLoggedOut: false},
        {name: userDetails.name, path: `/users/${userDetails.id}/profile`, showWhenLoggedOut: false}
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