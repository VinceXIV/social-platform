import { useSelector } from "react-redux";
import "./header.css"
import DesktopHeader from "../../components/desktop-header/desktopHeader";

function Header(){
    const view = useSelector(state => state.view.view)

    return (
        <div id="section-header">
            <div className="container">
                <h1>Socially</h1>

                {
                    view === 'desktop' ? <DesktopHeader /> : ""
                }
            </div>
        </div>
    )
}

export default Header;