import { useSelector } from "react-redux";
import AppUsers from "../../components/app-users/app-users"
import Paywall from "../../components/paywall/paywall";
import "./userList.css"

function UserList(){
    const paywalled = useSelector(state => state.paywall.paywalled)
    
    return (
        <div id="page-user-list" className="page">
            {
                // Show the paywall if the user is paywalled
                // User is paywalled after viewing all 20 free posts
                paywalled? <Paywall /> : ''
            }
            <div className="container">
                <div className="scroll">
                    <AppUsers />
                </div>
            </div>
        </div>
    )
}

export default UserList;