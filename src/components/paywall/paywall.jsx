import Button from "../../elements/button/button";
import "./paywall.css"

function Paywall(){
    function handlePaymentClick(){

    }

    return (
        <div id="paywall">
            <div className="paywall-content">
                <h1>Join Premium</h1>
                <div className="paywall-details">
                    <p>View all posts starting at only $1/mo</p>
                    <p>Not only that. You will be able to</p>
                    <ul>
                        <li>Block a post from particular users</li>
                        <li>Block all posts from particular users</li>
                        <li>And many more..</li>
                    </ul>
                </div>

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
                            (33% off)
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