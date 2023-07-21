import { useGet } from "../../utilities/hooks";
import apiHost from "../../utilities/api";
import "./app-users.css"
import { useDispatch, useSelector } from "react-redux";
import Button from "../../elements/button/button";
import { follow, unfollow } from "../../redux/user";

function FollowingUsers(){
    const [allUsers] = useGet(`${apiHost}/users`)
    const following = useSelector(state => state.user.following)
    const dispatch = useDispatch()


    // Is the logged in user following the user whose id
    // has been sent to this method?
    function isFollowing(userId){
        return !!following.find(fId => fId === userId)
    }

    console.log("all users: ", allUsers)

    return (
        <div className="app-users">
            {
                allUsers.map(user => {
                    return (
                        <div key={`app-user-${user.id}`} className="user-details">
                            <p>{user.name}</p>
                            <div>
                                {
                                    isFollowing(user.id) ?
                                        <Button text="Unfollow" action={()=>dispatch(unfollow(user.id))} />
                                    :
                                    <Button text="Follow" action={()=>dispatch(follow(user.id))} />
                                }
                                <Button text='Block' action={()=>dispatch(block(user.id))}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FollowingUsers;