import "./login.css"
import LoginForm from "../../components/login-form/loginForm";
import LoginLeft from "../../components/login-left/loginLeft";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUserPosts } from "../../redux/posts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiHost from "../../utilities/api";

function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loggedIn, userDetails } = useSelector(state => state.user)

    // If the person is already logged in, they are redirected
    // to the homepage when they try to access this (login) page
    useEffect(()=>{
        if(loggedIn){
            // Save the posts made by the currently logged in user to a state
            fetch(`${apiHost}/users/${userDetails.id}/posts`)
            .then(res => {
                if(res.ok){
                    res.json().then(data => {
                        if(setLoggedInUserPosts){
                            dispatch(setLoggedInUserPosts(data))
                        }
                    })
                }else {
                    res.json().then(error => console.warn(error))
                }
            })
            
            // Finally navigate to home page
            navigate('/home/feed')
        }
    }, [loggedIn])

    return (
        <div id="page-login" className="page">
            <LoginForm />
        </div>
    )
}

export default Login;