import "./login.css"
import LoginForm from "../../components/login-form/loginForm";
import LoginLeft from "../../components/login-left/loginLeft";
import { useSelector } from "react-redux";

function Login(){
    const loggedIn = useSelector(state => state.user.loggedIn)
    console.log("logged in: ", loggedIn)
    return (
        <div id="page-login" className="page">
            <LoginLeft />
            <LoginForm />
        </div>
    )
}

export default Login;