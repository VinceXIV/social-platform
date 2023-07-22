import { useSelector } from "react-redux";
import "./header.css"
import DesktopHeader from "../../components/desktop-header/desktopHeader";
import MobileHeader from "../../components/mobile-header/mobileHeader";

function Header(){
    const view = useSelector(state => state.view.view)

    const actions = [
        {name: 'Following', path: '/home/following'},
        {name: 'My Posts', path: '/home/my-posts'},
        {name: 'Feed', path: '/home/feed'}
    ]

    return (
        <div id="section-header">
            <div className="container">
                <h1>Socially</h1>

                {
                    view === 'desktop' ? <DesktopHeader actions={actions} /> : <MobileHeader />
                }
            </div>
        </div>
    )
}

export default Header;