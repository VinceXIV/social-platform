import "./home.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"

function Home(){
    const navigate = useNavigate()
    const loggedIn = useSelector(state => state.user.loggedIn)

    // If the person is not logged in, they are redirected
    // to the login page when they try to access this (home) page
    useEffect(()=>{
        if(!loggedIn){
            navigate('/login')
        }
    }, [loggedIn])

    return (
        <div id="page-home" className="page">
            <p>We are at home</p>
        </div>
    )
}

export default Home;