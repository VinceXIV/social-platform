import "./login.css"
import LoginForm from "../../components/login-form/loginForm";
import LoginLeft from "../../components/login-left/loginLeft";

function Login(){
    return (
        <div id="page-login" className="page">
            <LoginLeft />
            <LoginForm />
        </div>
    )
}

export default Login;