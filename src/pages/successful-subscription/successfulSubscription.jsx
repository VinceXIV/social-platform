import { useNavigate } from "react-router-dom"
import Button from "../../elements/button/button"
import "./successfulSubscription.css"

function SuccessfulSubscription(){
    const navigate = useNavigate()

    return (
        <div id="page-subscriptions-successful" className="page">
            <div className="container">
                <h1 className="info">Subscription successful</h1>
                <p className="info">You are now a premium user</p>
                <Button text="Go back" action={()=>navigate(-1)}/>
            </div>
        </div>
    )
}


export default SuccessfulSubscription
