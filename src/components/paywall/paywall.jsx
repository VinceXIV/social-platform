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
                <div className="close-paywall">
                    <i className="fa-solid fa-xmark"></i>
                </div>
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

                <div className="payments">
                    <div className="payment-option">
                        <p className="details">
                            <span>It's only </span>
                            <span className="amount">$8 </span>
                            <span className="amount-info">(33% off)</span>
                        </p>
                        
                        {/* Paypal button */}
                        <form className="payment-btn" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                            <input type="hidden" name="cmd" value="_s-xclick" />
                            <input type="hidden" name="hosted_button_id" value="HZ848SWY8TYXW" />
                            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paywall;