import "./login.css"
import LoginForm from "../../components/login-form/loginForm";
import LoginLeft from "../../components/login-left/loginLeft";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login(){
    const navigate = useNavigate()
    const loggedIn = useSelector(state => state.user.loggedIn)

    // If the person is already logged in, they are redirected
    // to the homepage when they try to access this (login) page
    useEffect(()=>{
        if(loggedIn){
            navigate('/home')
        }
    }, [loggedIn])

    return (
        <div id="page-login" className="page">
            <LoginLeft />
            <LoginForm />
        </div>
    )
}

export default Login;