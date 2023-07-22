import { useSelector } from "react-redux";
import "./header.css"
import DesktopHeader from "../../components/desktop-header/desktopHeader";
import MobileHeader from "../../components/mobile-header/mobileHeader";
import { useLocation } from "react-router-dom";

function Header(){
    const view = useSelector(state => state.view.view)
    const location = useLocation()

    const actions = [
        {name: 'Following', path: '/home/following'},
        {name: 'My Posts', path: '/home/my-posts'},
        {name: 'Feed', path: '/home/feed'}
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
                <h1>Socially</h1>

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