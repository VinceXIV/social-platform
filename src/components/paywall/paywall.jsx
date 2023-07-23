import Button from "../../elements/button/button";
import "./paywall.css"
import { unshowPaywall } from "../../redux/paywall";
import { useDispatch, useSelector } from "react-redux";

function Paywall(){
    const paywallMessages = useSelector(state => state.paywall.messages)
    const view = useSelector(state => state.view.view)
    const dispatch = useDispatch()
    function handlePaymentClick(){

    }

    return (
        <div id="paywall" onClick={()=>dispatch(unshowPaywall())}>
            <div className={`paywall-content ${view}`}>
                <h1>Join Premium</h1>
                <div className="paywall-details">
                    {
                        paywallMessages.map((m, i) => {
                            return <p key={`paywall-message-${i}`}>{m}</p>
                        })
                    }
                    <p>Unlock more features in your app including; </p>
                    <ul>
                        <li>View all posts</li>
                        <li>Like and add comments on posts</li>
                        <li>Block posts from particular users</li>
                        <li>Block all posts from particular users</li>
                        <li>And many more..</li>
                    </ul>
                </div>

                <p>Sounds like a plan?</p>

                <div className="payments">
                    <div className="payment-option">
                        <p className="details">
                            <span className="amount">$1</span>
                        </p>
                        <p className="details">Monthly plan</p>
                        <Button text='Subscribe' action={handlePaymentClick} />
                    </div>

                    <div className="payment-option">
                        <p className="details">
                            <span className="amount">$8 </span>
                            <span className="amount-info">(33% off)</span>
                        </p>
                        <p className="details">Yearly plan</p>
                        <Button text='Subscribe' action={handlePaymentClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paywall;