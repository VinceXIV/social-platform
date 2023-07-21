import { useGet } from "../../utilities/hooks";
import apiHost from "../../utilities/api";
import { showPaywall } from "../../redux/paywall";
import "./app-users.css"
import { useDispatch, useSelector } from "react-redux";
import Button from "../../elements/button/button";
import { follow, unfollow, block, unblock } from "../../redux/user";

function FollowingUsers(){
    const [allUsers] = useGet(`${apiHost}/users`)
    const {following, blocked, userType} = useSelector(state => state.user)
    const dispatch = useDispatch()

    // Is the logged in user following the user whose id
    // has been sent to this method?
    function isFollowing(userId){
        return !!following.find(fId => fId === userId)
    }

    function isBlocked(userId){
        if(userType === 'regular'){
            // A regular user doesn't have the ability to block
            // Only a premium one can
            return false
        }else if(userType === 'premium'){
            return !!blocked.find(bId => bId === userId)
        }
    }

    function handleBlockClick(){
        if(userType === 'regular'){
            dispatch(showPaywall())
        }else {
            dispatch(block(user.id))
        }
    }

    console.log("all users: ", allUsers)

    return (
        <div className="app-users">
            {
                allUsers.map(user => {
                    return (
                        <div key={`app-user-${user.id}`}
                            className={`user-details ${isBlocked(user.id)? 'blocked': ''}`}>

                            <p >{user.name}</p>

                            <div>
                                {
                                    // If this user is blocked, then only show the unblock button
                                    // otherwise, show both the follow/unfollow and the block button
                                    isBlocked(user.id) ?
                                        <Button text='Unblock' action={()=>dispatch(unblock(user.id))}/>
                                    : isFollowing(user.id) ?
                                        <>
                                            <Button text="Unfollow" action={()=>dispatch(unfollow(user.id))} />
                                            <Button text='Block' action={handleBlockClick}/>                                        
                                        </>

                                    :
                                        <>
                                            <Button text="Follow" action={()=>dispatch(follow(user.id))} />
                                            <Button text='Block' action={handleBlockClick}/>                                        
                                        </>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FollowingUsers;