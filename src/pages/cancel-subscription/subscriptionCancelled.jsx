import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Button from "../../elements/button/button"
import "./subscriptionCancelled.css"

function SubscriptionCancelled(){
    const navigate = useNavigate()
    const loggedIn = useSelector(state => state.user.loggedIn)

    useEffect(()=>{
        if(!loggedIn){
            navigate('/login')
        }
    }, [loggedIn])

    return (
        <div id="page-subscriptions-cancelled" className="page">
            <div className="container">
                <h1 className="info">Subscription cancelled successfully</h1>
                <Button text="Go back" action={()=>navigate(-1)}/>
            </div>
        </div>
    )
}


export default SubscriptionCancelled
