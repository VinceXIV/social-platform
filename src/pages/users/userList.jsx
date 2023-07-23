import AppUsers from "../../components/app-users/app-users"
import "./userList.css"

function UserList(){
    return (
        <div id="page-user-list" className="page">
            <div className="container">
                <div className="scroll">
                    <AppUsers />
                </div>
            </div>
        </div>
    )
}

export default UserList;