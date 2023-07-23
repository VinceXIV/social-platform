import { useGet } from "../../utilities/hooks";
import apiHost from "../../utilities/api";
import { showPaywall } from "../../redux/paywall";
import "./app-users.css"
import { useDispatch, useSelector } from "react-redux";
import Button from "../../elements/button/button";
import { follow, unfollow, block, unblock } from "../../redux/user";
import { useNavigate } from "react-router-dom";

function AppUsers({handleUserClick}){
    const userDetails = useSelector(state => state.user.userDetails)
    const [allUsers] = useGet(`${apiHost}/users`) // Get all users except the the logged in user
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

    function handleBlockClick(userId){
        if(userType === 'regular'){
            dispatch(showPaywall(['Unlock more features with premium subscription']))
        }else {
            dispatch(block(userId))
        }
    }

    function removeLoggedInUser(allUsers){
        return allUsers.filter(user => user.id !== userDetails.id)
    }

    return (
        <div className="app-users">
            {
                removeLoggedInUser(allUsers).map(user => {
                    return (
                        <div key={`app-user-${user.id}`}
                            className={`user-details ${isBlocked(user.id)? 'blocked': ''}`}>

                            <p className="user-name" onClick={()=>handleUserClick(user.id)} >{user.name}</p>

                            <div>
                                {
                                    // If this user is blocked, then only show the unblock button
                                    // otherwise, show both the follow/unfollow and the block button
                                    isBlocked(user.id) ?
                                        <Button text='Unblock' action={()=>dispatch(unblock(user.id))}/>
                                    : isFollowing(user.id) ?
                                        <>
                                            <Button text="Unfollow" action={()=>dispatch(unfollow(user.id))} />
                                            <Button text='Block' action={()=>handleBlockClick(user.id)}/>                                        
                                        </>

                                    :
                                        <>
                                            <Button text="Follow" action={()=>dispatch(follow(user.id))} />
                                            <Button text='Block' action={()=>handleBlockClick(user.id)}/>                                        
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

export default AppUsers;