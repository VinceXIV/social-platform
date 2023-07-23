import { useNavigate } from "react-router-dom"
import Button from "../../elements/button/button"
import "./subscriptionCancelled.css"

function SubscriptionCancelled(){
    const navigate = useNavigate()

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
